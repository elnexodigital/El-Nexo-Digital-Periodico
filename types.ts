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
  bannerUrl: string;
}

export interface PodcastMP3 {
  id: string;
  title: string;
  artist: string;
  videoId: string;
  coverUrl: string;
}

// FIX: Add missing Article interface for ArticleCard component
export interface Article {
  headline: string;
  summary?: string;
  imageUrl?: string;
  category?: string;
}
