import type { Article, NewsSection, GroundingSource } from '../types';

const callApi = async <T>(body: Record<string, unknown>): Promise<T> => {
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const responseText = await response.text();

  if (response.ok) {
    try {
      // If status is 2xx, we expect valid JSON.
      return JSON.parse(responseText) as T;
    } catch (e) {
      console.error("Error al procesar la respuesta del servidor (éxito inesperado):", responseText);
      // This is a server error: it sent a 200 OK status but the body was not valid JSON.
      throw new Error("El servidor devolvió una respuesta con formato incorrecto.");
    }
  } else {
    // If status is not 2xx, it's an error. We'll try to parse a JSON error message,
    // but fallback to using the raw text if that fails.
    try {
      const errorJson = JSON.parse(responseText);
      throw new Error(errorJson.error || "Ocurrió un error desconocido en el servidor.");
    } catch (e) {
      // The error response wasn't JSON (e.g., an HTML error page from the server).
      // The text itself is the most informative error we have.
      console.error("Respuesta de error no-JSON del servidor:", responseText);
      // Truncate long HTML error messages for better display.
      const displayError = responseText.length > 250 ? responseText.substring(0, 250) + '...' : responseText;
      throw new Error(displayError || `Error del servidor: ${response.status}`);
    }
  }
};

export const fetchNews = async (topics: string[]): Promise<{ sections: NewsSection[], sources: GroundingSource[] }> => {
  return callApi<{ sections: NewsSection[], sources: GroundingSource[] }>({ topics });
};

export const searchNews = async (query: string): Promise<{ articles: Article[], sources: GroundingSource[] }> => {
  return callApi<{ articles: Article[], sources: GroundingSource[] }>({ query });
};