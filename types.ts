export interface GroundingSource {
  web: {
    uri: string;
    title: string;
  }
}

export interface Article {
  headline: string;
  summary: string;
  category: string;
  publishedDate: string;
}

export interface NewsSection {
  topic: string;
  articles: Article[];
}

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