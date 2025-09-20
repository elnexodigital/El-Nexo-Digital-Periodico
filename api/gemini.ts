
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
    cover: {
      type: Type.OBJECT,
      properties: {
        headline: { type: Type.STRING, description: 'Titular de portada principal, corto y muy llamativo (máx 10 palabras).' },
        subtitle: { type: Type.STRING, description: 'Subtítulo que complemente el titular y genere intriga (máx 20 palabras).' },
      },
      required: ['headline', 'subtitle'],
    },
    articles: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING, description: 'Un identificador único para el artículo, ej: "art1".' },
          headline: { type: Type.STRING, description: 'Titular del artículo (máx 15 palabras).' },
          category: { type: Type.STRING, description: 'Categoría del artículo (ej: Ciencia, Salud, Cultura).' },
          content: { type: Type.STRING, description: 'Contenido del artículo, alrededor de 150-200 palabras.' },
        },
        required: ['id', 'headline', 'category', 'content'],
      },
    },
  },
  required: ['cover', 'articles'],
};


async function generateTextContent(topic: string): Promise<Omit<WeeklyContent, 'cover.imageUrl' | 'articles.imageUrl'>> {
  const prompt = `
    Actúa como un equipo de periodistas para la revista de vanguardia "El Nexo Digital".
    El tema editorial de esta semana es: "${topic}".
    Necesito que generes un paquete de contenido de texto completo.

    Para la PORTADA:
    - Genera un titular corto y llamativo.
    - Un subtítulo intrigante.

    Para los ARTÍculos:
    - Genera exactamente 3 artículos relacionados con el tema.
    - Cada artículo necesita un titular, categoría y contenido de 150-200 palabras.

    La respuesta DEBE estar en formato JSON y adherirse estrictamente al esquema. Todo el texto debe estar en español.
    No incluyas NINGUNA URL de imagen en tu respuesta.
  `;

  // 1. Get text content from Gemini
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: responseSchema,
    },
  });

  const jsonString = response.text.trim();
  
  // 2. Parse and validate the core text data
  try {
    const parsedData = JSON.parse(jsonString);
    if (!parsedData.cover?.headline || !parsedData.cover?.subtitle || !Array.isArray(parsedData.articles) || parsedData.articles.length === 0) {
        throw new Error("Invalid or incomplete structure from Gemini response.");
    }
    return parsedData;
  } catch (e) {
    console.error("Failed to parse or validate Gemini response:", jsonString, e);
    throw new Error("La respuesta de la IA no tenía el formato esperado o estaba incompleta.");
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
