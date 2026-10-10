import React, { useState } from 'react';
import { ArrowLeft, Mic, Play, Search, Video } from 'lucide-react';
import { VIDEO_PODCASTS } from '../data/podcasts.ts';
import type { VideoPodcast } from '../types.ts';

interface PodcastsMP4ViewProps {
  onBack: () => void;
}

const PodcastsMP4View: React.FC<PodcastsMP4ViewProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activePodcast, setActivePodcast] = useState<VideoPodcast | null>(VIDEO_PODCASTS[0] || null);

  const filteredPodcasts = VIDEO_PODCASTS.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.transcript.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-20 text-stone-100">
      
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
              <Mic size={24} className="text-purple-400" />
              Podcast en MP4 (Video)
            </h1>
            <p className="text-xs text-stone-400">
              Colección audiovisual de episodios, análisis y reflexiones en video
            </p>
          </div>
        </div>

        {/* Buscador de video podcasts */}
        <div className="relative w-full sm:w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por título o tema..."
            className="w-full bg-stone-900 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-purple-400/50"
          />
        </div>
      </div>

      {/* Reproductor de Video Activo */}
      {activePodcast && (
        <div className="bg-stone-950 rounded-2xl border border-purple-500/30 overflow-hidden shadow-2xl space-y-4 p-4 sm:p-6">
          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 text-[10px] font-mono uppercase font-bold flex items-center gap-1">
                <Video size={12} />
                Episodio Seleccionado
              </span>
              <span className="text-xs text-stone-400">El Nexo Digital</span>
            </div>
            <span className="text-xs font-serif font-semibold text-stone-200">
              {activePodcast.title}
            </span>
          </div>

          <div className="aspect-video w-full rounded-xl overflow-hidden bg-black shadow-inner border border-white/10">
            <video
              key={activePodcast.videoUrl}
              src={activePodcast.videoUrl}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            />
          </div>

          <div className="space-y-2 pt-2">
            <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-100">
              {activePodcast.title}
            </h2>
            <div className="p-4 rounded-xl bg-stone-900/90 border border-white/5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold block mb-1">
                Transcripción y Memoria
              </span>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {activePodcast.transcript}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Catálogo de episodios */}
      <div className="space-y-3">
        <h3 className="text-sm font-mono uppercase tracking-widest text-stone-400 font-bold">
          Todos los episodios en video ({filteredPodcasts.length})
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredPodcasts.map((podcast) => {
            const isCurrent = activePodcast?.id === podcast.id;
            return (
              <div
                key={podcast.id}
                onClick={() => {
                  setActivePodcast(podcast);
                  window.scrollTo({ top: 380, behavior: 'smooth' });
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group shadow-lg ${
                  isCurrent
                    ? 'bg-purple-950/40 border-purple-400/80 shadow-[0_0_20px_rgba(168,85,247,0.2)]'
                    : 'bg-stone-900/80 border-white/10 hover:border-purple-400/40 hover:bg-stone-800/80'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                      Video MP4
                    </span>
                    <span className={`p-1.5 rounded-full transition-transform group-hover:scale-110 ${
                      isCurrent ? 'bg-purple-500 text-stone-950' : 'bg-stone-800 text-stone-300'
                    }`}>
                      <Play size={12} fill="currentColor" />
                    </span>
                  </div>
                  <h4 className="font-serif text-sm sm:text-base font-bold text-stone-100 group-hover:text-purple-300 transition-colors">
                    {podcast.title}
                  </h4>
                  <p className="text-xs text-stone-400 line-clamp-3 leading-relaxed">
                    {podcast.transcript}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-stone-500">
                  <span>Reproducir episodio</span>
                  <span className="text-purple-400 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default PodcastsMP4View;
