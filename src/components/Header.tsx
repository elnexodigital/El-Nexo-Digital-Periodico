import { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import { Home, Play, Pause, SkipForward, BookOpen, Mic, Search } from 'lucide-react';
import type { MusicTrack, HeaderControls, NewsBroadcast, PodcastMP3 } from '../types.ts';

// Static Imports for Radio Data
import { GREETING_AUDIOS } from '../greetings.ts';
import { NEWS_BROADCASTS } from '../data/broadcasts.ts';
import { 
  ONLY_GENERAL, 
  ONLY_LEO, 
  ONLY_PODCASTS, 
  ONLY_MICROPROGRAMS,
  ONLY_JINGLES, 
  ONLY_SEPARATORS
} from '../data/music.ts';
import { PODCASTS_MP3 } from '../data/podcastsMP3.ts';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenSearch?: () => void;
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
  onOpenSearch
}, ref) => {

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
    const microprograms = shuffleArray([...ONLY_MICROPROGRAMS]);
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

    // Usamos pools de rotación que se recargan barajados cada vez que se agotan
    // para garantizar que suenen TODAS las canciones y audios sin repetir patrones fijos
    let gPool = [...generalMusic];
    let lPool = [...leoMusic];
    let pPool = [...podcasts];
    let mPool = [...microprograms];
    let jPool = [...jingles];
    let sPool = [...separators];
    let grPool = [...greetings];

    const getNext = (pool: MusicTrack[], source: MusicTrack[]) => {
      if (source.length === 0) return null;
      if (pool.length === 0) {
        pool.push(...shuffleArray([...source]));
      }
      return pool.shift() || null;
    };

    // Generamos 60 bloques (~24 horas completas de rotación variada)
    for (let i = 0; i < 60; i++) {
      // 1. Identidad (Separador / Sintonía)
      const sep = getNext(sPool, separators);
      if (sep) queue.push(sep);

      // 2. Bloque de música inicial (2 temas generales variados)
      for (let k = 0; k < 2; k++) {
        const gm = getNext(gPool, generalMusic);
        if (gm) queue.push(gm);
      }

      // 3. SEGMENTO MICROPROGRAMA + PUBLICIDAD OBLIGATORIA INMEDIATA
      const micro = getNext(mPool, microprograms);
      if (micro) {
        queue.push(micro);
        // REGLA ESTRICTA: Tras el microprograma va inmediatamente la tanda publicitaria
        const jinglePostMicro = getNext(jPool, jingles);
        if (jinglePostMicro) queue.push(jinglePostMicro);
      }

      // 4. Bloque de música intermedio (2 temas generales)
      for (let k = 0; k < 2; k++) {
        const gm = getNext(gPool, generalMusic);
        if (gm) queue.push(gm);
      }

      // 5. Contenido Especial (Alternancia Podcast completo / Leo Castrillo)
      if (i % 2 === 0) {
        const pod = getNext(pPool, podcasts);
        if (pod) queue.push(pod);
      } else {
        const leo = getNext(lPool, leoMusic);
        if (leo) queue.push(leo);
      }

      // 6. Tema de cierre de bloque (1 tema general)
      const gmEnd = getNext(gPool, generalMusic);
      if (gmEnd) queue.push(gmEnd);

      // 7. Jingle / Publicidad regular
      const jingle = getNext(jPool, jingles);
      if (jingle) queue.push(jingle);

      // 8. Saludo (Cada 3 bloques)
      if (i % 3 === 0) {
        const gr = getNext(grPool, greetings);
        if (gr) queue.push(gr);
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
      const currentTrack = prevQueue[0];
      const remaining = prevQueue.slice(1);

      // Si el track que acaba de terminar era un microprograma de radio:
      // Aseguramos que SIEMPRE el siguiente audio sea un aviso publicitario (Jingle)
      const isMicroProgram = currentTrack && (
        currentTrack.id.startsWith('micro_') ||
        (currentTrack.description && currentTrack.description.toUpperCase().includes('MICROPROGRAMA'))
      );

      if (isMicroProgram) {
        const nextIsJingle = remaining[0] && (
          remaining[0].id.startsWith('jingle_') ||
          (remaining[0].description && (
            remaining[0].description.toUpperCase().includes('PUBLICITARIO') ||
            remaining[0].description.toUpperCase().includes('COMERCIAL') ||
            remaining[0].description.toUpperCase().includes('JINGLE')
          ))
        );

        if (!nextIsJingle && ONLY_JINGLES.length > 0) {
          const randomJingle = ONLY_JINGLES[Math.floor(Math.random() * ONLY_JINGLES.length)];
          return [randomJingle, ...remaining];
        }
      }

      if (remaining.length <= 1) {
        return generateBalancedQueue();
      }
      return remaining;
    });
  }, []);

  // Ref para evitar ciclos infinitos en el useEffect de música
  const lastPlayedSrcRef = useRef<string>('');
  const stalledTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

    // Stalled: no saltamos inmediatamente ante un breve buffer; damos 5 segundos antes de avanzar
    const handleStalled = () => {
        if (stalledTimeoutRef.current) clearTimeout(stalledTimeoutRef.current);
        stalledTimeoutRef.current = setTimeout(() => {
          if (audio.readyState < 2 && !audio.paused) {
            console.warn(`Audio playback stalled persistently for: ${audio.src}. Skipping...`);
            playNextMusicTrack();
          }
        }, 5000);
    };

    const handlePlaying = () => {
      if (stalledTimeoutRef.current) {
        clearTimeout(stalledTimeoutRef.current);
        stalledTimeoutRef.current = null;
      }
    };

    audio.addEventListener('error', handleMediaError);
    audio.addEventListener('stalled', handleStalled);
    audio.addEventListener('playing', handlePlaying);

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
      audio.removeEventListener('playing', handlePlaying);
      if (stalledTimeoutRef.current) {
        clearTimeout(stalledTimeoutRef.current);
      }
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

  const [listenerCount, setListenerCount] = useState(() => Math.floor(Math.random() * (142 - 85 + 1)) + 85);

  useEffect(() => {
    const interval = setInterval(() => {
      setListenerCount(Math.floor(Math.random() * (142 - 85 + 1)) + 85);
    }, 40000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="z-30 w-full pt-2 sm:pt-4 px-2 sm:px-4 flex flex-col items-center mb-2">
      {/* Barra superior mínima con marca y estado de transmisión */}
      <div className="w-full max-w-5xl flex items-center justify-between px-3 py-1.5 mb-1.5 text-xs text-stone-400">
        <div 
          onClick={() => onNavigate('hub')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
          <span className="font-serif tracking-wider uppercase text-amber-200/90 font-bold group-hover:text-amber-100 transition-colors">
            El Nexo Digital
          </span>
          <span className="hidden sm:inline text-stone-600 font-mono">|</span>
          <span className="hidden sm:inline text-[10px] font-mono tracking-widest uppercase text-stone-400">
            Ateneo & Radio Cultural
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-900 border border-white/10 hover:border-amber-400/40 text-stone-300 hover:text-amber-300 text-[10px] font-mono uppercase transition-colors"
              title="Buscar por contexto o tema en todo El Nexo"
            >
              <Search size={12} />
              <span className="hidden sm:inline">Buscar por tema</span>
            </button>
          )}

          {isPlaying ? (
            <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Al Aire
            </span>
          ) : (
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 bg-stone-900/60 px-2 py-0.5 rounded-full border border-white/5">
              Pausa
            </span>
          )}
        </div>
      </div>

      {/* Contenedor principal compacto del reproductor (Video + Marquesina + Controles Play/Avance + Navegación) */}
      <div className="w-full max-w-5xl bg-stone-900/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
        
        {/* 1. Pantalla de Video - Totalmente limpia y despejada (sin botones ni textos flotantes encima) */}
        <div className="w-full aspect-[1080/380] sm:aspect-[1080/340] relative bg-black overflow-hidden">
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

        {/* 2. Marquesina viva continua - Contador de audiencia y fecha incorporados directamente en el texto */}
        <div className="bg-black/95 border-y border-amber-500/30 py-2.5 overflow-hidden shadow-inner">
          <div className="marquee-container">
            <div className="marquee-content marquee-slow">
              <span className="text-amber-300 font-mono text-xs uppercase tracking-[0.25em] whitespace-nowrap leading-none font-semibold">
                🟢 HAY {listenerCount} NEXÓLOGOS EN LÍNEA, BIENVENIDOS &nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp; {currentDate} &nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp; SONANDO: {currentArtist} — {currentTitle} &nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp; EL NEXO DIGITAL RADIO &nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp; 🟢 HAY {listenerCount} NEXÓLOGOS EN LÍNEA, BIENVENIDOS &nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp; {currentDate} &nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp; SONANDO: {currentArtist} — {currentTitle} &nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;
              </span>
            </div>
          </div>
        </div>

        {/* 3. Botones de Play y Avance - Debajo de la marquesina con diseño táctil y paleta de color diferenciada */}
        <div className="px-3 py-2.5 sm:px-6 sm:py-3.5 bg-stone-900/90 border-b border-white/5 flex items-center justify-between flex-wrap gap-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-stone-200">
              Radio En Vivo
            </span>
            <span className="hidden sm:inline text-stone-600 font-mono">•</span>
            <span className="hidden sm:inline text-[10px] font-mono text-stone-400 uppercase tracking-widest">
              Emisión 24/7
            </span>
          </div>

          {/* Grupo de control Play y Avance */}
          <div className="flex items-center gap-3">
            {/* Botón PLAY / PAUSA: Destacado, táctil y con color de estado */}
            <button 
              onClick={togglePlayPause}
              className={`px-5 py-2.5 sm:px-6 sm:py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg hover:scale-105 active:scale-95 ${
                isPlaying
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-stone-950 border border-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                  : 'bg-amber-400 hover:bg-amber-300 text-stone-950 border border-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.4)]'
              }`}
              title={isPlaying ? "Pausar emisión" : "Escuchar emisión"}
            >
              {isPlaying ? (
                <>
                  <Pause size={16} fill="currentColor" />
                  <span>Pausar</span>
                </>
              ) : (
                <>
                  <Play size={16} fill="currentColor" className="ml-0.5" />
                  <span>Escuchar</span>
                </>
              )}
            </button>

            {/* Botón AVANCE / SIGUIENTE TEMA: Con color contrastante para no confundir */}
            <button 
              onClick={handleChangeVibe}
              className="px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-amber-300 hover:text-white border border-amber-500/40 transition-all hover:scale-105 active:scale-95 shadow-md"
              title="Avanzar al siguiente tema"
            >
              <SkipForward size={16} />
              <span>Avance</span>
            </button>
          </div>

          <div className="text-[10px] font-mono text-stone-400 hidden sm:block">
            <span className="text-amber-400/90 font-medium">Sintonía Continua</span>
          </div>
        </div>

        {/* 4. Botones de Navegación de Contenidos - Colores temáticos diferenciados por formato */}
        <div className="p-2 sm:p-2.5 bg-stone-950/95 flex items-center justify-center gap-1.5 sm:gap-2.5 flex-wrap">
          <button
            onClick={() => onNavigate('hub')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 ${
              currentView === 'hub'
                ? 'bg-stone-200 text-stone-950 shadow-md font-bold'
                : 'bg-stone-900/80 text-stone-400 border border-white/5 hover:bg-stone-800 hover:text-stone-200'
            }`}
          >
            <Home size={13} />
            <span>Inicio</span>
          </button>

          <button
            onClick={() => onNavigate('revistas')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 ${
              currentView === 'revistas'
                ? 'bg-rose-600 text-white shadow-[0_0_15px_rgba(225,29,72,0.4)] font-bold'
                : 'bg-rose-950/40 text-rose-300 border border-rose-500/30 hover:bg-rose-900/50 hover:text-rose-100'
            }`}
          >
            <BookOpen size={13} />
            <span>Revista Digital</span>
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse ml-0.5" />
          </button>

          <button
            onClick={() => onNavigate('podcasts-mp4')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 ${
              currentView === 'podcasts-mp4'
                ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)] font-bold'
                : 'bg-purple-950/40 text-purple-300 border border-purple-500/30 hover:bg-purple-900/50 hover:text-purple-100'
            }`}
          >
            <Mic size={13} />
            <span>Podcast MP4</span>
          </button>

          <button
            onClick={() => onNavigate('podcasts-mp3')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 ${
              currentView === 'podcasts-mp3'
                ? 'bg-amber-500 text-stone-950 shadow-[0_0_15px_rgba(245,158,11,0.4)] font-bold'
                : 'bg-amber-950/40 text-amber-300 border border-amber-500/30 hover:bg-amber-900/50 hover:text-amber-100'
            }`}
          >
            <span className="text-xs">🎧</span>
            <span>Podcast MP3</span>
          </button>
        </div>

        <audio ref={audioRef} onEnded={playNextMusicTrack} />
      </div>
    </header>
  );
});

export default Header;
