import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface AudioContextType {
    isPlaying: boolean;
    togglePlay: () => void;
    volume: number;
    setVolume: (volume: number) => void;
    metadata: { title: string; artist: string } | null;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

// Placeholder stream URL - User can update this
const STREAM_URL = 'https://stream.zeno.fm/cf3y34m12g8uv';

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [metadata] = useState({ title: 'Radio El Nexo', artist: 'En vivo 24/7' });
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = new Audio(STREAM_URL);
        audioRef.current.volume = volume;

        // Listener global para pausar la radio desde otros componentes
        const handlePause = (e: Event) => {
            // Evitar auto-pausado si el evento lo envió el propio contexto de radio
            if (e instanceof CustomEvent && e.detail?.source === 'live-radio') {
                return;
            }
            if (audioRef.current) {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        };

        window.addEventListener('pauseRadio', handlePause as EventListener);

        return () => {
            window.removeEventListener('pauseRadio', handlePause as EventListener);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            // Notificar a otros componentes que deben pausarse
            window.dispatchEvent(new CustomEvent('pauseRadio', { detail: { source: 'live-radio' } }));

            audioRef.current.play().catch(e => console.error("Playback failed:", e));
            setIsPlaying(true);
        }
    };

    return (
        <AudioContext.Provider value={{ isPlaying, togglePlay, volume, setVolume, metadata }}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (context === undefined) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
};
