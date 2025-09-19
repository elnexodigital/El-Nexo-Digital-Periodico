// Vercel Serverless Function
// This code runs on the server and is never exposed to the client.

import { GoogleGenAI, Type } from "@google/genai";
import type { WeeklyContent, Article } from '../types';

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
        imageKeywords: { type: Type.STRING, description: '2-3 palabras clave MUY simples en inglés (ej: woman, profile, shadow), para una foto de portada artística con composición asimétrica y espacio negativo.' },
      },
      required: ['headline', 'subtitle', 'imageKeywords'],
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
          imageKeywords: { type: Type.STRING, description: '2-3 palabras clave simples y comunes en inglés (ej: science, lab), para una foto que ilustre el artículo.' },
        },
        required: ['id', 'headline', 'category', 'content', 'imageKeywords'],
      },
    },
  },
  required: ['cover', 'articles'],
};

async function generateContentForTopic(topic: string): Promise<WeeklyContent> {
  const prompt = `
    Actúa como un equipo de periodistas y directores de arte para la revista de vanguardia "El Nexo Digital".
    El tema editorial de esta semana es: "${topic}".
    Necesito que generes un paquete de contenido completo.

    Para la PORTADA:
    - Genera un titular corto y llamativo.
    - Un subtítulo intrigante.
    - Palabras clave en inglés para una imagen de portada. IMPORTANTE: Las palabras clave deben describir una imagen con una composición artística y asimétrica, con un fuerte espacio negativo a la izquierda o en la parte superior. Piensa como un director de arte. Ejemplo: "minimalist,woman,profile,shadow".

    Para los ARTÍculos:
    - Genera exactamente 3 artículos relacionados con el tema.
    - Cada artículo necesita un titular, categoría, contenido de 150-200 palabras y palabras clave de imagen en inglés (muy simples, idealmente una o dos palabras como "food, plate" o "technology, abstract").

    La respuesta DEBE estar en formato JSON y adherirse estrictamente al esquema. Todo el texto debe estar en español.
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
  const parsedData = JSON.parse(jsonString);

  // Use the 'featured' endpoint from Unsplash for more reliable, high-quality images.
  const unsplashBaseUrl = 'https://source.unsplash.com/featured';
  
  const cleanKeywords = (keywords: string): string => {
      if (!keywords) return '';
      // Cleans keywords: " word1, word2 " -> "word1,word2"
      return keywords.split(',').map(k => k.trim()).filter(Boolean).join(',');
  }

  const coverImageUrl = `${unsplashBaseUrl}/800x1200/?${encodeURIComponent(cleanKeywords(parsedData.cover.imageKeywords))}`;
  
  const articlesWithUrls: Article[] = parsedData.articles.map((article: any) => ({
    ...article,
    imageUrl: `${unsplashBaseUrl}/800x600/?${encodeURIComponent(cleanKeywords(article.imageKeywords))}`,
  }));

  return {
    cover: { ...parsedData.cover, imageUrl: coverImageUrl },
    articles: articlesWithUrls,
  };
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

    const content = await generateContentForTopic(topic);
    res.status(200).json(content);

  } catch (error) {
    console.error("Error in serverless Gemini function:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown server error occurred.';
    res.status(500).json({ error: "No se pudo generar el contenido desde el servidor.", details: errorMessage });
  }
}