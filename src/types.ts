
export interface MusicTrack {
  id: string;
  url: string;
  description: string;
}

export interface VideoPodcast {
  id: string;
  title: string;
  videoUrl: string;
  transcript: string;
}

export interface HeaderControls {
  playRadio: () => void;
  pauseRadio: () => void;
  getIsPlayingState: () => boolean;
}

export interface NewsBroadcast {
  id: string;
  url: string;
  description: string;
}

export interface PodcastMP3 {
  id:string;
  title: string;
  artist: string;
  audioUrl: string; 
  coverUrl: string;
  description: string;
}

export interface LibraryItem {
  id: string;
  category: 'Libros' | 'Discos' | 'Películas' | 'Revistas' | 'Podcasts' | 'Postales';
  title: string;
  author: string;
  imageUrl: string;
  review: string;
  audioUrl?: string;
  videoUrl?: string;
  pdfUrl?: string;
  publicationDate: string;
  sources?: string;
}

// Interfaces para la edición semanal
export interface OddPage {
  type: 'odd';
  id: string;
  headline: string;
  subtitle: string;
  category: string;
  backgroundUrl: string;
  layout: string;
  content: string;
  sources: string[];
  bannerUrl: string;
}

export interface EvenPage {
  type: 'even';
  imageUrl: string;
  bannerUrl: string;
  headline: string;
  objectPosition: string;
}

export type Page = OddPage | EvenPage;

export interface WeeklyContent {
  cover: {
    headline: string;
    subtitle: string;
    imageUrl: string;
  };
  pages: Page[];
}

// --- Added StickyNote and Patron interfaces to fix compilation errors ---

export interface StickyNote {
  id: string;
  text: string;
  name: string;
  color: string;
  position: { x: number; y: number };
  rotation: number;
}

export interface PatronContentItem {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'audio' | 'video' | 'image';
}

export interface Patron {
  id: string;
  name: string;
  content: PatronContentItem[];
}
