
import type { NewsBroadcast } from '../types.ts';
import { getCloudinaryUrl, CLOUDINARY_CLOUD_NAMES } from '../utils/mediaUtils.ts';

export const NEWS_BROADCASTS: Record<number, NewsBroadcast> = {
  10: {
    id: 'news10',
    url: getCloudinaryUrl('v1764090883/Bataille_Gasto_El_Sol_Erotismo_Fascismo_bxzuy6.mp3', CLOUDINARY_CLOUD_NAMES.GENERAL),
    description: 'AGENDA CULTURAL CON GABRIEL CALLUM.',
  },
  12: {
    id: 'news12',
    url: getCloudinaryUrl('v1764090883/Bataille_Gasto_El_Sol_Erotismo_Fascismo_bxzuy6.mp3', CLOUDINARY_CLOUD_NAMES.GENERAL),
    description: 'MICRO TEMÁTICO CON GRACIELA AQUELARRE.',
  },
};
