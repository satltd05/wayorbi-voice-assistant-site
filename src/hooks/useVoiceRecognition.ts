import { useState, useEffect, useRef, useCallback } from 'react';
import { SupportedLanguage } from '../types/assistant';

interface UseVoiceRecognitionProps {
  language: SupportedLanguage;
  onTranscriptComplete: (transcript: string) => void;
}

interface SpeechRecognitionEventLike extends Event {
  results: {
    length: number;
    [index: number]: {
      isFinal: boolean;
      length: number;
      [index: number]: {
        transcript: string;
        confidence: number;
      };
    };
  };
  resultIndex: number;
}

interface SpeechRecognitionErrorEventLike extends Event {
  error: string;
  message?: string;
}

export function useVoiceRecognition({
  language,
  onTranscriptComplete,
}: UseVoiceRecognitionProps) {
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [interimTranscript, setInterimTranscript] = useState<string>('');
  const [micError, setMicError] = useState<string | null>(null);
  const [volumeLevel, setVolumeLevel] = useState<number>(0);

  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const accumulatedFinalRef = useRef<string>('');

  // Check support on mount
  useEffect(() => {
    const SpeechRecognitionAPI =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      setIsSupported(false);
    }
  }, []);

  // Audio level monitoring setup
  const startAudioMonitoring = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      mediaStreamRef.current = stream;

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.6;
      analyserRef.current = analyser;

      const source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const checkVolume = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const avg = sum / bufferLength;
        const normalized = Math.min(1, Math.max(0, avg / 128));
        setVolumeLevel(normalized);

        animationFrameRef.current = requestAnimationFrame(checkVolume);
      };

      checkVolume();
    } catch (err: any) {
      console.warn('Microphone volume monitor could not be started:', err?.message);
    }
  }, []);

  const stopAudioMonitoring = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    analyserRef.current = null;
    setVolumeLevel(0);
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore stop error
      }
    }
    stopAudioMonitoring();
    setIsListening(false);
  }, [stopAudioMonitoring]);

  const startListening = useCallback(async () => {
    setMicError(null);
    setInterimTranscript('');
    accumulatedFinalRef.current = '';

    const SpeechRecognitionAPI =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      setMicError(
        language === 'en'
          ? 'Voice recognition is not supported in this browser. Please use Google Chrome, Edge or Safari, or type your question below.'
          : 'La reconnaissance vocale n’est pas supportée sur ce navigateur. Veuillez utiliser Chrome, Edge ou Safari, ou écrire votre question ci-dessous.'
      );
      return;
    }

    try {
      // Prompt for microphone permission first
      await startAudioMonitoring();

      const recognition = new SpeechRecognitionAPI();
      recognitionRef.current = recognition;

      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      // Locale mapping
      if (language === 'en') {
        recognition.lang = 'en-US';
      } else {
        recognition.lang = 'fr-FR';
      }

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: SpeechRecognitionEventLike) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const item = event.results[i];
          if (item.isFinal) {
            final += item[0].transcript;
          } else {
            interim += item[0].transcript;
          }
        }

        if (final) {
          accumulatedFinalRef.current += (accumulatedFinalRef.current ? ' ' : '') + final.trim();
        }

        setInterimTranscript(interim || accumulatedFinalRef.current);
      };

      recognition.onerror = (event: SpeechRecognitionErrorEventLike) => {
        console.warn('Speech recognition event error:', event.error);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setMicError(
            language === 'en'
              ? 'Microphone access was denied. Please allow microphone permissions in your browser bar.'
              : 'Accès au microphone refusé. Veuillez autoriser le micro dans la barre d’adresse de votre navigateur.'
          );
        } else if (event.error === 'no-speech') {
          // Silent timeout - gracefully stop
        } else if (event.error !== 'aborted') {
          setMicError(
            language === 'en'
              ? `Voice input note: ${event.error}. You can also type directly.`
              : `Note vocale : ${event.error}. Vous pouvez également écrire directement.`
          );
        }
        stopListening();
      };

      recognition.onend = () => {
        setIsListening(false);
        stopAudioMonitoring();

        const finalText = accumulatedFinalRef.current.trim();
        if (finalText.length > 0) {
          onTranscriptComplete(finalText);
          setInterimTranscript('');
          accumulatedFinalRef.current = '';
        }
      };

      recognition.start();
    } catch (err: any) {
      console.error('Error starting recognition:', err);
      setMicError(
        language === 'en'
          ? 'Unable to access microphone. Please verify browser permissions.'
          : 'Impossible d’accéder au micro. Vérifiez les autorisations de votre navigateur.'
      );
      stopListening();
    }
  }, [language, onTranscriptComplete, startAudioMonitoring, stopListening]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopListening();
    };
  }, [stopListening]);

  return {
    isSupported,
    isListening,
    interimTranscript,
    micError,
    volumeLevel,
    startListening,
    stopListening,
    clearError: () => setMicError(null),
  };
}
