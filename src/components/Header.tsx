import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import type { MusicTrack, HeaderControls, PodcastMP3 } from '../types.ts';
import FloatingPodcastButton from './FloatingPodcastButton.tsx';
import ListenerCounter from './ListenerCounter.tsx';

// Cola de videos MP4 para el fondo del reproductor (incluye clips cinemáticos de postales)
const VIDEO_URLS: string[] = [
  'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1755907719/animaci%C3%B3n_APP_pvxjop.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1756345297/14_okcuk0.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1757874034/tu_compa%C3%B1%C3%ADa_247_srq9ah.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1756612883/Vienen_las_Noticias_ujmv2i.mp4',
  'https://res.cloudinary.com/dnauavz56/video/upload/v1764950849/postales2_mdcweq.mp4',
  'https://res.cloudinary.com/dnauavz56/video/upload/v1764980525/atardecer_en_puerto_ikddmm.mp4'
];

interface HeaderProps {
  isPodcastModalOpen: boolean;
  onPodcastButtonClick: () => void;
  showPodcastButton: boolean;
  onLibraryButtonClick: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const Header = forwardRef<HeaderControls, HeaderProps>((props, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [musicQueue, setMusicQueue] = useState<MusicTrack[]>([]);
  const [videoQueue, setVideoQueue] = useState<string[]>(() => [...VIDEO_URLS].sort(() => Math.random() - 0.5));
  const [activePodcast] = useState<PodcastMP3 | null>(null);

  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const init = async () => {
      try {
        // MUSIC_TRACKS ahora contiene: Música + Podcasts Audio + Jingles + Separadores
        const { MUSIC_TRACKS } = await import('../data/music.ts');
        setMusicQueue([...MUSIC_TRACKS].sort(() => Math.random() - 0.5));
      } catch (e) {
        console.error("Error cargando radio:", e);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

  useEffect(() => {
    const handleRemotePause = () => {
      if (isPlaying && audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };
    window.addEventListener('pauseRadio', handleRemotePause);
    return () => window.removeEventListener('pauseRadio', handleRemotePause);
  }, [isPlaying]);

  const currentTrack = musicQueue[0];
  const currentVideoUrl = videoQueue[0];

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(e => {
          console.warn("Reproducción bloqueada:", e);
          setIsPlaying(false);
        });
      }
    }
  }, [currentTrack]);

  const togglePlay = () => {
    if (isLoading || !audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => {
          console.warn("Play bloqueado:", e);
          setIsPlaying(false);
        });
    }
  };

  useImperativeHandle(ref, () => ({
    playRadio: () => { if (!isPlaying) togglePlay(); },
    pauseRadio: () => { if (isPlaying) togglePlay(); },
    getIsPlayingState: () => isPlaying
  }));

  const nextTrack = () => {
    setMusicQueue(prev => {
      if (prev.length <= 1) return prev;
      const [first, ...rest] = prev;
      return [...rest, first];
    });
    nextVideo();
  };

  const nextVideo = () => {
    setVideoQueue(prev => {
      if (prev.length <= 1) return prev;
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

  const displayTitle = activePodcast?.title || currentTrack?.description || "Sintonizando El Nexo Digital...";
  const displayArtist = activePodcast?.artist || (isLoading ? "Cargando..." : "RADIO EN VIVO");

  return (
    <header className="text-center relative select-none">
      <div className="gift-ribbon-wrapper">
        <div className="gift-ribbon">¡REGALOS EN BIBLIOTECA!</div>
      </div>

      <ListenerCounter />

      <div className="py-6 border-b-4 border-double border-stone-800 dark:border-stone-400">
        <img src="https://res.cloudinary.com/ddmj6zevz/image/upload/f_auto,q_auto:good/v1756714882/logo_el_nexo_digital_assa82.png" alt="Logo" className="mx-auto h-20 mb-2" />
        <h1 className="text-5xl md:text-7xl newspaper-title">El Nexo Digital</h1>
        
        <p className="text-[#dc2626] dark:text-[#ef4444] mt-2 text-sm uppercase tracking-[0.2em] font-black italic">
          Aplicación en desarrollo
        </p>
        
        <div className="flex justify-center items-center gap-4 mt-4">
          <p className="text-xs font-bold opacity-70 uppercase">{new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
          <button onClick={props.onToggleDarkMode} className="theme-switcher">
            {props.isDarkMode ? '🌞' : '🌙'}
          </button>
        </div>
      </div>

      <div className="my-4 overflow-hidden border-b-4 border-double border-stone-800 dark:border-stone-400 relative bg-black aspect-[1080/337] shadow-inner">
        <video 
          ref={videoRef}
          key={currentVideoUrl}
          src={currentVideoUrl} 
          autoPlay 
          muted 
          playsInline 
          onEnded={nextVideo}
          className="w-full h-full object-cover transition-opacity duration-1000"
        />
        
        <div className="absolute inset-0 flex items-center justify-between px-4 md:px-12 bg-gradient-to-r from-black/60 via-transparent to-black/60">
          <button 
            onClick={togglePlay}
            disabled={isLoading}
            className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border-2 border-white/30 text-white hover:bg-red-700/80 hover:border-red-500 transition-all shadow-xl disabled:opacity-50 hover:scale-110 active:scale-95 z-10 group/play"
          >
            {isPlaying ? (
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v4a1 1 0 11-2 0V8z" /></svg>
            ) : (
              <svg className="w-10 h-10 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" /></svg>
            )}
          </button>

          <div className="flex-1 text-center px-4 overflow-hidden text-white">
            <h3 className="font-bold text-lg md:text-2xl truncate uppercase tracking-tighter drop-shadow-lg">{displayArtist}</h3>
            <div className="marquee-container mt-1">
              <div className="marquee-content font-typewriter italic text-sm md:text-base bg-black/10 py-1">
                {displayTitle} <span className="mx-8 opacity-50">•</span> {displayTitle}
              </div>
            </div>
          </div>

          <button 
            onClick={nextTrack}
            className="px-4 py-2 text-xs md:text-sm border-2 border-white/50 text-white rounded-full hover:bg-white hover:text-black transition-all font-bold uppercase backdrop-blur-md shadow-lg z-10"
          >
            Cambiar onda
          </button>
        </div>
      </div>

      <audio ref={audioRef} src={currentTrack?.url} onEnded={nextTrack} onError={nextTrack} />

      <div className="py-8 flex flex-wrap justify-center items-center gap-12 md:gap-20">
        {props.showPodcastButton && (
          <FloatingPodcastButton onClick={props.onPodcastButtonClick} />
        )}
        
        <button 
          onClick={props.onLibraryButtonClick} 
          className="group relative w-32 h-32 md:w-44 md:h-44 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 bg-white dark:bg-stone-800 border-4 border-stone-800 dark:border-stone-400 overflow-hidden flex flex-col items-center justify-center"
        >
          <div className="absolute inset-0 flex items-center justify-center p-2">
            <img 
              src="https://res.cloudinary.com/ddmj6zevz/image/upload/v1762221635/Gemini_Generated_Image_ooj0fjooj0fjooj0-removebg-preview_o1y7yh.png" 
              alt="Biblioteca" 
              className="w-full h-full object-contain group-hover:scale-110 transition-transform" 
            />
          </div>
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <span className="text-[10px] md:text-xs font-black uppercase tracking-widest bg-stone-900 text-white px-2 py-0.5 rounded">Biblioteca</span>
          </div>
        </button>
      </div>
    </header>
  );
});

export default Header;