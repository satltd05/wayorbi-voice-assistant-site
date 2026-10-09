export type SupportedLanguage = 'fr' | 'en' | 'auto';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: number;
  language?: 'fr' | 'en';
  relatedFeatureId?: string;
  audioGenerated?: boolean;
}

export type AssistantVoiceState =
  | 'idle'
  | 'listening'
  | 'processing'
  | 'speaking'
  | 'error';

export interface AssistantRequestPayload {
  message: string;
  conversationHistory: Array<{
    role: 'user' | 'model';
    text: string;
  }>;
  targetLanguage?: SupportedLanguage;
}

export interface AssistantResponsePayload {
  reply: string;
  detectedLanguage: 'fr' | 'en';
  relatedFeatureId?: string;
  audioBase64?: string;
}
