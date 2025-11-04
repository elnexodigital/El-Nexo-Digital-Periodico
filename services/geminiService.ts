import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

// Inicializa el cliente de la API de forma diferida para evitar que la aplicación
// se bloquee al cargar si la clave de la API no está presente en el entorno.
function getAiClient(): GoogleGenAI | null {
  if (ai) {
    return ai;
  }
  
  // FIX: Per coding guidelines, API key must be obtained from process.env.API_KEY. This resolves the TypeScript error for 'import.meta.env'.
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    // Este error se mostrará en la consola del desarrollador.
    // El usuario verá un mensaje más amigable en la UI.
    console.error("API_KEY de Gemini no está configurada en las variables de entorno.");
    return null;
  }
  
  try {
    ai = new GoogleGenAI({ apiKey });
    return ai;
  } catch (error) {
    console.error("Error al inicializar el cliente de Gemini:", error);
    return null;
  }
}

export async function getRecommendation(category: string, query: string): Promise<string> {
  const aiClient = getAiClient();

  if (!aiClient) {
    return "Error: La clave API de Gemini no está configurada correctamente. Por favor, contacta al administrador del sitio.";
  }

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

    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;

  } catch (error) {
    console.error("Error al contactar la API de Gemini:", error);
    if (error instanceof Error) {
        if (error.message.includes('API key not valid')) {
             return "Error: La clave API de Gemini proporcionada no es válida. Por favor, verifica la configuración.";
        }
        return `Error: No se pudo obtener la recomendación. ${error.message}`;
    }
    return "Error: No se pudo obtener la recomendación. Ocurrió un error desconocido.";
  }
}
