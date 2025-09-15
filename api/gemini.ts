
import { GoogleGenAI } from "@google/genai";
import type { Article, NewsSection, GroundingSource } from '../types';

// This is a Vercel serverless function, which runs in a Node.js environment.
// It can safely access environment variables.

const cleanJsonString = (jsonText: string): string => {
  let cleaned = jsonText.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.substring(7);
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.substring(0, cleaned.length - 3);
  }
  return cleaned.trim();
};

const generateErrorResponse = (message: string, status: number): Response => {
  return new Response(JSON.stringify({ error: message }), {
    status: status,
    headers: { 'Content-Type': 'application/json' },
  });
};

const fetchNewsFromGemini = async (ai: GoogleGenAI, topics: string[]) => {
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
    const jsonText = cleanJsonString(response.text);
    const sections: NewsSection[] = JSON.parse(jsonText);
    
    return { sections, sources: sources as GroundingSource[] };
};

const searchNewsFromGemini = async (ai: GoogleGenAI, query: string) => {
    const prompt = `
      Actúa como un periodista y editor jefe del periódico uruguayo 'El Nexo Digital'.
      
      **Tarea:**
      Busca noticias extremadamente recientes (últimas 24-48 horas) sobre el siguiente tema: "${query}".
      
      **REGLAS ESTRICTAS DE FORMATO DE RESPUESTA:**
      1.  Tu respuesta DEBE ser **únicamente un array JSON válido** de objetos de artículo. La respuesta debe empezar con \`[\` y terminar con \`]\`.
      2.  NO incluyas texto introductorio, explicaciones, ni formato markdown como \`\`\`json.
      3.  Genera un máximo de 6 artículos.
      4.  Cada objeto de artículo en el array debe tener EXACTAMENTE las siguientes claves: "headline", "summary", "category", "publishedDate".
      5.  El campo "publishedDate" es OBLIGATORIO y debe tener el formato 'DD de Mes de AAAA'.
      6.  **CRÍTICO:** Asegúrate de que todas las comillas dobles (") dentro de los valores de texto (como en "summary" o "headline") estén correctamente escapadas con una barra invertida (\\").

      Ejemplo de la estructura de la respuesta completa:
      [
        {
          "headline": "Titular sobre ${query}",
          "summary": "Resumen de la noticia sobre ${query}. Contiene \\"comillas escapadas\\" si es necesario.",
          "category": "Categoría Relevante",
          "publishedDate": "23 de Septiembre de 2024"
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
    const jsonText = cleanJsonString(response.text);
    const articles: Article[] = JSON.parse(jsonText);
    
    return { articles, sources: sources as GroundingSource[] };
};


export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return generateErrorResponse('Method Not Allowed', 405);
  }

  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY environment variable not set on server");
    return generateErrorResponse("API key not configured on the server.", 500);
  }

  try {
    const body = await req.json();
    const { topics, query } = body;
    
    const ai = new GoogleGenAI({ apiKey });
    let data;

    if (topics && Array.isArray(topics)) {
        data = await fetchNewsFromGemini(ai, topics);
    } else if (query && typeof query === 'string') {
        data = await searchNewsFromGemini(ai, query);
    } else {
        return generateErrorResponse('Invalid request body. Provide either "topics" or "query".', 400);
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error in serverless function:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return generateErrorResponse(`Server-side error: ${errorMessage}`, 500);
  }
}
