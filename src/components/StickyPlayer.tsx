import React from 'react';
import { useAudio } from '../context/AudioContext';

const StickyPlayer: React.FC = () => {
    const { isPlaying, togglePlay, volume, setVolume, metadata } = useAudio();

    return (
        <div className="fixed bottom-0 left-0 w-full z-50 bg-paper-dark border-t-4 border-gold text-gold shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">

                {/* INFO CINTA */}
                <div className="flex-1 overflow-hidden hidden md:block">
                    <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-stone-600'}`}></div>
                        <div className="flex flex-col">
                            <span className="text-xs uppercase tracking-widest text-stone-400">En el aire</span>
                            <div className="text-sm md:text-base font-bold truncate font-title tracking-wide text-white">
                                {metadata?.title || 'Sintonizando...'} - <span className="text-gold">{metadata?.artist}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CONTROLS */}
                <div className="flex items-center gap-6">
                    {/* Play/Pause */}
                    <button
                        onClick={togglePlay}
                        className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-gold text-gold hover:bg-gold hover:text-carbon transition-all transform hover:scale-105 active:scale-95 shadow-lg"
                    >
                        {isPlaying ? (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" /></svg>
                        ) : (
                            <svg className="w-5 h-5 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        )}
                    </button>

                    {/* Volume (Hidden on small mobile if needed, but useful) */}
                    <div className="hidden sm:flex items-center gap-2 group">
                        <svg className="w-5 h-5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className="w-24 h-1 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-gold hover:accent-white transition-all"
                        />
                    </div>
                </div>

                {/* MOBILE METADATA (Compact) */}
                <div className="md:hidden flex-1 overflow-hidden text-right">
                    <div className="text-xs text-gold truncate">{metadata?.title}</div>
                </div>

            </div>
        </div>
    );
};

export default StickyPlayer;
