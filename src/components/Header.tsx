import { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import { motion } from 'motion/react';
import ListenerCounter from './ListenerCounter.tsx';
import { Home, Play, Pause, SkipForward, BookOpen, Mic } from 'lucide-react';
import type { MusicTrack, HeaderControls, NewsBroadcast, PodcastMP3 } from '../types.ts';

// Static Imports for Radio Data
import { GREETING_AUDIOS } from '../greetings.ts';
import { NEWS_BROADCASTS } from '../data/broadcasts.ts';
import { 
  ONLY_GENERAL, 
  ONLY_LEO, 
  ONLY_PODCASTS, 
  ONLY_JINGLES, 
  ONLY_SEPARATORS
} from '../data/music.ts';
import { PODCASTS_MP3 } from '../data/podcastsMP3.ts';

interface HeaderProps {
  currentView: 'magazine' | 'library';
  onNavigate: (view: 'magazine' | 'library') => void;
  onOpenPodcast?: () => void;
  hasPodcast?: boolean;
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
  'https://res.cloudinary.com/dus9zcgen/video/upload/v1783795280/3_idau6v.mp4',
  'https://res.cloudinary.com/dus9zcgen/video/upload/v1783795263/9_csxhey.mp4',
  'https://res.cloudinary.com/dus9zcgen/video/upload/v1783795268/10_unxnjq.mp4',
  'https://res.cloudinary.com/dus9zcgen/video/upload/v1783795264/8_rn9ldc.mp4',
  'https://res.cloudinary.com/dus9zcgen/video/upload/v1783795257/1_dyovqt.mp4',
  'https://res.cloudinary.com/dus9zcgen/video/upload/v1783795214/4_btsrz2.mp4',
  'https://res.cloudinary.com/dus9zcgen/video/upload/v1783795213/2_afasek.mp4',
  'https://res.cloudinary.com/dus9zcgen/video/upload/v1783795212/5_jwvrlu.mp4',
  'https://res.cloudinary.com/dus9zcgen/video/upload/v1783795196/6_nscbvc.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1774064355/marquesina_app1_aekb22.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1774064347/marquesina_app9_ldnyru.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1774064345/marquesina_app10_qgc8in.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1774064345/marquesina_app7_ohnqqj.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1774064344/marquesina_app6_hglg7r.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1774064341/marquesina_app11_vacrxs.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1774064341/marquesina_app5_rbxigs.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1774064337/marquesina_app8_ecjgfn.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1774064334/marquesina_app3_grkc5b.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1774064333/marquesina_app2_cjf782.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1774064329/marquesina_app4_a9cztq.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1774064329/marquesina_app_vfb7wa.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1757877700/tu_compa%C3%B1%C3%ADa2_nalqjp.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1757877508/tu_compa%C3%B1%C3%ADa_11_el38c4.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1757877473/tu_compa%C3%B1%C3%ADa_10_t5gpkm.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1757877470/tu_compa%C3%B1%C3%ADa_9_iomwyb.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1757877469/tu_compa%C3%B1%C3%ADa_8_bnqoa2.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1757877467/tu_compa%C3%B1%C3%ADa_7_okxvw2.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1757877467/tu_compa%C3%B1%C3%ADa_6_kkiqlc.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1757877465/tu_compa%C3%B1%C3%ADa_5_x13zf0.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1757877463/tu_compa%C3%B1%C3%ADa_4_jk7aeq.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1757877430/tu_compa%C3%B1%C3%ADa3_aoreex.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1757874034/tu_compa%C3%B1%C3%ADa_247_srq9ah.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345297/14_okcuk0.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345296/13_debkpb.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345294/12_ringmi.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345293/11_gud5kv.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345293/10_io3g8k.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345294/9_ulzdcy.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345059/8_vng8sz.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345004/7_aw3cxt.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345005/6_jdroij.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345004/5_ivvibp.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345005/4_hczosi.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345003/3_thswfg.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345002/2_gthspn.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345001/1_ndgmbp.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756344401/spot_10_segundos_completo_gtdtqu.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756344390/spot10_segundos_completo_zsk1g7.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756344378/spot_10_segundos_completo_hhoeeb.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756344292/spot_10_segundos_completo_bkagma.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756344282/spot10segundos_completo_rku0iy.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756344274/spot_10_segundos_completo_fzdqlg.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756344264/spot_10_segundos_completo_kmryb2.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756344252/spot_10_segundos_yirf7x.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1755907719/animaci%C3%B3n_APP_pvxjop.mp4',
];

const Header = forwardRef<HeaderControls, HeaderProps>(({
  currentView,
  onNavigate,
  onOpenPodcast,
  hasPodcast
}, ref) => {

  const NavItem = ({ view, label, icon: Icon, onClick, active }: { view?: any, label: string, icon: any, onClick?: () => void, active?: boolean }) => {
    const isActive = active || currentView === view;
    return (
      <div className="flex flex-col items-center gap-2 group relative">
        <button
          onClick={onClick || (() => onNavigate(view))}
          className={`w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full transition-all duration-500 shadow-xl border-2 ${isActive
            ? 'bg-white text-stone-900 border-white shadow-[0_0_25px_rgba(255,255,255,0.4)] scale-110'
            : 'bg-stone-800/40 text-stone-400 border-white/10 hover:bg-stone-700 hover:text-white hover:border-white/40 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]'
            }`}
        >
          <Icon size={isActive ? 28 : 24} strokeWidth={isActive ? 2.5 : 1.5} />
        </button>
        <span className={`text-[10px] font-bold tracking-[0.3em] uppercase transition-all duration-300 mt-1 ${isActive ? 'opacity-100 text-stone-200 translate-y-0' : 'opacity-50 group-hover:opacity-100 text-stone-400 group-hover:text-stone-200 translate-y-1 group-hover:translate-y-0'}`}>
          {label}
        </span>
        {isActive && (
          <motion.div 
            layoutId="nav-indicator"
            className="absolute -bottom-3 w-8 h-1 rounded-full bg-stone-200 shadow-[0_0_10px_rgba(255,255,255,0.4)]" 
          />
        )}
      </div>
    );
  };

  const [currentDate, setCurrentDate] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGreetingPlaying, setIsGreetingPlaying] = useState(false);
  const [videoQueue, setVideoQueue] = useState(() => shuffleArray(VIDEO_URLS));
  const [musicQueue, setMusicQueue] = useState<MusicTrack[]>([]);
  const [hasGreetingPlayed, setHasGreetingPlayed] = useState(false);
  const [playedBroadcasts, setPlayedBroadcasts] = useState<Record<number, boolean>>({});
  const [activeBroadcast, setActiveBroadcast] = useState<NewsBroadcast | null>(null);
  const [activePodcastMP3, setActivePodcastMP3] = useState<PodcastMP3 | null>(null);
  const [blacklistedTracks, setBlacklistedTracks] = useState<Set<string>>(new Set());

  const audioRef = useRef<HTMLAudioElement>(null);
  const greetingAudioRef = useRef<HTMLAudioElement | null>(null);
  const newsAudioRef = useRef<HTMLAudioElement | null>(null);
  const separatorAudioRef = useRef<HTMLAudioElement | null>(null);
  const podcastMP3AudioRef = useRef<HTMLAudioElement | null>(null);
  const commercialJingleAudioRef = useRef<HTMLAudioElement | null>(null);
  const timeJingleAudioRef = useRef<HTMLAudioElement | null>(null);
  const musicVolumeRef = useRef(1.0);

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
    const balancedQueue = generateBalancedQueue();
    setMusicQueue(balancedQueue);
  }, []);

  // Función para generar una cola de reproducción balanceada (Reloj de Radio)
  const generateBalancedQueue = () => {
    const queue: MusicTrack[] = [];
    const generalMusic = shuffleArray([...ONLY_GENERAL]);
    const leoMusic = shuffleArray([...ONLY_LEO]);
    const podcasts = shuffleArray([...ONLY_PODCASTS]);
    const jingles = shuffleArray([...ONLY_JINGLES]);
    const separators = shuffleArray([...ONLY_SEPARATORS]);
    const allGreetingUrls = [
      ...(GREETING_AUDIOS.morning || []),
      ...(GREETING_AUDIOS.afternoon || []),
      ...(GREETING_AUDIOS.night || [])
    ];

    const greetings = shuffleArray([...allGreetingUrls.map((url: string, i: number) => ({
      id: `greeting_${i}`,
      url,
      description: 'SALUDO - El Nexo Digital'
    }))]);

    // Índices para llevar cuenta de lo usado
    let gIdx = 0, lIdx = 0, pIdx = 0, jIdx = 0, sIdx = 0, grIdx = 0;

    // Generamos 60 bloques para una cola extensa (~24 horas de programación)
    for (let i = 0; i < 60; i++) {
      // 1. Identidad (Separador)
      if (separators.length > 0) queue.push(separators[sIdx++ % separators.length]);
      
      // 2. Bloque de música (3 temas generales)
      for (let k = 0; k < 3; k++) {
        if (generalMusic.length > 0) queue.push(generalMusic[gIdx++ % generalMusic.length]);
      }

      // 3. Contenido Especial (Alternamos Podcast y Leo cada bloque)
      if (i % 2 === 0) {
        if (podcasts.length > 0) queue.push(podcasts[pIdx++ % podcasts.length]);
      } else {
        if (leoMusic.length > 0) queue.push(leoMusic[lIdx++ % leoMusic.length]);
      }

      // 4. Más música (2 temas generales)
      for (let k = 0; k < 2; k++) {
        if (generalMusic.length > 0) queue.push(generalMusic[gIdx++ % generalMusic.length]);
      }

      // 5. Jingle / Publicidad
      if (jingles.length > 0) queue.push(jingles[jIdx++ % jingles.length]);

      // 6. Saludo (Cada 3 bloques para no saturar)
      if (greetings.length > 0 && i % 3 === 0) {
        queue.push(greetings[grIdx++ % greetings.length]);
      }
    }

    return queue;
  };

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
        if (prevQueue.length <= 1) {
            return generateBalancedQueue();
        }
        return prevQueue.slice(1);
    });
  }, []);

  // Ref para evitar ciclos infinitos en el useEffect de música
  const lastPlayedSrcRef = useRef<string>('');

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleMediaError = () => {
        const failedSrc = audio.src;
        console.warn(`Audio error for: ${failedSrc}. Skipping track...`);
        
        const trackId = musicQueue[0]?.id;
        if (trackId) {
          setBlacklistedTracks(prev => new Set(prev).add(trackId));
        }
        
        playNextMusicTrack();
    };

    const handleStalled = () => {
        console.warn(`Audio stalled for: ${audio.src}. Skipping...`);
        playNextMusicTrack();
    };

    audio.addEventListener('error', handleMediaError);
    audio.addEventListener('stalled', handleStalled);

    const currentTrack = musicQueue[0];
    
    if (!currentTrack) return;

    if (blacklistedTracks.has(currentTrack.id)) {
      playNextMusicTrack();
      return;
    }

    const shouldPlayMusic = isPlaying && !isGreetingPlaying && !activeBroadcast;

    if (shouldPlayMusic) {
      const newSrc = currentTrack.url;

      // Solo actualizamos el src si ha cambiado realmente
      if (lastPlayedSrcRef.current !== newSrc) {
        console.log(`Playing next track: ${currentTrack.description} (${currentTrack.id})`);
        lastPlayedSrcRef.current = newSrc;
        
        // Actualizar UI de podcast si corresponde
        if (currentTrack.id.startsWith('podcast_mp3_')) {
          const podcastId = currentTrack.id.replace('podcast_mp3_', '');
          const podcastData = PODCASTS_MP3.find(p => String(p.id) === podcastId);
          if (podcastData) {
            console.log("Active Podcast Detected:", podcastData.title);
            setActivePodcastMP3(podcastData);
          }
        } else {
          setActivePodcastMP3(null);
        }

        audio.src = newSrc;
        audio.load();
      }

      if (audio.paused) {
        audio.play().catch(error => {
          if (error.name !== 'AbortError') {
            console.warn(`Playback failed for ${newSrc}, skipping...`);
            setBlacklistedTracks(prev => new Set(prev).add(currentTrack.id));
            playNextMusicTrack();
          }
        });
      }
    } else {
      if (!audio.paused) {
        audio.pause();
      }
    }
    
    return () => {
      audio.removeEventListener('error', handleMediaError);
      audio.removeEventListener('stalled', handleStalled);
    };
  }, [musicQueue[0]?.id, isPlaying, isGreetingPlaying, activeBroadcast, playNextMusicTrack]);

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
      const now = new Date();
      const hour = now.getHours();
      const minutes = now.getMinutes();
      if (hour === 0 && minutes === 0) {
        if (Object.keys(playedBroadcasts).length > 0) {
          setPlayedBroadcasts({});
        }
        return;
      }
      const broadcast = NEWS_BROADCASTS[hour];
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
  }, [playedBroadcasts, playBroadcast, isPlaying]);

  // Eliminamos el intervalo de podcasts aleatorios para que se manejen 
  // exclusivamente a través de la cola balanceada (generateBalancedQueue)
  // Esto evita que se interrumpa la música y que suenen podcasts continuamente.

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
    const timeOfDay = getGreetingTimeOfDay();
    if (!timeOfDay) return null;
    const greetings = GREETING_AUDIOS[timeOfDay];
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
        
        const encodedUrl = greetingUrl;

        greetingAudioRef.current = new Audio(encodedUrl);
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
  const currentArtist = isPlaying ? (activePodcastMP3?.artist || 'El Nexo Digital Radio') : 'El Nexo Digital Radio';

  return (
    <header className="z-50 w-full pt-4 sm:pt-10 px-4 flex flex-col items-center mb-0">
      <div className="bg-stone-900/90 backdrop-blur-xl px-4 sm:px-16 py-6 sm:py-12 rounded-3xl relative flex flex-col items-center max-w-5xl w-full border border-white/10 shadow-2xl overflow-hidden">
        
        <div className="text-center space-y-4 mb-8">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-5xl sm:text-7xl font-signature text-[#DFB57A] mb-2 drop-shadow-lg">
              El Nexo Digital
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-1">
              <span className="text-[14px] sm:text-[16px] font-serif italic text-stone-300 tracking-tight">mucho más que un podcast</span>
              <span className="hidden sm:inline text-stone-600">•</span>
              <ListenerCounter />
            </div>
            <span className="text-[10px] font-mono text-stone-400/80 tracking-widest uppercase pt-2 font-bold">{currentDate}</span>
          </div>
        </div>

        {/* Combined Player Container (Video + Radio) */}
        <div className="w-full max-w-[1080px] mb-12 flex flex-col overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 shadow-2xl bg-black mx-auto">
          {/* Video Player - Exact 1080x336 Aspect Ratio */}
          <div className="w-full aspect-[1080/336] relative bg-black overflow-hidden">
            <video
              key={videoQueue[0]}
              src={videoQueue[0]}
              autoPlay
              muted
              loop={!!activeBroadcast}
              playsInline
              crossOrigin="anonymous"
              onEnded={activeBroadcast ? undefined : selectNextVideo}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Radio Player Bar - Simple, clean style */}
          <div className="flex flex-col w-full bg-stone-900">
            {/* Full Width Marquee on Top */}
            <div className="bg-black/40 border-t border-white/5 py-2 overflow-hidden">
              <div className="marquee-container">
                <div className="marquee-content marquee-slow">
                  <span className="text-emerald-400/80 font-normal text-xs md:text-sm uppercase tracking-[0.4em] font-mono whitespace-nowrap leading-none">
                    {currentArtist} — {currentTitle} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {currentArtist} — {currentTitle} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {currentArtist} — {currentTitle}
                  </span>
                </div>
              </div>
            </div>

            {/* Controls Area - Centered and Styled */}
            <div className="p-6 flex items-center justify-center border-t border-white/5 relative">
              <div className="flex items-center gap-12">
                <button 
                  onClick={togglePlayPause}
                  className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-white text-stone-900 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:bg-stone-100 transition-all hover:scale-110 active:scale-95 border-4 border-white/30 group relative"
                  title={isPlaying ? "Pausar" : "Reproducir"}
                >
                  <div className="absolute inset-0 rounded-full bg-white/20 animate-ping group-hover:hidden" />
                  {isPlaying ? (
                    <Pause size={32} fill="currentColor" />
                  ) : (
                    <Play size={32} fill="currentColor" className="ml-1" />
                  )}
                </button>

                <button 
                  onClick={handleChangeVibe}
                  className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-stone-800 text-white border-2 border-white/10 shadow-xl hover:bg-stone-700 transition-all hover:scale-110 active:scale-95 hover:border-white/30"
                  title="Siguiente"
                >
                  <SkipForward size={24} />
                </button>
              </div>
            </div>
          </div>
          <audio ref={audioRef} onEnded={playNextMusicTrack} />
        </div>

        {/* Moss Green Divider Line */}
        <div className="w-full h-[1px] bg-[#7A907E] opacity-50 mb-10" />

        {/* Minimal Nav - Consistent Style */}
        <nav className="flex flex-wrap justify-center gap-6 sm:gap-12 p-4 w-full max-w-4xl mx-auto">
          <NavItem view="magazine" label="Explorar" icon={Home} />
          <NavItem view="library" label="Biblioteca" icon={BookOpen} />
          {hasPodcast && onOpenPodcast && (
            <NavItem label="Video Podcast" icon={Mic} onClick={onOpenPodcast} />
          )}
        </nav>
      </div>
    </header>
  );
});

export default Header;
