import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { TUTOR_SYSTEM_INSTRUCTION } from './src/prompts/tutorSystem.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CANDIDATE_MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-3.8-flash',
  'gemini-flash-latest',
];

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // API endpoint for Socratic Tutor
  app.post('/api/tutor', async (req, res) => {
    try {
      const { contextPrompt, history, playerMessage } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(503).json({
          error: 'GEMINI_API_KEY is not defined on the server.',
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      // Prepare contents from history + current message with context block
      const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history)) {
        for (const msg of history) {
          if (msg.text === 'Tutor\'a şu an ulaşılamıyor. Oyuna devam edebilirsin, birazdan tekrar dene.') continue;
          contents.push({
            role: msg.author === 'player' ? 'user' : 'model',
            parts: [{ text: msg.text }],
          });
        }
      }

      // Add the latest prompt with [BAĞLAM] context block
      contents.push({
        role: 'user',
        parts: [{ text: contextPrompt || playerMessage || 'Merhaba' }],
      });

      let lastError: unknown = null;

      for (const model of CANDIDATE_MODELS) {
        try {
          const response = await ai.models.generateContent({
            model,
            contents,
            config: {
              systemInstruction: TUTOR_SYSTEM_INSTRUCTION,
              temperature: 0.7,
            },
          });

          const reply = response.text?.trim();
          if (reply) {
            return res.json({ reply });
          }
        } catch (err: any) {
          lastError = err;
          console.warn(`Model ${model} failed, trying next candidate:`, err?.message || err);
          if (err?.status && err.status !== 503 && err.status !== 404 && err.status !== 429) {
            break;
          }
        }
      }

      throw lastError || new Error('Tutor could not generate a response.');
    } catch (error) {
      console.error('Error in /api/tutor:', error);
      return res.status(500).json({
        error: error instanceof Error ? error.message : 'Unknown tutor error',
      });
    }
  });

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
