import React, { useState } from 'react';
import { X, Dna, BookOpen, Search, MessageCircle, ShieldCheck, Compass, CheckCircle2, MessageSquarePlus } from 'lucide-react';
import { WAYORBI_FEATURES, WayorbiFeature } from '../data/wayorbiKnowledge';
import { SupportedLanguage } from '../types/assistant';

interface WayorbiFeatureModalProps {
  isOpen: boolean;
  initialFeatureId?: string;
  onClose: () => void;
  language: SupportedLanguage;
  onAskAboutFeature: (prompt: string) => void;
}

export const WayorbiFeatureModal: React.FC<WayorbiFeatureModalProps> = ({
  isOpen,
  initialFeatureId,
  onClose,
  language,
  onAskAboutFeature,
}) => {
  const [selectedFeatureId, setSelectedFeatureId] = useState<string>(
    initialFeatureId || WAYORBI_FEATURES[0].id
  );

  // Sync if initialFeatureId changes
  React.useEffect(() => {
    if (initialFeatureId) {
      setSelectedFeatureId(initialFeatureId);
    }
  }, [initialFeatureId]);

  if (!isOpen) return null;

  const currentFeature =
    WAYORBI_FEATURES.find((f) => f.id === selectedFeatureId) || WAYORBI_FEATURES[0];

  const getIcon = (id: string) => {
    switch (id) {
      case 'travel-dna':
        return <Dna className="w-4 h-4 text-[#E07A5F]" />;
      case 'carnets':
        return <BookOpen className="w-4 h-4 text-[#F4A261]" />;
      case 'explorer':
        return <Search className="w-4 h-4 text-[#2A9D8F]" />;
      case 'messagerie':
        return <MessageCircle className="w-4 h-4 text-sky-400" />;
      case 'profils':
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      default:
        return <Compass className="w-4 h-4 text-amber-400" />;
    }
  };

  const handleAskPrompt = (feature: WayorbiFeature) => {
    const prompt = language === 'en' ? feature.samplePromptEn : feature.samplePromptFr;
    onAskAboutFeature(prompt);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-[#0E121E] border border-white/10 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#141A28]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-[#E07A5F] to-[#F4A261] text-white">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-['Playfair_Display',serif]">
                {language === 'en' ? 'Wayorbi Ecosystem Guide' : 'Guide de l’application Wayorbi'}
              </h2>
              <p className="text-xs text-slate-400">
                {language === 'en'
                  ? 'Explore the core features of the travel social network'
                  : 'Explorez les piliers clés du réseau social de voyage'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto flex flex-col md:flex-row">
          {/* Sidebar Tabs */}
          <div className="w-full md:w-72 border-b md:border-b-0 md:border-r border-white/10 p-3 sm:p-4 bg-[#111624] space-y-1.5 flex-shrink-0">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
              {language === 'en' ? 'Core Features' : 'Fonctionnalités clés'}
            </div>

            {WAYORBI_FEATURES.map((feature) => {
              const isSelected = feature.id === currentFeature.id;
              const title = language === 'en' ? feature.nameEn : feature.nameFr;

              return (
                <button
                  key={feature.id}
                  onClick={() => setSelectedFeatureId(feature.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#E07A5F]/20 to-[#F4A261]/10 text-white border border-[#E07A5F]/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div
                    className={`p-1.5 rounded-lg ${
                      isSelected ? 'bg-[#E07A5F] text-white' : 'bg-black/40'
                    }`}
                  >
                    {getIcon(feature.id)}
                  </div>
                  <span className="text-xs sm:text-sm font-medium truncate">{title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Feature Detail View */}
          <div className="flex-1 p-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#E07A5F]/15 border border-[#E07A5F]/30 text-xs font-semibold text-[#F4A261] mb-2">
                {getIcon(currentFeature.id)}
                <span>
                  {language === 'en' ? currentFeature.nameEn : currentFeature.nameFr}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-['Playfair_Display',serif]">
                {language === 'en' ? currentFeature.taglineEn : currentFeature.taglineFr}
              </h3>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {language === 'en' ? currentFeature.descriptionEn : currentFeature.descriptionFr}
            </p>

            {/* Bullets */}
            <div className="space-y-2.5 pt-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {language === 'en' ? 'Key Capabilities:' : 'Ce que vous pouvez faire :'}
              </h4>
              <ul className="space-y-2">
                {(language === 'en' ? currentFeature.bulletsEn : currentFeature.bulletsFr).map(
                  (bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-[#F4A261] flex-shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Action Card: Ask the assistant */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#172033] to-[#1F273D] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
              <div>
                <div className="text-xs font-semibold text-slate-300">
                  {language === 'en'
                    ? 'Curious to explore this with the voice assistant?'
                    : 'Envie d’approfondir avec l’assistant vocal ?'}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  « {language === 'en' ? currentFeature.samplePromptEn : currentFeature.samplePromptFr} »
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleAskPrompt(currentFeature)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#E07A5F] to-[#F4A261] text-white text-xs font-semibold shadow-md shadow-[#E07A5F]/20 hover:opacity-95 transition-all cursor-pointer whitespace-nowrap"
              >
                <MessageSquarePlus className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Ask Assistant' : 'Poser la question'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
