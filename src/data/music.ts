import type { MusicTrack } from '../types.ts';
import { MUSIC_LIST_1 } from './musicList1.ts';
import { MUSIC_LIST_2 } from './musicList2.ts';
import { LEO_CASTRILLO_TRACKS, LEO_MUSIC_INTRO_URL } from './leoCastrillo.ts';
import { PODCASTS_MP3 } from './podcastsMP3.ts';
import { COMMERCIAL_JINGLES } from './jingles.ts';
import { SEPARATOR_AUDIOS } from './separators.ts';

export { LEO_MUSIC_INTRO_URL };

// Listas puras para el Director de Radio
const ALL_LEO = LEO_CASTRILLO_TRACKS;
const ALL_GENERAL_MUSIC = [...MUSIC_LIST_1, ...MUSIC_LIST_2];
const ALL_PODCASTS = PODCASTS_MP3.map(p => ({
  id: `podcast_mp3_${p.id}`,
  url: p.audioUrl,
  description: `PODCAST: ${p.title} (${p.artist})`
}));
const ALL_JINGLES = COMMERCIAL_JINGLES.map((url, i) => ({
  id: `jingle_${i}`,
  url,
  description: 'ESPACIO PUBLICITARIO - El Nexo Digital'
}));
const ALL_SEPARATORS = SEPARATOR_AUDIOS.map((url, i) => ({
  id: `sep_${i}`,
  url,
  description: 'Sintonía El Nexo Digital'
}));

/**
 * DIRECTOR DE RADIO: Equilibrio de Programación
 * Definimos un "Ciclo de Programación" (Tanda) de aprox. 40 minutos:
 * - 2 temas de Leo Castrillo (Prioridad de autor)
 * - 4 temas de Música General (Variedad)
 * - 2 Podcasts (Contenido de valor)
 * - 1 Jingle (Publicidad)
 * - 1 Separador (Identidad)
 */

// Creamos un pool balanceado para que el shuffle respete estas proporciones
export const MUSIC_TRACKS: MusicTrack[] = [
  // Música de Leo (20% del aire)
  ...ALL_LEO,
  ...ALL_LEO,
  
  // Música General (40% del aire)
  ...ALL_GENERAL_MUSIC.slice(0, 120), // Tomamos una buena muestra
  
  // Podcasts (20% del aire)
  ...ALL_PODCASTS,
  
  // Identidad y Publicidad (20% del aire)
  ...ALL_JINGLES,
  ...ALL_JINGLES,
  ...ALL_JINGLES,
  ...ALL_SEPARATORS,
  ...ALL_SEPARATORS
];

// Exportaciones para compatibilidad
export const ONLY_MUSIC = [...ALL_GENERAL_MUSIC, ...ALL_LEO];
export const ONLY_PODCASTS = ALL_PODCASTS;
export const ONLY_JINGLES = ALL_JINGLES;
export const ONLY_SEPARATORS = ALL_SEPARATORS;
