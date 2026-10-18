import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, 
  Headphones, 
  Play, 
  Pause, 
  Search, 
  Volume2, 
  Sparkles, 
  BookOpen, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  SkipForward, 
  SkipBack, 
  ShieldCheck, 
  Layers
} from 'lucide-react';
import { PODCASTS_MP3 } from '../data/podcastsMP3.ts';
import { EXCLUSIVE_COLLECTIONS, ExclusiveCollection } from '../data/exclusiveCollections.ts';
import { LIBRARY_CONTENT } from '../data/libraryContent.ts';
import LibraryDetailModal from './LibraryDetailModal.tsx';
import type { PodcastMP3, LibraryItem } from '../types.ts';

interface PodcastsMP3ViewProps {
  onBack: () => void;
}

const PodcastsMP3View: React.FC<PodcastsMP3ViewProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'exclusivas' | 'todos' | 'microprogramas'>('exclusivas');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCollectionId, setExpandedCollectionId] = useState<string | null>('col_enciclica');
  
  // Audio state
  const [currentAudio, setCurrentAudio] = useState<PodcastMP3 | null>(null);
  const [activeCollection, setActiveCollection] = useState<ExclusiveCollection | null>(null);
  const [activeTrackIndex, setActiveTrackIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Modal para ver dossier y fuentes exclusivas
  const [selectedLibraryDoc, setSelectedLibraryDoc] = useState<LibraryItem | null>(null);

  // Filtro de colecciones
  const filteredCollections = EXCLUSIVE_COLLECTIONS.filter(col =>
    col.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    col.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    col.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    col.tracks.some(t => t.title.toLowerCase().includes(searchTerm.toLowerCase()) || t.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Filtro de microprogramas individuales
  const microprogramas = PODCASTS_MP3.filter(p => !p.title.startsWith('[Colección Exclusiva]'));
  const filteredMicroprogramas = microprogramas.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Todos los elementos planos para tab "todos"
  const allFiltered = PODCASTS_MP3.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Reproducir pista individual
  const handlePlayPodcast = (podcast: PodcastMP3) => {
    setActiveCollection(null);
    setActiveTrackIndex(-1);

    if (currentAudio?.id === podcast.id) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        window.dispatchEvent(new Event('pauseRadio'));
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      window.dispatchEvent(new Event('pauseRadio'));
      setCurrentAudio(podcast);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = podcast.audioUrl;
        audioRef.current.preload = 'auto';
        audioRef.current.play().catch(e => console.error("Error reproduciendo audio:", e));
      }
    }
  };

  // Reproducir pista de una colección exclusiva
  const handlePlayCollectionTrack = (collection: ExclusiveCollection, trackIndex: number) => {
    const track = collection.tracks[trackIndex];
    if (!track) return;

    setActiveCollection(collection);
    setActiveTrackIndex(trackIndex);

    const podcastObj: PodcastMP3 = {
      id: track.id,
      title: `${collection.title} — ${track.title}`,
      artist: `${collection.title} • ${track.chapter}`,
      description: track.description,
      audioUrl: track.audioUrl,
      coverUrl: collection.coverUrl
    };

    if (currentAudio?.id === track.id) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        window.dispatchEvent(new Event('pauseRadio'));
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      window.dispatchEvent(new Event('pauseRadio'));
      setCurrentAudio(podcastObj);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = track.audioUrl;
        audioRef.current.preload = 'auto';
        audioRef.current.play().catch(e => console.error("Error reproduciendo audio:", e));
      }
    }
  };

  // Siguiente pista en colección
  const handleNextTrack = () => {
    if (activeCollection && activeTrackIndex >= 0 && activeTrackIndex < activeCollection.tracks.length - 1) {
      handlePlayCollectionTrack(activeCollection, activeTrackIndex + 1);
    }
  };

  // Pista anterior en colección
  const handlePrevTrack = () => {
    if (activeCollection && activeTrackIndex > 0) {
      handlePlayCollectionTrack(activeCollection, activeTrackIndex - 1);
    }
  };

  // Apertura de dossier / fuentes exclusivas
  const handleOpenDossier = (dossierId?: string, fallbackUrl?: string) => {
    if (dossierId) {
      const found = LIBRARY_CONTENT.find(item => item.id === dossierId);
      if (found) {
        setSelectedLibraryDoc(found);
        return;
      }
    }
    if (fallbackUrl) {
      window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-28 text-stone-100">
      
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
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-3xl font-serif font-bold text-stone-100 flex items-center gap-2">
                <Headphones size={24} className="text-amber-400" />
                Podcasts y Colecciones Exclusivas
              </h1>
              <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono uppercase font-bold">
                <Sparkles size={11} />
                Opción Editorial
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              Series sonoras completas con acceso a fuentes primarias, dossiers de investigación y microprogramas
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
            placeholder="Buscar colección o audio..."
            className="w-full bg-stone-900 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-400/50"
          />
        </div>
      </div>

      {/* BANNER DISTINTIVO: VALOR EXCLUSIVO DE LA PLATAFORMA (OPCIÓN 3) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-stone-900/90 to-stone-950 border border-amber-500/40 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  Archivo Editorial Exclusivo
                </span>
                <span className="text-[10px] text-stone-400 font-mono">
                  Sin muros de registro obligatorio
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-serif font-bold text-stone-100 mt-1">
                ¿Qué hace exclusivas a estas colecciones en El Nexo Digital?
              </h3>
              <p className="text-xs text-stone-300 max-w-2xl leading-relaxed mt-1">
                Mientras los audios pueden circular en redes, <strong className="text-amber-300 font-semibold">aquí en la plataforma dispones de la experiencia documental integral</strong>: capítulos ordenados cronológicamente, carátulas originales, fuentes primarias citadas, enlaces de verificación y dossiers extensos de investigación descargables.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex sm:flex-col gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                setActiveTab('exclusivas');
                setExpandedCollectionId('col_enciclica');
              }}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-300 transition-all shadow text-center"
            >
              Explorar Colecciones
            </button>
          </div>
        </div>
      </div>

      {/* REPRODUCTOR PERSISTENTE STICKY */}
      {currentAudio && (
        <div className="p-3.5 sm:p-4 bg-gradient-to-r from-stone-950 via-amber-950/40 to-stone-950 rounded-2xl border border-amber-500/50 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-4 z-30 backdrop-blur-md">
          <div className="flex items-center gap-3 w-full sm:w-auto min-w-0">
            {currentAudio.coverUrl ? (
              <img 
                src={currentAudio.coverUrl} 
                alt="Cover" 
                className="w-12 h-12 rounded-xl object-cover border border-amber-500/40 shrink-0 shadow" 
              />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-500/30">
                <Volume2 size={24} className={isPlaying ? 'animate-pulse' : ''} />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                  {isPlaying ? 'Reproduciendo ahora' : 'Pausado'}
                </span>
                {activeCollection && (
                  <span className="text-[9px] font-mono bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded border border-amber-400/30">
                    Cap. {activeTrackIndex + 1}/{activeCollection.tracks.length}
                  </span>
                )}
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-stone-100 truncate mt-0.5">
                {currentAudio.title}
              </h3>
              <p className="text-[11px] text-stone-400 truncate">
                {currentAudio.artist}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end shrink-0">
            {activeCollection && (
              <button
                onClick={handlePrevTrack}
                disabled={activeTrackIndex <= 0}
                className="p-2 rounded-xl bg-stone-900 border border-white/10 text-stone-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                title="Capítulo Anterior"
              >
                <SkipBack size={16} />
              </button>
            )}

            <button
              onClick={() => handlePlayPodcast(currentAudio)}
              className="px-5 py-2.5 rounded-full bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_15px_rgba(251,191,36,0.4)] hover:bg-amber-300 transition-all hover:scale-105 active:scale-95"
            >
              {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
              <span>{isPlaying ? 'Pausar' : 'Reanudar'}</span>
            </button>

            {activeCollection && (
              <button
                onClick={handleNextTrack}
                disabled={activeTrackIndex >= activeCollection.tracks.length - 1}
                className="p-2 rounded-xl bg-stone-900 border border-white/10 text-stone-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                title="Siguiente Capítulo"
              >
                <SkipForward size={16} />
              </button>
            )}

            {activeCollection?.dossierId && (
              <button
                onClick={() => handleOpenDossier(activeCollection.dossierId, activeCollection.externalUrl)}
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-900/90 border border-amber-500/40 text-amber-300 hover:bg-stone-800 text-xs font-semibold"
                title="Ver Dossier y Fuentes"
              >
                <BookOpen size={14} />
                <span>Ver Dossier</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Elemento de audio nativo oculto para streaming continuo */}
      <audio
        ref={audioRef}
        onEnded={() => {
          if (activeCollection && activeTrackIndex < activeCollection.tracks.length - 1) {
            handleNextTrack();
          } else {
            setIsPlaying(false);
          }
        }}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />

      {/* PESTAÑAS DE VISTA */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('exclusivas')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'exclusivas'
              ? 'bg-amber-400 text-stone-950 shadow-[0_0_15px_rgba(251,191,36,0.25)]'
              : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-white/5'
          }`}
        >
          <Sparkles size={14} />
          <span>Colecciones Exclusivas ({EXCLUSIVE_COLLECTIONS.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('microprogramas')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'microprogramas'
              ? 'bg-amber-400 text-stone-950 shadow-[0_0_15px_rgba(251,191,36,0.25)]'
              : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-white/5'
          }`}
        >
          <Headphones size={14} />
          <span>Microprogramas de Radio ({microprogramas.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('todos')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'todos'
              ? 'bg-amber-400 text-stone-950 shadow-[0_0_15px_rgba(251,191,36,0.25)]'
              : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-white/5'
          }`}
        >
          <Layers size={14} />
          <span>Todos los Audios ({PODCASTS_MP3.length})</span>
        </button>
      </div>

      {/* TAB 1: COLECCIONES EXCLUSIVAS (OPCIÓN 3) */}
      {activeTab === 'exclusivas' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
              <Sparkles size={14} />
              Series Documentales & Colecciones con Fuentes ({filteredCollections.length})
            </span>
            <span className="text-[11px] text-stone-500 font-mono">
              Toca una serie para ver sus capítulos y fuentes
            </span>
          </div>

          <div className="space-y-6">
            {filteredCollections.map((col) => {
              const isExpanded = expandedCollectionId === col.id;
              const isColPlaying = activeCollection?.id === col.id && isPlaying;

              return (
                <div
                  key={col.id}
                  className={`rounded-2xl sm:rounded-3xl border transition-all overflow-hidden bg-stone-900/90 shadow-xl ${
                    activeCollection?.id === col.id
                      ? 'border-amber-400/80 shadow-[0_0_25px_rgba(251,191,36,0.15)] ring-1 ring-amber-400/30'
                      : 'border-white/10 hover:border-amber-400/40'
                  }`}
                >
                  {/* Tarjeta Principal de la Colección */}
                  <div className="p-5 sm:p-7 flex flex-col md:flex-row gap-5 md:gap-6 items-start">
                    
                    {/* Carátula de la Colección */}
                    <div className="w-full md:w-56 aspect-[4/3] sm:aspect-square md:aspect-[3/4] rounded-2xl overflow-hidden relative shrink-0 shadow-lg border border-white/10 bg-stone-950">
                      <img
                        src={col.coverUrl}
                        alt={col.title}
                        className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
                      
                      <div className="absolute top-2.5 left-2.5">
                        <span className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-amber-300 border border-amber-500/30 text-[10px] font-mono uppercase font-bold shadow">
                          {col.category}
                        </span>
                      </div>

                      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-mono text-stone-200">
                        <span className="bg-stone-950/90 px-2 py-0.5 rounded border border-white/10">
                          {col.tracks.length} Capítulos
                        </span>
                        {isColPlaying && (
                          <span className="bg-amber-500 text-stone-950 px-2 py-0.5 rounded font-bold animate-pulse">
                            Sonando
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Información y Acciones de la Colección */}
                    <div className="flex-1 flex flex-col justify-between space-y-4 w-full">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 font-bold text-[10px] uppercase font-mono tracking-wider shadow">
                            {col.badge}
                          </span>
                          <span className="text-[11px] text-amber-400 font-mono">
                            {col.tagline}
                          </span>
                        </div>

                        <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-100 leading-snug">
                          {col.title}
                        </h2>
                        <h4 className="text-xs sm:text-sm text-stone-400 font-sans mt-0.5">
                          {col.subtitle}
                        </h4>

                        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mt-3">
                          {col.description}
                        </p>

                        {/* Recuadro de Exclusividad Editorial */}
                        <div className="mt-3.5 p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-[11px] sm:text-xs text-amber-200/90 leading-relaxed flex items-start gap-2.5">
                          <Sparkles size={16} className="text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-amber-300 font-semibold block">Valor Exclusivo de esta Edición:</strong>
                            <span>{col.exclusiveNotes}</span>
                          </div>
                        </div>
                      </div>

                      {/* Botonera de la Colección */}
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        {/* Play primera pista o continuar */}
                        <button
                          onClick={() => {
                            if (activeCollection?.id === col.id && isPlaying) {
                              audioRef.current?.pause();
                              setIsPlaying(false);
                            } else {
                              handlePlayCollectionTrack(col, activeCollection?.id === col.id && activeTrackIndex >= 0 ? activeTrackIndex : 0);
                            }
                          }}
                          className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_15px_rgba(251,191,36,0.3)] transition-all"
                        >
                          {isColPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                          <span>{isColPlaying ? 'Pausar Serie' : 'Reproducir Serie'}</span>
                        </button>

                        {/* Ver Dossier / Fuentes */}
                        {col.dossierId && (
                          <button
                            onClick={() => handleOpenDossier(col.dossierId, col.externalUrl)}
                            className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 border border-amber-500/40 font-bold text-xs flex items-center gap-2 transition-all shadow"
                          >
                            <BookOpen size={16} />
                            <span>Leer Dossier y Fuentes</span>
                          </button>
                        )}

                        {col.externalUrl && (
                          <a
                            href={col.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-white/10 font-bold text-xs flex items-center gap-2 transition-all"
                          >
                            <ExternalLink size={15} />
                            <span>Ver Recursos Externos</span>
                          </a>
                        )}

                        {/* Desplegar capítulos */}
                        <button
                          onClick={() => setExpandedCollectionId(isExpanded ? null : col.id)}
                          className="ml-auto p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center gap-1.5 text-xs font-mono transition-colors border border-white/5"
                          title={isExpanded ? "Ocultar capítulos" : "Ver todos los capítulos"}
                        >
                          <span>{isExpanded ? 'Ocultar capítulos' : `Ver capítulos (${col.tracks.length})`}</span>
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Lista Desplegable de Capítulos de la Colección */}
                  {isExpanded && (
                    <div className="border-t border-white/10 bg-stone-950/70 p-4 sm:p-6 space-y-3">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <span className="text-[11px] font-mono uppercase tracking-widest text-stone-400 font-bold">
                          Capítulos Ordenados Cronológicamente
                        </span>
                        <span className="text-[10px] font-mono text-amber-400">
                          Reproducción continua activada
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-2.5">
                        {col.tracks.map((track, idx) => {
                          const isTrackPlaying = activeCollection?.id === col.id && activeTrackIndex === idx && isPlaying;
                          const isTrackSelected = activeCollection?.id === col.id && activeTrackIndex === idx;

                          return (
                            <div
                              key={track.id}
                              onClick={() => handlePlayCollectionTrack(col, idx)}
                              className={`p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 group ${
                                isTrackSelected
                                  ? 'bg-amber-950/40 border-amber-400/80 shadow-md'
                                  : 'bg-stone-900/60 border-white/5 hover:border-amber-400/40 hover:bg-stone-900'
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <button
                                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                                    isTrackPlaying
                                      ? 'bg-amber-400 text-stone-950 shadow-[0_0_10px_rgba(251,191,36,0.5)]'
                                      : 'bg-stone-800 text-stone-300 border border-white/10 group-hover:bg-amber-500 group-hover:text-stone-950'
                                  }`}
                                >
                                  {isTrackPlaying ? (
                                    <Pause size={14} fill="currentColor" />
                                  ) : (
                                    <Play size={14} fill="currentColor" className="ml-0.5" />
                                  )}
                                </button>

                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-400/10 px-1.5 py-0.2 rounded border border-amber-400/20">
                                      {track.chapter}
                                    </span>
                                    <h4 className="text-xs sm:text-sm font-bold text-stone-100 group-hover:text-amber-300 transition-colors truncate">
                                      {track.title}
                                    </h4>
                                  </div>
                                  <p className="text-[11px] text-stone-400 line-clamp-1 mt-0.5">
                                    {track.description}
                                  </p>
                                </div>
                              </div>

                              <div className="shrink-0 text-stone-500 group-hover:text-amber-400 transition-colors">
                                <Headphones size={16} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: MICROPROGRAMAS DE RADIO */}
      {activeTab === 'microprogramas' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-stone-400 font-bold">
              Microprogramas de Radio ({filteredMicroprogramas.length})
            </span>
            <span className="text-[11px] text-stone-500 font-mono">
              Toca cualquier episodio para escuchar
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredMicroprogramas.map((podcast) => {
              const isThisPlaying = currentAudio?.id === podcast.id && isPlaying;
              const isThisSelected = currentAudio?.id === podcast.id;

              return (
                <div
                  key={podcast.id}
                  onClick={() => handlePlayPodcast(podcast)}
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
      )}

      {/* TAB 3: TODOS LOS AUDIOS */}
      {activeTab === 'todos' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-stone-400 font-bold">
              Catálogo Completo de Audio ({allFiltered.length})
            </span>
            <span className="text-[11px] text-stone-500 font-mono">
              Listado total con colecciones y microprogramas
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {allFiltered.map((podcast) => {
              const isThisPlaying = currentAudio?.id === podcast.id && isPlaying;
              const isThisSelected = currentAudio?.id === podcast.id;
              const isExclusive = podcast.title.startsWith('[Colección Exclusiva]');

              return (
                <div
                  key={podcast.id}
                  onClick={() => handlePlayPodcast(podcast)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 group ${
                    isThisSelected
                      ? 'bg-amber-950/30 border-amber-400/70 shadow-lg'
                      : isExclusive
                      ? 'bg-stone-900/90 border-amber-500/20 hover:border-amber-400/50'
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
                      {isExclusive && (
                        <span className="text-[9px] font-mono uppercase tracking-wider text-amber-400 font-bold bg-amber-400/10 px-1.5 py-0.2 rounded border border-amber-400/20 mb-1 inline-block">
                          Serie Exclusiva
                        </span>
                      )}
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
      )}

      {/* Modal de Lectura Editorial para Dossier Exclusivo */}
      {selectedLibraryDoc && (
        <LibraryDetailModal
          isOpen={!!selectedLibraryDoc}
          onClose={() => setSelectedLibraryDoc(null)}
          item={selectedLibraryDoc}
        />
      )}

    </div>
  );
};

export default PodcastsMP3View;
