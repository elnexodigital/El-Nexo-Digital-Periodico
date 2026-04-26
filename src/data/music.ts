import type { MusicTrack } from '../types.ts';
import { MUSIC_LIST_1 } from './musicList1.ts';
import { MUSIC_LIST_2 } from './musicList2.ts';
import { MUSIC_LIST_3 } from './musicList3.ts';
import { MUSIC_LIST_4 } from './musicList4.ts';
import { MUSIC_LIST_5 } from './musicList5.ts';
import { MUSIC_LIST_6 } from './musicList6.ts';
import { MUSIC_LIST_3 } from './musicList3.ts';
import { MUSIC_LIST_4 } from './musicList4.ts';
import { MUSIC_LIST_5 } from './musicList5.ts';
import { MUSIC_LIST_6 } from './musicList6.ts';
import { LEO_CASTRILLO_TRACKS, LEO_MUSIC_INTRO_URLS } from './leoCastrillo.ts';
import { PODCASTS_MP3 } from './podcastsMP3.ts';
import { COMMERCIAL_JINGLES } from './jingles.ts';
import { SEPARATOR_AUDIOS } from './separators.ts';

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

export const MUSIC_TRACKS: MusicTrack[] = [
  ...ONLY_LEO,
  ...ONLY_GENERAL,
  ...ONLY_PODCASTS,
  ...ONLY_JINGLES,
  ...ONLY_SEPARATORS,
];

export const ONLY_MUSIC = [...ONLY_GENERAL, ...ONLY_LEO];
