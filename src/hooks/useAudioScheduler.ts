import { useState, useEffect, useRef, useCallback } from 'react';
import { TIME_JINGLES } from '../data/timeJingles';
import { COMMERCIAL_JINGLES } from '../data/jingles';
import { SEPARATOR_AUDIOS } from '../data/separators';
import { PODCASTS_MP3 } from '../data/podcastsMP3';
import { MUSIC_LIST_1 } from '../data/musicList1';
import { MUSIC_LIST_2 } from '../data/musicList2';
import type { MusicTrack } from '../types';

// Combinar listas de música
const ALL_MUSIC = [...MUSIC_LIST_1, ...MUSIC_LIST_2];

// Normalizar tipos para el reproductor
export interface AudioTrack {
    id: string;
    url: string;
    title: string;
    artist: string;
    type: 'greeting' | 'music' | 'podcast' | 'filler';
}

const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const useAudioScheduler = () => {
    const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Estado interno para la lógica de programación
    const historyRef = useRef<string[]>([]); // URLs reproducidas recientemente
    const lastPodcastTimeRef = useRef<number>(Date.now()); // Iniciar contador ahora
    const musicCountRef = useRef<number>(0); // Contador de canciones desde el último filler
    const isFirstPlayRef = useRef<boolean>(true);

    // Configuración
    const FILLER_INTERVAL = 3; // Cada 3 canciones
    const PODCAST_INTERVAL_MS = 30 * 60 * 1000; // 30 minutos
    const HISTORY_WINDOW = 50; // Recordar las últimas 50 pistas (aprox 2-3 horas)

    // Inicializar audio
    useEffect(() => {
        audioRef.current = new Audio();
        audioRef.current.onended = () => {
            playNext();
        };
        // Manejo de errores básico
        audioRef.current.onerror = (e) => {
            console.error("Error reproduciendo audio:", e);
            // Intentar recuperar reproduciendo el siguiente tras un breve delay
            setTimeout(() => playNext(), 1000);
        };

        // Cargar primera pista (Saludo)
        const greeting = getTimeBasedGreeting();
        setCurrentTrack(greeting);

        if (audioRef.current) {
            audioRef.current.src = greeting.url;
            audioRef.current.load();
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = '';
            }
        };
    }, []);

    const toggleMute = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    }, [isMuted]);

    // Reproducir/Pausar
    const togglePlay = useCallback(() => {
        if (!audioRef.current || !currentTrack) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            // Promesa de play para evitar errores de interrupción
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => setIsPlaying(true))
                    .catch(error => console.error("Error al reproducir:", error));
            }
        }
    }, [isPlaying, currentTrack]);

    const getTimeBasedGreeting = (): AudioTrack => {
        const hour = new Date().getHours();
        let greetingUrl = '';
        let greetingTime = '';

        if (hour >= 5 && hour < 12) {
            greetingUrl = getRandomItem(TIME_JINGLES.morning);
            greetingTime = 'Buenos Días';
        } else if (hour >= 12 && hour < 20) {
            greetingUrl = getRandomItem(TIME_JINGLES.afternoon);
            greetingTime = 'Buenas Tardes';
        } else {
            greetingUrl = getRandomItem(TIME_JINGLES.night);
            greetingTime = 'Buenas Noches';
        }

        return {
            id: `greeting_${Date.now()}`,
            url: greetingUrl,
            title: `${greetingTime} - Bienvenido al Nexo`,
            artist: 'El Nexo Digital',
            type: 'greeting'
        };
    };

    const getNextTrack = (): AudioTrack => {
        const now = Date.now();

        // 1. Regla: Podcast cada 30 min
        if (now - lastPodcastTimeRef.current > PODCAST_INTERVAL_MS && !isFirstPlayRef.current) {
            // Filtrar podcasts recientes
            const availablePodcasts = PODCASTS_MP3.filter(p => !historyRef.current.includes(p.audioUrl));
            // Si ya escuchamos todos, reiniciamos el historial para podcasts o elegimos de todos
            const pool = availablePodcasts.length > 0 ? availablePodcasts : PODCASTS_MP3;
            // Asegurar que no sea undefined
            if (pool.length > 0) {
                const podcast = getRandomItem(pool);
                lastPodcastTimeRef.current = now;
                return {
                    id: `podcast_${podcast.id}`,
                    url: podcast.audioUrl,
                    title: podcast.title,
                    artist: podcast.artist,
                    type: 'podcast'
                };
            }
        }

        // 2. Regla: Filler cada X canciones
        if (musicCountRef.current >= FILLER_INTERVAL) {
            musicCountRef.current = 0;
            const fillers = [...COMMERCIAL_JINGLES, ...SEPARATOR_AUDIOS];
            // Filtrar fillers recientes
            const availableFillers = fillers.filter(url => !historyRef.current.includes(url));
            const pool = availableFillers.length > 0 ? availableFillers : fillers;

            if (pool.length > 0) {
                const fillerUrl = getRandomItem(pool);
                return {
                    id: `filler_${Date.now()}`,
                    url: fillerUrl,
                    title: 'Espacio Nexo',
                    artist: 'El Nexo Digital',
                    type: 'filler'
                };
            }
        }

        // 3. Regla: Música (por defecto)
        musicCountRef.current++;
        // Filtrar música reciente
        const availableMusic = ALL_MUSIC.filter(m => !historyRef.current.includes(m.url));
        const pool = availableMusic.length > 0 ? availableMusic : ALL_MUSIC;

        if (pool.length > 0) {
            const track = getRandomItem(pool);
            return {
                id: track.id,
                url: track.url,
                title: track.description || 'Música en El Nexo',
                artist: 'Radio Nexo',
                type: 'music'
            };
        }

        // Fallback por si todo falla
        return getTimeBasedGreeting();
    };

    const playNext = useCallback(() => {
        if (isFirstPlayRef.current) {
            isFirstPlayRef.current = false;
        }

        const nextTrack = getNextTrack();

        // Actualizar historial
        historyRef.current.push(nextTrack.url);
        if (historyRef.current.length > HISTORY_WINDOW) {
            historyRef.current.shift();
        }

        setCurrentTrack(nextTrack);
        setIsPlaying(true); // Asumimos que queremos seguir reproduciendo

        if (audioRef.current) {
            audioRef.current.src = nextTrack.url;
            audioRef.current.load();
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise
                    .catch(e => {
                        console.error("Error auto-play:", e);
                        setIsPlaying(false);
                    });
            }
        }
    }, []);

    return {
        currentTrack,
        isPlaying,
        isMuted,
        togglePlay,
        toggleMute,
        playNext
    };
};
