import type { MusicTrack } from '../types.ts';
import { MUSIC_LIST_1 } from './musicList1.ts';
import { MUSIC_LIST_2 } from './musicList2.ts';
import { PODCASTS_MP3 } from './podcastsMP3.ts';
import { COMMERCIAL_JINGLES } from './jingles.ts';
import { SEPARATOR_AUDIOS } from './separators.ts';

// Listas puras para el Director de Radio
export const ONLY_MUSIC = [...MUSIC_LIST_1, ...MUSIC_LIST_2];
export const ONLY_PODCASTS = PODCASTS_MP3.map(p => ({
  id: `podcast_mp3_${p.id}`,
  url: p.audioUrl,
  description: `PODCAST: ${p.title} (${p.artist})`
}));
export const ONLY_JINGLES = COMMERCIAL_JINGLES.map((url, i) => ({
  id: `jingle_${i}`,
  url,
  description: 'ESPACIO PUBLICITARIO - El Nexo Digital'
}));
export const ONLY_SEPARATORS = SEPARATOR_AUDIOS.map((url, i) => ({
  id: `sep_${i}`,
  url,
  description: 'Sintonía El Nexo Digital'
}));

// Lista maestra (mantenida para compatibilidad inicial)
export const MUSIC_TRACKS: MusicTrack[] = [
  ...ONLY_MUSIC,
  ...ONLY_PODCASTS,
  ...ONLY_JINGLES,
  ...ONLY_SEPARATORS
];