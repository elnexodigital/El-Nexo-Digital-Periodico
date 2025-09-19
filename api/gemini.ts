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

// A curated library of high-quality, artistic images to be used for articles.
// This provides a reliable and fast alternative to on-the-fly image generation.
const IMAGE_LIBRARY: { url: string; orientation: 'portrait' | 'landscape' }[] = [
  // Portraits & People (artistic)
  { url: 'https://res.cloudinary.com/ddmj6zevz/image/upload/f_auto,q_auto:good/v1719942434/stock/portrait_moody_1.jpg', orientation: 'portrait' },
  { url: 'https://res.cloudinary.com/ddmj6zevz/image/upload/f_auto,q_auto:good/v1719942435/stock/person_typing_desk.jpg', orientation: 'landscape' },
  { url: 'https://res.cloudinary.com/ddmj6zevz/image/upload/f_auto,q_auto:good/v1719942436/stock/shadow_profile.jpg', orientation: 'portrait' },
  { url: 'https://res.cloudinary.com/ddmj6zevz/image/upload/f_auto,q_auto:good/v1719942437/stock/man_looking_away.jpg', orientation: 'portrait' },
  // Abstract & Textures
  { url: 'https://res.cloudinary.com/ddmj6zevz/image/upload/f_auto,q_auto:good/v1719942438/stock/abstract_paint_splash.jpg', orientation: 'landscape' },
  { url: 'https://res.cloudinary.com/ddmj6zevz/image/upload/f_auto,q_auto:good/v1719942439/stock/forest_canopy_look_up.jpg', orientation: 'landscape' },
  { url: 'https://res.cloudinary.com/ddmj6zevz/image/upload/f_auto,q_auto:good/v1719942440/stock/fabric_texture_close_up.jpg', orientation: 'landscape' },
  { url: 'https://res.cloudinary.com/ddmj6zevz/image/upload/f_auto,q_auto:good/v1719942441/stock/architectural_lines.jpg', orientation: 'portrait' },
  // Nature & Landscapes
  { url: 'https://res.cloudinary.com/ddmj6zevz/image/upload/f_auto,q_auto:good/v1719942442/stock/misty_forest_road.jpg', orientation: 'landscape' },
  { url: 'https://res.cloudinary.com/ddmj6zevz/image/upload/f_auto,q_auto:good/v1719942443/stock/minimalist_desert.jpg', orientation: 'landscape' },
  { url: 'https://res.cloudinary.com/ddmj6zevz/image/upload/f_auto,q_auto:good/v1719942444/stock/mountain_reflection.jpg', orientation: 'landscape' },
  { url: 'https://res.cloudinary.com/ddmj6zevz/image/upload/f_auto,q_auto:good/v1719942445/stock/ocean_wave_close_up.jpg', orientation: 'landscape' },
  // Technology & Urban
  { url: 'https://res.cloudinary.com/ddmj6zevz/image/upload/f_auto,q_auto:good/v1719942446/stock/city_street_blur.jpg', orientation: 'landscape' },
  { url: 'https://res.cloudinary.com/ddmj6zevz/image/upload/f_auto,q_auto:good/v1719942447/stock/library_bookshelves.jpg', orientation: 'landscape' },
  { url: 'https://res.cloudinary.com/ddmj6zevz/image/upload/f_auto,q_auto:good/v1719942448/stock/subway_tunnel.jpg', orientation: 'portrait' },
  { url: 'https://res.cloudinary.com/ddmj6zevz/image/upload/f_auto,q_auto:good/v1719942449/stock/laptop_coffee_minimal.jpg', orientation: 'landscape' },
];


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


async function generateContentForTopic(topic: string): Promise<WeeklyContent> {
  const prompt = `
    Actúa como un equipo de periodistas para la revista de vanguardia "El Nexo Digital".
    El tema editorial de esta semana es: "${topic}".
    Necesito que generes un paquete de contenido completo.

    Para la PORTADA:
    - Genera un titular corto y llamativo.
    - Un subtítulo intrigante.

    Para los ARTÍculos:
    - Genera exactamente 3 artículos relacionados con el tema.
    - Cada artículo necesita un titular, categoría y contenido de 150-200 palabras.

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

  // --- Assign images ---
  // The cover image is provided by the user weekly for brand consistency.
  const COVER_IMAGE_URL = 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1758322558/portada_1_tp5imd.png';
  
  // Shuffle the library to get random images for the articles.
  const shuffledImages = [...IMAGE_LIBRARY].sort(() => 0.5 - Math.random());
  
  // Prioritize landscape images for articles, as they fit the layout better.
  const landscapeImages = shuffledImages.filter(img => img.orientation === 'landscape');
  const otherImages = shuffledImages.filter(img => img.orientation !== 'landscape');

  const articlesWithUrls: Article[] = parsedData.articles.map((article: any) => ({
    ...article,
    // Take a landscape image first, then fall back to any other available image.
    imageUrl: (landscapeImages.shift() || otherImages.shift())?.url,
  }));

  return {
    cover: { ...parsedData.cover, imageUrl: COVER_IMAGE_URL },
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