import React from 'react';
import { Volume2, VolumeX, RotateCcw, BookOpen, Compass } from 'lucide-react';
import { SupportedLanguage } from '../types/assistant';

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
    <header className="relative z-30 w-full border-b border-white/5 bg-[#0C0F17]/80 backdrop-blur-xl px-4 py-3 sm:px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-[#E07A5F] via-[#F4A261] to-[#E76F51] shadow-lg shadow-[#E07A5F]/20 text-white">
            <Compass className="w-5 h-5 stroke-[2.2] animate-[spin_24s_linear_infinite]" />
            <div className="absolute inset-0 rounded-xl ring-1 ring-white/30" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-['Playfair_Display',serif] text-xl font-bold tracking-wider text-white">
                WAYORBI
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide uppercase bg-[#E07A5F]/15 text-[#F4A261] border border-[#E07A5F]/30">
                Voice AI
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
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors cursor-pointer"
            title={language === 'en' ? 'Explore Wayorbi features' : 'Explorer les fonctionnalités Wayorbi'}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#F4A261]" />
            <span className="hidden sm:inline">
              {language === 'en' ? 'Wayorbi Guide' : 'Guide Wayorbi'}
            </span>
          </button>

          {/* Language Switcher Segmented Control */}
          <div className="flex items-center p-0.5 bg-white/5 rounded-lg border border-white/10 text-xs font-medium">
            <button
              onClick={() => onLanguageChange('fr')}
              className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
                language === 'fr'
                  ? 'bg-[#E07A5F] text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              FR
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
                language === 'en'
                  ? 'bg-[#E07A5F] text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          {/* Voice Auto-Speak Toggle */}
          <button
            onClick={onToggleAutoSpeak}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              autoSpeak
                ? 'bg-[#E07A5F]/15 border-[#E07A5F]/40 text-[#F4A261]'
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
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title={language === 'en' ? 'New conversation' : 'Nouvelle conversation'}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
