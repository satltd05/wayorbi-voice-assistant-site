import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { VoiceOrb } from './components/VoiceOrb';
import { AudioWaveform } from './components/AudioWaveform';
import { SuggestedPrompts } from './components/SuggestedPrompts';
import { ChatContainer } from './components/ChatContainer';
import { ChatInput } from './components/ChatInput';
import { WayorbiFeatureModal } from './components/WayorbiFeatureModal';
import { useVoiceRecognition } from './hooks/useVoiceRecognition';
import { useVoiceSynthesis } from './hooks/useVoiceSynthesis';
import {
  ChatMessage,
  SupportedLanguage,
  AssistantVoiceState,
  AssistantResponsePayload,
} from './types/assistant';

const INITIAL_MESSAGES_FR: ChatMessage[] = [
  {
    id: 'welcome-fr',
    sender: 'assistant',
    text: "Bonjour ! Je suis l'assistant vocal officiel de Wayorbi. Je suis là pour vous aider à découvrir l'application, comprendre comment créer vos carnets de voyage, explorer le monde selon votre budget ou configurer votre Travel DNA. Comment puis-je vous guider aujourd'hui ?",
    timestamp: Date.now() - 1000,
    language: 'fr',
    relatedFeatureId: 'carnets',
  },
];

const INITIAL_MESSAGES_EN: ChatMessage[] = [
  {
    id: 'welcome-en',
    sender: 'assistant',
    text: "Hello! I am Wayorbi's official voice assistant. I am here to help you explore the app, learn how to build rich travel journals, filter adventures by budget in the Explorer hub, and setup your unique Travel DNA. What would you like to discover?",
    timestamp: Date.now() - 1000,
    language: 'en',
    relatedFeatureId: 'carnets',
  },
];

export default function App() {
  const [language, setLanguage] = useState<SupportedLanguage>('fr');
  const [autoSpeak, setAutoSpeak] = useState<boolean>(true);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES_FR);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [activeFeatureModalId, setActiveFeatureModalId] = useState<string | undefined>();
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState<boolean>(false);

  // Voice synthesis hook
  const {
    isSpeaking,
    currentlySpeakingId,
    speak,
    stopSpeaking,
  } = useVoiceSynthesis({
    autoSpeak,
    language,
  });

  // Handle send message to server
  const handleSendMessage = useCallback(
    async (text: string) => {
      const cleanText = text.trim();
      if (!cleanText || isProcessing) return;

      stopSpeaking();

      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: cleanText,
        timestamp: Date.now(),
        language: language === 'en' ? 'en' : 'fr',
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsProcessing(true);

      try {
        // Map messages for Gemini history
        const conversationHistory = messages.map((m) => ({
          role: m.sender === 'user' ? ('user' as const) : ('model' as const),
          text: m.text,
        }));

        const response = await fetch('/api/assistant', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: cleanText,
            conversationHistory,
            targetLanguage: language,
          }),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || 'Erreur lors de la réponse de l’assistant');
        }

        const data: AssistantResponsePayload = await response.json();

        const assistantMsg: ChatMessage = {
          id: `assistant-${Date.now()}`,
          sender: 'assistant',
          text: data.reply,
          timestamp: Date.now(),
          language: data.detectedLanguage || (language === 'en' ? 'en' : 'fr'),
          relatedFeatureId: data.relatedFeatureId,
        };

        setMessages((prev) => [...prev, assistantMsg]);

        // Auto-speak if enabled
        if (autoSpeak) {
          speak(data.reply, assistantMsg.id, assistantMsg.language, data.audioBase64);
        }
      } catch (err: any) {
        console.error('Failed to get assistant response:', err);
        const errorMsg: ChatMessage = {
          id: `error-${Date.now()}`,
          sender: 'assistant',
          text:
            language === 'en'
              ? 'I encountered a temporary connection issue. Please verify your connection or try asking again in a moment.'
              : 'J’ai rencontré une difficulté momentanée de connexion. Veuillez vérifier votre réseau ou réessayer dans un instant.',
          timestamp: Date.now(),
          language: language === 'en' ? 'en' : 'fr',
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setIsProcessing(false);
      }
    },
    [autoSpeak, isProcessing, language, messages, speak, stopSpeaking]
  );

  // Voice recognition hook
  const {
    isListening,
    interimTranscript,
    micError,
    volumeLevel,
    startListening,
    stopListening,
  } = useVoiceRecognition({
    language,
    onTranscriptComplete: (transcript) => {
      handleSendMessage(transcript);
    },
  });

  // Calculate high-level voice state
  let voiceState: AssistantVoiceState = 'idle';
  if (micError) {
    voiceState = 'error';
  } else if (isProcessing) {
    voiceState = 'processing';
  } else if (isSpeaking) {
    voiceState = 'speaking';
  } else if (isListening) {
    voiceState = 'listening';
  }

  // Handle language switch
  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setLanguage(newLang);
    stopSpeaking();
    stopListening();

    // If chat has only initial message, swap it cleanly
    if (messages.length <= 1) {
      setMessages(newLang === 'en' ? INITIAL_MESSAGES_EN : INITIAL_MESSAGES_FR);
    }
  };

  // Reset conversation
  const handleResetConversation = () => {
    stopSpeaking();
    stopListening();
    setMessages(language === 'en' ? INITIAL_MESSAGES_EN : INITIAL_MESSAGES_FR);
  };

  // Toggle listening button
  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      stopSpeaking();
      startListening();
    }
  };

  // Open feature modal
  const handleOpenFeatureModal = (featureId?: string) => {
    setActiveFeatureModalId(featureId);
    setIsFeatureModalOpen(true);
  };

  return (
    <div className="relative flex flex-col h-screen max-h-screen bg-[#080B14] text-slate-100 overflow-hidden select-none font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Background ambient decorative glow matching Wayorbi logo colors */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* App Header */}
      <Header
        language={language}
        onLanguageChange={handleLanguageChange}
        autoSpeak={autoSpeak}
        onToggleAutoSpeak={() => {
          if (isSpeaking) stopSpeaking();
          setAutoSpeak((prev) => !prev);
        }}
        onResetConversation={handleResetConversation}
        onOpenFeatures={() => handleOpenFeatureModal()}
      />

      {/* Main Responsive Grid Layout */}
      <main className="flex-1 flex flex-col min-h-0 max-w-5xl w-full mx-auto px-3 sm:px-6">
        {/* Voice Visualizer Hero Section */}
        <section className="flex-shrink-0 pt-2 pb-1 border-b border-white/5 flex flex-col items-center">
          <VoiceOrb
            state={voiceState}
            volumeLevel={volumeLevel}
            interimTranscript={interimTranscript}
            language={language}
            onToggleListening={handleToggleListening}
            onStopSpeaking={stopSpeaking}
            micError={micError}
          />

          {/* Dynamic Audio Waveform Indicator */}
          <div className="w-full max-w-xs -mt-1 mb-1">
            <AudioWaveform
              isActive={isListening}
              isSpeaking={isSpeaking}
              volumeLevel={volumeLevel}
              barsCount={24}
            />
          </div>
        </section>

        {/* Suggested Quick Questions */}
        <section className="flex-shrink-0">
          <SuggestedPrompts
            language={language}
            onSelectPrompt={(text) => handleSendMessage(text)}
            disabled={isProcessing || isListening}
          />
        </section>

        {/* Conversation Stream */}
        <section className="flex-1 min-h-0 flex flex-col overflow-hidden relative">
          <ChatContainer
            messages={messages}
            isProcessing={isProcessing}
            currentlySpeakingId={currentlySpeakingId}
            language={language}
            onPlayAudio={(msg) => speak(msg.text, msg.id, msg.language)}
            onStopAudio={stopSpeaking}
            onOpenFeatureModal={(id) => handleOpenFeatureModal(id)}
          />
        </section>

        {/* Written & Mic Input Bar */}
        <footer className="flex-shrink-0 py-3">
          <ChatInput
            onSendMessage={handleSendMessage}
            onStartListening={handleToggleListening}
            isListening={isListening}
            isProcessing={isProcessing}
            language={language}
          />
        </footer>
      </main>

      {/* Interactive Wayorbi Ecosystem Feature Modal */}
      <WayorbiFeatureModal
        isOpen={isFeatureModalOpen}
        initialFeatureId={activeFeatureModalId}
        onClose={() => setIsFeatureModalOpen(false)}
        language={language}
        onAskAboutFeature={(prompt) => handleSendMessage(prompt)}
      />
    </div>
  );
}
