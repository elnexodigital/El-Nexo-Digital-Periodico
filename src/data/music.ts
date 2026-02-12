import type { MusicTrack } from '../types.ts';
import { MUSIC_LIST_1 } from './musicList1.ts';
import { MUSIC_LIST_2 } from './musicList2.ts';
import { PODCASTS_MP3 } from './podcastsMP3.ts';
import { COMMERCIAL_JINGLES } from './jingles.ts';
import { SEPARATOR_AUDIOS } from './separators.ts';

// Mapeamos los Podcasts en MP3 como pistas de radio
const podcastsAsTracks: MusicTrack[] = PODCASTS_MP3.map(p => ({
  id: `podcast_mp3_${p.id}`,
  url: p.audioUrl,
  description: `PODCAST: ${p.title} (${p.artist})`
}));

// Mapeamos Jingles Comerciales
const jinglesAsTracks: MusicTrack[] = COMMERCIAL_JINGLES.map((url, i) => ({
  id: `jingle_${i}`,
  url,
  description: 'ESPACIO PUBLICITARIO - El Nexo Digital'
}));

// Mapeamos Separadores y Voces de relleno
const separatorsAsTracks: MusicTrack[] = SEPARATOR_AUDIOS.map((url, i) => ({
  id: `sep_${i}`,
  url,
  description: 'Sintonía El Nexo Digital'
}));

// Lista maestra aleatoria (Shuffle inicial en Header)
export const MUSIC_TRACKS: MusicTrack[] = [
  ...MUSIC_LIST_1,
  ...MUSIC_LIST_2,
  ...podcastsAsTracks,
  ...jinglesAsTracks,
  ...separatorsAsTracks
];