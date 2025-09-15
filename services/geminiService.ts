

import type { Article, NewsSection, GroundingSource } from '../types';

const handleError = async (response: Response): Promise<never> => {
  const errorBody = await response.json();
  const errorMessage = errorBody.error || `Error ${response.status}: ${response.statusText}`;
  console.error("Error fetching news from API route:", errorMessage);
  throw new Error(errorMessage);
};

const callApi = async <T>(body: Record<string, unknown>): Promise<T> => {
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    await handleError(response);
  }

  return response.json() as Promise<T>;
};

export const fetchNews = async (topics: string[]): Promise<{ sections: NewsSection[], sources: GroundingSource[] }> => {
  return callApi<{ sections: NewsSection[], sources: GroundingSource[] }>({ topics });
};

export const searchNews = async (query: string): Promise<{ articles: Article[], sources: GroundingSource[] }> => {
  return callApi<{ articles: Article[], sources: GroundingSource[] }>({ query });
};
