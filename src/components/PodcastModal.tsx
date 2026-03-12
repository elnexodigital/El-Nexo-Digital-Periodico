
import React, { useEffect, useRef } from 'react';
import { X, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { VideoPodcast } from '../types.ts';

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
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (videoRef.current) {
        if (isOpen && podcast) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(e => console.error("Autoplay was prevented.", e));
        } else {
            videoRef.current.pause();
        }
    }
  }, [isOpen, podcast])

  if (!isOpen || !podcast) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        aria-modal="true"
        role="dialog"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-paper dark:bg-stone-900 w-full max-w-md h-full max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full aspect-[9/16] bg-black relative">
            <video
              ref={videoRef}
              key={podcast.id}
              src={podcast.videoUrl}
              controls
              muted
              autoPlay
              playsInline
              className="w-full h-full object-cover"
              onEnded={onClose}
            />
            <div className="absolute top-4 left-4 flex items-center gap-2 px-2 py-1 bg-accent text-white text-[10px] font-bold uppercase tracking-widest rounded">
              <Play size={10} fill="currentColor" />
              Podcast del Día
            </div>
          </div>
          
          <div className="flex-1 p-8 overflow-y-auto">
            <h2 className="text-3xl font-serif font-bold mb-4 text-ink dark:text-white leading-tight">
              {podcast.title}
            </h2>
            <div className="h-px w-12 bg-accent mb-6" />
            <p className="text-ink/70 dark:text-white/70 text-base leading-relaxed font-serif italic">
              {podcast.transcript}
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 text-white hover:bg-accent transition-all hover:rotate-90"
            aria-label="Cerrar podcast"
          >
            <X size={20} />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PodcastModal;