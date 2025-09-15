

import { GoogleGenAI } from "@google/genai";
import type { Article, NewsSection, GroundingSource } from '../types';

export const fetchNews = async (topics: string[]): Promise<{ sections: NewsSection[], sources: GroundingSource[] }> => {
  // Fix: Use process.env.API_KEY to access the API key as per the guidelines.
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable not set");
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `
      Actúa como un periodista y editor jefe del periódico uruguayo 'El Nexo Digital'. Tu especialidad es la cobertura de noticias locales y nacionales de Uruguay.
      
      **Norma de Seguridad Editorial (Parámetro Principal):**
      Es de VITAL importancia que TODAS las noticias que resumas sean extremadamente recientes, basadas en los resultados de búsqueda proporcionados. Tu parámetro debe ser estricto: **enfócate en eventos ocurridos en las últimas 24 a 48 horas MÁXIMO**. La actualidad es tu máxima prioridad.

      Basado en la siguiente lista de temas: "${topics.join(', ')}", genera una respuesta JSON que contenga una sección de noticias para cada tema. Para cada tema, genera 3 artículos.

      **REGLAS ESTRICTAS DE FORMATO DE RESPUESTA:**
      1.  Tu respuesta DEBE ser **únicamente un array JSON válido**. La respuesta debe empezar con \`[\` y terminar con \`]\`.
      2.  NO incluyas texto introductorio, explicaciones, ni formato markdown como \`\`\`json.
      3.  Cada objeto en el array principal debe representar una sección de noticias y tener EXACTAMENTE las siguientes claves: "topic" (el nombre COMPLETO del tema como se proporcionó) y "articles" (un array de objetos de artículo).
      4.  Cada objeto de artículo debe tener EXACTAMENTE las siguientes claves: "headline", "summary", "category", "publishedDate".
      5.  El campo "publishedDate" es OBLIGATORIO y debe tener el formato 'DD de Mes de AAAA'.
      6.  **CRÍTICO:** Asegúrate de que todas las comillas dobles (") dentro de los valores de texto (como en "summary" o "headline") estén correctamente escapadas con una barra invertida (\\"). Ejemplo: "El ministro dijo \\"es importante\\"". Si no escapas las comillas, el JSON será inválido.
      
      Prioridades de cobertura:
      - Juan Lacaze
      - Política Nacional
      - Departamento de Colonia

      Ejemplo de la estructura de la respuesta completa:
      [
        {
          "topic": "Noticias destacadas de Uruguay",
          "articles": [
            {
              "headline": "Ejemplo de titular",
              "summary": "Este es un resumen de ejemplo. Contiene \\"comillas escapadas\\" correctamente.",
              "category": "Política",
              "publishedDate": "23 de Septiembre de 2024"
            }
          ]
        },
        {
          "topic": "Deportes en Uruguay",
          "articles": [ /* ... más artículos ... */ ]
        }
      ]
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{googleSearch: {}}],
      },
    });

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    let jsonText = response.text.trim();
    
    // Clean potential markdown formatting
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.substring(7, jsonText.length - 3).trim();
    }
    
    const sections: NewsSection[] = JSON.parse(jsonText);
    
    return { sections, sources: sources as GroundingSource[] };

  } catch (error) {
    console.error("Error fetching news from Gemini API:", error);
    if (error instanceof Error && error.message.includes('JSON')) {
       throw new Error(`Error al procesar la respuesta del servidor: ${error.message}`);
    }
     if (error instanceof Error && (error.message.includes('429') || error.message.includes('RESOURCE_EXHAUSTED'))) {
       throw new Error('Se ha excedido la cuota de la API. Por favor, espere un momento antes de volver a intentarlo.');
    }
    throw new Error("No se pudo obtener la noticia desde la API.");
  }
};