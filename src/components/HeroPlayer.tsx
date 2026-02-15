import React, { useRef, useState } from 'react';
import { Play, Pause, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { useAudioScheduler } from '../hooks/useAudioScheduler';

// Cola de videos MP4 para el fondo del reproductor
const VIDEO_URLS: string[] = [
    'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1755907719/animaci%C3%B3n_APP_pvxjop.mp4',
    'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1756345297/14_okcuk0.mp4',
    'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1757874034/tu_compa%C3%B1%C3%ADa_247_srq9ah.mp4',
    'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1756612883/Vienen_las_Noticias_ujmv2i.mp4',
    'https://res.cloudinary.com/dnauavz56/video/upload/v1764950849/postales2_mdcweq.mp4',
    'https://res.cloudinary.com/dnauavz56/video/upload/v1764980525/atardecer_en_puerto_ikddmm.mp4'
];

const HeroPlayer: React.FC = () => {
    const {
        currentTrack,
        isPlaying,
        isMuted,
        togglePlay,
        toggleMute,
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

    const displayTitle = currentTrack?.title || "Sintonizando El Nexo Digital...";
    const displayArtist = currentTrack?.artist || "RADIO EN VIVO";
    const marqueeText = `${displayTitle} • ${displayArtist} • ${displayTitle} • ${displayArtist}`;

    return (
        <div className="w-full mb-12 relative group animate-fade-in max-w-[1080px] mx-auto">
            {/* Main Marquee/Player Container - Card Style - 1080x336 Aspect Ratio */}
            <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl border-0 ring-1 ring-white/20 relative w-full aspect-[3/4] sm:aspect-video md:aspect-[1080/336]">

                {/* Background/Video Area */}
                <div className="absolute inset-0 bg-black">
                    <video
                        ref={videoRef}
                        key={currentVideoUrl}
                        src={currentVideoUrl}
                        autoPlay
                        muted
                        playsInline
                        loop
                        className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-12 flex flex-col md:flex-row items-end justify-between gap-4 md:gap-6">

                    {/* Text Content */}
                    <div className="flex-1 space-y-3 relative z-10 overflow-hidden w-full">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 rounded-full bg-brand-orange text-white text-xs font-bold tracking-wider uppercase shadow-lg shadow-brand-orange/20 animate-pulse">
                                {currentTrack?.type === 'podcast' ? 'PODCAST EN VIVO' : 'EN VIVO'}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-brand-green/20 text-brand-green text-xs font-bold tracking-wider uppercase border border-brand-green/30 backdrop-blur-md">
                                {currentTrack?.type === 'greeting' ? 'BIENVENIDA' : 'Música & Cultural'}
                            </span>
                        </div>
                        <h1 className="text-2xl sm:text-4xl md:text-6xl font-title text-white leading-tight drop-shadow-lg truncate">
                            El Nexo Digital
                        </h1>
                        <div className="marquee-container w-full max-w-md overflow-hidden bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-2">
                            <p className="text-gray-200 text-lg whitespace-nowrap marquee-content">
                                {marqueeText}
                            </p>
                        </div>
                    </div>

                    {/* Controls - Friendly & Rounded */}
                    <div className="flex items-center gap-4 relative z-10 shrink-0">
                        <button
                            onClick={toggleMute}
                            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white flex items-center justify-center border border-white/20 transition-all hover:scale-105"
                            aria-label={isMuted ? "Activar sonido" : "Silenciar"}
                        >
                            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </button>

                        <button
                            onClick={togglePlay}
                            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-brand-orange hover:bg-brand-darkOrange text-white flex items-center justify-center shadow-lg shadow-brand-orange/40 transition-all hover:scale-110 active:scale-95 border-4 border-white/10"
                            aria-label={isPlaying ? "Pausar" : "Reproducir"}
                        >
                            {isPlaying ? <Pause size={32} fill="currentColor" className="md:w-10 md:h-10" /> : <Play size={32} fill="currentColor" className="ml-1 md:ml-2 md:w-10 md:h-10" />}
                        </button>

                        <button
                            onClick={handleNext}
                            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white flex items-center justify-center border border-white/20 transition-all hover:scale-105"
                            aria-label="Siguiente"
                        >
                            <SkipForward size={24} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Decorative Elements around the player */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-green/30 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-brand-orange/20 rounded-full blur-3xl -z-10" />
        </div>
    );
};

export default HeroPlayer;
