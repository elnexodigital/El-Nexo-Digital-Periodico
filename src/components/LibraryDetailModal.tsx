
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
        default:
            return null;
    }
  }

  if (!isOpen || !item) return null;

  return (
    <div
      className="library-detail-modal-backdrop fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-0 md:p-4"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div
        className="library-detail-modal-content bg-stone-50 dark:bg-stone-900 w-full h-full md:h-auto md:max-h-[90vh] md:rounded-xl shadow-2xl overflow-hidden flex flex-col max-w-4xl mx-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de cerrar flotante superior */}
        <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/80 dark:bg-black/50 text-stone-800 dark:text-white hover:bg-white dark:hover:bg-black shadow-lg transition-all transform hover:scale-110"
            aria-label="Cerrar"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
        </button>

        {/* Contenedor único con scroll */}
        <div className="overflow-y-auto h-full w-full custom-scrollbar">
            
            {/* Banner de Imagen */}
            <div className="relative w-full aspect-video md:aspect-[21/9] bg-stone-900 flex items-center justify-center overflow-hidden">
                {/* Fondo borroso */}
                <img
                    src={item.imageUrl}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-30 blur-xl scale-110"
                    aria-hidden="true"
                />
                {/* Imagen principal */}
                <img
                    src={item.imageUrl}
                    alt={`Portada de ${item.title}`}
                    className="relative h-full w-auto object-contain shadow-2xl z-10 py-4 md:py-8 transition-transform duration-700 hover:scale-105"
                />
            </div>

            {/* Contenido */}
            <div className="p-6 md:p-12 bg-stone-50 dark:bg-stone-900 min-h-[50vh]">
                <div className="flex flex-col gap-4 mb-8 border-b border-stone-200 dark:border-stone-700 pb-8">
                    <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-2 font-bold uppercase text-xs text-stone-600 dark:text-stone-300 tracking-wider border border-stone-300 dark:border-stone-600 px-3 py-1.5 rounded-full bg-stone-100 dark:bg-stone-800">
                            {getCategoryIcon(item.category)}
                            {item.category}
                        </span>
                        <span className="text-xs font-bold text-stone-500 dark:text-stone-400">{item.publicationDate}</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-stone-900 dark:text-stone-100 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {item.title}
                    </h2>
                    <p className="text-xl text-stone-700 dark:text-stone-300 italic font-serif">
                        {item.author}
                    </p>
                </div>
                
                <div className="prose prose-lg dark:prose-invert max-w-none mb-12 text-stone-800 dark:text-stone-300 leading-relaxed font-serif text-justify">
                    <p className="whitespace-pre-wrap">{item.review}</p>
                </div>

                {/* Botones de Acción */}
                <div className="grid gap-6 md:grid-cols-2 mb-12">
                    {item.pdfUrl && (
                        <a 
                            href={forceCloudinaryDownload(item.pdfUrl)} 
                            download 
                            className="flex items-center justify-center gap-3 px-6 py-4 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 transition-all hover:shadow-lg hover:-translate-y-1"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Descargar PDF
                        </a>
                    )}

                    {item.audioUrl && (
                        <div className="col-span-2 bg-stone-200 dark:bg-stone-800 p-6 rounded-xl shadow-inner">
                            <h4 className="font-bold text-stone-700 dark:text-stone-300 mb-3 text-sm uppercase tracking-wide">Audio Complementario</h4>
                            <audio controls className="w-full">
                                <source src={item.audioUrl} type="audio/mp4" />
                                Tu navegador no soporta el elemento de audio.
                            </audio>
                        </div>
                    )}

                    {item.videoUrl && (
                        <div className="col-span-2">
                            <h4 className="font-bold text-stone-700 dark:text-stone-300 mb-3 text-sm uppercase tracking-wide">
                                {item.category === 'Podcasts' ? 'Reproducir Podcast' : 'Video Complementario'}
                            </h4>
                            <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
                                <video controls className="w-full h-full">
                                    <source src={item.videoUrl} type="video/mp4" />
                                    Tu navegador no soporta el elemento de video.
                                </video>
                            </div>
                        </div>
                    )}
                </div>
                
                {item.sources && (
                    <div className="mb-12 pt-6 border-t border-stone-200 dark:border-stone-700 opacity-70">
                        <h4 className="font-bold text-xs uppercase text-stone-500 mb-2 tracking-wider">Fuentes</h4>
                        <p className="text-xs text-stone-500 dark:text-stone-400 whitespace-pre-wrap leading-relaxed">{item.sources}</p>
                    </div>
                )}

                {/* Botón de Volver Inferior */}
                <div className="flex justify-center border-t border-stone-200 dark:border-stone-700 pt-8">
                    <button
                        onClick={onClose}
                        className="px-8 py-3 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-bold hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors flex items-center gap-2 shadow-sm"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Volver a la Colección
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryDetailModal;
