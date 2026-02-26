import React, { useRef, useState } from 'react';
import { Play, Pause, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { useAudioScheduler } from '../hooks/useAudioScheduler';

// Cola de videos MP4 para el fondo del reproductor (Industrial/Rhythmic only)
const VIDEO_URLS: string[] = [
    'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1755907719/animaci%C3%B3n_APP_pvxjop.mp4',
    'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1756345297/14_okcuk0.mp4',
    'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1757874034/tu_compa%C3%B1%C3%ADa_247_srq9ah.mp4',
    'https://res.cloudinary.com/ddmj6zevz/video/upload/w_1280,q_auto:good/v1756612883/Vienen_las_Noticias_ujmv2i.mp4'
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
        <div className="w-full mb-16 relative group animate-fade-in max-w-[1100px] mx-auto px-4 mt-12 boot-sequence">

            {/* ARCHAIC MARKINGS EXTERIOR */}
            <div className="absolute -top-6 right-12 archaic-text opacity-30 pointer-events-none select-none text-sm">
                Ѻ Ϟ Ͽ ϗ
            </div>

            {/* MAIN CONSOLE BODY */}
            <div className="glass-panel rounded-[40px] p-8 shadow-2xl relative overflow-hidden weathered-panel flex flex-col items-center">

                {/* Structural Bolts */}
                <div className="absolute top-5 left-5 remache opacity-30" />
                <div className="absolute top-5 right-5 remache opacity-30" />
                <div className="absolute bottom-5 left-5 remache opacity-30" />
                <div className="absolute bottom-5 right-5 remache opacity-30" />

                {/* Side Labels */}
                <div className="absolute top-1/2 -left-4 font-mono text-[7px] tracking-[0.4em] -rotate-90 opacity-40">COMM_LINK_ACTIVE</div>
                <div className="absolute top-1/2 -right-4 font-mono text-[7px] tracking-[0.4em] rotate-90 opacity-40">NODE_ARCHIVE_A4</div>

                <div className="w-full flex flex-col gap-10 items-center">

                    {/* THE MONITOR - Archaeological Focus - PRECISION RESIZE 1080x336 */}
                    <div className="monitor-crt p-2 bg-slate-900 border-slate-800 w-full max-w-[1080px] h-auto lg:h-[336px] shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_20px_rgba(59,130,246,0.2)]">
                        <div className="monitor-content relative w-full h-full bg-slate-950 rounded-[28px] overflow-hidden aspect-video lg:aspect-auto">
                            {/* Video Background */}
                            <video
                                ref={videoRef}
                                key={currentVideoUrl}
                                src={currentVideoUrl}
                                autoPlay
                                muted
                                playsInline
                                loop
                                className="w-full h-full object-cover opacity-60 contrast-110 brightness-75 grayscale-[0.2]"
                            />

                            {/* CRT Glow Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-black/80 pointer-events-none z-10" />

                            {/* UI Overlay */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none z-20">
                                <div className="flex justify-between items-start opacity-60 text-[9px] font-mono">
                                    <div className="text-blue-400 leading-relaxed uppercase">
                                        Archaeological_Node<br />Status: Deciphering
                                    </div>
                                    <div className="text-right text-cyan-400 leading-relaxed">
                                        Signal_Strength: 98%<br />Sector: OMEGA_7
                                    </div>
                                </div>

                                <div className="space-y-3 text-center">
                                    <h2 className="text-3xl sm:text-5xl font-signature text-blue-100 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
                                        {displayArtist}
                                    </h2>
                                    <div className="marquee-container w-full max-w-md mx-auto bg-slate-950/80 py-2 px-4 border-l-2 border-blue-500/50 backdrop-blur-md rounded-sm">
                                        <p className="marquee-content font-mono text-xs uppercase tracking-[0.3em] text-blue-300">
                                            {marqueeText}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* INTERACTIVE CONTROL PANEL */}
                    <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 py-6 px-12 glass-panel rounded-[32px] border-white/5 border-t shadow-2xl">

                        {/* TRANSMIT (Play) */}
                        <div className="flex flex-col items-center gap-3">
                            <button
                                onClick={togglePlay}
                                disabled={isPlaying}
                                className={`boton-circular w-16 h-16 ${isPlaying ? 'bg-blue-600/60 cyan-neon' : 'bg-slate-700/40 opacity-50'} border-white/10`}
                            >
                                <Play size={22} fill="currentColor" className={isPlaying ? 'text-blue-100' : 'text-slate-500'} />
                            </button>
                            <span className="text-[10px] font-bold opacity-50 tracking-[0.2em] uppercase">Transmit</span>
                        </div>

                        {/* SUSPEND (Pause) */}
                        <div className="flex flex-col items-center gap-3">
                            <button
                                onClick={togglePlay}
                                disabled={!isPlaying}
                                className={`boton-circular w-16 h-16 ${!isPlaying ? 'bg-red-900/40 border-red-500/30' : 'bg-slate-700/40 opacity-50'} border-white/10`}
                            >
                                <Pause size={22} fill="currentColor" className={!isPlaying ? 'text-red-200' : 'text-slate-500'} />
                            </button>
                            <span className="text-[10px] font-bold opacity-50 tracking-[0.2em] uppercase">Suspend</span>
                        </div>

                        {/* COMMS (Mute) */}
                        <div className="flex flex-col items-center gap-3">
                            <button
                                onClick={toggleMute}
                                className={`boton-circular w-16 h-16 ${!isMuted ? 'bg-slate-800/60 border-white/10' : 'bg-blue-900/60 border-blue-400/30 cyan-neon'} `}
                            >
                                {isMuted ? <VolumeX size={20} className="text-blue-200" /> : <Volume2 size={20} className="text-slate-300" />}
                            </button>
                            <span className="text-[10px] font-bold opacity-50 tracking-[0.2em] uppercase">Comms</span>
                        </div>

                        {/* ITERATE (Skip) */}
                        <div className="flex flex-col items-center gap-3">
                            <button
                                onClick={handleNext}
                                className="boton-circular w-16 h-16 bg-slate-800/60 border-white/10 hover:bg-slate-700/60 transition-colors"
                            >
                                <SkipForward size={20} fill="currentColor" className="text-slate-300" />
                            </button>
                            <span className="text-[10px] font-bold opacity-50 tracking-[0.2em] uppercase">Iterate</span>
                        </div>
                    </div>
                </div>

                {/* Ambient Internal Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full -mr-20 -mt-20" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-600/5 blur-[80px] rounded-full -ml-10 -mb-10" />
            </div>

            {/* Decorative Connection Pipes */}
            <div className="absolute top-1/2 -left-2 w-1.5 h-32 bg-blue-900/30 rounded-full blur-[2px]" />
            <div className="absolute top-1/2 -right-2 w-2 h-40 bg-blue-800/30 rounded-full blur-[2px]" />
        </div>
    );
};

export default HeroPlayer;
