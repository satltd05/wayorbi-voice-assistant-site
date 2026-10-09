import React from 'react';
import { Mic, MicOff, Square, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { AssistantVoiceState, SupportedLanguage } from '../types/assistant';

interface VoiceOrbProps {
  state: AssistantVoiceState;
  volumeLevel: number;
  interimTranscript: string;
  language: SupportedLanguage;
  onToggleListening: () => void;
  onStopSpeaking: () => void;
  micError: string | null;
}

export const VoiceOrb: React.FC<VoiceOrbProps> = ({
  state,
  volumeLevel,
  interimTranscript,
  language,
  onToggleListening,
  onStopSpeaking,
  micError,
}) => {
  const isListening = state === 'listening';
  const isSpeaking = state === 'speaking';
  const isProcessing = state === 'processing';

  // Dynamic scale from microphone volume
  const pulseScale = isListening ? 1 + volumeLevel * 0.35 : 1;

  // Status message
  const getStatusText = () => {
    if (micError) {
      return language === 'en' ? 'Microphone issue' : 'Problème microphone';
    }
    if (isListening) {
      return language === 'en' ? 'Listening to your question...' : 'Je vous écoute... Posez votre question';
    }
    if (isProcessing) {
      return language === 'en' ? 'Wayorbi is thinking...' : 'Wayorbi réfléchit...';
    }
    if (isSpeaking) {
      return language === 'en' ? 'Wayorbi is answering (tap to stop)' : 'Wayorbi vous répond (appuyez pour stopper)';
    }
    return language === 'en' ? 'Tap the microphone to speak' : 'Appuyez pour parler à l’assistant';
  };

  const handleClick = () => {
    if (isSpeaking) {
      onStopSpeaking();
    } else {
      onToggleListening();
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-6 px-4">
      {/* Background ambient radial glow */}
      <div
        className={`absolute w-72 h-72 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
          isListening
            ? 'bg-blue-500/25 scale-125'
            : isSpeaking
            ? 'bg-gradient-to-tr from-blue-600/30 to-purple-600/35 scale-125'
            : isProcessing
            ? 'bg-indigo-500/25 scale-110 animate-pulse'
            : 'bg-gradient-to-r from-blue-600/15 to-purple-600/15 scale-100'
        }`}
      />

      {/* Ripple concentric rings when active */}
      {(isListening || isSpeaking) && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className={`w-40 h-40 rounded-full border animate-ping duration-1000 ${
              isListening ? 'border-sky-400/40' : 'border-purple-400/40'
            }`}
          />
          <div
            className={`w-52 h-52 rounded-full border animate-pulse duration-700 ${
              isListening ? 'border-blue-400/20' : 'border-purple-400/20'
            }`}
          />
        </div>
      )}

      {/* Main Microphone Button */}
      <button
        type="button"
        onClick={handleClick}
        disabled={isProcessing}
        style={{ transform: `scale(${pulseScale})` }}
        className={`relative z-10 flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full shadow-2xl transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/50 ${
          isListening
            ? 'bg-gradient-to-tr from-sky-500 to-blue-600 shadow-blue-500/50 text-white ring-4 ring-sky-300/50'
            : isSpeaking
            ? 'bg-gradient-to-tr from-[#3B82F6] via-[#6366F1] to-[#A855F7] shadow-purple-500/50 text-white ring-4 ring-purple-300/50'
            : isProcessing
            ? 'bg-gradient-to-tr from-slate-900 to-indigo-950 shadow-indigo-900/50 text-slate-300 ring-2 ring-white/10'
            : 'bg-gradient-to-tr from-[#121829] via-[#1A223B] to-[#141B30] hover:from-[#1A233D] hover:to-[#222E54] text-blue-400 hover:text-white border border-blue-500/30 hover:border-blue-400 shadow-[0_12px_36px_rgba(59,130,246,0.18)] hover:shadow-[0_16px_40px_rgba(99,102,241,0.3)]'
        }`}
        aria-label={getStatusText()}
      >
        {isProcessing ? (
          <Loader2 className="w-9 h-9 sm:w-10 sm:h-10 animate-spin text-blue-400" />
        ) : isSpeaking ? (
          <div className="flex flex-col items-center">
            <Square className="w-8 h-8 sm:w-9 sm:h-9 fill-current" />
            <span className="text-[10px] uppercase font-bold tracking-wider mt-1 opacity-90">Stop</span>
          </div>
        ) : isListening ? (
          <Mic className="w-10 h-10 sm:w-11 sm:h-11 animate-pulse" />
        ) : (
          <div className="relative">
            <Mic className="w-10 h-10 sm:w-11 sm:h-11 transition-transform group-hover:scale-110" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 ring-2 ring-[#0A0D18]" />
          </div>
        )}
      </button>

      {/* Status indicator line */}
      <div className="relative z-10 flex items-center justify-center gap-2 mt-4">
        {micError ? (
          <AlertCircle className="w-4 h-4 text-rose-400" />
        ) : isProcessing ? (
          <Sparkles className="w-4 h-4 text-purple-400 animate-spin" />
        ) : isListening ? (
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
        ) : isSpeaking ? (
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" />
        ) : (
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
        )}

        <span
          className={`text-xs sm:text-sm font-medium transition-colors ${
            micError
              ? 'text-rose-400'
              : isListening
              ? 'text-sky-300 font-semibold'
              : isSpeaking
              ? 'text-purple-300 font-semibold'
              : isProcessing
              ? 'text-indigo-300'
              : 'text-slate-400'
          }`}
        >
          {getStatusText()}
        </span>
      </div>

      {/* Live Transcript Preview during Speech */}
      {isListening && interimTranscript && (
        <div className="relative z-10 max-w-lg mt-3 px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-xs sm:text-sm text-slate-200 text-center animate-fade-in shadow-lg">
          <span className="text-slate-400 mr-2 text-[11px] font-mono uppercase tracking-wider">
            {language === 'en' ? 'Live:' : 'Direct :'}
          </span>
          « {interimTranscript} »
        </div>
      )}

      {/* Mic Error Banner with Action */}
      {micError && (
        <div className="relative z-10 max-w-md mt-3 px-3 py-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 text-center">
          {micError}
        </div>
      )}
    </div>
  );
};
