import React, { useState, useRef } from 'react';
import { Send, Mic } from 'lucide-react';
import { SupportedLanguage } from '../types/assistant';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  onStartListening: () => void;
  isListening: boolean;
  isProcessing: boolean;
  language: SupportedLanguage;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onStartListening,
  isListening,
  isProcessing,
  language,
}) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = inputValue.trim();
    if (!text || isProcessing) return;

    onSendMessage(text);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-4xl mx-auto flex items-center gap-2 p-1.5 sm:p-2 bg-[#101524]/90 border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl focus-within:border-blue-500/50 transition-all"
    >
      {/* Microphone quick tap button */}
      <button
        type="button"
        onClick={onStartListening}
        disabled={isProcessing}
        className={`p-2.5 rounded-xl transition-all cursor-pointer ${
          isListening
            ? 'bg-sky-500 text-white animate-pulse'
            : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-blue-300'
        }`}
        title={
          language === 'en'
            ? 'Speak your question'
            : 'Poser votre question à la voix'
        }
      >
        <Mic className="w-5 h-5" />
      </button>

      {/* Input text */}
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isProcessing}
        placeholder={
          language === 'en'
            ? 'Ask anything about Wayorbi, or use the mic...'
            : 'Posez une question sur Wayorbi, ou parlez au micro...'
        }
        className="flex-1 bg-transparent px-2 py-2 text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none"
      />

      {/* Send button */}
      <button
        type="submit"
        disabled={!inputValue.trim() || isProcessing}
        className="p-2.5 rounded-xl bg-gradient-to-tr from-[#3B82F6] via-[#6366F1] to-[#A855F7] text-white shadow-md shadow-blue-500/25 hover:opacity-90 active:scale-95 disabled:opacity-30 disabled:scale-100 disabled:cursor-not-allowed transition-all cursor-pointer"
        title={language === 'en' ? 'Send' : 'Envoyer'}
      >
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
};
