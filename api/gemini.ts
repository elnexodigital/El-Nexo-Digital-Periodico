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

// Function to generate a single image using Imagen
async function generateImage(prompt: string, aspectRatio: '3:4' | '4:3'): Promise<string> {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: aspectRatio,
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
            return `data:image/jpeg;base64,${base64ImageBytes}`;
        }
        throw new Error("No image was generated.");
    } catch (error) {
        console.error(`Error generating image for prompt "${prompt}":`, error);
        // Return a placeholder or re-throw to be handled by the caller
        return ''; // Return empty string on failure
    }
}


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

  // --- Generate Images using Gemini Imagen with improved prompts ---

  const coverImagePrompt = `Fine art magazine cover photograph. Subject: "${parsedData.cover.headline}". Style: Utilize the keywords "${parsedData.cover.imageKeywords}" to create a visually striking, artistic image with a strong sense of asymmetrical composition and negative space. The mood should be cinematic and evocative.`;
  
  const articleImagePrompts = parsedData.articles.map((article: any) => 
    `Photojournalism style image for a magazine article titled "${article.headline}". The image should visually represent the core theme of the article, using these keywords for guidance: "${article.imageKeywords}". The photo must be professional, high-quality, and compelling.`
  );

  // Generate all images concurrently
  const [coverImageUrl, ...articleImageUrls] = await Promise.all([
      generateImage(coverImagePrompt, '3:4'),
      ...articleImagePrompts.map(prompt => generateImage(prompt, '4:3'))
  ]);
  
  const articlesWithUrls: Article[] = parsedData.articles.map((article: any, index: number) => ({
    ...article,
    imageUrl: articleImageUrls[index] || undefined, // Use generated URL or undefined if failed
  }));

  return {
    cover: { ...parsedData.cover, imageUrl: coverImageUrl || undefined },
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