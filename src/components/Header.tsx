import React from 'react';
import { Volume2, VolumeX, RotateCcw, BookOpen, Sparkles } from 'lucide-react';
import { SupportedLanguage } from '../types/assistant';
import { WayorbiLogoIcon, WayorbiWordmark } from './WayorbiLogo';

interface HeaderProps {
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  autoSpeak: boolean;
  onToggleAutoSpeak: () => void;
  onResetConversation: () => void;
  onOpenFeatures: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  autoSpeak,
  onToggleAutoSpeak,
  onResetConversation,
  onOpenFeatures,
}) => {
  return (
    <header className="relative z-30 w-full border-b border-white/10 bg-[#0B0F19]/85 backdrop-blur-xl px-4 py-3 sm:px-6 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Brand identity with uploaded logo icon and wordmark */}
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer transition-transform hover:scale-105">
            <WayorbiLogoIcon size={42} animated />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20 pointer-events-none" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <WayorbiWordmark size="sm" />
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-gradient-to-r from-blue-500/15 to-purple-500/15 text-blue-300 border border-blue-400/30">
                <Sparkles className="w-2.5 h-2.5 text-purple-400" />
                <span>Voice AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              {language === 'en' ? 'Your travel assistant' : 'Votre assistant de voyage'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Wayorbi features guide button */}
          <button
            onClick={onOpenFeatures}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-blue-500/40 transition-all cursor-pointer shadow-sm"
            title={language === 'en' ? 'Explore Wayorbi features' : 'Explorer les fonctionnalités Wayorbi'}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#60A5FA]" />
            <span className="hidden sm:inline">
              {language === 'en' ? 'Wayorbi Guide' : 'Guide Wayorbi'}
            </span>
          </button>

          {/* Language Switcher Segmented Control */}
          <div className="flex items-center p-0.5 bg-white/5 rounded-xl border border-white/10 text-xs font-medium">
            <button
              onClick={() => onLanguageChange('fr')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                language === 'fr'
                  ? 'bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              FR
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          {/* Voice Auto-Speak Toggle */}
          <button
            onClick={onToggleAutoSpeak}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              autoSpeak
                ? 'bg-blue-500/15 border-blue-400/40 text-blue-300'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
            title={
              autoSpeak
                ? language === 'en'
                  ? 'Voice response: Enabled'
                  : 'Réponse vocale : Activée'
                : language === 'en'
                ? 'Voice response: Muted'
                : 'Réponse vocale : Désactivée'
            }
          >
            {autoSpeak ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Reset Conversation */}
          <button
            onClick={onResetConversation}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title={language === 'en' ? 'New conversation' : 'Nouvelle conversation'}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
