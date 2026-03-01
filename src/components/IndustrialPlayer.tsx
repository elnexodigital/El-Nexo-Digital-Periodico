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
        <div className="w-full max-w-[1080px] mx-auto mt-1 mb-8 animate-fade-in px-2 sm:px-4">

            {/* TV SCREEN CONTAINER (1080x336) */}
            <div className="relative w-full bg-[#1a1a1a] p-1.5 sm:p-2 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.05)] border-4 border-[#252525] overflow-hidden">

                {/* INNER SCREEN (The 1032x324 concept) */}
                <div className="relative w-full aspect-video sm:aspect-[1080/336] bg-black rounded-sm overflow-hidden border border-black shadow-[inset_0_0_40px_rgba(0,0,0,0.9)]">

                    {/* VIDEO BACKGROUND */}
                    <video
                        ref={videoRef}
                        key={currentVideoUrl}
                        src={currentVideoUrl}
                        autoPlay
                        muted
                        playsInline
                        loop
                        className="w-full h-full object-cover opacity-90 contrast-125 brightness-90 transition-opacity duration-1000"
                    />

                    {/* Scanline Effect Overlay */}
                    <div className="absolute inset-0 pointer-events-none z-10 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />

                    {/* Vignette Overlay */}
                    <div className="absolute inset-0 z-20 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] pointer-events-none" />
                </div>

                {/* ATTACHED MARQUEE (The "Lower Third" of the TV) */}
                <div className="w-full bg-[#000] border-t border-[#333] py-1.5 sm:py-2.5 overflow-hidden">
                    <div className="marquee-container">
                        <p className="marquee-content font-mono text-[12px] sm:text-[14px] uppercase tracking-[0.2em] sm:tracking-[0.4em] text-red-500 font-bold drop-shadow-[0_0_2px_rgba(239,68,68,0.5)]">
                            {marqueeText}
                        </p>
                    </div>
                </div>
            </div>

            {/* CONTROLS (Physical-inspired interactive panel) */}
            <div className="mt-4 flex flex-col items-center">
                <div className="flex items-center justify-center gap-6 sm:gap-16 py-4 px-8 sm:px-12 bg-[#222] rounded-2xl border border-[#333] shadow-xl">

                    {/* Previous/Iterate Button */}
                    <button
                        onClick={handleNext}
                        className="group flex flex-col items-center gap-1.5"
                        aria-label="Anterior"
                    >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-gradient-to-b from-[#333] to-[#111] border border-[#444] text-white shadow-lg active:translate-y-0.5 active:shadow-inner transition-all hover:border-red-900 group-hover:text-red-500">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="19 20 9 12 19 4 19 20"></polygon><rect x="5" y="4" width="2" height="16"></rect></svg>
                        </div>
                        <span className="text-[7px] uppercase tracking-widest text-[#666] group-hover:text-red-500/50">Prev</span>
                    </button>

                    {/* Master Play/Pause Button */}
                    <button
                        onClick={togglePlay}
                        className="group flex flex-col items-center gap-2"
                        aria-label={isPlaying ? "Pausar" : "Iniciar"}
                    >
                        <div className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full transition-all duration-300 shadow-2xl active:scale-95 border-4 ${isPlaying
                                ? 'bg-gradient-to-b from-red-600 to-red-900 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                                : 'bg-gradient-to-b from-stone-700 to-stone-900 border-stone-600'
                            }`}>
                            {isPlaying ? (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                            ) : (
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" className="text-white translate-x-0.5"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                            )}
                        </div>
                        <span className={`text-[8px] font-bold uppercase tracking-[0.3em] ${isPlaying ? 'text-red-500' : 'text-[#888]'}`}>
                            {isPlaying ? "On Air" : "Standby"}
                        </span>
                    </button>

                    {/* Next Button */}
                    <button
                        onClick={handleNext}
                        className="group flex flex-col items-center gap-1.5"
                        aria-label="Siguiente"
                    >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-gradient-to-b from-[#333] to-[#111] border border-[#444] text-white shadow-lg active:translate-y-0.5 active:shadow-inner transition-all hover:border-red-900 group-hover:text-red-500">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 4 15 12 5 20 5 4"></polygon><rect x="17" y="4" width="2" height="16"></rect></svg>
                        </div>
                        <span className="text-[7px] uppercase tracking-widest text-[#666] group-hover:text-red-500/50">Next</span>
                    </button>
                </div>
            </div>
        </div>


    );
};

export default IndustrialPlayer;
