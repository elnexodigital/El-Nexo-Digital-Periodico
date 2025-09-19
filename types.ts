
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
  id:string;
  title: string;
  artist: string;
  videoId: string;
  coverUrl: string;
}

export interface Article {
  id: string;
  headline: string;
  category: string;
  imageUrl?: string;
  content: string;
}

export interface CoverStory {
    headline: string;
    subtitle: string;
    imageUrl?: string;
}

export interface WeeklyContent {
    cover: CoverStory;
    articles: Article[];
}
