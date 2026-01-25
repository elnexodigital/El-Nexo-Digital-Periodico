import React, { useState, useEffect } from 'react';
import type { VideoPodcast } from '../types.ts';

interface PodcastGalleryProps {
    onPodcastSelect: (podcast: VideoPodcast) => void;
}

const PodcastGallery: React.FC<PodcastGalleryProps> = ({ onPodcastSelect }) => {
    const [podcasts, setPodcasts] = useState<VideoPodcast[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadPodcasts = async () => {
            try {
                const { VIDEO_PODCASTS } = await import('../data/podcasts.ts');
                setPodcasts(VIDEO_PODCASTS);
            } catch (e) {
                console.error("Error loading podcasts:", e);
            } finally {
                setIsLoading(false);
            }
        };
        loadPodcasts();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="w-full animate-fade-in">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-title text-carbon dark:text-gold mb-4 drop-shadow-sm">
                    Videoteca
                </h2>
                <p className="text-sm font-mono text-stone-500 uppercase tracking-widest max-w-2xl mx-auto">
                    Explora nuestra colección de reflexiones audiovisuales.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {podcasts.map((podcast) => (
                    <div
                        key={podcast.id}
                        onClick={() => onPodcastSelect(podcast)}
                        className="group cursor-pointer bg-paper-light dark:bg-paper-dark rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-transparent hover:border-gold"
                    >
                        {/* Thumbnail / Video Preview Placeholder */}
                        <div className="relative aspect-video bg-black overflow-hidden">
                            <video
                                src={podcast.videoUrl}
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                                muted
                                preload="metadata"
                            />

                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-black/50 border-2 border-white/50 flex items-center justify-center backdrop-blur-sm group-hover:bg-red-700/80 group-hover:border-red-500 transition-all group-hover:scale-110">
                                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" /></svg>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <h3 className="font-bold text-lg md:text-xl font-title text-carbon dark:text-gold mb-2 leading-tight group-hover:text-red-700 dark:group-hover:text-red-500 transition-colors">
                                {podcast.title}
                            </h3>
                            <p className="text-xs font-mono text-stone-500 uppercase tracking-wider line-clamp-3">
                                {podcast.transcript.substring(0, 150)}...
                            </p>

                            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                <span>Ver episodio</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PodcastGallery;
