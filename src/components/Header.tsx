import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import type { MusicTrack, HeaderControls, PodcastMP3 } from '../types.ts';
import FloatingPodcastButton from './FloatingPodcastButton.tsx';
import ListenerCounter from './ListenerCounter.tsx';
import { useAudio } from '../context/AudioContext.tsx';

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
  onHomeButtonClick?: () => void;
  notesCount: number;
  onAdminAuthRequest: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const Header = forwardRef<HeaderControls, HeaderProps>((props, ref) => {
  const { isPlaying, togglePlay, metadata } = useAudio();
  const [randomVideoUrl] = useState(() => VIDEO_URLS[Math.floor(Math.random() * VIDEO_URLS.length)]);

  // Expose controls via ref (keeping compatibility for now, though Context is preferred)
  useImperativeHandle(ref, () => ({
    playRadio: () => { if (!isPlaying) togglePlay(); },
    pauseRadio: () => { if (isPlaying) togglePlay(); },
    getIsPlayingState: () => isPlaying
  }));

  const displayTitle = metadata?.title || "Sintonizando El Nexo Digital...";
  const displayArtist = metadata?.artist || "RADIO EN VIVO";

  const nextTrack = () => {
    // Placeholder for "Change Channel" functionality if we implement multiple streams later
    console.log("Cambiar onda clickeado");
  };

  return (
    <header className="w-full flex flex-col items-center pt-8 pb-4 bg-paper-light dark:bg-paper-dark transition-colors duration-500">
      {/* Title / Home Button */}
      <h1
        onClick={props.onHomeButtonClick}
        className="text-4xl md:text-6xl font-title text-carbon dark:text-gold mb-8 cursor-pointer hover:scale-105 transition-transform drop-shadow-md text-center"
      >
        El Nexo Digital
      </h1>

      <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center">
        {props.showPodcastButton && (
          <div className="w-24 md:w-32 flex flex-col items-center">
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

        {/* Toggle Dark Mode Button (Small) */}
        <button
          onClick={props.onToggleDarkMode}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
        >
          {props.isDarkMode ? '☀️' : '🌙'}
        </button>
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
