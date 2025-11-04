import React, { useEffect } from 'react';
import type { LibraryItem } from '../types.ts';

interface LibraryDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: LibraryItem | null;
}

const LibraryDetailModal: React.FC<LibraryDetailModalProps> = ({ isOpen, onClose, item }) => {
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

  if (!isOpen || !item) return null;

  return (
    <div
      className="library-detail-modal-backdrop"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div
        className="library-detail-modal-content font-typewriter"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full min-h-[300px] md:min-h-0">
           <img
            src={item.imageUrl}
            alt={`Portada de ${item.title}`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative flex flex-col p-6 md:p-8">
           <div className="flex-grow overflow-y-auto">
             <span className="font-bold uppercase text-xs text-stone-500 mb-2">{item.category}</span>
             <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                {item.title}
             </h2>
             <p className="text-lg text-stone-700 italic mb-4">
                {item.author}
             </p>
             <div className="text-sm leading-relaxed whitespace-pre-wrap text-stone-800">
                {item.review}
             </div>
           </div>
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/70 transition-colors"
              aria-label="Cerrar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
        </div>
      </div>
    </div>
  );
};

export default LibraryDetailModal;
