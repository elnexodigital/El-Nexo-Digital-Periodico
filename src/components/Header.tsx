import { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import { cleanMediaUrl, getCloudinaryUrl, CLOUDINARY_CLOUD_NAMES } from '../utils/mediaUtils.ts';
import ListenerCounter from './ListenerCounter.tsx';
import { Library as LibraryIcon, Home, Play, Pause, SkipForward } from 'lucide-react';
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
  getCloudinaryUrl('v1759387536/spot_10_segundos_completo_wsoeh1.mp4', CLOUDINARY_CLOUD_NAMES.SECONDARY_VIDEO),
  getCloudinaryUrl('v1755907719/animaci%C3%B3n_APP_pvxjop.mp4', CLOUDINARY_CLOUD_NAMES.VIDEO, 'video', 'w_1280,q_auto:good'),
  getCloudinaryUrl('v1756345297/14_okcuk0.mp4', CLOUDINARY_CLOUD_NAMES.VIDEO, 'video', 'w_1280,q_auto:good'),
  getCloudinaryUrl('v1756345296/13_debkpb.mp4', CLOUDINARY_CLOUD_NAMES.VIDEO, 'video', 'w_1280,q_auto:good'),
  getCloudinaryUrl('v1756345293/11_gud5kv.mp4', CLOUDINARY_CLOUD_NAMES.VIDEO, 'video', 'w_1280,q_auto:good'),
  getCloudinaryUrl('v1756345294/12_ringmi.mp4', CLOUDINARY_CLOUD_NAMES.VIDEO, 'video', 'w_1280,q_auto:good'),
  getCloudinaryUrl('v1756345294/9_ulzdcy.mp4', CLOUDINARY_CLOUD_NAMES.VIDEO, 'video', 'w_1280,q_auto:good'),
  getCloudinaryUrl('v1756345293/10_io3g8k.mp4', CLOUDINARY_CLOUD_NAMES.VIDEO, 'video', 'w_1280,q_auto:good'),
  getCloudinaryUrl('v1756345059/8_vng8sz.mp4', CLOUDINARY_CLOUD_NAMES.VIDEO, 'video', 'w_1280,q_auto:good'),
  getCloudinaryUrl('v1756345005/4_hczosi.mp4', CLOUDINARY_CLOUD_NAMES.VIDEO, 'video', 'w_1280,q_auto:good'),
  getCloudinaryUrl('v1756345005/6_jdroij.mp4', CLOUDINARY_CLOUD_NAMES.VIDEO, 'video', 'w_1280,q_auto:good'),
  getCloudinaryUrl('v1756345004/5_ivvibp.mp4', CLOUDINARY_CLOUD_NAMES.VIDEO, 'video', 'w_1280,q_auto:good'),
  getCloudinaryUrl('v1756345004/7_aw3cxt.mp4', CLOUDINARY_CLOUD_NAMES.VIDEO, 'video', 'w_1280,q_auto:good'),
  getCloudinaryUrl('v1756345003/3_thswfg.mp4', CLOUDINARY_CLOUD_NAMES.VIDEO, 'video', 'w_1280,q_auto:good'),
  getCloudinaryUrl('v1756345002/2_gthspn.mp4', CLOUDINARY_CLOUD_NAMES.VIDEO, 'video', 'w_1280,q_auto:good'),
  getCloudinaryUrl('v1756345001/1_ndgmbp.mp4', CLOUDINARY_CLOUD_NAMES.VIDEO, 'video', 'w_1280,q_auto:good'),
  getCloudinaryUrl('v1757874034/tu_compa%C3%B1%C3%ADa_247_srq9ah.mp4', CLOUDINARY_CLOUD_NAMES.VIDEO, 'video', 'w_1280,q_auto:good'),
  getCloudinaryUrl('v1757877430/tu_compa%C3%B1%C3%ADa3_aoreex.mp4', CLOUDINARY_CLOUD_NAMES.VIDEO, 'video', 'w_1280,q_auto:good'),
  getCloudinaryUrl('v1757877463/tu_compa%C3%B1%C3%ADa_4_jk7aeq.mp4', CLOUDINARY_CLOUD_NAMES.VIDEO, 'video', 'w_1280,q_auto:good'),
  getCloudinaryUrl('v1757877465/tu_compa%C3%B1%C3%ADa_5_x13zf0.mp4', CLOUDINARY_CLOUD_NAMES.VIDEO, 'video', 'w_1280,q_auto:good'),
  getCloudinaryUrl('v1757877467/tu_compa%C3%B1%C3%ADa_7_okxvw2.mp4', CLOUDINARY_CLOUD_NAMES.VIDEO, 'video', 'w_1280,q_auto:good'),
  getCloudinaryUrl('v1757877467/tu_compa%C3%B1%C3%ADa_6_kkiqlc.mp4', CLOUDINARY_CLOUD_NAMES.VIDEO, 'video', 'w_1280,q_auto:good'),
  getCloudinaryUrl('v1757877700/tu_compa%C3%B1%C3%ADa2_nalqjp.mp4', CLOUDINARY_CLOUD_NAMES.VIDEO, 'video', 'w_1280,q_auto:good'),
  getCloudinaryUrl('v1757877469/tu_compa%C3%B1%C3%ADa_8_bnqoa2.mp4', CLOUDINARY_CLOUD_NAMES.VIDEO, 'video', 'w_1280,q_auto:good'),
  getCloudinaryUrl('v1757877470/tu_compa%C3%B1%C3%ADa_9_iomwyb.mp4', CLOUDINARY_CLOUD_NAMES.VIDEO, 'video', 'w_1280,q_auto:good'),
  getCloudinaryUrl('v1757877473/tu_compa%C3%B1%C3%ADa_10_t5gpkm.mp4', CLOUDINARY_CLOUD_NAMES.VIDEO, 'video', 'w_1280,q_auto:good'),
  getCloudinaryUrl('v1757877508/tu_compa%C3%B1%C3%ADa_11_el38c4.mp4', CLOUDINARY_CLOUD_NAMES.VIDEO, 'video', 'w_1280,q_auto:good'),
  getCloudinaryUrl('v1774064355/marquesina_app1_aekb22.mp4', CLOUDINARY_CLOUD_NAMES.VIDEO),
  getCloudinaryUrl('v1774064347/marquesina_app9_ldnyru.mp4', CLOUDINARY_CLOUD_NAMES.VIDEO),
  getCloudinaryUrl('v1774064345/marquesina_app10_qgc8in.mp4', CLOUDINARY_CLOUD_NAMES.VIDEO),
  getCloudinaryUrl('v1774064345/marquesina_app7_ohnqqj.mp4', CLOUDINARY_CLOUD_NAMES.VIDEO),
  getCloudinaryUrl('v1774064344/marquesina_app6_hglg7r.mp4', CLOUDINARY_CLOUD_NAMES.VIDEO),
  getCloudinaryUrl('v1774064341/marquesina_app11_vacrxs.mp4', CLOUDINARY_CLOUD_NAMES.VIDEO),
  getCloudinaryUrl('v1774064341/marquesina_app5_rbxigs.mp4', CLOUDINARY_CLOUD_NAMES.VIDEO),
  getCloudinaryUrl('v1774064337/marquesina_app8_ecjgfn.mp4', CLOUDINARY_CLOUD_NAMES.VIDEO),
  getCloudinaryUrl('v1774064334/marquesina_app3_grkc5b.mp4', CLOUDINARY_CLOUD_NAMES.VIDEO),
  getCloudinaryUrl('v1774064333/marquesina_app2_cjf782.mp4', CLOUDINARY_CLOUD_NAMES.VIDEO),
  getCloudinaryUrl('v1774064329/marquesina_app4_a9cztq.mp4', CLOUDINARY_CLOUD_NAMES.VIDEO),
  getCloudinaryUrl('v1774064329/marquesina_app_vfb7wa.mp4', CLOUDINARY_CLOUD_NAMES.VIDEO),
];

const Header = forwardRef<HeaderControls, HeaderProps>(({
  currentView,
  onNavigate,
  onOpenPodcast,
  hasPodcast
}, ref) => {

  const NavItem = ({ view, label, icon: Icon, onClick, active }: { view?: any, label: string, icon: any, onClick?: () => void, active?: boolean }) => (
    <div className="flex flex-col items-center gap-1 sm:gap-2 px-2 sm:px-6 group relative">
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
  const [videoQueue, setVideoQueue] = useState(() => shuffleArray(VIDEO_URLS).map(url => cleanMediaUrl(url)));
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
        return shuffleArray(VIDEO_URLS).map(url => cleanMediaUrl(url));
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
      const newSrc = cleanMediaUrl(currentTrack.url);

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
    newsAudioRef.current = new Audio(cleanMediaUrl(broadcast.url));
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
        
        const encodedUrl = cleanMediaUrl(greetingUrl);

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
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-stone-800 text-white border border-white/20 shadow-lg hover:bg-stone-700 transition-all hover:scale-105 active:scale-95"
              >
                {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
              </button>

              <button 
                onClick={handleChangeVibe}
                className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-stone-800/50 text-white border border-white/10 shadow-md hover:bg-stone-700 transition-all hover:scale-105 active:scale-95"
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

        {/* Minimal Nav - Responsive Grid */}
        <nav className="flex flex-wrap justify-center gap-4 sm:gap-8 p-4 w-full max-w-4xl mx-auto">
          <NavItem view="magazine" label="Explorar" icon={Home} />
          <NavItem view="library" label="Biblioteca" icon={LibraryIcon} />
          {hasPodcast && onOpenPodcast && (
            <NavItem label="Video Podcast" icon={() => <span className="text-lg">🎙️</span>} onClick={onOpenPodcast} />
          )}
        </nav>
      </div>
    </header>
  );
});

export default Header;
