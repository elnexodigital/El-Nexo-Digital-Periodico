import type { NewsBroadcast } from '../types';

export const NEWS_BROADCASTS: Record<number, NewsBroadcast> = {
  10: {
    id: 'news10',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1758160215/flash_gabriel_hjfgze.mp3',
    description: 'FLASH DE NOTICIAS CON GABRIEL CALLUM.',
    bannerUrl: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1758162213/banner_gabriel_iez6jv.mp4',
  },
  12: {
    id: 'news12',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1758160066/noticiero_jueves_18_bjcofb.mp3',
    description: 'NOTICIAS AL ESTILO GRACIELA AQUELARRE.',
    bannerUrl: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1758162214/banner_grace_xapw68.mp4',
  },
};
