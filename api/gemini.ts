// Vercel Serverless Function
// This code runs on the server and is never exposed to the client.

import { GoogleGenAI, Type } from "@google/genai";
import type { WeeklyContent } from '../types';

// Define minimal types for Vercel's request and response objects
// to avoid needing to install '@vercel/node' types.
interface VercelRequest {
  method?: string;
  body: {
    topic?: string;
  };
}
interface VercelResponse {
  status: (statusCode: number) => VercelResponse;
  json: (body: any) => void;
  send: (body: string) => void;
}


// Ensure the API key is available in the server environment
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    coverHeadline: { type: Type.STRING, description: 'Titular de portada principal, corto y muy llamativo (máx 10 palabras).' },
    coverSubtitle: { type: Type.STRING, description: 'Subtítulo que complemente el titular y genere intriga (máx 20 palabras).' },
    articleHeadlines: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'Una lista de exactamente 3 titulares para los artículos (máx 15 palabras cada uno).'
    },
    articleCategories: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'Una lista de exactamente 3 categorías (ej: Ciencia, Salud, Cultura).'
    },
    articleContents: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'Una lista de exactamente 3 párrafos de contenido para los artículos (150-200 palabras cada uno).'
    }
  },
  required: ['coverHeadline', 'coverSubtitle', 'articleHeadlines', 'articleCategories', 'articleContents'],
};


async function generateTextContent(topic: string): Promise<WeeklyContent> {
  const prompt = `
    Actúa como un equipo de periodistas para la revista de vanguardia "El Nexo Digital".
    El tema editorial de esta semana es: "${topic}".
    Necesito que generes el texto para una portada y exactamente 3 artículos.

    Para la PORTADA, genera:
    - Un titular principal.
    - Un subtítulo.

    Para los 3 ARTÍCULOS, genera:
    - Una lista de 3 titulares.
    - Una lista de 3 categorías.
    - Una lista de 3 párrafos de contenido.

    Cada lista debe tener exactamente 3 elementos.
    La respuesta DEBE estar en formato JSON y adherirse estrictamente al esquema. Todo el texto debe estar en español.
    No incluyas NINGUNA URL de imagen en tu respuesta.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: responseSchema,
    },
  });

  const jsonString = response.text.trim();
  
  try {
    const parsedParts = JSON.parse(jsonString);
    
    // Robust validation: Ensure the AI provided exactly 3 of everything.
    if (
        !parsedParts.coverHeadline ||
        !parsedParts.coverSubtitle ||
        !Array.isArray(parsedParts.articleHeadlines) || parsedParts.articleHeadlines.length !== 3 ||
        !Array.isArray(parsedParts.articleCategories) || parsedParts.articleCategories.length !== 3 ||
        !Array.isArray(parsedParts.articleContents) || parsedParts.articleContents.length !== 3
    ) {
        throw new Error('La respuesta de la IA no generó los 3 artículos completos requeridos.');
    }

    // Reconstruct the final object with guaranteed structure in our code, not relying on the LLM.
    const finalContent: WeeklyContent = {
        cover: {
            headline: parsedParts.coverHeadline,
            subtitle: parsedParts.coverSubtitle,
        },
        articles: [
            {
                id: 'art1',
                headline: parsedParts.articleHeadlines[0],
                category: parsedParts.articleCategories[0],
                content: parsedParts.articleContents[0],
            },
            {
                id: 'art2',
                headline: parsedParts.articleHeadlines[1],
                category: parsedParts.articleCategories[1],
                content: parsedParts.articleContents[1],
            },
            {
                id: 'art3',
                headline: parsedParts.articleHeadlines[2],
                category: parsedParts.articleCategories[2],
                content: parsedParts.articleContents[2],
            },
        ],
    };

    return finalContent;
  } catch (e) {
    console.error("Failed to parse or validate Gemini response:", jsonString, e);
    const errorMessage = e instanceof Error ? e.message : "La respuesta de la IA no tenía el formato esperado.";
    throw new Error(errorMessage);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    const { topic } = req.body;
    if (!topic || typeof topic !== 'string') {
      return res.status(400).json({ error: 'El tema (topic) es requerido.' });
    }

    const content = await generateTextContent(topic);
    res.status(200).json(content);

  } catch (error) {
    console.error("Error in serverless Gemini function:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown server error occurred.';
    res.status(500).json({ error: "No se pudo generar el contenido desde el servidor.", details: errorMessage });
  }
}