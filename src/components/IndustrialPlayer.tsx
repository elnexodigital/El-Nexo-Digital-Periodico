import React, { useState, useRef } from 'react';
import { useAudioScheduler } from '../hooks/useAudioScheduler';

// Videos for the industrial monitor
const VIDEO_URLS: string[] = [
    'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1755907719/animaci%C3%B3n_APP_pvxjop.mp4',
    'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1756345297/14_okcuk0.mp4',
    'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1757874034/tu_compa%C3%B1%C3%ADa_247_srq9ah.mp4',
    'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1756612883/Vienen_las_Noticias_ujmv2i.mp4'
];

const IndustrialPlayer: React.FC = () => {
    const {
        currentTrack,
        isPlaying,
        togglePlay,
        playNext
    } = useAudioScheduler();

    const [videoQueue, setVideoQueue] = useState<string[]>(() => [...VIDEO_URLS].sort(() => Math.random() - 0.5));
    const videoRef = useRef<HTMLVideoElement>(null);

    const currentVideoUrl = videoQueue[0];

    const nextVideo = () => {
        setVideoQueue(prev => {
            if (prev.length <= 1) return prev;
            const [first, ...rest] = prev;
            return [...rest, first];
        });
    };

    const handleNext = () => {
        playNext();
        nextVideo();
    };

    const displayTitle = currentTrack?.title || "Sinking into the Flow...";
    const displayArtist = currentTrack?.artist || "NEXO DIGITAL ZEN";
    const marqueeText = `${displayTitle} • ${displayArtist} • ${displayTitle} • ${displayArtist}`;

    return (
        <div className="w-full max-w-[1080px] mx-auto my-20 animate-fade-in px-4">
            {/* Player Main Box (Video & Artist) */}
            <div
                className="relative w-full overflow-hidden bg-white/60 backdrop-blur-xl rounded-2xl transition-all duration-700 group border border-black/5 shadow-[0_20px_60px_-15px_rgba(93,64,55,0.12)] aspect-[1080/336]"
            >
                {/* VIDEO BACKGROUND (Clearer visibility) */}
                <div className="absolute inset-0 z-0">
                    <video
                        ref={videoRef}
                        key={currentVideoUrl}
                        src={currentVideoUrl}
                        autoPlay
                        muted
                        playsInline
                        loop
                        className="w-full h-full object-cover opacity-90 contrast-110 grayscale-0 transition-opacity duration-1000 group-hover:opacity-100"
                    />
                </div>

                {/* CONTENT LAYER (Empty to let video shine) */}
                <div className="relative z-20 w-full h-full flex flex-col items-center justify-center p-10 text-center pointer-events-none">
                    {/* Contenido removido para dejar el video "pleno" según pedido del usuario */}
                </div>

                {/* FINE BORDER DECOR */}
                <div className="absolute inset-0 border border-black/5 pointer-events-none rounded-2xl" />
            </div>

            {/* EXTERNAL ELEMENTS (Marquee and Controls) */}
            <div className="mt-12 flex flex-col items-center gap-10">

                {/* ZEN MARQUEE (Full 1080px Width) */}
                <div className="w-full overflow-hidden opacity-100">
                    <div className="marquee-container border-y border-black/5 py-2">
                        <p className="marquee-content font-mono text-[10px] uppercase tracking-[0.5em] text-[#800020] font-bold">
                            {marqueeText}
                        </p>
                    </div>
                </div>

                {/* CONTROLS (Delicate Buttons) */}
                <div className="flex items-center justify-center gap-20">
                    <button
                        onClick={handleNext}
                        className="text-zen-charcoal/20 hover:text-zen-charcoal/60 transition-all duration-500 active:scale-90"
                        aria-label="Anterior"
                    >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>
                    </button>

                    <button
                        onClick={togglePlay}
                        className="w-16 h-16 flex items-center justify-center rounded-full border border-black/5 bg-white shadow-sm text-zen-charcoal/70 hover:text-zen-charcoal hover:shadow-md transition-all duration-700 active:scale-95"
                        aria-label={isPlaying ? "Pausar" : "Iniciar"}
                    >
                        {isPlaying ? (
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                        ) : (
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="translate-x-0.5"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        )}
                    </button>

                    <button
                        onClick={handleNext}
                        className="text-zen-charcoal/20 hover:text-zen-charcoal/60 transition-all duration-500 active:scale-90"
                        aria-label="Siguiente"
                    >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IndustrialPlayer;
