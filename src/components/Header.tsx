
import React, { useState, useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import type { MusicTrack, HeaderControls, NewsBroadcast, PodcastMP3 } from '../types.ts';
import FloatingPodcastButton from './FloatingPodcastButton.tsx';
import ListenerCounter from './ListenerCounter.tsx';

const VIDEO_URLS: string[] = [
  'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1755907719/animaci%C3%B3n_APP_pvxjop.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1756345297/14_okcuk0.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1756345296/13_debkpb.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1756345293/11_gud5kv.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1756345294/12_ringmi.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1756345294/9_ulzdcy.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1756345293/10_io3g8k.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1756345059/8_vng8sz.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1756345005/4_hczosi.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1756345005/6_jdroij.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1756345004/5_ivvibp.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1756345004/7_aw3cxt.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1756345003/3_thswfg.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1756345002/2_gthspn.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1756345001/1_ndgmbp.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1757874034/tu_compa%C3%B1%C3%ADa_247_srq9ah.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1757877430/tu_compa%C3%B1%C3%ADa3_aoreex.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1757877463/tu_compa%C3%B1%C3%ADa_4_jk7aeq.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1757877465/tu_compa%C3%B1%C3%ADa_5_x13zf0.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1757877467/tu_compa%C3%B1%C3%ADa_7_okxvw2.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1757877467/tu_compa%C3%B1%C3%ADa_6_kkiqlc.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1757877700/tu_compa%C3%B1%C3%ADa2_nalqjp.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1757877469/tu_compa%C3%B1%C3%ADa_8_bnqoa2.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1757877470/tu_compa%C3%B1%C3%ADa_9_iomwyb.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1757877473/tu_compa%C3%B1%C3%ADa_10_t5gpkm.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1757877508/tu_compa%C3%B1%C3%ADa_11_el38c4.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756612883/Vienen_las_Noticias_ujmv2i.mp4',
];

interface HeaderProps {
  isPodcastModalOpen: boolean;
  onPodcastButtonClick: () => void;
  showPodcastButton: boolean;
  onProtectedButtonClick: () => void;
  onStickyNoteButtonClick: () => void;
  onLibraryButtonClick: () => void;
  notesCount: number;
  onAdminAuthRequest: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

interface RadioData {
  GREETING_AUDIOS: {
    morning: string[];
    afternoon: string[];
    night: string[];
  };
  NEWS_BROADCASTS: Record<number, NewsBroadcast>;
  SEPARATOR_AUDIOS: string[];
  MUSIC_TRACKS: MusicTrack[];
  PODCASTS_MP3: PodcastMP3[];
  COMMERCIAL_JINGLES: string[];
  TIME_JINGLES: {
    morning: string[];
    afternoon: string[];
    night: string[];
  };
}

const shuffleArray = <T,>(array: T[]): T[] => {
  // Fisher-Yates shuffle for a more uniform randomness
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};


const Header = forwardRef<HeaderControls, HeaderProps>(({ isPodcastModalOpen, onPodcastButtonClick, showPodcastButton, onProtectedButtonClick, onStickyNoteButtonClick, onLibraryButtonClick, notesCount, onAdminAuthRequest, isDarkMode, onToggleDarkMode }, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGreetingPlaying, setIsGreetingPlaying] = useState(false);
  const [videoQueue, setVideoQueue] = useState(() => shuffleArray(VIDEO_URLS));
  const [musicQueue, setMusicQueue] = useState<MusicTrack[]>([]);
  const [hasGreetingPlayed, setHasGreetingPlayed] = useState(false);
  const [playedBroadcasts, setPlayedBroadcasts] = useState<Record<number, boolean>>({});
  const [activeBroadcast, setActiveBroadcast] = useState<NewsBroadcast | null>(null);
  const [activePodcastMP3, setActivePodcastMP3] = useState<PodcastMP3 | null>(null);
  const [radioData, setRadioData] = useState<RadioData | null>(null);
  const [isRadioLoading, setIsRadioLoading] = useState(true);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const greetingAudioRef = useRef<HTMLAudioElement | null>(null);
  const jingleAudioRef = useRef<HTMLAudioElement>(null);
  const newsAudioRef = useRef<HTMLAudioElement | null>(null);
  const separatorAudioRef = useRef<HTMLAudioElement | null>(null);
  const podcastMP3AudioRef = useRef<HTMLAudioElement | null>(null);
  const commercialJingleAudioRef = useRef<HTMLAudioElement | null>(null);
  const timeJingleAudioRef = useRef<HTMLAudioElement | null>(null);
  const musicVolumeRef = useRef(1.0);

  const lastRandomEventTimeRef = useRef<number>(0);
  const MIN_EVENT_SPACING = 30000; // 30 seconds

  const recentTracksRef = useRef<string[]>([]);
  const recentVideosRef = useRef<string[]>([]);
  
  const separatorTimerRef = useRef<number | null>(null);
  const commercialJingleTimerRef = useRef<number | null>(null);
  const timeJingleTimerRef = useRef<number | null>(null);

  const activePodcastMP3Ref = useRef(activePodcastMP3);
  useEffect(() => {
    activePodcastMP3Ref.current = activePodcastMP3;
  }, [activePodcastMP3]);

  const currentDate = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  useEffect(() => {
    const loadRadioData = async () => {
      setIsRadioLoading(true);
      try {
        const [
          greetingsModule,
          broadcastsModule,
          separatorsModule,
          musicModule,
          podcastsMp3Module,
          jinglesModule,
          timeJinglesModule,
        ] = await Promise.all([
          import('../greetings.ts'),
          import('../data/broadcasts.ts'),
          import('../data/separators.ts'),
          import('../data/music.ts'),
          import('../data/podcastsMP3.ts'),
          import('../data/jingles.ts'),
          import('../data/timeJingles.ts'),
        ]);
        
        const loadedRadioData = {
          GREETING_AUDIOS: greetingsModule.GREETING_AUDIOS,
          NEWS_BROADCASTS: broadcastsModule.NEWS_BROADCASTS,
          SEPARATOR_AUDIOS: separatorsModule.SEPARATOR_AUDIOS,
          MUSIC_TRACKS: musicModule.MUSIC_TRACKS,
          PODCASTS_MP3: podcastsMp3Module.PODCASTS_MP3,
          COMMERCIAL_JINGLES: jinglesModule.COMMERCIAL_JINGLES,
          TIME_JINGLES: timeJinglesModule.TIME_JINGLES,
        };
        setRadioData(loadedRadioData);
        setMusicQueue(shuffleArray(loadedRadioData.MUSIC_TRACKS));

      } catch (error) {
        console.error("Failed to load radio data:", error);
      } finally {
        setIsRadioLoading(false);
      }
    };
    loadRadioData();
  }, []);

  // Listener para pausar la radio desde otros componentes (ej. Biblioteca)
  useEffect(() => {
    const handlePauseRequest = () => {
      if (isPlaying) {
          setIsPlaying(false);
          pauseAllAudio();
      }
    };
    window.addEventListener('pauseRadio', handlePauseRequest);
    return () => window.removeEventListener('pauseRadio', handlePauseRequest);
  }, [isPlaying]);

  const selectNextVideo = useCallback(() => {
    setVideoQueue(prevQueue => {
      let [first, ...rest] = prevQueue;
      
      if (recentVideosRef.current.includes(first) && rest.length > 5) {
         const swapIndex = Math.floor(Math.random() * (rest.length - 1)) + 1;
         const temp = first;
         first = rest[swapIndex];
         rest[swapIndex] = temp;
      }

      const newHistory = [first, ...recentVideosRef.current].slice(0, 5);
      recentVideosRef.current = newHistory;

      if (rest.length === 0) {
        return shuffleArray(VIDEO_URLS);
      }
      return [...rest, first];
    });
  }, []);

  const playNextMusicTrack = useCallback(() => {
    setMusicQueue(prevQueue => {
        let [first, ...rest] = prevQueue;
        
        if (first && recentTracksRef.current.includes(first.id) && rest.length > 10) {
            const swapIndex = Math.floor(Math.random() * Math.min(20, rest.length));
            const temp = first;
            first = rest[swapIndex];
            rest[swapIndex] = temp;
        }

        if (first) {
            const newHistory = [first.id, ...recentTracksRef.current].slice(0, 15);
            recentTracksRef.current = newHistory;
        }

        if (rest.length === 0) {
            return radioData ? shuffleArray(radioData.MUSIC_TRACKS) : [];
        }
        return [...rest, first];
    });
  }, [radioData]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleMediaError = (event: Event) => {
        console.error(`Audio element error for src: ${audio.src}. Skipping track.`, event);
        playNextMusicTrack();
    };
    audio.addEventListener('error', handleMediaError);

    const shouldPlayMusic = isPlaying && !isGreetingPlaying && musicQueue.length > 0 && !activeBroadcast && !activePodcastMP3;

    if (shouldPlayMusic) {
      const newSrc = musicQueue[0].url;
      
      const playAudio = () => {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            if (error.name !== 'AbortError') {
              console.error(`Error playing music promise for ${audio.src}:`, error);
              playNextMusicTrack();
            }
          });
        }
      };

      if (audio.src !== newSrc) {
        audio.src = newSrc;
        audio.load();
        playAudio();
      } else if (audio.paused) {
        playAudio();
      }
    } else if (!isPlaying && !audio.paused) {
      audio.pause();
    }
    
    return () => {
      audio.removeEventListener('error', handleMediaError);
    };
  }, [musicQueue, isPlaying, isGreetingPlaying, activeBroadcast, activePodcastMP3, playNextMusicTrack]);


  const playBroadcast = useCallback((broadcast: NewsBroadcast, hour: number) => {
    const musicAudio = audioRef.current;
    const wasMusicPlaying = isPlaying;
    
    if (podcastMP3AudioRef.current) {
      podcastMP3AudioRef.current.pause();
      podcastMP3AudioRef.current = null;
      setActivePodcastMP3(null);
      if (musicAudio) musicAudio.volume = musicVolumeRef.current;
    }

    setActiveBroadcast(broadcast);

    if (wasMusicPlaying) {
      if (musicAudio) musicAudio.pause();
      if (greetingAudioRef.current && !greetingAudioRef.current.paused) {
        greetingAudioRef.current.pause();
      }
    }
    
    const resumeMusic = () => {
      setActiveBroadcast(null);
      if (wasMusicPlaying && musicAudio) {
      }
      if (newsAudioRef.current) {
          newsAudioRef.current.removeEventListener('ended', resumeMusic);
          newsAudioRef.current.removeEventListener('error', resumeMusic);
          newsAudioRef.current = null;
      }
    };

    newsAudioRef.current = new Audio(broadcast.url);
    newsAudioRef.current.addEventListener('ended', resumeMusic);
    newsAudioRef.current.addEventListener('error', (e) => {
        console.error("Broadcast play failed", e);
        resumeMusic();
    });

    newsAudioRef.current.play().catch(e => {
        console.error("Broadcast play promise rejected", e);
        resumeMusic();
    });
    
    setPlayedBroadcasts(prev => ({ ...prev, [hour]: true }));
  }, [isPlaying]);

  useEffect(() => {
    const checkTime = () => {
      if (!radioData) return;
      const now = new Date();
      const hour = now.getHours();
      const minutes = now.getMinutes();
  
      if (hour === 0 && minutes === 0) {
        if (Object.keys(playedBroadcasts).length > 0) {
          setPlayedBroadcasts({});
        }
        return;
      }
  
      const broadcast = radioData.NEWS_BROADCASTS[hour];
      if (broadcast && minutes === 0 && !playedBroadcasts[hour] && isPlaying) {
        playBroadcast(broadcast, hour);
      }
    };
  
    const mountTimeout = setTimeout(checkTime, 1000); 
    const intervalId = setInterval(checkTime, 60 * 1000);
  
    return () => {
      clearTimeout(mountTimeout);
      clearInterval(intervalId);
    };
  }, [playedBroadcasts, playBroadcast, radioData, isPlaying]);

  useEffect(() => {
    const playRandomPodcast = () => {
      if (!radioData) return;
      if (isPlaying && !isPodcastModalOpen && !activeBroadcast && !activePodcastMP3Ref.current) {
        const podcastToPlay = radioData.PODCASTS_MP3[Math.floor(Math.random() * radioData.PODCASTS_MP3.length)];
        const musicAudio = audioRef.current;
        if (!musicAudio) return;

        if (!musicAudio.paused) {
          musicAudio.pause();
        }

        setActivePodcastMP3(podcastToPlay);
        const podcastPlayer = new Audio(podcastToPlay.videoId);
        podcastMP3AudioRef.current = podcastPlayer;

        const handlePodcastEnd = () => {
          setActivePodcastMP3(null);
          if (podcastMP3AudioRef.current) {
            podcastMP3AudioRef.current.removeEventListener('ended', handlePodcastEnd);
            podcastMP3AudioRef.current.removeEventListener('error', handlePodcastEnd);
            podcastMP3AudioRef.current = null;
          }
        };

        podcastPlayer.addEventListener('ended', handlePodcastEnd);
        podcastPlayer.addEventListener('error', (e) => {
          console.error("Podcast MP3 audio element reported an error:", e);
          handlePodcastEnd();
        });

        podcastPlayer.play().catch(e => {
          if (e.name !== 'AbortError') {
            console.error("Podcast MP3 play promise was rejected:", e);
            handlePodcastEnd();
          }
        });
      }
    };

    if (!isPlaying) {
      return;
    }

    const podcastInterval = setInterval(playRandomPodcast, 30 * 60 * 1000);

    return () => {
      clearInterval(podcastInterval);
    };
  }, [isPlaying, isPodcastModalOpen, activeBroadcast, radioData]);

  useEffect(() => {
    return () => {
      if (podcastMP3AudioRef.current) {
        podcastMP3AudioRef.current.pause();
      }
    }
  }, []);

  const getGreetingTimeOfDay = (): 'morning' | 'afternoon' | 'night' | null => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    
    if ((hours === 7 && minutes >= 30) || (hours > 7 && hours < 12) || (hours === 12 && minutes === 0)) {
      return 'morning';
    }
    if ((hours === 12 && minutes >= 1) || (hours > 12 && hours < 18) || (hours === 18 && minutes === 0)) {
      return 'afternoon';
    }
    if ((hours === 18 && minutes >= 1) || (hours > 18 && hours < 22) || (hours === 22 && minutes === 0)) {
      return 'night';
    }
    return null;
  };

  const selectRandomGreeting = (): string | null => {
    if (!radioData) return null;
    const timeOfDay = getGreetingTimeOfDay();
    if (!timeOfDay) return null;
    const greetings = radioData.GREETING_AUDIOS[timeOfDay];
    if (!greetings || greetings.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * greetings.length);
    return greetings[randomIndex];
  };

  const pauseAllAudio = () => {
    if (audioRef.current) audioRef.current.pause();
    if (greetingAudioRef.current) greetingAudioRef.current.pause();
    if (separatorAudioRef.current) separatorAudioRef.current.pause();
    if (podcastMP3AudioRef.current) podcastMP3AudioRef.current.pause();
    if (newsAudioRef.current) newsAudioRef.current.pause();
    if (commercialJingleAudioRef.current) commercialJingleAudioRef.current.pause();
    if (timeJingleAudioRef.current) timeJingleAudioRef.current.pause();
  };
  
  const togglePlayPause = () => {
    if (isRadioLoading) return;
    const musicAudio = audioRef.current;
    if (!musicAudio) return;

    if (isPlaying) {
      pauseAllAudio();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    
    if (newsAudioRef.current?.paused && !newsAudioRef.current.ended) {
      newsAudioRef.current.play().catch(e => console.error("Error resuming news", e));
      return;
    }
    if (podcastMP3AudioRef.current?.paused && !podcastMP3AudioRef.current.ended) {
      podcastMP3AudioRef.current.play().catch(e => console.error("Error resuming podcast mp3", e));
      musicAudio.play().catch(e => console.error("Error resuming music bed", e));
      return;
    }
    if (commercialJingleAudioRef.current?.paused && !commercialJingleAudioRef.current.ended) {
      commercialJingleAudioRef.current.play().catch(e => console.error("Error resuming commercial jingle", e));
      return;
    }
    if (separatorAudioRef.current?.paused && !separatorAudioRef.current.ended) {
      separatorAudioRef.current.play().catch(e => console.error("Error resuming separator", e));
      return;
    }
     if (timeJingleAudioRef.current?.paused && !timeJingleAudioRef.current.ended) {
      timeJingleAudioRef.current.play().catch(e => console.error("Error resuming time jingle", e));
      return;
    }
    if (greetingAudioRef.current?.paused && !greetingAudioRef.current.ended) {
      greetingAudioRef.current.play().catch(e => console.error("Error resuming greeting", e));
      return;
    }
    
    if (!hasGreetingPlayed) {
      const greetingUrl = selectRandomGreeting();
      setHasGreetingPlayed(true);

      if (greetingUrl) {
        setIsGreetingPlaying(true);
        greetingAudioRef.current = new Audio(greetingUrl);
        
        const onGreetingEnd = () => {
            setIsGreetingPlaying(false);
            if (greetingAudioRef.current) {
                greetingAudioRef.current.removeEventListener('ended', onGreetingEnd);
                greetingAudioRef.current.removeEventListener('error', onGreetingEnd);
            }
        };

        greetingAudioRef.current.addEventListener('ended', onGreetingEnd);
        greetingAudioRef.current.addEventListener('error', (error) => {
            console.error("Error playing greeting audio:", error);
            onGreetingEnd();
        });

        greetingAudioRef.current.play().catch(error => {
          console.error("Greeting play() promise rejected:", error);
          onGreetingEnd();
        });
        return;
      }
    }
  };

  const handleChangeVibe = () => {
    if (isRadioLoading) return;
    
    if (activeBroadcast) {
      newsAudioRef.current?.pause();
      setActiveBroadcast(null);
    }
    if (activePodcastMP3) {
      podcastMP3AudioRef.current?.pause();
      setActivePodcastMP3(null);
      if (audioRef.current) audioRef.current.volume = musicVolumeRef.current;
    }
     if (commercialJingleAudioRef.current) {
        commercialJingleAudioRef.current.pause();
        commercialJingleAudioRef.current = null;
      }
    if (separatorAudioRef.current) {
        separatorAudioRef.current.pause();
        separatorAudioRef.current = null;
    }
    if (timeJingleAudioRef.current) {
        timeJingleAudioRef.current.pause();
        timeJingleAudioRef.current = null;
    }

    playNextMusicTrack();
    
    if (!isPlaying) {
      setIsPlaying(true);
    }
  };


  useEffect(() => {
    const jingleInterval = setInterval(() => {
        const musicAudio = audioRef.current;
        const jingleAudio = jingleAudioRef.current;

        if (isPlaying && !isPodcastModalOpen && jingleAudio && musicAudio && jingleAudio.paused && !commercialJingleAudioRef.current) {
            musicVolumeRef.current = musicAudio.volume;
            musicAudio.volume = 0.2;

            jingleAudio.play().catch(e => {
                console.error("Jingle play failed", e);
                musicAudio.volume = musicVolumeRef.current;
            });

            const handleJingleEnd = () => {
                if (musicAudio) musicAudio.volume = musicVolumeRef.current;
                jingleAudio.removeEventListener('ended', handleJingleEnd);
            };

            jingleAudio.addEventListener('ended', handleJingleEnd);
        }

    }, 30 * 60 * 1000);

    return () => {
        clearInterval(jingleInterval);
    };
  }, [isPlaying, isPodcastModalOpen]);

  useEffect(() => {
    const playRandomJingle = () => {
      if (!radioData || !isPlaying || isPodcastModalOpen || activeBroadcast || activePodcastMP3 || (separatorAudioRef.current && !separatorAudioRef.current.paused) || (commercialJingleAudioRef.current && !commercialJingleAudioRef.current.paused) || (timeJingleAudioRef.current && !timeJingleAudioRef.current.paused)) {
        scheduleNextJingle();
        return;
      }

      const now = Date.now();
      if (now - lastRandomEventTimeRef.current < MIN_EVENT_SPACING) {
          scheduleNextJingle();
          return;
      }

      const musicAudio = audioRef.current;
      const nicolleJingle = jingleAudioRef.current;
      if (!musicAudio || (nicolleJingle && !nicolleJingle.paused)) {
        scheduleNextJingle();
        return;
      }
      
      const jingleUrl = radioData.COMMERCIAL_JINGLES[Math.floor(Math.random() * radioData.COMMERCIAL_JINGLES.length)];
      
      const wasMusicPlaying = !musicAudio.paused;
      if (wasMusicPlaying) {
          musicAudio.pause();
      }

      const jinglePlayer = new Audio(jingleUrl);
      commercialJingleAudioRef.current = jinglePlayer;
      
      lastRandomEventTimeRef.current = Date.now();

      const handleJingleEnd = () => {
          if (audioRef.current && wasMusicPlaying && isPlaying) {
              audioRef.current.play().catch(e => console.error("Failed to resume music after jingle", e));
          }
          if (commercialJingleAudioRef.current) {
              commercialJingleAudioRef.current.removeEventListener('ended', handleJingleEnd);
              commercialJingleAudioRef.current.removeEventListener('error', handleJingleEnd);
              commercialJingleAudioRef.current = null;
          }
          scheduleNextJingle();
      };

      jinglePlayer.addEventListener('ended', handleJingleEnd);
      jinglePlayer.addEventListener('error', (e) => {
          console.error("Commercial jingle play failed", e);
          handleJingleEnd();
      });

      jinglePlayer.play().catch(e => {
          console.error("Commercial jingle play promise rejected", e);
          handleJingleEnd();
      });
    };
    
    const scheduleNextJingle = () => {
      if (commercialJingleTimerRef.current) {
        clearTimeout(commercialJingleTimerRef.current);
      }
      const timeout = (Math.random() * 10 + 5) * 60 * 1000;
      commercialJingleTimerRef.current = window.setTimeout(playRandomJingle, timeout);
    };

    if (isPlaying && radioData) {
      scheduleNextJingle();
    }

    return () => {
      if (commercialJingleTimerRef.current) {
        clearTimeout(commercialJingleTimerRef.current);
      }
      if (commercialJingleAudioRef.current) {
          commercialJingleAudioRef.current.pause();
          commercialJingleAudioRef.current = null;
      }
    };
  }, [isPlaying, isPodcastModalOpen, activeBroadcast, activePodcastMP3, radioData]);
  
  useEffect(() => {
    const playRandomSeparator = () => {
      if (!radioData || !isPlaying || isPodcastModalOpen || activeBroadcast || activePodcastMP3 || (separatorAudioRef.current && !separatorAudioRef.current.paused) || (commercialJingleAudioRef.current && !commercialJingleAudioRef.current.paused) || (timeJingleAudioRef.current && !timeJingleAudioRef.current.paused)) {
        scheduleNextSeparator();
        return;
      }

      const now = Date.now();
      if (now - lastRandomEventTimeRef.current < MIN_EVENT_SPACING) {
          scheduleNextSeparator();
          return;
      }

      const musicAudio = audioRef.current;
      if (!musicAudio || musicAudio.paused) {
        scheduleNextSeparator();
        return;
      }
      
      musicAudio.pause();
      
      const separatorUrl = radioData.SEPARATOR_AUDIOS[Math.floor(Math.random() * radioData.SEPARATOR_AUDIOS.length)];
      const separatorPlayer = new Audio(separatorUrl);
      separatorAudioRef.current = separatorPlayer;
      
      lastRandomEventTimeRef.current = Date.now();

      const handleSeparatorEnd = () => {
        if (audioRef.current && isPlaying) {
          audioRef.current.play().catch(e => console.error("Failed to resume music after separator", e));
        }
        if (separatorAudioRef.current) {
          separatorAudioRef.current.removeEventListener('ended', handleSeparatorEnd);
          separatorAudioRef.current.removeEventListener('error', handleSeparatorEnd);
          separatorAudioRef.current = null;
        }
        scheduleNextSeparator();
      };

      separatorPlayer.addEventListener('ended', handleSeparatorEnd);
      separatorPlayer.addEventListener('error', (e) => {
        console.error("Separator play failed.", e);
        handleSeparatorEnd();
      });

      separatorPlayer.play().catch(e => {
        console.error("Separator play promise rejected", e);
        handleSeparatorEnd();
      });
    };

    const scheduleNextSeparator = () => {
      if (separatorTimerRef.current) {
        clearTimeout(separatorTimerRef.current);
      }
      const timeout = (Math.random() * 8 + 2) * 60 * 1000;
      separatorTimerRef.current = window.setTimeout(playRandomSeparator, timeout);
    };

    if (isPlaying && radioData) {
      scheduleNextSeparator();
    }

    return () => {
      if (separatorTimerRef.current) {
        clearTimeout(separatorTimerRef.current);
      }
    };
  }, [isPlaying, radioData, isPodcastModalOpen, activeBroadcast, activePodcastMP3]);

  useEffect(() => {
    const playRandomTimeJingle = () => {
      if (!radioData || !isPlaying || isPodcastModalOpen || activeBroadcast || activePodcastMP3 || (separatorAudioRef.current && !separatorAudioRef.current.paused) || (commercialJingleAudioRef.current && !commercialJingleAudioRef.current.paused) || (timeJingleAudioRef.current && !timeJingleAudioRef.current.paused)) {
        scheduleNextTimeJingle();
        return;
      }

      const now = Date.now();
      if (now - lastRandomEventTimeRef.current < MIN_EVENT_SPACING) {
          scheduleNextTimeJingle();
          return;
      }

      const musicAudio = audioRef.current;
      if (!musicAudio || musicAudio.paused) {
        scheduleNextTimeJingle();
        return;
      }
      
      const timeOfDay = getGreetingTimeOfDay();
      if (!timeOfDay) {
        scheduleNextTimeJingle();
        return;
      }

      const jingles = radioData.TIME_JINGLES[timeOfDay];
      if (!jingles || jingles.length === 0) {
          scheduleNextTimeJingle();
          return;
      }
      
      const jingleUrl = jingles[Math.floor(Math.random() * jingles.length)];
      
      musicVolumeRef.current = musicAudio.volume;
      musicAudio.volume = 0.2;

      const jinglePlayer = new Audio(jingleUrl);
      timeJingleAudioRef.current = jinglePlayer;
      
      lastRandomEventTimeRef.current = Date.now();

      const handleJingleEnd = () => {
          if (audioRef.current) {
              audioRef.current.volume = musicVolumeRef.current;
          }
          if (timeJingleAudioRef.current) {
              timeJingleAudioRef.current.removeEventListener('ended', handleJingleEnd);
              timeJingleAudioRef.current.removeEventListener('error', handleJingleEnd);
              timeJingleAudioRef.current = null;
          }
          scheduleNextTimeJingle();
      };

      jinglePlayer.addEventListener('ended', handleJingleEnd);
      jinglePlayer.addEventListener('error', (e) => {
          console.error("Time jingle play failed", e);
          handleJingleEnd();
      });

      jinglePlayer.play().catch(e => {
          console.error("Time jingle play promise rejected", e);
          handleJingleEnd();
      });
    };
    
    const scheduleNextTimeJingle = () => {
      if (timeJingleTimerRef.current) {
        clearTimeout(timeJingleTimerRef.current);
      }
      const timeout = (Math.random() * 6 + 12) * 60 * 1000; // Approx 15 mins
      timeJingleTimerRef.current = window.setTimeout(playRandomTimeJingle, timeout);
    };

    if (isPlaying && radioData) {
      scheduleNextTimeJingle();
    }

    return () => {
      if (timeJingleTimerRef.current) {
        clearTimeout(timeJingleTimerRef.current);
      }
      if (timeJingleAudioRef.current) {
          timeJingleAudioRef.current.pause();
          timeJingleAudioRef.current = null;
      }
    };
  }, [isPlaying, isPodcastModalOpen, activeBroadcast, activePodcastMP3, radioData]);


  useImperativeHandle(ref, () => ({
    playRadio: () => {
      if (!isPlaying) {
        togglePlayPause();
      }
    },
    pauseRadio: () => {
      if (isPlaying) {
        togglePlayPause();
      }
    },
    getIsPlayingState: () => isPlaying,
  }));
  
  const handleTrackEnded = () => {
    if (!radioData || !isPlaying) return;
    playNextMusicTrack();
  };
  
  const currentVideoUrl = videoQueue[0] || '';
  const bannerSrc = currentVideoUrl;

  const currentTrack = musicQueue[0] || null;
  const currentTitle = activeBroadcast?.description || activePodcastMP3?.title || currentTrack?.description || 'El Nexo Digital';
  const currentArtist = activePodcastMP3?.artist || (isRadioLoading ? 'Cargando radio...' : 'El Nexo Digital Radio');

  return (
    <header className="text-center relative">
      <div className="gift-ribbon-wrapper">
        <div className="gift-ribbon">
          <span>¡REGALOS EN BIBLIOTECA!</span>
        </div>
      </div>

      <button
          onClick={onAdminAuthRequest}
          className="admin-notes-icon"
          aria-label={`Ver ${notesCount} notas de administrador`}
        >
          <div className="relative">
            <img 
              src="https://res.cloudinary.com/ddmj6zevz/image/upload/v1762214989/Copilot_20251103_210903_eswig4.png" 
              alt="Icono para ver notas de administrador" 
              className="w-full h-full object-contain"
            />
            {notesCount > 0 && <span className="admin-notes-badge">{notesCount}</span>}
          </div>
        </button>

      <ListenerCounter />
      <div className="py-6 border-b-4 border-double border-stone-800">
        <img
          src="https://res.cloudinary.com/ddmj6zevz/image/upload/f_auto,q_auto:good/v1756714882/logo_el_nexo_digital_assa82.png"
          alt="Logo de El Nexo Digital"
          className="mx-auto h-20 mb-4"
        />
        <h1 className="text-5xl md:text-7xl tracking-tight newspaper-title">
          El Nexo Digital
        </h1>
        <p className="text-black mt-4 text-sm md:text-base">
          Periódico digital independiente
        </p>
        <div className="max-w-xl mx-auto px-4">
            <div className="relative flex justify-center items-center mt-1">
                <p className="text-black text-sm md:text-base uppercase">
                    Aplicación en desarrollo
                </p>
                <div className="absolute right-0">
                  <button onClick={onToggleDarkMode} className="theme-switcher" aria-label={isDarkMode ? 'Activar modo claro' : 'Activar modo oscuro'}>
                      <svg className="sun-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <svg className="moon-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                  </button>
                </div>
            </div>
        </div>
        <p className="text-black mt-1 text-sm md:text-base capitalize">{currentDate}</p>
      </div>

      <div className="my-4 overflow-hidden border-b-4 border-double border-stone-800 relative bg-[#fdfaf4]">
        <div className="header-video-banner">
          {activePodcastMP3 ? (
             // --- TARJETA DE LECTURA PARA PODCASTS MP3 ---
            <div className="absolute top-0 left-0 w-full h-full z-10 flex flex-col items-center justify-center p-8 bg-[#fdfaf4] dark:bg-[#1f2023] text-center fade-in-image overflow-y-auto custom-scrollbar">
                <div className="max-w-4xl mx-auto flex flex-col items-center justify-center h-full">
                    {/* Icono decorativo o Logo pequeño */}
                    <div className="mb-4 opacity-80">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-stone-400 dark:text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                    </div>
                    
                    {/* Título Elegante */}
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-stone-900 dark:text-stone-100 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {activePodcastMP3.title}
                    </h2>
                    
                    {/* Separador */}
                    <div className="w-24 h-1 bg-stone-300 dark:bg-stone-700 mb-6"></div>

                    {/* Descripción / Resumen */}
                    <p className="text-lg md:text-xl text-stone-700 dark:text-stone-300 font-typewriter leading-relaxed max-w-2xl">
                        {activePodcastMP3.description}
                    </p>
                    
                     {/* Autor (si hay) */}
                    <p className="mt-6 text-sm text-stone-500 uppercase tracking-widest font-bold">
                        {activePodcastMP3.artist}
                    </p>
                </div>
            </div>
          ) : (
            <video
              key={bannerSrc}
              src={bannerSrc}
              autoPlay
              muted
              loop={!!activeBroadcast}
              playsInline
              onEnded={activeBroadcast ? undefined : selectNextVideo}
              className="object-cover z-0 absolute top-0 left-0 w-full h-full"
              aria-hidden="true"
            />
          )}
        </div>
        
        <div className="bg-stone-800 text-white p-4 flex items-center justify-between gap-4 font-typewriter">
          <audio ref={audioRef} onEnded={handleTrackEnded} />
          <audio ref={jingleAudioRef} src="https://res.cloudinary.com/ddmj6zevz/video/upload/q_auto:good/v1757900327/el_nexo_digital_nicolle_egtjoc.mp3" preload="auto" />
          
          <div className="flex-shrink-0">
            <button
              onClick={togglePlayPause}
              disabled={isRadioLoading}
              className="p-3 rounded-full border-2 border-white text-white hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white disabled:opacity-50 disabled:cursor-wait"
              aria-label={isRadioLoading ? "Cargando radio" : (isPlaying ? "Pausar radio" : "Reproducir radio")}
            >
              {isRadioLoading ? (
                <svg className="h-10 w-10 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v4a1 1 0 11-2 0V8z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>

          <div className="flex-1 text-center min-w-0">
            <p className="font-bold text-lg truncate" title={currentArtist}>{currentArtist}</p>
            <p className="opacity-80 text-sm truncate" title={currentTitle}>
              {currentTitle}
            </p>
          </div>
          
          <div className="flex-shrink-0">
             <button
                onClick={handleChangeVibe}
                disabled={isRadioLoading}
                className="px-4 py-2 text-sm border border-white text-white rounded-full hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white disabled:opacity-50 disabled:cursor-wait"
                aria-label="Cambiar la onda musical"
              >
                cambiar la onda
            </button>
          </div>
        </div>
      </div>
      
      <div className="py-4 grid grid-cols-2 gap-y-8 gap-x-4 justify-items-center items-start md:flex md:justify-center md:gap-8 bg-[#fdfaf4]">
        {showPodcastButton && (
          <div className="flex flex-col items-center w-28 md:w-36">
            <FloatingPodcastButton onClick={onPodcastButtonClick} />
          </div>
        )}
        <div className="flex flex-col items-center w-28 md:w-36">
            <button
              onClick={onStickyNoteButtonClick}
              className="relative w-full h-28 md:h-36 rounded-full shadow-2xl transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-black/50"
              aria-label="Escribir una nota"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="absolute top-0 left-0 w-full h-full animate-spin-very-slow text-black">
                  <defs>
                    <path id="circleNota" d=" M 50, 50 m -39, 0 a 39,39 0 1,1 78,0 a 39,39 0 1,1 -78,0 "/>
                  </defs>
                  <text fill="currentColor" style={{fontSize: '14px', fontWeight: 'bold', letterSpacing: '0.5px'}} className="uppercase">
                    <textPath xlinkHref="#circleNota" startOffset="25%" textAnchor="middle">
                      Escribir Nota
                    </textPath>
                  </text>
                </svg>

                <div className="w-[70%] h-[70%] rounded-full animate-pulse-slow bg-white shadow-inner flex items-center justify-center">
                  <img
                    src="https://res.cloudinary.com/ddmj6zevz/image/upload/v1762215081/Copilot_20251103_210653_yecnvc.png"
                    alt="Dejar una nota"
                    className="w-full h-full object-cover rounded-full p-1"
                  />
                </div>
              </div>
            </button>
        </div>

        <div className="flex flex-col items-center w-28 md:w-36">
            <button
              onClick={onProtectedButtonClick}
              className="relative w-full h-28 md:h-36 rounded-full shadow-2xl transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-black/50"
              aria-label="Acceder a contenido para Mecenas"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="absolute top-0 left-0 w-full h-full animate-spin-very-slow text-black">
                  <defs>
                    <path id="circleMecenas" d=" M 50, 50 m -39, 0 a 39,39 0 1,1 78,0 a 39,39 0 1,1 -78,0 "/>
                  </defs>
                  <text fill="currentColor" style={{fontSize: '14px', fontWeight: 'bold', letterSpacing: '0.5px'}} className="uppercase">
                    <textPath xlinkHref="#circleMecenas" startOffset="25%" textAnchor="middle">
                      MECENAS
                    </textPath>
                  </text>
                </svg>

                <div className="w-[70%] h-[70%] rounded-full animate-pulse-slow bg-white shadow-inner flex items-center justify-center">
                  <img
                      src="https://res.cloudinary.com/dus9zcgen/image/upload/v1759387606/Gemini_Generated_Image_komhuokomhuokomh-removebg-preview_erl5zc.png"
                      alt="Acceder a contenido exclusivo"
                      className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </button>
        </div>

        <div className="flex flex-col items-center w-28 md:w-36">
            <button
              onClick={onLibraryButtonClick}
              className="relative w-full h-28 md:h-36 rounded-full shadow-2xl transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-black/50"
              aria-label="Acceder a la Biblioteca"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="absolute top-0 left-0 w-full h-full animate-spin-very-slow text-black">
                  <defs>
                    <path id="circleBiblioteca" d=" M 50, 50 m -39, 0 a 39,39 0 1,1 78,0 a 39,39 0 1,1 -78,0 "/>
                  </defs>
                  <text fill="currentColor" style={{fontSize: '14px', fontWeight: 'bold', letterSpacing: '0.5px'}} className="uppercase">
                    <textPath xlinkHref="#circleBiblioteca" startOffset="25%" textAnchor="middle">
                      BIBLIOTECA
                    </textPath>
                  </text>
                </svg>

                <div className="w-[70%] h-[70%] rounded-full animate-pulse-slow bg-white shadow-inner flex items-center justify-center">
                  <img
                      src="https://res.cloudinary.com/ddmj6zevz/image/upload/v1762221635/Gemini_Generated_Image_ooj0fjooj0fjooj0-removebg-preview_o1y7yh.png"
                      alt="Biblioteca de contenidos"
                      className="w-full h-full object-contain p-1"
                  />
                </div>
              </div>
            </button>
        </div>
      </div>

    </header>
  );
});

export default Header;
