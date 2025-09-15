import React, { useEffect, useRef } from 'react';
import type { VideoPodcast } from '../types';

interface PodcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  podcast: VideoPodcast | null;
}

const PodcastModal: React.FC<PodcastModalProps> = ({ isOpen, onClose, podcast }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    if (isOpen) {
        document.body.classList.add('modal-open');
    } else {
        document.body.classList.remove('modal-open');
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.classList.remove('modal-open');
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (videoRef.current) {
        if (isOpen && podcast) {
            videoRef.current.currentTime = 0; // Reset video on open
            videoRef.current.play().catch(e => console.error("Autoplay was prevented.", e));
        } else {
            videoRef.current.pause();
        }
    }
  }, [isOpen, podcast])

  if (!isOpen || !podcast) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div
        className="relative bg-stone-100 dark:bg-gray-900 w-full max-w-sm h-full max-h-[90vh] rounded-lg shadow-2xl flex flex-col overflow-hidden font-typewriter"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full aspect-square bg-black">
          <video
            ref={videoRef}
            key={podcast.id}
            src={podcast.videoUrl}
            controls
            muted
            autoPlay
            playsInline
            className="w-full h-full object-cover"
            onEnded={onClose} // Close modal automatically when video finishes
          >
            Tu navegador no soporta el tag de video.
          </video>
        </div>
        
        <div className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-3">
            {podcast.title}
          </h2>
          <p className="text-gray-800 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
            {podcast.transcript}
          </p>
        </div>
        
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/70 dark:bg-white/20 dark:hover:bg-white/40 transition-colors"
          aria-label="Cerrar podcast"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PodcastModal;