
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

  // Función para emitir evento de pausa a la radio
  const handleMediaPlay = () => {
    window.dispatchEvent(new Event('pauseRadio'));
  };

  // Helper function to inject Cloudinary attachment flag
  const forceCloudinaryDownload = (url: string) => {
    if (url.includes('cloudinary.com') && url.includes('/upload/') && !url.includes('/fl_attachment/')) {
        return url.replace('/upload/', '/upload/fl_attachment/');
    }
    return url;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
        case 'Libros':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            );
        case 'Discos':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
                </svg>
            );
        case 'Películas':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
            );
        case 'Revistas':
             return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
             );
        case 'Podcasts':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
            );
        case 'Postales':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            );
        default:
            return null;
    }
  }

  if (!isOpen || !item) return null;

  const isGift = item.category === 'Postales';

  return (
    <div
      className="library-detail-modal-backdrop fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-0 md:p-4"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div
        className="library-detail-modal-content bg-stone-50 dark:bg-stone-900 w-full h-full md:h-auto md:max-h-[90vh] md:rounded-xl shadow-2xl overflow-hidden flex flex-col max-w-6xl mx-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de cerrar flotante superior */}
        <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/80 dark:bg-black/50 text-stone-800 dark:text-white hover:bg-white dark:hover:bg-black shadow-lg transition-all transform hover:scale-110 focus:outline-none"
            aria-label="Cerrar detalle"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>

        <div className="flex flex-col md:flex-row h-full overflow-hidden">
            {/* Columna Izquierda: Imagen/Media */}
            <div className="w-full md:w-2/5 h-1/3 md:h-full relative bg-black flex items-center justify-center overflow-hidden">
               {item.videoUrl ? (
                   <video 
                     controls 
                     className="w-full h-full object-contain"
                     src={item.videoUrl}
                     onPlay={handleMediaPlay}
                   >
                       Tu navegador no soporta video.
                   </video>
               ) : (
                   <img 
                     src={item.imageUrl} 
                     alt={item.title} 
                     className="w-full h-full object-cover opacity-90"
                   />
               )}
               {/* Badge de Categoría */}
               <div className="absolute top-4 left-4 bg-stone-900/80 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 backdrop-blur-sm shadow-md">
                   {getCategoryIcon(item.category)}
                   {item.category}
               </div>
            </div>

            {/* Columna Derecha: Contenido */}
            <div className="w-full md:w-3/5 h-2/3 md:h-full flex flex-col bg-stone-50 dark:bg-stone-900">
                <div className="p-6 md:p-8 overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-stone-300 dark:scrollbar-thumb-stone-600">
                    <div className="mb-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {item.title}
                        </h2>
                        <p className="text-lg text-stone-600 dark:text-stone-400 italic font-serif border-b border-stone-200 dark:border-stone-700 pb-4">
                            {item.author}
                        </p>
                    </div>

                    <div className="prose prose-stone dark:prose-invert max-w-none mb-8">
                        <p className="whitespace-pre-wrap leading-relaxed text-base md:text-lg text-stone-800 dark:text-stone-200">
                            {item.review}
                        </p>
                    </div>

                    {/* Metadata y Fuentes */}
                    {(item.publicationDate || item.sources) && (
                        <div className="bg-stone-100 dark:bg-stone-800 rounded-lg p-4 text-sm text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700">
                            {item.publicationDate && (
                                <p className="mb-1"><span className="font-bold">Publicado:</span> {item.publicationDate}</p>
                            )}
                            {item.sources && (
                                <p><span className="font-bold">Fuente:</span> {item.sources}</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer con acciones */}
                <div className="p-6 border-t border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 flex flex-wrap gap-4 items-center justify-between">
                    {item.audioUrl && (
                        <div className="w-full md:w-auto flex-grow">
                            <audio controls className="w-full h-10" onPlay={handleMediaPlay}>
                                <source src={item.audioUrl} type="audio/mp4" />
                                Tu navegador no soporta audio.
                            </audio>
                        </div>
                    )}
                    
                    <div className="flex gap-3 w-full md:w-auto justify-end">
                        {item.pdfUrl && (
                            <a 
                                href={forceCloudinaryDownload(item.pdfUrl)} 
                                download 
                                className="inline-flex items-center gap-2 px-4 py-2 bg-red-700 hover:bg-red-800 text-white font-bold rounded-lg transition-colors shadow-md text-sm"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Descargar PDF
                            </a>
                        )}
                        
                        {isGift && (
                             <a 
                                href={item.videoUrl ? forceCloudinaryDownload(item.videoUrl) : forceCloudinaryDownload(item.imageUrl)} 
                                download 
                                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors shadow-md text-sm"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Descargar Postal
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryDetailModal;
