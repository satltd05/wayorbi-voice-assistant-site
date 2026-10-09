import { useState, useEffect, useRef, useCallback } from 'react';
import { SupportedLanguage } from '../types/assistant';

interface UseVoiceSynthesisProps {
  autoSpeak: boolean;
  language: SupportedLanguage;
}

export function useVoiceSynthesis({ autoSpeak }: UseVoiceSynthesisProps) {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState<string | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const isCancelledRef = useRef<boolean>(false);

  // Load browser voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const updateVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // Pick the best natural voice for a given language
  const getBestVoice = useCallback((lang: 'fr' | 'en'): SpeechSynthesisVoice | null => {
    if (availableVoices.length === 0) return null;

    const langPrefix = lang === 'fr' ? 'fr' : 'en';

    // Prioritize natural sounding voices
    const matchingVoices = availableVoices.filter((v) =>
      v.lang.toLowerCase().startsWith(langPrefix)
    );

    if (matchingVoices.length === 0) return null;

    // Preference list for French
    if (lang === 'fr') {
      const preferred = matchingVoices.find((v) =>
        /Google français|Thomas|Audrey|Amelie|Julie|Virginie|Natural/i.test(v.name)
      );
      if (preferred) return preferred;
    } else {
      // Preference list for English
      const preferred = matchingVoices.find((v) =>
        /Google US English|Google UK English|Samantha|Daniel|Natural|Jenny|Guy/i.test(v.name)
      );
      if (preferred) return preferred;
    }

    return matchingVoices[0];
  }, [availableVoices]);

  const stopSpeaking = useCallback(() => {
    isCancelledRef.current = true;

    // Stop browser speech synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    // Stop audio element if playing server audio
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.currentTime = 0;
      audioPlayerRef.current = null;
    }

    setIsSpeaking(false);
    setCurrentlySpeakingId(null);
  }, []);

  const speak = useCallback(
    async (
      text: string,
      messageId?: string,
      lang: 'fr' | 'en' = 'fr',
      audioBase64?: string
    ) => {
      stopSpeaking();
      isCancelledRef.current = false;

      if (!text || text.trim().length === 0) return;

      setIsSpeaking(true);
      if (messageId) setCurrentlySpeakingId(messageId);

      // If server provided high-quality audio WAV
      if (audioBase64) {
        try {
          const audio = new Audio(`data:audio/wav;base64,${audioBase64}`);
          audioPlayerRef.current = audio;

          audio.onended = () => {
            setIsSpeaking(false);
            setCurrentlySpeakingId(null);
            audioPlayerRef.current = null;
          };

          audio.onerror = () => {
            console.warn('Audio element error, falling back to Web Speech API');
            audioPlayerRef.current = null;
            speakWithSpeechSynthesis(text, lang);
          };

          await audio.play();
          return;
        } catch (e) {
          console.warn('Audio play failed, falling back to SpeechSynthesis', e);
        }
      }

      speakWithSpeechSynthesis(text, lang);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stopSpeaking, getBestVoice]
  );

  const speakWithSpeechSynthesis = (text: string, lang: 'fr' | 'en') => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSpeaking(false);
      setCurrentlySpeakingId(null);
      return;
    }

    // Clean markdown characters for voice
    const cleanText = text
      .replace(/[*_#`~]/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang === 'en' ? 'en-US' : 'fr-FR';
    utterance.rate = 1.02; // natural pace
    utterance.pitch = 1.0;

    const voice = getBestVoice(lang);
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentlySpeakingId(null);
    };

    utterance.onerror = (e) => {
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        console.warn('SpeechSynthesis error:', e.error);
      }
      setIsSpeaking(false);
      setCurrentlySpeakingId(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, [stopSpeaking]);

  return {
    isSpeaking,
    currentlySpeakingId,
    speak,
    stopSpeaking,
    availableVoices,
  };
}
