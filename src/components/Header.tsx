import { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import ListenerCounter from './ListenerCounter.tsx';
import { Library as LibraryIcon, Home, Mic, Play, Pause, SkipForward } from 'lucide-react';
import type { MusicTrack, HeaderControls, NewsBroadcast, PodcastMP3 } from '../types.ts';

interface HeaderProps {
  currentView: 'magazine' | 'library' | 'interviews' | 'ateneo';
  onNavigate: (view: 'magazine' | 'library' | 'interviews' | 'ateneo') => void;
  onOpenPodcast?: () => void;
  hasPodcast?: boolean;
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
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const VIDEO_URLS: string[] = [
  'https://res.cloudinary.com/dus9zcgen/video/upload/v1759387549/tuapp_cozzi_tko6ys.mp4',
  'https://res.cloudinary.com/dus9zcgen/video/upload/v1759387536/spot_10_segundos_completo_wsoeh1.mp4',
  'https://res.cloudinary.com/dus9zcgen/video/upload/v1759387497/post_xk8alf.mp4',
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

const Header = forwardRef<HeaderControls, HeaderProps>(({
  currentView,
  onNavigate,
  onOpenPodcast,
  hasPodcast
}, ref) => {

  const NavItem = ({ view, label, icon: Icon, onClick, active }: { view?: any, label: string, icon: any, onClick?: () => void, active?: boolean }) => (
    <div className="flex flex-col items-center gap-1 sm:gap-2 px-2 sm:px-6 group">
      <button
        onClick={onClick || (() => onNavigate(view))}
        title={label}
        className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full transition-all duration-700 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border ${active || currentView === view
          ? 'bg-[#800020] text-white border-[#600010] shadow-md'
          : 'bg-white text-zen-charcoal/80 border-black/10 hover:text-[#800020] hover:border-[#800020]/20 hover:shadow-lg'
          }`}
      >
        <Icon size={18} strokeWidth={1.5} />
      </button>
      <span className={`text-[8px] font-mono tracking-[0.2em] sm:tracking-[0.3em] uppercase transition-opacity duration-700 font-bold ${active || currentView === view ? 'opacity-100 text-[#800020]' : 'opacity-70 group-hover:opacity-100 text-zen-charcoal'}`}>{label}</span>
    </div>
  );

  const [currentDate, setCurrentDate] = useState('');
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
  const newsAudioRef = useRef<HTMLAudioElement | null>(null);
  const separatorAudioRef = useRef<HTMLAudioElement | null>(null);
  const podcastMP3AudioRef = useRef<HTMLAudioElement | null>(null);
  const commercialJingleAudioRef = useRef<HTMLAudioElement | null>(null);
  const timeJingleAudioRef = useRef<HTMLAudioElement | null>(null);
  const musicVolumeRef = useRef(1.0);

  const recentTracksRef = useRef<string[]>([]);
  const recentVideosRef = useRef<string[]>([]);

  const activePodcastMP3Ref = useRef(activePodcastMP3);
  useEffect(() => {
    activePodcastMP3Ref.current = activePodcastMP3;
  }, [activePodcastMP3]);

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
      setCurrentDate(now.toLocaleDateString('es-AR', options).replace(',', ' -'));
    };
    updateDate();
    const interval = setInterval(updateDate, 60000);
    return () => clearInterval(interval);
  }, []);

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
    } else {
      if (!audio.paused) {
        audio.pause();
      }
    }
    
    return () => {
      audio.removeEventListener('error', handleMediaError);
    };
  }, [musicQueue, isPlaying, isGreetingPlaying, activeBroadcast, activePodcastMP3, playNextMusicTrack]);

  const playBroadcast = useCallback((broadcast: NewsBroadcast, hour: number) => {
    const musicAudio = audioRef.current;
    if (podcastMP3AudioRef.current) {
      podcastMP3AudioRef.current.pause();
      podcastMP3AudioRef.current = null;
      setActivePodcastMP3(null);
      if (musicAudio) musicAudio.volume = musicVolumeRef.current;
    }
    setActiveBroadcast(broadcast);
    const resumeMusic = () => {
      setActiveBroadcast(null);
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
      if (!radioData.PODCASTS_MP3 || radioData.PODCASTS_MP3.length === 0) return;
      if (isPlaying && !activeBroadcast && !activePodcastMP3Ref.current) {
        const randomIndex = Math.floor(Math.random() * radioData.PODCASTS_MP3.length);
        const podcastToPlay = radioData.PODCASTS_MP3[randomIndex];
        if (!podcastToPlay || !podcastToPlay.audioUrl) return;
        if (audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause();
        }
        setActivePodcastMP3(podcastToPlay);
        const podcastPlayer = new Audio(podcastToPlay.audioUrl);
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
          console.error("Podcast MP3 error:", e);
          handlePodcastEnd();
        });
        podcastPlayer.play().catch(e => {
          if (e.name !== 'AbortError') {
            console.error("Podcast MP3 play rejected:", e);
            handlePodcastEnd();
          }
        });
      }
    };
    if (!isPlaying) return;
    const podcastInterval = setInterval(playRandomPodcast, 30 * 60 * 1000);
    return () => clearInterval(podcastInterval);
  }, [isPlaying, activeBroadcast, radioData]);

  const getGreetingTimeOfDay = (): 'morning' | 'afternoon' | 'night' | null => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    if ((hours === 7 && minutes >= 30) || (hours > 7 && hours < 12) || (hours === 12 && minutes === 0)) return 'morning';
    if ((hours === 12 && minutes >= 1) || (hours > 12 && hours < 18) || (hours === 18 && minutes === 0)) return 'afternoon';
    if ((hours === 18 && minutes >= 1) || (hours > 18 && hours < 22) || (hours === 22 && minutes === 0)) return 'night';
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
        greetingAudioRef.current.addEventListener('error', onGreetingEnd);
        greetingAudioRef.current.play().catch(onGreetingEnd);
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
    }
    playNextMusicTrack();
    if (!isPlaying) setIsPlaying(true);
  };

  useImperativeHandle(ref, () => ({
    playRadio: () => { if (!isPlaying) togglePlayPause(); },
    pauseRadio: () => { if (isPlaying) togglePlayPause(); },
    getIsPlayingState: () => isPlaying,
  }));

  const currentTrack = musicQueue[0] || null;
  const currentTitle = activeBroadcast?.description || activePodcastMP3?.title || currentTrack?.description || 'El Nexo Digital';
  const currentArtist = activePodcastMP3?.artist || (isRadioLoading ? 'Cargando radio...' : 'El Nexo Digital Radio');

  return (
    <header className="z-50 w-full pt-4 sm:pt-10 px-4 flex flex-col items-center mb-0">
      <div className="bg-white/95 backdrop-blur-xl px-4 sm:px-16 py-6 sm:py-12 rounded-3xl relative flex flex-col items-center max-w-5xl w-full border border-black/10 shadow-md overflow-hidden">
        
        {/* Top-Right Counter - Positioned to avoid logo overlap */}
        <div className="absolute top-3 right-3 sm:top-6 sm:right-6 flex items-center z-10">
          <ListenerCounter />
        </div>

        <div className="text-center space-y-4 mb-8 mt-12 sm:mt-0">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-4xl sm:text-7xl font-signature text-zen-charcoal/95">
              El Nexo Digital
            </h1>
            <span className="text-[14px] sm:text-[16px] font-serif italic text-zen-charcoal tracking-tight">mucho más que un podcast</span>
            <span className="text-[10px] font-mono text-zen-charcoal/70 tracking-widest uppercase pt-1 font-bold">{currentDate}</span>
          </div>
        </div>

        {/* Combined Player Container (Video + Radio) */}
        <div className="w-full max-w-[1080px] mb-12 flex flex-col overflow-hidden rounded-2xl md:rounded-3xl border border-black/10 shadow-2xl bg-black mx-auto">
          {/* Video Player - Exact 1080x336 Aspect Ratio */}
          <div className="w-full aspect-[1080/336] relative bg-black overflow-hidden">
            <video
              key={videoQueue[0]}
              src={videoQueue[0]}
              autoPlay
              muted
              loop={!!activeBroadcast}
              playsInline
              onEnded={activeBroadcast ? undefined : selectNextVideo}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Radio Player Bar - Glued to video, industrial style */}
          <div className="flex flex-col w-full">
            {/* Full Width Marquee on Top - Delicate Digital Style - Minimal Height */}
            <div className="bg-stone-900/95 border-t border-white/10 py-0.5 overflow-hidden">
              <div className="marquee-container">
                <div className="marquee-content marquee-slow">
                  <span className="text-emerald-400/90 font-normal text-xs md:text-sm uppercase tracking-[0.6em] font-mono whitespace-nowrap leading-none">
                    {currentArtist} — {currentTitle} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {currentArtist} — {currentTitle} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {currentArtist} — {currentTitle}
                  </span>
                </div>
              </div>
            </div>

            {/* Controls Area - Corrugated Steel Style - Compact Padding */}
            <div className="bg-corrugated-steel p-2 md:p-3 flex items-center justify-center gap-6 border-t border-black/20 shadow-inner">
              <button 
                onClick={togglePlayPause}
                disabled={isRadioLoading}
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-stone-800 text-white border border-white/20 shadow-lg hover:bg-stone-700 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
              </button>

              <button 
                onClick={handleChangeVibe}
                disabled={isRadioLoading}
                className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-stone-800/50 text-white border border-white/10 shadow-md hover:bg-stone-700 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                title="Siguiente"
              >
                <SkipForward size={16} />
              </button>
            </div>
          </div>
          <audio ref={audioRef} onEnded={playNextMusicTrack} />
        </div>

        {/* Moss Green Divider Line */}
        <div className="w-full h-[1px] bg-[#7A907E] opacity-50 mb-10" />

        {/* Minimal Nav - 2x2 Grid */}
        <nav className="grid grid-cols-2 gap-4 sm:gap-8 p-4 w-full max-w-2xl justify-center mx-auto">
          <NavItem view="magazine" label="Explorar" icon={Home} />
          <NavItem view="interviews" label="Entrevistas" icon={Mic} />
          <NavItem view="library" label="Archivos" icon={LibraryIcon} />
          {hasPodcast && onOpenPodcast && (
            <NavItem label="Podcast" icon={() => <span className="text-lg">🎙️</span>} onClick={onOpenPodcast} />
          )}
        </nav>
      </div>
    </header>
  );
});

export default Header;
