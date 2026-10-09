import React, { useRef, useEffect } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { ChatMessage, SupportedLanguage } from '../types/assistant';
import { ChatMessageItem } from './ChatMessageItem';
import { WayorbiLogoIcon, WayorbiWordmark } from './WayorbiLogo';

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
        <div className="my-6 mx-auto max-w-xl p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#11172A]/90 to-[#0E1322]/90 border border-white/10 backdrop-blur-xl text-center shadow-2xl relative overflow-hidden">
          {/* Subtle top glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-blue-500/10 blur-3xl pointer-events-none" />

          <div className="mx-auto mb-4 inline-block drop-shadow-xl">
            <WayorbiLogoIcon size={72} animated />
          </div>

          <div className="mb-2 flex items-center justify-center gap-2">
            <span className="text-xl sm:text-2xl font-bold text-white">
              {language === 'en' ? 'Welcome to' : 'Bienvenue sur'}
            </span>
            <WayorbiWordmark size="md" />
          </div>

          <p className="text-sm text-slate-300 leading-relaxed max-w-md mx-auto mb-5">
            {language === 'en'
              ? 'Wayorbi is the social network for travelers. Ask me any question aloud or by text about travel journals, the Explorer hub, Travel DNA, or connecting with fellow adventurers.'
              : 'Wayorbi est le réseau social pensé pour les voyageurs. Posez-moi vos questions à haute voix ou par écrit pour tout savoir sur les carnets, l’espace Explorer, le Travel DNA et la communauté.'}
          </p>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/30 text-xs text-blue-300 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
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
          <div className="flex-shrink-0 mr-3 mt-1 shadow-md rounded-xl overflow-hidden ring-1 ring-white/10">
            <WayorbiLogoIcon size={34} />
          </div>

          <div className="rounded-2xl p-4 bg-[#111728]/90 border border-white/10 text-slate-300 rounded-tl-sm flex items-center gap-3">
            <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
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
