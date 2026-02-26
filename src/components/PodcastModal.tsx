
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

    const handlePauseMedia = () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
    window.addEventListener('pauseRadio', handlePauseMedia);

    return () => {
      window.removeEventListener('keydown', handleEsc);
      window.removeEventListener('pauseRadio', handlePauseMedia);
      document.body.classList.remove('modal-open');
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (videoRef.current) {
      if (isOpen && podcast) {
        window.dispatchEvent(new Event('pauseRadio'));
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
        className="relative bg-[#FAF9F6] w-full max-w-5xl max-h-[95vh] rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-black/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full md:w-2/3 bg-black relative flex items-center justify-center min-h-[300px] md:min-h-0">
          <video
            ref={videoRef}
            key={podcast.id}
            src={podcast.videoUrl}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain"
            onEnded={onClose}
          >
            Tu navegador no soporta el tag de video.
          </video>
        </div>

        <div className="w-full md:w-1/3 p-6 md:p-10 overflow-y-auto bg-white flex flex-col border-l border-black/5">
          <span className="text-[10px] font-bold text-[#800020] uppercase tracking-[0.3em] mb-3">
            Podcast Exclusivo
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold mb-6 text-zen-charcoal leading-tight italic">
            {podcast.title}
          </h2>
          <div className="w-12 h-[1px] bg-zen-bamboo mb-8"></div>
          <div className="prose prose-sm leading-relaxed text-zen-charcoal/70 font-serif">
            <p className="whitespace-pre-wrap italic">{podcast.transcript}</p>
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