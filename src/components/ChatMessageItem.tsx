import React, { useState } from 'react';
import { Volume2, Square, Copy, Check, User, ExternalLink, Dna, BookOpen, Search, MessageCircle, ShieldCheck, Compass } from 'lucide-react';
import { ChatMessage } from '../types/assistant';
import { WAYORBI_FEATURES } from '../data/wayorbiKnowledge';
import { WayorbiLogoIcon } from './WayorbiLogo';

interface ChatMessageItemProps {
  message: ChatMessage;
  isSpeakingThis: boolean;
  onPlayAudio: (message: ChatMessage) => void;
  onStopAudio: () => void;
  onOpenFeatureModal: (featureId: string) => void;
}

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({
  message,
  isSpeakingThis,
  onPlayAudio,
  onStopAudio,
  onOpenFeatureModal,
}) => {
  const [copied, setCopied] = useState(false);
  const isAssistant = message.sender === 'assistant';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedTime = new Intl.DateTimeFormat(message.language === 'en' ? 'en-US' : 'fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(message.timestamp));

  // Matched feature if any
  const matchedFeature = message.relatedFeatureId
    ? WAYORBI_FEATURES.find((f) => f.id === message.relatedFeatureId)
    : undefined;

  const getFeatureIcon = (featureId?: string) => {
    switch (featureId) {
      case 'travel-dna':
        return <Dna className="w-3.5 h-3.5 text-purple-400" />;
      case 'carnets':
        return <BookOpen className="w-3.5 h-3.5 text-blue-400" />;
      case 'explorer':
        return <Search className="w-3.5 h-3.5 text-sky-400" />;
      case 'messagerie':
        return <MessageCircle className="w-3.5 h-3.5 text-indigo-400" />;
      case 'profils':
        return <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />;
      default:
        return <Compass className="w-3.5 h-3.5 text-blue-400" />;
    }
  };

  return (
    <div
      className={`flex w-full gap-3 ${
        isAssistant ? 'justify-start' : 'justify-end'
      } my-2 animate-fade-in`}
    >
      {/* Official Wayorbi Logo Icon Avatar for Assistant */}
      {isAssistant && (
        <div className="flex-shrink-0 mt-1 shadow-md rounded-xl overflow-hidden ring-1 ring-white/10">
          <WayorbiLogoIcon size={34} />
        </div>
      )}

      {/* Bubble Container */}
      <div
        className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 shadow-lg transition-all ${
          isAssistant
            ? 'bg-[#111728]/90 border border-white/10 text-slate-100 rounded-tl-sm'
            : 'bg-gradient-to-tr from-[#1E293B] to-[#1E2235] border border-blue-500/20 text-white rounded-tr-sm ml-auto'
        }`}
      >
        {/* Header line for Assistant */}
        {isAssistant && (
          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-white/5 text-xs text-slate-400">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <span>Wayorbi Assistant</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            </span>
            <span>{formattedTime}</span>
          </div>
        )}

        {/* Message Body */}
        <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal text-slate-100">
          {message.text}
        </p>

        {/* Highlighted Feature Preview Card if referenced */}
        {isAssistant && matchedFeature && (
          <div className="mt-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => onOpenFeatureModal(matchedFeature.id)}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/40 transition-all text-left cursor-pointer group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-1.5 rounded-lg bg-black/40">
                  {getFeatureIcon(matchedFeature.id)}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-white group-hover:text-blue-300 transition-colors truncate">
                    {message.language === 'en' ? matchedFeature.nameEn : matchedFeature.nameFr}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {message.language === 'en' ? matchedFeature.taglineEn : matchedFeature.taglineFr}
                  </div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white flex-shrink-0 ml-2" />
            </button>
          </div>
        )}

        {/* Actions Bar (Assistant only) */}
        {isAssistant && (
          <div className="flex items-center justify-between mt-3 pt-2 text-xs text-slate-400 border-t border-white/5">
            <div className="flex items-center gap-2">
              {/* Play Audio Button */}
              <button
                type="button"
                onClick={() => (isSpeakingThis ? onStopAudio() : onPlayAudio(message))}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                  isSpeakingThis
                    ? 'bg-purple-500/20 border-purple-400 text-purple-300'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300 hover:text-white'
                }`}
                title={isSpeakingThis ? 'Arrêter la lecture' : 'Écouter la réponse'}
              >
                {isSpeakingThis ? (
                  <>
                    <Square className="w-3 h-3 fill-current animate-pulse text-purple-400" />
                    <span>Stop</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>Écouter</span>
                  </>
                )}
              </button>

              {/* Copy button */}
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Copier le texte"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <span className="text-[11px] text-slate-500 uppercase tracking-wider font-mono">
              {message.language === 'en' ? 'EN' : 'FR'}
            </span>
          </div>
        )}

        {/* User time footer */}
        {!isAssistant && (
          <div className="flex items-center justify-end gap-1.5 mt-1.5 text-[11px] text-slate-400">
            <span>{formattedTime}</span>
          </div>
        )}
      </div>

      {/* User Avatar */}
      {!isAssistant && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-slate-300 mt-1">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
};
