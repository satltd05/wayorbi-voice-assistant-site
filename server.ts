import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { SYSTEM_PROMPT_KNOWLEDGE } from './src/data/wayorbiKnowledge.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Shared Gemini client with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper to determine feature reference from text
function detectFeatureId(text: string): string | undefined {
  const lower = text.toLowerCase();
  if (lower.includes('dna') || lower.includes('adn') || lower.includes('compatibilité') || lower.includes('profil voyageur')) {
    return 'travel-dna';
  }
  if (lower.includes('carnet') || lower.includes('journal') || lower.includes('itinéraire') || lower.includes('étape') || lower.includes('budget')) {
    return 'carnets';
  }
  if (lower.includes('explorer') || lower.includes('recherche') || lower.includes('continent') || lower.includes('filtre') || lower.includes('style de voyage')) {
    return 'explorer';
  }
  if (lower.includes('profil') || lower.includes('privé') || lower.includes('public') || lower.includes('abonné') || lower.includes('abonnements') || lower.includes('statut')) {
    return 'profils';
  }
  if (lower.includes('messagerie') || lower.includes('message') || lower.includes('groupe') || lower.includes('chat') || lower.includes('discuter')) {
    return 'messagerie';
  }
  if (lower.includes('accueil') || lower.includes('home') || lower.includes('feed') || lower.includes('storie') || lower.includes('flux')) {
    return 'accueil';
  }
  return undefined;
}

// Helper to detect language
function detectLanguage(text: string, userPreference?: string): 'fr' | 'en' {
  if (userPreference === 'fr') return 'fr';
  if (userPreference === 'en') return 'en';

  const frenchMarkers = [
    'bonjour', 'salut', 'comment', 'pourquoi', 'quoi', 'est-ce', 'carnet',
    'voyage', 'voyager', 'merci', 'avec', 'dans', 'pour', 'qui', 'faire',
    'application', 'fonctionne', 'trouver', 'partager', 'accueil', 'profil'
  ];
  const englishMarkers = [
    'hello', 'hi', 'how', 'what', 'where', 'why', 'travel', 'journal',
    'thanks', 'thank', 'with', 'about', 'work', 'feature', 'can i', 'how to',
    'find', 'profile', 'home', 'feed', 'create'
  ];

  const lower = text.toLowerCase();
  let frScore = frenchMarkers.reduce((count, word) => count + (lower.includes(word) ? 1 : 0), 0);
  let enScore = englishMarkers.reduce((count, word) => count + (lower.includes(word) ? 1 : 0), 0);

  if (/[éèêëàâôûîïç]/.test(lower)) {
    frScore += 3;
  }

  return frScore >= enScore ? 'fr' : 'en';
}

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    appName: 'Wayorbi Voice Assistant API',
    geminiKeyConfigured: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// Assistant conversation endpoint
app.post('/api/assistant', async (req: Request, res: Response) => {
  try {
    const { message, conversationHistory, targetLanguage } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message cannot be empty.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: 'Gemini API key is not configured on the server. Please add GEMINI_API_KEY in the environment secrets.',
      });
    }

    const detectedLang = detectLanguage(message, targetLanguage);

    const languageInstruction = detectedLang === 'en'
      ? 'The user is communicating in ENGLISH. You MUST answer exclusively in natural, warm, idiomatic English.'
      : 'L’utilisateur communique en FRANÇAIS. Tu DOIS répondre exclusivement en français naturel, chaleureux et fluide.';

    // Construct history for Gemini contents
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(conversationHistory)) {
      // Keep up to 8 recent exchanges to preserve context while keeping prompt agile
      const recent = conversationHistory.slice(-8);
      for (const item of recent) {
        if (item.text && (item.role === 'user' || item.role === 'model')) {
          contents.push({
            role: item.role,
            parts: [{ text: item.text }],
          });
        }
      }
    }

    // Append current user message
    contents.push({
      role: 'user',
      parts: [{ text: message.trim() }],
    });

    const fullSystemInstruction = `${SYSTEM_PROMPT_KNOWLEDGE}\n\nCURRENT LANGUAGE DIRECTIVE:\n${languageInstruction}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: fullSystemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || (
      detectedLang === 'en'
        ? "Wayorbi helps travelers document their adventures through detailed journals, connect with fellow explorers, and discover tailor-made trips."
        : "Wayorbi vous permet d'immortaliser vos périples sous forme de carnets vivants, d'explorer le monde selon votre style et d'échanger avec d'autres passionnés de voyage !"
    );

    const relatedFeatureId = detectFeatureId(message + ' ' + reply);

    return res.json({
      reply: reply.trim(),
      detectedLanguage: detectedLang,
      relatedFeatureId,
    });
  } catch (error: any) {
    console.error('Error generating assistant response:', error);
    const errorMessage = error?.message || 'Une erreur est survenue lors de la communication avec l’assistant.';
    return res.status(500).json({
      error: errorMessage,
    });
  }
});

// High quality neural TTS endpoint using gemini-3.8-flash-lite-tts
app.post('/api/tts', async (req: Request, res: Response) => {
  try {
    const { text, language } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required for TTS' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'Gemini API key missing' });
    }

    // Keep text under a reasonable spoken length if long
    const cleanText = text.replace(/[*_#`]/g, '').trim().slice(0, 500);
    const voiceName = language === 'en' ? 'Zephyr' : 'Kore';

    const ttsResponse = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: cleanText,
              speechMetadata: {
                style: language === 'en' ? 'Warm, welcoming travel guide' : 'Guide de voyage chaleureux et enthousiaste',
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName },
          },
        },
      },
    });

    const base64Audio = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      return res.json({
        audioBase64: base64Audio,
        mimeType: 'audio/wav',
      });
    }

    return res.status(204).send();
  } catch (error: any) {
    console.warn('Gemini TTS failed or unavailable, fallback to browser speech synthesis:', error?.message);
    return res.status(200).json({ fallbackToSpeechSynthesis: true });
  }
});

async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    // In dev mode, mount Vite middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static files
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Wayorbi Voice Assistant server running on http://0.0.0.0:${PORT} [${isDev ? 'development' : 'production'}]`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
