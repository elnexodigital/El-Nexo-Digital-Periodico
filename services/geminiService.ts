import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getRecommendation(category: string, query: string): Promise<string> {
  try {
    const prompt = `
      Actúa como un curador de contenido cultural y crítico experto para una revista digital llamada "El Nexo Digital". Tu tono es apasionado, intelectual pero accesible, y siempre buscas la joya oculta o una perspectiva fresca sobre los clásicos. Un usuario está buscando una recomendación.

      Categoría de interés: ${category}
      Petición del usuario: "${query}"

      Tu tarea es generar una recomendación detallada y atractiva.
      Devuelve tu respuesta estructurada EXACTAMENTE de la siguiente manera, sin texto adicional antes o después:

      TITULO: [El título de la obra]
      AUTOR: [El autor, artista o director]
      RESEÑA: [Tu análisis de 2-3 párrafos. Explica por qué la recomiendas, qué la hace especial, y conecta con la posible intención del usuario. No te limites a una sinopsis; ofrece una perspectiva crítica y personal.]
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;

  } catch (error) {
    console.error("Error al contactar la API de Gemini:", error);
    if (error instanceof Error) {
        return `Error: No se pudo obtener la recomendación. ${error.message}`;
    }
    return "Error: No se pudo obtener la recomendación. Ocurrió un error desconocido.";
  }
}