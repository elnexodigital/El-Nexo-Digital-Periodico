
import type { WeeklyContent } from '../types';

export async function generateWeeklyArticles(topic: string): Promise<WeeklyContent> {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Error del servidor: ${response.statusText}`);
    }

    const content: WeeklyContent = await response.json();
    return content;

  } catch (error) {
    console.error("Error fetching articles from serverless function:", error);
    throw new Error("No se pudieron obtener los artículos desde el servidor.");
  }
}
