
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
