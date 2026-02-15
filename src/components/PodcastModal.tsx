
import React, { useEffect, useRef } from 'react';
import type { VideoPodcast } from '../types.ts';
import { X } from 'lucide-react';

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
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div
        className="relative glass-panel w-full max-w-4xl h-[90vh] md:h-auto rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full md:w-2/3 bg-black relative flex items-center justify-center">
          <video
            ref={videoRef}
            key={podcast.id}
            src={podcast.videoUrl}
            controls
            muted
            autoPlay
            playsInline
            className="w-full h-full object-contain"
            onEnded={onClose}
          >
            Tu navegador no soporta el tag de video.
          </video>
        </div>

        <div className="w-full md:w-1/3 p-6 md:p-8 overflow-y-auto bg-white/5 backdrop-blur-sm border-l border-white/10 flex flex-col">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-widest mb-2">
            Podcast Exclusivo
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4 text-white leading-tight">
            {podcast.title}
          </h2>
          <div className="w-12 h-1 bg-brand-green mb-6 rounded-full"></div>
          <div className="prose prose-invert prose-sm leading-relaxed text-gray-300">
            <p className="whitespace-pre-wrap">{podcast.transcript}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-brand-orange text-white transition-all hover:scale-110 border border-white/10"
          aria-label="Cerrar podcast"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
};

export default PodcastModal;