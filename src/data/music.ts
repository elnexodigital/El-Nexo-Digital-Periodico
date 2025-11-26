
import type { MusicTrack } from '../types.ts';
import { MUSIC_LIST_1 } from './musicList1.ts';
import { MUSIC_LIST_2 } from './musicList2.ts';

// Combinamos las listas para formar la colección completa
export const MUSIC_TRACKS: MusicTrack[] = [
  ...MUSIC_LIST_1,
  ...MUSIC_LIST_2
];
