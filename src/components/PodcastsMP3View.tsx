import React, { useState, useRef } from 'react';
import { ArrowLeft, Headphones, Play, Pause, Search, Volume2 } from 'lucide-react';
import { PODCASTS_MP3 } from '../data/podcastsMP3.ts';
import type { PodcastMP3 } from '../types.ts';

interface PodcastsMP3ViewProps {
  onBack: () => void;
}

const PodcastsMP3View: React.FC<PodcastsMP3ViewProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentAudio, setCurrentAudio] = useState<PodcastMP3 | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const filtered = PODCASTS_MP3.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePlayToggle = (podcast: PodcastMP3) => {
    if (currentAudio?.id === podcast.id) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      setCurrentAudio(podcast);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = podcast.audioUrl;
        audioRef.current.play().catch(e => console.error("Error reproduciendo audio:", e));
      }
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-24 text-stone-100">
      
      {/* Cabecera con retorno */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 sm:p-2.5 rounded-xl bg-stone-900 border border-white/10 text-stone-300 hover:text-white hover:bg-stone-800 transition-all flex items-center gap-1.5"
            title="Volver al Inicio"
          >
            <ArrowLeft size={18} />
            <span className="text-xs font-mono uppercase tracking-wider hidden sm:inline">Inicio</span>
          </button>
          <div>
            <h1 className="text-xl sm:text-3xl font-serif font-bold text-stone-100 flex items-center gap-2">
              <Headphones size={24} className="text-amber-400" />
              Podcast en MP3 (Audio a la Carta)
            </h1>
            <p className="text-xs text-stone-400">
              Microprogramas de radio y episodios sonoros para escuchar cuando quieras
            </p>
          </div>
        </div>

        {/* Buscador de episodios en audio */}
        <div className="relative w-full sm:w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar microprograma..."
            className="w-full bg-stone-900 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-400/50"
          />
        </div>
      </div>

      {/* Reproductor flotante persistente si hay audio seleccionado */}
      {currentAudio && (
        <div className="p-4 bg-gradient-to-r from-stone-950 via-amber-950/30 to-stone-950 rounded-2xl border border-amber-500/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-4 z-20">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-500/30">
              <Volume2 size={24} className={isPlaying ? 'animate-pulse' : ''} />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
                Reproduciendo ahora
              </span>
              <h3 className="text-sm font-bold text-stone-100 truncate">
                {currentAudio.title}
              </h3>
              <p className="text-[11px] text-stone-400 truncate">
                {currentAudio.artist}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
            <button
              onClick={() => handlePlayToggle(currentAudio)}
              className="px-5 py-2.5 rounded-full bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_15px_rgba(251,191,36,0.4)] hover:bg-amber-300 transition-all hover:scale-105 active:scale-95"
            >
              {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
              <span>{isPlaying ? 'Pausar' : 'Reanudar'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Elemento de audio nativo oculto para streaming */}
      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />

      {/* Lista de episodios */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-widest text-stone-400 font-bold">
            Microprogramas y Archivo de Audio ({filtered.length})
          </span>
          <span className="text-[11px] text-stone-500 font-mono">
            Toca cualquier elemento para reproducir
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filtered.map((podcast) => {
            const isThisPlaying = currentAudio?.id === podcast.id && isPlaying;
            const isThisSelected = currentAudio?.id === podcast.id;

            return (
              <div
                key={podcast.id}
                onClick={() => handlePlayToggle(podcast)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 group ${
                  isThisSelected
                    ? 'bg-amber-950/30 border-amber-400/70 shadow-lg'
                    : 'bg-stone-900/80 border-white/10 hover:border-amber-400/40 hover:bg-stone-800/80'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <button
                    className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                      isThisPlaying
                        ? 'bg-amber-400 text-stone-950 shadow-[0_0_12px_rgba(251,191,36,0.5)]'
                        : 'bg-stone-800 text-stone-300 border border-white/10 group-hover:bg-amber-500 group-hover:text-stone-950'
                    }`}
                  >
                    {isThisPlaying ? (
                      <Pause size={18} fill="currentColor" />
                    ) : (
                      <Play size={18} fill="currentColor" className="ml-0.5" />
                    )}
                  </button>

                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-stone-100 group-hover:text-amber-300 transition-colors truncate">
                      {podcast.title}
                    </h4>
                    <p className="text-xs text-stone-400 line-clamp-1 mt-0.5">
                      {podcast.description}
                    </p>
                    <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block mt-1">
                      {podcast.artist}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 text-stone-500 group-hover:text-amber-400 transition-colors">
                  <Headphones size={18} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default PodcastsMP3View;
