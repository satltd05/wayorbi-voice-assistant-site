import React, { useRef, useEffect } from 'react';
import { Loader2, Sparkles, Compass } from 'lucide-react';
import { ChatMessage, SupportedLanguage } from '../types/assistant';
import { ChatMessageItem } from './ChatMessageItem';

interface ChatContainerProps {
  messages: ChatMessage[];
  isProcessing: boolean;
  currentlySpeakingId: string | null;
  language: SupportedLanguage;
  onPlayAudio: (message: ChatMessage) => void;
  onStopAudio: () => void;
  onOpenFeatureModal: (featureId: string) => void;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  isProcessing,
  currentlySpeakingId,
  language,
  onPlayAudio,
  onStopAudio,
  onOpenFeatureModal,
}) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  return (
    <div className="w-full flex-1 overflow-y-auto px-4 py-4 space-y-4">
      {/* Empty State Welcome Card */}
      {messages.length === 0 && (
        <div className="my-6 mx-auto max-w-xl p-6 rounded-2xl bg-[#141A28]/80 border border-white/10 backdrop-blur-xl text-center shadow-xl">
          <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-[#E07A5F] via-[#F4A261] to-[#E76F51] flex items-center justify-center text-white shadow-lg shadow-[#E07A5F]/20">
            <Compass className="w-6 h-6 stroke-[2]" />
          </div>

          <h3 className="font-['Playfair_Display',serif] text-xl sm:text-2xl font-bold text-white mb-2">
            {language === 'en'
              ? 'Welcome to Wayorbi Assistant'
              : 'Bienvenue sur l’assistant Wayorbi'}
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed max-w-md mx-auto mb-4">
            {language === 'en'
              ? 'Wayorbi is the social network for travelers. Ask me any question aloud or by text about travel journals, the Explorer hub, Travel DNA, or connecting with fellow adventurers.'
              : 'Wayorbi est le réseau social pensé pour les voyageurs. Posez-moi vos questions à haute voix ou par écrit pour tout savoir sur les carnets, l’espace Explorer, le Travel DNA et la communauté.'}
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#F4A261]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {language === 'en'
                ? 'Speak in English or French anytime'
                : 'Parlez en français ou en anglais à tout moment'}
            </span>
          </div>
        </div>
      )}

      {/* Message List */}
      {messages.map((msg) => (
        <ChatMessageItem
          key={msg.id}
          message={msg}
          isSpeakingThis={currentlySpeakingId === msg.id}
          onPlayAudio={onPlayAudio}
          onStopAudio={onStopAudio}
          onOpenFeatureModal={onOpenFeatureModal}
        />
      ))}

      {/* Thinking / Processing Bubble */}
      {isProcessing && (
        <div className="flex w-full justify-start my-2 animate-fade-in">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-tr from-[#E07A5F] to-[#F4A261] flex items-center justify-center text-white mr-3 mt-1 shadow-md shadow-[#E07A5F]/20">
            <Compass className="w-4 h-4 stroke-[2.2]" />
          </div>

          <div className="rounded-2xl p-4 bg-[#151A27]/90 border border-white/10 text-slate-300 rounded-tl-sm flex items-center gap-3">
            <Loader2 className="w-4 h-4 text-[#F4A261] animate-spin" />
            <span className="text-sm font-medium">
              {language === 'en'
                ? 'Wayorbi is crafting your response...'
                : 'Wayorbi prépare votre réponse...'}
            </span>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};
