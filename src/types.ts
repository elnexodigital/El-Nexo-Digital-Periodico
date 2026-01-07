
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
  // bannerUrl removed for Micro Temático conversion
}

export interface PodcastMP3 {
  id:string;
  title: string;
  artist: string;
  audioUrl: string; // Renamed from videoId for clarity
  coverUrl: string;
  description: string;
}

export type ArticleLayout = 'columna-izquierda' | 'columna-derecha' | 'columna-centro' | 'media-hoja' | 'hoja-completa' | 'columna-izquierda-centrada';

export interface CoverStory {
    headline: string;
    subtitle: string;
    imageUrl?: string;
}

// --- NEW PAGE STRUCTURE ---
export interface OddPage {
    type: 'odd';
    id: string;
    headline: string;
    subtitle?: string;
    category: string;
    backgroundUrl: string;
    layout: ArticleLayout;
    content: string;
    sources?: string[];
    bannerUrl: string;
}

export interface EvenPage {
    type: 'even';
    imageUrl: string;
    bannerUrl: string;
    headline?: string;
    objectPosition?: string;
}

export type Page = OddPage | EvenPage;

export interface WeeklyContent {
    cover: CoverStory;
    pages: Page[];
}

export interface ProtectedContent {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'audio' | 'video' | 'image';
}

export interface Patron {
  id: string;
  name: string;
  content: ProtectedContent[];
}

export interface StickyNote {
  id: string;
  name: string;
  text: string;
  color: string;
  // FIX: Added position and rotation properties to support dynamic placement.
  position: { x: number; y: number };
  rotation: number;
}

export interface LibraryItem {
  id: string;
  category: 'Libros' | 'Discos' | 'Películas' | 'Revistas' | 'Podcasts' | 'Postales';
  title: string;
  author: string; // O artista, director, etc.
  imageUrl: string;
  review: string;
  audioUrl?: string;
  videoUrl?: string;
  pdfUrl?: string; // URL para descargar PDF (Revistas)
  publicationDate: string;
  sources?: string;
}