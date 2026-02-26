
import React, { useEffect, useRef } from 'react';
import type { LibraryItem } from '../types.ts';

interface LibraryDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: LibraryItem | null;
}

const LibraryDetailModal: React.FC<LibraryDetailModalProps> = ({ isOpen, onClose, item }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        const handlePauseMedia = () => {
            if (videoRef.current) videoRef.current.pause();
            if (audioRef.current) audioRef.current.pause();
        };

        window.addEventListener('keydown', handleEsc);
        window.addEventListener('pauseRadio', handlePauseMedia);

        if (isOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }

        return () => {
            window.removeEventListener('keydown', handleEsc);
            window.removeEventListener('pauseRadio', handlePauseMedia);
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
            className="library-detail-modal-backdrop fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-0 md:p-8"
            aria-modal="true"
            role="dialog"
            onClick={onClose}
        >
            <div
                className="library-detail-modal-content glass-panel w-full h-full md:h-auto md:max-h-[90vh] md:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-w-5xl mx-auto relative border border-white/5"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 p-3 rounded-lg bg-white/5 border border-white/10 text-white/40 hover:text-white/80 transition-all backdrop-blur-xl"
                    aria-label="Cerrar"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="flex flex-col md:flex-row h-full overflow-hidden">
                    {/* Media Column */}
                    <div className="w-full md:w-2/5 h-1/3 md:h-full relative bg-black/40 flex items-center justify-center overflow-hidden border-r border-white/5">
                        {item.videoUrl ? (
                            <video
                                ref={videoRef}
                                controls
                                className="w-full h-full object-contain opacity-80"
                                src={item.videoUrl}
                                onPlay={handleMediaPlay}
                            />
                        ) : (
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full h-full object-cover opacity-60 contrast-125"
                            />
                        )}
                        <div className="absolute top-6 left-6 bg-white/10 text-white/40 px-4 py-1.5 rounded-full text-[9px] font-mono uppercase tracking-[0.3em] flex items-center gap-3 backdrop-blur-md border border-white/5">
                            {getCategoryIcon(item.category)}
                            <span>{item.category}</span>
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className="w-full md:w-3/5 h-2/3 md:h-full flex flex-col bg-white/5 backdrop-blur-xl">
                        <div className="p-12 md:p-16 overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-white/10">
                            <div className="mb-12">
                                <h2 className="text-4xl md:text-5xl font-signature text-white/90 mb-4 leading-tight">
                                    {item.title}
                                </h2>
                                <p className="text-xl text-white/40 italic font-signature border-b border-white/5 pb-10">
                                    {item.author}
                                </p>
                            </div>

                            <div className="max-w-none mb-12">
                                <p className="whitespace-pre-wrap leading-relaxed text-sm text-white/60 font-sans tracking-wide">
                                    {item.review}
                                </p>
                            </div>

                            {(item.publicationDate || item.sources) && (
                                <div className="bg-white/5 rounded-xl p-8 text-[10px] font-mono text-white/30 border border-white/5 tracking-[0.2em] space-y-3">
                                    {item.publicationDate && (
                                        <p><span className="text-white/10 uppercase mr-4">Fecha:</span> {item.publicationDate}</p>
                                    )}
                                    {item.sources && (
                                        <p><span className="text-white/10 uppercase mr-4">Origen:</span> {item.sources}</p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Actions Footer */}
                        <div className="p-8 border-t border-white/5 bg-black/20 backdrop-blur-2xl flex flex-wrap gap-6 items-center justify-between">
                            {item.audioUrl && (
                                <div className="w-full md:w-auto flex-grow max-w-sm">
                                    <audio
                                        ref={audioRef}
                                        controls
                                        className="w-full h-10 opacity-40 hover:opacity-80 transition-opacity contrast-75 brightness-75"
                                        onPlay={handleMediaPlay}
                                    >
                                        <source src={item.audioUrl} type="audio/mp4" />
                                    </audio>
                                </div>
                            )}

                            <div className="flex gap-4 w-full md:w-auto justify-end">
                                {item.pdfUrl && (
                                    <a
                                        href={forceCloudinaryDownload(item.pdfUrl)}
                                        download
                                        className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 text-white/40 hover:text-white/80 font-mono text-[9px] uppercase tracking-[0.2em] rounded-lg transition-all border border-white/5"
                                    >
                                        Descargar_PDF
                                    </a>
                                )}

                                {isGift && (
                                    <a
                                        href={item.videoUrl ? forceCloudinaryDownload(item.videoUrl) : forceCloudinaryDownload(item.imageUrl)}
                                        download
                                        className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 text-white/40 hover:text-white/80 font-mono text-[9px] uppercase tracking-[0.2em] rounded-lg transition-all border border-white/5"
                                    >
                                        Guardar_Media
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
