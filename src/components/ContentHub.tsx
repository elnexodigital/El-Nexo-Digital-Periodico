import React from 'react';
import { 
  BookOpen, 
  Mic, 
  Headphones, 
  BookMarked, 
  UserCheck, 
  FileText, 
  Music, 
  Film, 
  ExternalLink, 
  ChevronRight, 
  Flame,
  Search,
  Files
} from 'lucide-react';
import type { AppView } from '../types.ts';
import SocialLinks from './SocialLinks.tsx';

interface ContentHubProps {
  onNavigate: (view: AppView) => void;
  onOpenVideoPodcast?: (id?: string) => void;
  onOpenSearch?: () => void;
}

export const MAGAZINE_EDITIONS = [
  {
    id: 'casandra',
    title: "La coartada de Casandra",
    date: "Mayo 2026",
    url: "https://heyzine.com/flip-book/bb23ebdb83.html",
    description: "Siete capítulos sobre la imagen femenina como escudo moral y la geopolítica del oro y litio.",
    coverUrl: "https://res.cloudinary.com/ddmj6zevz/image/upload/v1777933004/tapa_casandra_kgd7lg.png",
    isNew: true
  },
  {
    id: 'aguila',
    title: "El despertar del Águila",
    date: "Junio 2026",
    url: "https://heyzine.com/flip-book/6419983d24.html",
    description: "Crónica de la tutela impuesta: desmantelando la narrativa del 'salvador'.",
    coverUrl: "https://res.cloudinary.com/ddmj6zevz/image/upload/v1777933473/el_despertar_del_aguila_sam56e_wpkn9y.png"
  },
  {
    id: 'educacion',
    title: "Educación, Heducacion, Heducasion",
    date: "Abril 2026",
    url: "https://heyzine.com/flip-book/b7ebdb2e6e.html",
    description: "Una mirada profunda a la educación y el aprendizaje en tiempos de cambio algorítmico.",
    coverUrl: "https://res.cloudinary.com/dus9zcgen/image/upload/v1775437167/tapa_abril_xmn532.png",
    pdfUrl: "https://drive.google.com/file/d/1nl50KuToFtOlPJoMatERzRvKTBZrm-Fd/view?usp=sharing"
  },
  {
    id: 'construccion',
    title: "Guía de Construcción",
    date: "Marzo 2026",
    url: "https://heyzine.com/flip-book/628a405afd.html",
    description: "Guía de construcción en seco, lo indispensable para proyectar y construir.",
    coverUrl: "https://res.cloudinary.com/dnauavz56/image/upload/yeso_para_digital_sfnem7.png",
    pdfUrl: "https://drive.google.com/file/d/1bz2l4P9hPztmLDE-2BDJNWYknAT4Mf6e/view?usp=sharing"
  },
  {
    id: 'sequia',
    title: "Sequía en Uruguay",
    date: "Febrero 2026",
    url: "https://heyzine.com/flip-book/a5b1698e99.html",
    description: "Cuando el mito del Uruguay natural se cae a pedazos ante la crisis hídrica.",
    coverUrl: "https://res.cloudinary.com/ddmj6zevz/image/upload/v1775188752/Sequ%C3%ADa_en_Uruguaytapa_ddkjxf.png"
  }
];

const ContentHub: React.FC<ContentHubProps> = ({ onNavigate, onOpenSearch }) => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 sm:space-y-8 pb-20 text-stone-100">

      {/* BARRA DE BÚSQUEDA CONTEXTUAL GLOBAL */}
      {onOpenSearch && (
        <div 
          onClick={onOpenSearch}
          className="w-full bg-stone-900/90 hover:bg-stone-850 border border-amber-500/30 hover:border-amber-400/60 rounded-2xl p-3 sm:p-4 shadow-xl cursor-pointer transition-all flex items-center justify-between gap-3 group"
        >
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-300 group-hover:scale-105 transition-transform">
              <Search size={18} />
            </span>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-stone-200 group-hover:text-amber-200 transition-colors">
                ¿Qué deseas explorar hoy? Buscar por tema o contexto...
              </p>
              <p className="text-[10px] sm:text-xs text-stone-400">
                Prueba buscando: <span className="text-amber-300/80 font-mono">agua, geopolítica, filosofía, tango, IA, vejez, Hesse...</span>
              </p>
            </div>
          </div>

          <span className="hidden sm:inline-block px-3 py-1 bg-stone-800 group-hover:bg-amber-400 group-hover:text-stone-950 text-stone-300 text-xs font-mono font-bold rounded-lg transition-colors uppercase">
            Buscador
          </span>
        </div>
      )}

      {/* SECCIÓN 1: QUIOSCO DE REVISTAS DIGITALES (A LA VISTA) */}
      <section className="bg-stone-900/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/10 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="p-1.5 sm:p-2 rounded-xl bg-amber-500/20 text-amber-300">
              <BookOpen size={20} />
            </span>
            <div>
              <h2 className="text-lg sm:text-2xl font-serif font-bold text-stone-100 tracking-tight flex items-center gap-2">
                Revistas Digitales
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 font-semibold">
                  Quiosco Abierto
                </span>
              </h2>
              <p className="text-[11px] sm:text-xs text-stone-400">
                Todas las ediciones a tu disposición. Toca para leer en línea o descargar.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('revistas')}
            className="flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300 tracking-wider uppercase transition-colors shrink-0"
          >
            <span>Ver todas</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Carrusel táctil horizontal con todas las tapas a la vista */}
        <div className="flex gap-4 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-stone-700 -mx-2 px-2 sm:mx-0 sm:px-0">
          {MAGAZINE_EDITIONS.map((mag) => (
            <div
              key={mag.id}
              className="min-w-[170px] sm:min-w-[200px] max-w-[200px] flex-shrink-0 bg-stone-950/80 rounded-2xl border border-white/10 overflow-hidden flex flex-col group hover:border-amber-400/50 transition-all hover:scale-[1.02] shadow-lg"
            >
              {/* Tapa */}
              <div className="relative aspect-[3/4] bg-stone-900 overflow-hidden">
                <img
                  src={mag.coverUrl}
                  alt={mag.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                {mag.isNew && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-rose-600 text-white text-[9px] font-bold uppercase tracking-wider rounded shadow flex items-center gap-1">
                    <Flame size={10} />
                    Nueva
                  </span>
                )}
                <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/75 backdrop-blur-md text-[10px] font-mono text-stone-300 rounded border border-white/10">
                  {mag.date}
                </span>
              </div>

              {/* Información y botón directo */}
              <div className="p-3 flex flex-col flex-1 justify-between gap-2">
                <div>
                  <h3 className="text-xs font-bold text-stone-200 line-clamp-1 group-hover:text-amber-300 transition-colors">
                    {mag.title}
                  </h3>
                  <p className="text-[10px] text-stone-400 line-clamp-2 mt-0.5 leading-snug">
                    {mag.description}
                  </p>
                </div>

                <a
                  href={mag.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-1.5 px-2 bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-200 text-[11px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow"
                >
                  <span>Abrir edición</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN 2: PARRILLA DE CATEGORÍAS CULTURALES (2 COLUMNAS PARA SMARTPHONE) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-200 tracking-tight">
              Explorar el Ateneo por Secciones
            </h2>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500">
            Acceso Directo
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          
          {/* BOTÓN 1: REVISTA DIGITAL */}
          <button
            onClick={() => onNavigate('revistas')}
            className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-stone-900/90 to-stone-950 border border-white/10 hover:border-amber-400/50 hover:bg-stone-800/80 transition-all flex flex-col items-start text-left group shadow-lg hover:scale-[1.02] active:scale-95"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <BookOpen size={22} />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-rose-400/80 font-bold mb-1">
              Quiosco
            </span>
            <h3 className="text-sm sm:text-base font-serif font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
              Revista Digital
            </h3>
            <p className="text-[10px] text-stone-400 mt-1 leading-tight line-clamp-2">
              Todas las ediciones en formato interactivo y PDF.
            </p>
          </button>

          {/* BOTÓN 2: PODCAST EN MP4 */}
          <button
            onClick={() => onNavigate('podcasts-mp4')}
            className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-stone-900/90 to-stone-950 border border-white/10 hover:border-amber-400/50 hover:bg-stone-800/80 transition-all flex flex-col items-start text-left group shadow-lg hover:scale-[1.02] active:scale-95"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Mic size={22} />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400/80 font-bold mb-1">
              Video
            </span>
            <h3 className="text-sm sm:text-base font-serif font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
              Podcast en MP4
            </h3>
            <p className="text-[10px] text-stone-400 mt-1 leading-tight line-clamp-2">
              Episodios audiovisuales, reflexiones y transcripciones.
            </p>
          </button>

          {/* BOTÓN 3: PODCAST EN MP3 */}
          <button
            onClick={() => onNavigate('podcasts-mp3')}
            className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-stone-900/90 to-stone-950 border border-white/10 hover:border-amber-400/50 hover:bg-stone-800/80 transition-all flex flex-col items-start text-left group shadow-lg hover:scale-[1.02] active:scale-95"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Headphones size={22} />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400/80 font-bold mb-1">
              Audio
            </span>
            <h3 className="text-sm sm:text-base font-serif font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
              Podcast en MP3
            </h3>
            <p className="text-[10px] text-stone-400 mt-1 leading-tight line-clamp-2">
              Microprogramas de radio y audios a la carta.
            </p>
          </button>

          {/* BOTÓN 4: LIBROS */}
          <button
            onClick={() => onNavigate('libros')}
            className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-stone-900/90 to-stone-950 border border-white/10 hover:border-amber-400/50 hover:bg-stone-800/80 transition-all flex flex-col items-start text-left group shadow-lg hover:scale-[1.02] active:scale-95"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <BookMarked size={22} />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400/80 font-bold mb-1">
              Lectura
            </span>
            <h3 className="text-sm sm:text-base font-serif font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
              Libros
            </h3>
            <p className="text-[10px] text-stone-400 mt-1 leading-tight line-clamp-2">
              Ensayos, obras clave de Hesse, García Márquez y literatura.
            </p>
          </button>

          {/* BOTÓN 5: BIOGRAFÍAS */}
          <button
            onClick={() => onNavigate('biografias')}
            className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-stone-900/90 to-stone-950 border border-white/10 hover:border-amber-400/50 hover:bg-stone-800/80 transition-all flex flex-col items-start text-left group shadow-lg hover:scale-[1.02] active:scale-95"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <UserCheck size={22} />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400/80 font-bold mb-1">
              Perfiles
            </span>
            <h3 className="text-sm sm:text-base font-serif font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
              Biografías
            </h3>
            <p className="text-[10px] text-stone-400 mt-1 leading-tight line-clamp-2">
              Georges Bataille, creadores y pensadores contemporáneos.
            </p>
          </button>

          {/* BOTÓN 6: REPORTAJES */}
          <button
            onClick={() => onNavigate('reportajes')}
            className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-stone-900/90 to-stone-950 border border-white/10 hover:border-amber-400/50 hover:bg-stone-800/80 transition-all flex flex-col items-start text-left group shadow-lg hover:scale-[1.02] active:scale-95"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <FileText size={22} />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-orange-400/80 font-bold mb-1">
              Investigación
            </span>
            <h3 className="text-sm sm:text-base font-serif font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
              Reportajes
            </h3>
            <p className="text-[10px] text-stone-400 mt-1 leading-tight line-clamp-2">
              Celulosa, sequía, crisis hídrica y crónicas geopolíticas.
            </p>
          </button>

          {/* BOTÓN 7: MÚSICA DEL NEXO */}
          <button
            onClick={() => onNavigate('musica')}
            className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-stone-900/90 to-stone-950 border border-white/10 hover:border-amber-400/50 hover:bg-stone-800/80 transition-all flex flex-col items-start text-left group shadow-lg hover:scale-[1.02] active:scale-95"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Music size={22} />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400/80 font-bold mb-1">
              Sonidos
            </span>
            <h3 className="text-sm sm:text-base font-serif font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
              Música del Nexo
            </h3>
            <p className="text-[10px] text-stone-400 mt-1 leading-tight line-clamp-2">
              Composiciones de Leo Castrillo y archivo musical propio.
            </p>
          </button>

          {/* BOTÓN 8: PELÍCULAS */}
          <button
            onClick={() => onNavigate('peliculas')}
            className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-stone-900/90 to-stone-950 border border-white/10 hover:border-amber-400/50 hover:bg-stone-800/80 transition-all flex flex-col items-start text-left group shadow-lg hover:scale-[1.02] active:scale-95"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Film size={22} />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400/80 font-bold mb-1">
              Cine & Video
            </span>
            <h3 className="text-sm sm:text-base font-serif font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
              Películas
            </h3>
            <p className="text-[10px] text-stone-400 mt-1 leading-tight line-clamp-2">
              Postales cinematográficas, Sauce, Bastión y piezas visuales.
            </p>
          </button>

          {/* BOTÓN 9: DOCUMENTOS DE INVESTIGACIÓN */}
          <button
            onClick={() => onNavigate('documentos')}
            className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-stone-900/90 to-stone-950 border border-white/10 hover:border-amber-400/50 hover:bg-stone-800/80 transition-all flex flex-col items-start text-left group shadow-lg hover:scale-[1.02] active:scale-95 col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Files size={22} />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400/80 font-bold mb-1">
              Dossiers & Fuentes
            </span>
            <h3 className="text-sm sm:text-base font-serif font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
              Documentos
            </h3>
            <p className="text-[10px] text-stone-400 mt-1 leading-tight line-clamp-2">
              Investigaciones extensas, dossiers DOCX y fuentes completas de podcasts y revistas.
            </p>
          </button>

        </div>
      </section>

      {/* SECCIÓN 3: VÍNCULOS A LAS REDES SOCIALES DE EL NEXO DIGITAL */}
      <SocialLinks />

    </div>
  );
};

export default ContentHub;
