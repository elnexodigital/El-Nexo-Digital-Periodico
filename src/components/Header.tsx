
import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import type { MusicTrack, HeaderControls, PodcastMP3 } from '../types.ts';
import FloatingPodcastButton from './FloatingPodcastButton.tsx';
import ListenerCounter from './ListenerCounter.tsx';

const VIDEO_URLS: string[] = [
  'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1755907719/animaci%C3%B3n_APP_pvxjop.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1756345297/14_okcuk0.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1757874034/tu_compa%C3%B1%C3%ADa_247_srq9ah.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1756612883/Vienen_las_Noticias_ujmv2i.mp4',
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

const Header = forwardRef<HeaderControls, HeaderProps>((props, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [musicQueue, setMusicQueue] = useState<MusicTrack[]>([]);
  const [activePodcast] = useState<PodcastMP3 | null>(null);
  const [randomVideoUrl] = useState(() => VIDEO_URLS[Math.floor(Math.random() * VIDEO_URLS.length)]);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const { MUSIC_TRACKS } = await import('../data/music.ts');
        setMusicQueue([...MUSIC_TRACKS].sort(() => Math.random() - 0.5));
      } catch (e) {
        console.error("Error cargando música:", e);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

  const togglePlay = () => {
    if (isLoading || !audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.warn("Play bloqueado:", e));
    }
    setIsPlaying(!isPlaying);
  };

  useImperativeHandle(ref, () => ({
    playRadio: () => { if (!isPlaying) togglePlay(); },
    pauseRadio: () => { if (isPlaying) togglePlay(); },
    getIsPlayingState: () => isPlaying
  }));

  const nextTrack = () => {
    setMusicQueue(prev => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

  const currentTrack = musicQueue[0];
  const displayTitle = activePodcast?.title || currentTrack?.description || "Sintonizando El Nexo Digital...";
  const displayArtist = activePodcast?.artist || (isLoading ? "Cargando dial..." : "RADIO EN VIVO");

  return (
    <header className="text-center relative select-none">
      <div className="gift-ribbon-wrapper">
        <div className="gift-ribbon">¡REGALOS EN BIBLIOTECA!</div>
      </div>

      <button onClick={props.onAdminAuthRequest} className="admin-notes-icon">
        <div className="relative">
          <img src="https://res.cloudinary.com/ddmj6zevz/image/upload/v1762214989/Copilot_20251103_210903_eswig4.png" alt="Admin" className="w-12 h-12" />
          {props.notesCount > 0 && <span className="admin-notes-badge">{props.notesCount}</span>}
        </div>
      </button>

      <ListenerCounter />

      <div className="py-6 border-b-4 border-double border-stone-800 dark:border-stone-400">
        <img src="https://res.cloudinary.com/ddmj6zevz/image/upload/f_auto,q_auto:good/v1756714882/logo_el_nexo_digital_assa82.png" alt="Logo" className="mx-auto h-20 mb-2" />
        <h1 className="text-5xl md:text-7xl newspaper-title">El Nexo Digital</h1>
        <p className="text-red-600 dark:text-red-500 mt-2 text-sm uppercase tracking-widest font-bold italic drop-shadow-sm">Aplicación en desarrollo</p>
        
        <div className="flex justify-center items-center gap-4 mt-4">
          <p className="text-xs font-bold opacity-70 uppercase">{new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
          <button onClick={props.onToggleDarkMode} className="theme-switcher">
            {props.isDarkMode ? '🌞' : '🌙'}
          </button>
        </div>
      </div>

      {/* Banner de Video y Radio */}
      <div className="my-4 overflow-hidden border-b-4 border-double border-stone-800 dark:border-stone-400 relative bg-black aspect-[1080/337] shadow-inner">
        <video 
          key={randomVideoUrl}
          src={randomVideoUrl} 
          autoPlay muted loop playsInline 
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 flex items-center justify-between px-4 md:px-12 bg-gradient-to-r from-black/60 via-transparent to-black/60">
          
          <button 
            onClick={togglePlay}
            disabled={isLoading}
            className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border-2 border-white/30 text-white hover:bg-red-700/80 hover:border-red-500 transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)] disabled:opacity-50 hover:scale-110 active:scale-95 z-10 group/play"
          >
            {isPlaying ? (
              <svg className="w-8 h-8 group-hover/play:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20"><path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v4a1 1 0 11-2 0V8z" /></svg>
            ) : (
              <svg className="w-10 h-10 ml-1 group-hover/play:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" /></svg>
            )}
          </button>

          <div className="flex-1 text-center px-4 overflow-hidden text-white">
            <h3 className="font-bold text-lg md:text-2xl truncate uppercase tracking-tighter drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">{displayArtist}</h3>
            
            {/* Marquesina para la Leyenda */}
            <div className="marquee-container mt-1">
              <div className="marquee-content font-typewriter italic text-sm md:text-base drop-shadow-[0_1px_1px_rgba(0,0,0,1)] bg-black/10 py-1">
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

      <audio 
        ref={audioRef} 
        src={currentTrack?.url} 
        onEnded={nextTrack} 
        onError={() => nextTrack()}
      />

      <div className="py-8 flex flex-wrap justify-center gap-8 md:gap-16">
        {props.showPodcastButton && (
          <div className="w-28 md:w-36 flex flex-col items-center">
            <FloatingPodcastButton onClick={props.onPodcastButtonClick} />
          </div>
        )}
        
        <CircleButton 
          onClick={props.onStickyNoteButtonClick} 
          label="Nota" 
          img="https://res.cloudinary.com/ddmj6zevz/image/upload/v1762215081/Copilot_20251103_210653_yecnvc.png"
        />

        <CircleButton 
          onClick={props.onProtectedButtonClick} 
          label="Mecenas" 
          img="https://res.cloudinary.com/dus9zcgen/image/upload/v1759387606/Gemini_Generated_Image_komhuokomhuokomh-removebg-preview_erl5zc.png"
        />

        <CircleButton 
          onClick={props.onLibraryButtonClick} 
          label="Biblioteca" 
          img="https://res.cloudinary.com/ddmj6zevz/image/upload/v1762221635/Gemini_Generated_Image_ooj0fjooj0fjooj0-removebg-preview_o1y7yh.png"
        />
      </div>
    </header>
  );
});

const CircleButton = ({ onClick, label, img }: { onClick: () => void, label: string, img: string }) => (
  <button onClick={onClick} className="group relative w-28 h-28 md:w-36 md:h-36 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95">
    <div className="absolute inset-0 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-spin-very-slow text-stone-800 dark:text-stone-400 group-hover:text-red-700">
        <path id={`circlePath_${label}`} d="M 50, 50 m -39, 0 a 39,39 0 1,1 78,0 a 39,39 0 1,1 -78,0 " fill="none" />
        <text className="uppercase font-bold text-[10px]"><textPath xlinkHref={`#circlePath_${label}`} startOffset="25%" textAnchor="middle">{label}</textPath></text>
      </svg>
      <div className="w-[70%] h-[70%] rounded-full bg-white overflow-hidden border-2 border-stone-200">
        <img src={img} alt={label} className="w-full h-full object-cover p-1 group-hover:p-0 transition-all" />
      </div>
    </div>
  </button>
);

export default Header;
