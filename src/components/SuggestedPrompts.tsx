import React from 'react';
import { Sparkles, Compass, Dna, Search, BookOpen, ShieldCheck } from 'lucide-react';
import { SupportedLanguage } from '../types/assistant';

interface SuggestedPromptsProps {
  language: SupportedLanguage;
  onSelectPrompt: (promptText: string) => void;
  disabled: boolean;
}

interface Suggestion {
  id: string;
  textFr: string;
  textEn: string;
  categoryFr: string;
  categoryEn: string;
  icon: React.ReactNode;
}

const SUGGESTIONS: Suggestion[] = [
  {
    id: 'dna',
    textFr: 'Qu’est-ce que le Travel DNA et comment l’utiliser ?',
    textEn: 'What is Travel DNA and how does it work?',
    categoryFr: 'Recommandations',
    categoryEn: 'Smart Matching',
    icon: <Dna className="w-3.5 h-3.5 text-[#E07A5F]" />,
  },
  {
    id: 'carnet',
    textFr: 'Comment créer un carnet de voyage avec mon itinéraire ?',
    textEn: 'How do I create a travel journal with my route?',
    categoryFr: 'Carnets',
    categoryEn: 'Journals',
    icon: <BookOpen className="w-3.5 h-3.5 text-[#F4A261]" />,
  },
  {
    id: 'explorer',
    textFr: 'Comment fonctionne l’espace Explorer pour trouver des voyages ?',
    textEn: 'How does the Explorer hub help me find trips by budget?',
    categoryFr: 'Explorer',
    categoryEn: 'Discovery',
    icon: <Search className="w-3.5 h-3.5 text-[#2A9D8F]" />,
  },
  {
    id: 'intro',
    textFr: 'Présente-moi Wayorbi en 3 points essentiels.',
    textEn: 'Introduce Wayorbi in 3 essential points.',
    categoryFr: 'Découverte',
    categoryEn: 'Overview',
    icon: <Compass className="w-3.5 h-3.5 text-amber-400" />,
  },
  {
    id: 'privacy',
    textFr: 'Mon profil et mes voyages peuvent-ils être privés ?',
    textEn: 'Can my profile and journals be kept private?',
    categoryFr: 'Confidentialité',
    categoryEn: 'Privacy',
    icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />,
  },
];

export const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({
  language,
  onSelectPrompt,
  disabled,
}) => {
  return (
    <div className="w-full my-3">
      <div className="flex items-center gap-1.5 mb-2 px-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
        <Sparkles className="w-3 h-3 text-[#F4A261]" />
        <span>{language === 'en' ? 'Quick Questions' : 'Questions Fréquentes'}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {SUGGESTIONS.map((item) => {
          const text = language === 'en' ? item.textEn : item.textFr;
          const category = language === 'en' ? item.categoryEn : item.categoryFr;

          return (
            <button
              key={item.id}
              type="button"
              disabled={disabled}
              onClick={() => onSelectPrompt(text)}
              className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 hover:border-[#E07A5F]/40 text-left transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <div className="p-1 rounded-lg bg-black/30 group-hover:bg-[#E07A5F]/15 transition-colors">
                {item.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-medium leading-none mb-0.5">
                  {category}
                </span>
                <span className="text-xs text-slate-300 group-hover:text-white font-medium line-clamp-1">
                  {text}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
