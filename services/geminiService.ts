import { GoogleGenAI, Type } from "@google/genai";
import type { WeeklyContent, Article, CoverStory } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    cover: {
      type: Type.OBJECT,
      properties: {
        headline: { type: Type.STRING, description: 'Titular de portada principal, corto y muy llamativo (máx 10 palabras).' },
        subtitle: { type: Type.STRING, description: 'Subtítulo que complemente el titular y genere intriga (máx 20 palabras).' },
        imageKeywords: { type: Type.STRING, description: '3-5 palabras clave en inglés para una foto de portada artística con composición asimétrica y espacio negativo, ideal para superponer texto.' },
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
          imageKeywords: { type: Type.STRING, description: '3-5 palabras clave en inglés, separadas por comas, para una foto que ilustre el artículo.' },
        },
        required: ['id', 'headline', 'category', 'content', 'imageKeywords'],
      },
    },
  },
  required: ['cover', 'articles'],
};


export async function generateWeeklyArticles(topic: string): Promise<WeeklyContent> {
  const prompt = `
    Actúa como un equipo de periodistas y directores de arte para la revista de vanguardia "El Nexo Digital".
    El tema editorial de esta semana es: "${topic}".
    Necesito que generes un paquete de contenido completo.

    Para la PORTADA:
    - Genera un titular corto y llamativo.
    - Un subtítulo intrigante.
    - Palabras clave en inglés para una imagen de portada. IMPORTANTE: Las palabras clave deben describir una imagen con una composición artística y asimétrica, con un fuerte espacio negativo a la izquierda o en la parte superior, ideal para superponer texto. El sujeto principal debería estar idealmente en el tercio derecho. Piensa como un director de arte de Vogue. Ejemplo: "woman looking away, minimalist background, side profile".

    Para los ARTÍCULOS:
    - Genera exactamente 6 artículos relacionados con el tema.
    - Cada artículo necesita un titular, categoría, contenido de 150-200 palabras y palabras clave de imagen en inglés.

    La respuesta DEBE estar en formato JSON y adherirse estrictamente al esquema. Todo el texto debe estar en español.
  `;

  try {
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

    // Transform keywords into smart Cloudinary URLs fetching from Unsplash
    const unsplashBaseUrl = 'https://source.unsplash.com';
    const cloudinaryFetchBase = 'https://res.cloudinary.com/ddmj6zevz/image/fetch';

    const coverImageUrl = `${cloudinaryFetchBase}/w_800,h_1200,c_fill,g_auto,f_auto,q_auto/${unsplashBaseUrl}/800x1200/?${encodeURIComponent(parsedData.cover.imageKeywords)}`;
    
    const articlesWithUrls: Article[] = parsedData.articles.map((article: any) => ({
      ...article,
      imageUrl: `${cloudinaryFetchBase}/w_800,h_600,c_fill,g_auto,f_auto,q_auto/${unsplashBaseUrl}/800x600/?${encodeURIComponent(article.imageKeywords)}`,
    }));


    return {
      cover: { ...parsedData.cover, imageUrl: coverImageUrl },
      articles: articlesWithUrls,
    };

  } catch (error) {
    console.error("Error generating content from Gemini:", error);
    throw new Error("Failed to generate weekly articles.");
  }
}