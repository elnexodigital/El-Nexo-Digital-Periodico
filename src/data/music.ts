import type { MusicTrack } from '../types.ts';
import { MUSIC_LIST_1 } from './musicList1.ts';
import { MUSIC_LIST_2 } from './musicList2.ts';
import { MUSIC_LIST_3 } from './musicList3.ts';
import { MUSIC_LIST_4 } from './musicList4.ts';
import { MUSIC_LIST_5 } from './musicList5.ts';
import { MUSIC_LIST_6 } from './musicList6.ts';
import { LEO_CASTRILLO_TRACKS, LEO_MUSIC_INTRO_URLS } from './leoCastrillo.ts';
import { PODCASTS_MP3 } from './podcastsMP3.ts';
import { COMMERCIAL_JINGLES } from './jingles.ts';
import { SEPARATOR_AUDIOS } from './separators.ts';
import { MICRO_PROGRAMS } from './microPrograms.ts';

export { LEO_MUSIC_INTRO_URLS };

export const ONLY_GENERAL = [
  ...MUSIC_LIST_1,
  ...MUSIC_LIST_2,
  ...MUSIC_LIST_3,
  ...MUSIC_LIST_4,
  ...MUSIC_LIST_5,
  ...MUSIC_LIST_6
];
export const ONLY_LEO = LEO_CASTRILLO_TRACKS;

// Podcasts puros (excluyendo microprogramas para evitar duplicaciones indeseadas en la rotación)
export const ONLY_PODCASTS: MusicTrack[] = PODCASTS_MP3
  .filter(p => !p.id.startsWith('micro_') && !p.title.startsWith('[Microprograma]'))
  .map(p => ({
    id: `podcast_mp3_${p.id}`,
    url: p.audioUrl,
    description: `PODCAST: ${p.title} (${p.artist})`
  }));

export const ONLY_MICROPROGRAMS: MusicTrack[] = MICRO_PROGRAMS.map(m => ({
  id: `micro_${m.id}`,
  url: m.audioUrl,
  description: `MICROPROGRAMA DE RADIO: ${m.title}`
}));

export const COLLECTIONS_PROMO_TRACK: MusicTrack = {
  id: 'promo_spot_colecciones',
  url: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1792341471/ElevenLabs_2026-10-18T16_02_34_Ash_-_Conversational_Kind_and_Bright_pvc_sp100_s48_sb75_v4_dfjn2e.mp3',
  description: 'SPOT PROMO: Nueva Sección Colecciones en El Nexo Digital'
};

export const ONLY_JINGLES: MusicTrack[] = COMMERCIAL_JINGLES.map((url, i) => ({
  id: `jingle_${i}`,
  url,
  description: url.includes('ElevenLabs')
    ? 'SPOT PROMO: Nueva Sección Colecciones en El Nexo Digital'
    : 'ESPACIO PUBLICITARIO - El Nexo Digital'
}));

export const ONLY_SEPARATORS: MusicTrack[] = SEPARATOR_AUDIOS.map((url, i) => ({
  id: `sep_${i}`,
  url,
  description: 'Sintonía El Nexo Digital'
}));

export const MUSIC_TRACKS: MusicTrack[] = [
  ...ONLY_LEO,
  ...ONLY_GENERAL,
  ...ONLY_PODCASTS,
  ...ONLY_MICROPROGRAMS,
  ...ONLY_JINGLES,
  ...ONLY_SEPARATORS,
];

export const ONLY_MUSIC = [...ONLY_GENERAL, ...ONLY_LEO];

