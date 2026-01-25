import React, { useEffect, useRef, useState } from 'react';
import type { VideoPodcast } from '../types.ts';
import { useAudio } from '../context/AudioContext.tsx';

interface PodcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  podcast: VideoPodcast | null;
}

const PodcastModal: React.FC<PodcastModalProps> = ({ isOpen, onClose, podcast }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isPlaying: isRadioPlaying, togglePlay: toggleRadio } = useAudio();
  const [playbackRate, setPlaybackRate] = useState(1);

  // Auto-pause radio when video modal opens
  useEffect(() => {
    if (isOpen && isRadioPlaying) {
      toggleRadio();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    if (isOpen) document.body.classList.add('modal-open');
    else document.body.classList.remove('modal-open');

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.classList.remove('modal-open');
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (videoRef.current) {
      if (isOpen && podcast) {
        videoRef.current.currentTime = 0;
        videoRef.current.playbackRate = playbackRate;
        videoRef.current.play().catch(e => console.error("Autoplay prevented:", e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isOpen, podcast]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  if (!isOpen || !podcast) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div
        className="relative bg-paper-dark w-full max-w-6xl h-[85vh] rounded-xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-stone-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* VIDEO SECTION */}
        <div className="flex-1 bg-black relative flex flex-col justify-center">
          <video
            ref={videoRef}
            key={podcast.id}
            src={podcast.videoUrl}
            controls
            className="w-full max-h-full object-contain"
            onEnded={onClose}
          />

          {/* Speed Controls Overlay (Optional or integrated in custom controls, but valid here too) */}
          <div className="absolute top-4 right-4 flex gap-2">
            {[1, 1.25, 1.5, 2].map((rate) => (
              <button
                key={rate}
                onClick={() => setPlaybackRate(rate)}
                className={`text-xs px-2 py-1 rounded border ${playbackRate === rate ? 'bg-gold text-carbon border-gold' : 'bg-black/50 text-white border-white/30 hover:bg-white/20'}`}
              >
                {rate}x
              </button>
            ))}
          </div>
        </div>

        {/* EXTENDED INFO SIDEBAR */}
        <div className="w-full md:w-96 bg-paper-light dark:bg-stone-800 border-l border-stone-300 dark:border-stone-700 flex flex-col">
          <div className="p-6 border-b border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-900">
            <h2 className="text-2xl font-bold font-title text-carbon dark:text-gold mb-2">{podcast.title}</h2>
            <span className="inline-block px-2 py-1 bg-carbon text-gold text-xs uppercase tracking-widest rounded">Video Podcast</span>
          </div>

          <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
            <h3 className="text-sm font-bold uppercase tracking-widest text-stone-500 mb-4">Información Extendida</h3>
            <div className="prose dark:prose-invert font-mono text-sm leading-relaxed">
              <p>{podcast.transcript}</p>
              {/* Placeholder for more metadata if available */}
              <div className="mt-8 p-4 bg-stone-200 dark:bg-stone-900/50 rounded border border-stone-300 dark:border-stone-700">
                <h4 className="font-bold text-xs uppercase mb-2">Notas del episodio</h4>
                <ul className="list-disc pl-4 space-y-1 text-xs text-stone-600 dark:text-stone-400">
                  <li>Duración variable</li>
                  <li>Calidad HD</li>
                  <li>Serie Original</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 md:top-4 md:left-4 md:right-auto z-50 p-2 rounded-full bg-black/50 text-white hover:bg-red-600 transition-colors"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
    </div>
  );
};

export default PodcastModal;