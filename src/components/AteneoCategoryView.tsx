import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, 
  BookMarked, 
  UserCheck, 
  FileText, 
  Music, 
  Film, 
  Play, 
  Pause, 
  Download, 
  ExternalLink, 
  Search,
  Volume2,
  BookOpen,
  Sparkles
} from 'lucide-react';
import type { AppView, MusicTrack, LibraryItem } from '../types.ts';
import { LEO_CASTRILLO_TRACKS } from '../data/leoCastrillo.ts';
import { LIBRARY_CONTENT } from '../data/libraryContent.ts';
import LibraryDetailModal from './LibraryDetailModal.tsx';

interface AteneoCategoryViewProps {
  category: 'libros' | 'biografias' | 'reportajes' | 'musica' | 'peliculas' | 'documentos';
  onBack: () => void;
  onNavigateCategory: (cat: AppView) => void;
}

const CATEGORY_META = {
  libros: {
    title: 'Libros & Ensayos',
    subtitle: 'Obras cumbre, análisis literarios y textos para reflexionar',
    icon: BookMarked,
    color: 'emerald'
  },
  biografias: {
    title: 'Biografías & Pensadores',
    subtitle: 'Vidas, perfiles intelectuales y legados culturales',
    icon: UserCheck,
    color: 'blue'
  },
  reportajes: {
    title: 'Reportajes & Crónicas',
    subtitle: 'Crónicas profundas sobre geopolítica, recursos y sociedad',
    icon: FileText,
    color: 'orange'
  },
  documentos: {
    title: 'Documentos de Investigación',
    subtitle: 'Dossiers, informes extensos y fuentes completas de nuestras producciones',
    icon: FileText,
    color: 'amber'
  },
  musica: {
    title: 'Música del Nexo',
    subtitle: 'Composiciones originales de Leo Castrillo y archivo sonoro',
    icon: Music,
    color: 'teal'
  },
  peliculas: {
    title: 'Películas & Cineclub',
    subtitle: 'Postales audiovisuales, documentales y reflexiones sobre el cine',
    icon: Film,
    color: 'indigo'
  }
};

const AteneoCategoryView: React.FC<AteneoCategoryViewProps> = ({ 
  category, 
  onBack, 
  onNavigateCategory 
}) => {
  const meta = CATEGORY_META[category];
  const Icon = meta.icon;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDocItem, setSelectedDocItem] = useState<LibraryItem | null>(null);

  const handleOpenDocDetail = (docId: string) => {
    const found = LIBRARY_CONTENT.find(item => item.id === docId);
    if (found) {
      setSelectedDocItem(found);
    }
  };
  
  // Reproductor dedicado para pistas de música
  const [activeMusicTrack, setActiveMusicTrack] = useState<MusicTrack | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const musicAudioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayMusic = (track: MusicTrack) => {
    if (activeMusicTrack?.id === track.id) {
      if (isMusicPlaying) {
        musicAudioRef.current?.pause();
        setIsMusicPlaying(false);
      } else {
        musicAudioRef.current?.play();
        setIsMusicPlaying(true);
      }
    } else {
      setActiveMusicTrack(track);
      setIsMusicPlaying(true);
      if (musicAudioRef.current) {
        musicAudioRef.current.src = track.url;
        musicAudioRef.current.play().catch(e => console.error("Error reproduciendo música:", e));
      }
    }
  };

  // Ítems de Libros
  const LIBROS_ITEMS = [
    {
      id: 'libro_hesse',
      title: 'El Juego de los Abalorios',
      author: 'Hermann Hesse',
      coverUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/juego_de_abalorios_rmbqpw.webp',
      description: 'La obra maestra de Hermann Hesse sobre la síntesis del conocimiento, la crisis del arte y la búsqueda de la unidad trascendental.',
      pdfUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/resumen_el_juego_de_abalorios_tz8ijd.pdf',
      videoUrl: 'https://res.cloudinary.com/dnauavz56/video/upload/Hermann_Hesse__El_Arte_de_la_Crisis_xfvlgw.mp4',
      date: 'Marzo 2025'
    },
    {
      id: 'libro_macondo',
      title: 'Cien Años de Soledad: La Urdimbre de Macondo',
      author: 'Gabriel García Márquez',
      coverUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/100_de_solewdad_mc91i5.webp',
      description: 'Realismo mágico, soledad y violencia en Macondo. Un estudio sobre las capas simbólicas de la obra cumbre de García Márquez.',
      pdfUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/La_urdimbre_de_Macondo__Realismo_M%C3%A1gico_Soledad_y_Violencia_en_la_obra_de_Gabriel_Garc%C3%ADa_M%C3%A1rquez_i2pfte.pdf',
      videoUrl: 'https://res.cloudinary.com/dnauavz56/video/upload/Cien_a%C3%B1os_de_controversia_ubapnm.mp4',
      date: 'Octubre 2024'
    },
    {
      id: 'libro_lunar',
      title: 'Exploración Lunar: Del Apolo a Artemis',
      author: 'Archivo El Nexo Digital',
      coverUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=600',
      description: 'Un análisis exhaustivo sobre la reconfiguración del ego colectivo humano a través de la conquista espacial.',
      pdfUrl: 'https://res.cloudinary.com/dnauavz56/raw/upload/Exploraci%C3%B3n_Lunar_Apolo_a_Artemis_tc7zwm.docx',
      date: 'Febrero 2025'
    }
  ];

  // Ítems de Biografías
  const BIOGRAFIAS_ITEMS = [
    {
      id: 'bio_bataille',
      title: 'Georges Bataille: Soberanía y Gasto',
      subtitle: 'Filósofo y escritor francés (1897-1962)',
      coverUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/bataille_chwzaq.png',
      description: 'Exploración sobre la transgresión, el erotismo y la economía del exceso. Incluye ensayo documental y audio analítico.',
      pdfUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/Investigaci%C3%B3n_sobre_Georges_Bataille_1_g1sjkw.pdf',
      audioUrl: 'https://res.cloudinary.com/dgb6icyzx/video/upload/Bataille_Gasto_El_Sol_Erotismo_Fascismo_jhajdd.mp3'
    },
    {
      id: 'bio_hesse',
      title: 'Hermann Hesse: El Peregrino del Espíritu',
      subtitle: 'Premio Nobel de Literatura',
      coverUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/juego_de_abalorios_rmbqpw.webp',
      description: 'Un recorrido por su vida, su retiro espiritual en Suiza y su constante confrontación con la modernidad deshumanizada.',
      videoUrl: 'https://res.cloudinary.com/dnauavz56/video/upload/Hermann_Hesse__El_Arte_de_la_Crisis_xfvlgw.mp4'
    },
    {
      id: 'bio_leo',
      title: 'Leo Castrillo: Música, Palabra y Trinchera',
      subtitle: 'Compositor, comunicador y director de El Nexo Digital',
      coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1777939872/Copilot_20260504_211025_nw8vlh.png',
      description: 'Una visión integral sobre la creación musical independiente, el proyecto radial de El Nexo y el compromiso con la cultura viva.'
    }
  ];

  // Ítems de Reportajes
  const REPORTAJES_ITEMS = [
    {
      id: 'rep_voynich',
      title: 'El Manuscrito Voynich: El Enigma sin Resolver',
      author: 'Investigación Especial',
      coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1792462056/Manuscrito_ot6nug.png',
      description: 'Investigación exhaustiva sobre el códice Beinecke MS 408: botánica, paleografía de 5 escribas, pastiche generativo por IA (Turenne 2026) y cronología de fuentes.',
      externalUrl: 'https://heyzine.com/flip-book/73e446a995.html',
      pdfUrl: '/assets/aistudio/Estudios_y_Teoria_sobre_el_Manuscrito_Voynich.csv'
    },
    {
      id: 'rep_celulosa',
      title: 'La Industria de Celulosa en Uruguay',
      author: 'Investigación Central',
      coverUrl: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=600',
      description: 'Evolución y trascendencia de las plantas de celulosa: soberanía, economía y tensiones ambientales.',
      pdfUrl: 'https://res.cloudinary.com/dnauavz56/raw/upload/Evoluci%C3%B3n_y_Trascendencia_de_la_Industria_de_Celulosa_en_Uruguay_Un_An%C3%A1lisis_Multidimensional_sobre_el_Desarrollo_la_Soberan%C3%ADa_y_el_Impacto_Socioambiental_y8opdq.docx'
    },
    {
      id: 'rep_sequia',
      title: 'Sequía: El Mito del Uruguay Natural',
      author: 'Informe Especial',
      coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1775188752/Sequ%C3%ADa_en_Uruguaytapa_ddkjxf.png',
      description: 'Cuando la crisis hídrica desmanteló la ilusión de la abundancia infinita. Crónica de una alerta desatendida.',
      externalUrl: 'https://heyzine.com/flip-book/a5b1698e99.html'
    },
    {
      id: 'rep_casandra',
      title: 'La Coartada de Casandra: Escudo Moral y Litio',
      author: 'Geopolítica y Sociedad',
      coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1777933004/tapa_casandra_kgd7lg.png',
      description: 'Investigación sobre el marketing occidental, la manipulación de la agenda humanitaria y el extractivismo.',
      externalUrl: 'https://heyzine.com/flip-book/bb23ebdb83.html'
    },
    {
      id: 'rep_aguila',
      title: 'El Despertar del Águila: La Tutela Impuesta',
      author: 'Geopolítica',
      coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1777933473/el_despertar_del_aguila_sam56e_wpkn9y.png',
      description: '¿Ayuda internacional o subordinación estratégica? Las huellas históricas de la intervención en América Latina.',
      externalUrl: 'https://heyzine.com/flip-book/6419983d24.html'
    }
  ];

  // Ítems de Películas
  const PELICULAS_ITEMS = [
    {
      id: 'peli_sauce',
      title: 'Atardecer en Puerto Sauce',
      director: 'Producción Original El Nexo Digital',
      coverUrl: 'https://res.cloudinary.com/dnauavz56/video/upload/f_jpg,so_2/atardecer_en_puerto_ikddmm.jpg',
      videoUrl: 'https://res.cloudinary.com/dnauavz56/video/upload/atardecer_en_puerto_ikddmm.mp4',
      description: 'Los atardeceres en Sauce no bajan… Aterrizan. Caen en silencio sobre el Río de la Plata.'
    },
    {
      id: 'peli_bastion',
      title: 'Bastión del Carmen: Colonia del Sacramento',
      director: 'Producción Original El Nexo Digital',
      coverUrl: 'https://res.cloudinary.com/dnauavz56/video/upload/f_jpg,so_2/postales2_mdcweq.jpg',
      videoUrl: 'https://res.cloudinary.com/dnauavz56/video/upload/postales2_mdcweq.mp4',
      description: 'Entre murallas centenarias y el río, el Bastión del Carmen se alza como un puente entre memoria y presente.'
    }
  ];

  // Documentos extensos de investigación de El Nexo Digital
  const DOCUMENTOS_ITEMS = [
    {
      id: 'investigacion_3',
      title: 'Análisis Exhaustivo de la Encíclica Magnifica Humanitas del Papa León XIV',
      author: 'Leo Castrillo / Gemini',
      category: 'Religión / Humanidades',
      description: 'Primer documento de supremo magisterio pontificio dedicado a abordar de forma sistemática las implicaciones éticas, antropocéntricas y sociales de la IA. Analiza el marco de la Doctrina Social de la Iglesia (DSI) frente al paradigma tecnocrático.',
      format: 'PDF & Playlist en Video',
      coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1792337920/Man_reading_book_in_living_2K_20261007232437_bacsnv.jpg',
      externalUrl: 'https://www.youtube.com/playlist?list=PLRkKe7b6h28Y',
      hasDetail: true,
      isNew: true
    },
    {
      id: 'investigacion_4',
      title: 'Auge y Ocaso del Frigorífico Nacional de Uruguay',
      author: 'Leo Castrillo / NotebookLM',
      category: 'Economía / Mercado',
      description: 'Visión integral de la industria ganadera en Uruguay: trayectoria de la faena desde los años 30, monopolio del abasto capitalino, vedas de la carne, experiencia obrera de EFCSA y metas al 2050.',
      format: 'PDF & Documento Web',
      coverUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=800',
      externalUrl: 'https://elnexodigital.com',
      hasDetail: true,
      isNew: true
    },
    {
      id: 'doc_celulosa',
      title: 'Evolución y Trascendencia de la Industria de Celulosa en Uruguay',
      author: 'Investigación Central • El Nexo Digital',
      category: 'Desarrollo & Recursos',
      description: 'Análisis multidimensional sobre el modelo forestal, soberanía territorial, impacto socioambiental y balanza económica de las plantas de celulosa.',
      format: 'DOCX / Documento Extenso',
      pdfUrl: 'https://res.cloudinary.com/dnauavz56/raw/upload/Evoluci%C3%B3n_y_Trascendencia_de_la_Industria_de_Celulosa_en_Uruguay_Un_An%C3%A1lisis_Multidimensional_sobre_el_Desarrollo_la_Soberan%C3%ADa_y_el_Impacto_Socioambiental_y8opdq.docx'
    },
    {
      id: 'doc_bataille',
      title: 'Investigación sobre Georges Bataille: La Noción de Gasto y la Soberanía',
      author: 'Área de Filosofía • El Nexo Digital',
      category: 'Filosofía & Sociedad',
      description: 'Documento integral de 7 capítulos sobre economía general, erotismo, transgresión, crítica al fascismo y pensamiento de los límites.',
      format: 'PDF / 7 Capítulos',
      pdfUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/Investigaci%C3%B3n_sobre_Georges_Bataille_1_g1sjkw.pdf',
      audioUrl: 'https://res.cloudinary.com/dgb6icyzx/video/upload/Bataille_Gasto_El_Sol_Erotismo_Fascismo_jhajdd.mp3'
    },
    {
      id: 'doc_macondo',
      title: 'La Urdimbre de Macondo: Realismo Mágico, Soledad y Violencia',
      author: 'Crítica Literaria • El Nexo Digital',
      category: 'Literatura & Historia',
      description: 'Estudio documental profundo sobre la estructura simbólica, las controversias, la censura y el trasfondo político en la obra de García Márquez.',
      format: 'PDF Analítico',
      pdfUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/La_urdimbre_de_Macondo__Realismo_M%C3%A1gico_Soledad_y_Violencia_en_la_obra_de_Gabriel_Garc%C3%ADa_M%C3%A1rquez_i2pfte.pdf',
      videoUrl: 'https://res.cloudinary.com/dnauavz56/video/upload/Cien_a%C3%B1os_de_controversia_ubapnm.mp4'
    },
    {
      id: 'doc_hesse',
      title: 'Castalia y la Crisis del Espíritu: El Juego de los Abalorios',
      author: 'Investigación Editorial • El Nexo Digital',
      category: 'Ensayos & Humanidades',
      description: 'Guía y documento de análisis sobre la síntesis de las ciencias y las artes, la renuncia al poder mundano y la ordenación intelectual.',
      format: 'PDF / Resumen Analítico',
      pdfUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/resumen_el_juego_de_abalorios_tz8ijd.pdf'
    },
    {
      id: 'doc_lunar',
      title: 'Exploración Lunar: Del Apolo a Artemis',
      author: 'Archivo Científico • El Nexo Digital',
      category: 'Ciencia & Geopolítica',
      description: 'Investigación sobre la reconfiguración del ego colectivo humano, la nueva carrera espacial y la soberanía de los recursos lunares.',
      format: 'DOCX / Ensayo Completo',
      pdfUrl: 'https://res.cloudinary.com/dnauavz56/raw/upload/Exploraci%C3%B3n_Lunar_Apolo_a_Artemis_tc7zwm.docx'
    },
    {
      id: 'doc_sequia',
      title: 'Dossier: Sequía, Crisis Hídrica y Recursos en el Río de la Plata',
      author: 'Investigación Ambiental • El Nexo Digital',
      category: 'Ecología & Recursos',
      description: 'Fuentes y antecedentes sobre la salinización de redes de agua potable, modelos de gestión y las alertas desatendidas en el territorio.',
      format: 'Flipbook & Fuentes',
      externalUrl: 'https://heyzine.com/flip-book/a5b1698e99.html'
    },
    {
      id: 'doc_casandra',
      title: 'Dossier: La Coartada de Casandra y la Disputa del Litio',
      author: 'Investigación Geopolítica • El Nexo Digital',
      category: 'Geopolítica Internacional',
      description: 'Material de base documental sobre el uso de la imagen femenina como escudo moral y las pugnas geopolíticas por minerales críticos.',
      format: 'Flipbook & Ensayos',
      externalUrl: 'https://heyzine.com/flip-book/bb23ebdb83.html'
    }
  ];

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
              <Icon size={24} className="text-amber-400" />
              {meta.title}
            </h1>
            <p className="text-xs text-stone-400">
              {meta.subtitle}
            </p>
          </div>
        </div>

        {/* Buscador */}
        <div className="relative w-full sm:w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Buscar en ${meta.title}...`}
            className="w-full bg-stone-900 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-400/50"
          />
        </div>
      </div>

      {/* Selector de pestañas entre categorías del ateneo */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {(['libros', 'biografias', 'reportajes', 'documentos', 'musica', 'peliculas'] as const).map(catKey => {
          const catMeta = CATEGORY_META[catKey];
          const isActive = category === catKey;
          return (
            <button
              key={catKey}
              onClick={() => onNavigateCategory(catKey as AppView)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium tracking-wider uppercase transition-all whitespace-nowrap flex items-center gap-1.5 ${
                isActive
                  ? 'bg-amber-400 text-stone-950 font-bold shadow'
                  : 'bg-stone-900/80 text-stone-400 border border-white/5 hover:bg-stone-800 hover:text-stone-200'
              }`}
            >
              <span>{catMeta.title.split('&')[0]?.trim()}</span>
            </button>
          );
        })}
      </div>

      {/* Reproductor de audio para Música del Nexo */}
      {category === 'musica' && (
        <audio
          ref={musicAudioRef}
          onEnded={() => setIsMusicPlaying(false)}
          onPause={() => setIsMusicPlaying(false)}
          onPlay={() => setIsMusicPlaying(true)}
        />
      )}

      {/* RENDERIZADO POR CATEGORÍA */}
      
      {/* 1. LIBROS */}
      {category === 'libros' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LIBROS_ITEMS.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase())).map(libro => (
            <div key={libro.id} className="bg-stone-900/90 rounded-2xl border border-white/10 p-5 flex flex-col sm:flex-row gap-5 shadow-xl hover:border-emerald-500/40 transition-all">
              <div className="w-full sm:w-36 aspect-[3/4] rounded-xl overflow-hidden bg-stone-950 shrink-0 shadow-md">
                <img src={libro.coverUrl} alt={libro.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1 flex flex-col justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">{libro.author}</span>
                  <h3 className="font-serif text-lg font-bold text-stone-100 mt-1">{libro.title}</h3>
                  <p className="text-xs text-stone-400 mt-1 leading-relaxed">{libro.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                  {libro.pdfUrl && (
                    <a href={libro.pdfUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow">
                      <Download size={13} />
                      <span>Descargar</span>
                    </a>
                  )}
                  {libro.videoUrl && (
                    <a href={libro.videoUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs flex items-center gap-1.5 border border-white/10">
                      <Play size={13} fill="currentColor" />
                      <span>Video Resumen</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. BIOGRAFÍAS */}
      {category === 'biografias' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {BIOGRAFIAS_ITEMS.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase())).map(bio => (
            <div key={bio.id} className="bg-stone-900/90 rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between p-5 shadow-xl hover:border-blue-500/40 transition-all">
              <div className="space-y-3">
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-stone-950 border border-white/5">
                  <img src={bio.coverUrl} alt={bio.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-bold block">{bio.subtitle}</span>
                <h3 className="font-serif text-lg font-bold text-stone-100">{bio.title}</h3>
                <p className="text-xs text-stone-400 leading-relaxed">{bio.description}</p>
              </div>
              <div className="pt-4 border-t border-white/5 flex gap-2">
                {'pdfUrl' in bio && bio.pdfUrl && (
                  <a href={bio.pdfUrl} target="_blank" rel="noopener noreferrer" className="flex-1 py-1.5 text-center bg-blue-600 hover:bg-blue-500 text-stone-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1">
                    <Download size={13} />
                    <span>Ensayo PDF</span>
                  </a>
                )}
                {'audioUrl' in bio && bio.audioUrl && (
                  <a href={bio.audioUrl} target="_blank" rel="noopener noreferrer" className="flex-1 py-1.5 text-center bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs rounded-lg transition-colors flex items-center justify-center gap-1 border border-white/10">
                    <Volume2 size={13} />
                    <span>Audio Especial</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. REPORTAJES */}
      {category === 'reportajes' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {REPORTAJES_ITEMS.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase())).map(rep => (
            <div key={rep.id} className="bg-stone-900/90 rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between group p-5 shadow-xl hover:border-orange-500/40 transition-all">
              <div className="space-y-3">
                <div className="aspect-video rounded-xl overflow-hidden bg-stone-950">
                  <img src={rep.coverUrl} alt={rep.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-orange-400 font-bold block">{rep.author}</span>
                <h3 className="font-serif text-lg font-bold text-stone-100 group-hover:text-amber-300 transition-colors">{rep.title}</h3>
                <p className="text-xs text-stone-400 leading-relaxed">{rep.description}</p>
              </div>
              <div className="pt-4 border-t border-white/5 flex gap-2">
                {'externalUrl' in rep && rep.externalUrl && (
                  <a href={rep.externalUrl} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 text-center bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl transition-all shadow flex items-center justify-center gap-1.5">
                    <ExternalLink size={14} />
                    <span>Leer Reportaje</span>
                  </a>
                )}
                {'pdfUrl' in rep && rep.pdfUrl && (
                  <a href={rep.pdfUrl} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 text-center bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold rounded-xl transition-colors border border-white/10 flex items-center justify-center gap-1.5">
                    <Download size={14} />
                    <span>Descargar Documento</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. DOCUMENTOS DE INVESTIGACIÓN */}
      {category === 'documentos' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold block">
                Archivo de Investigación Extensa
              </span>
              <p className="text-xs text-stone-400">
                Dossiers completos, transcripciones y documentos fuente de nuestras producciones periodísticas y culturales.
              </p>
            </div>
            <span className="text-[11px] font-mono text-stone-400 bg-stone-900 px-3 py-1 rounded-lg border border-white/5">
              {DOCUMENTOS_ITEMS.length} documentos disponibles
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DOCUMENTOS_ITEMS.filter(item => 
              item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.category.toLowerCase().includes(searchTerm.toLowerCase())
            ).map(doc => {
              const isYouTube = 'externalUrl' in doc && doc.externalUrl?.includes('youtube.com');
              const hasFullDetail = 'hasDetail' in doc && doc.hasDetail;

              return (
                <div key={doc.id} className="rounded-2xl bg-stone-900/90 border border-white/10 hover:border-amber-400/40 transition-all flex flex-col justify-between overflow-hidden shadow-xl group">
                  {'coverUrl' in doc && doc.coverUrl && (
                    <div className="w-full h-44 overflow-hidden relative bg-stone-950">
                      <img 
                        src={doc.coverUrl} 
                        alt={doc.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg bg-amber-500 text-stone-950 text-[10px] font-mono uppercase font-black shadow">
                          {doc.category}
                        </span>
                        {'isNew' in doc && doc.isNew && (
                          <span className="px-2 py-0.5 rounded-lg bg-rose-600 text-white text-[10px] font-mono uppercase font-bold shadow flex items-center gap-1">
                            <Sparkles size={10} />
                            Nuevo
                          </span>
                        )}
                      </div>
                      <span className="absolute bottom-2 right-3 text-[10px] font-mono text-stone-300 bg-black/75 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
                        {doc.format}
                      </span>
                    </div>
                  )}

                  <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                    <div className="space-y-2.5">
                      {!('coverUrl' in doc && doc.coverUrl) && (
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono uppercase font-bold border border-amber-500/30">
                            {doc.category}
                          </span>
                          <span className="text-[10px] font-mono text-stone-500 uppercase">
                            {doc.format}
                          </span>
                        </div>
                      )}

                      <h3 className="font-serif text-base sm:text-lg font-bold text-stone-100 group-hover:text-amber-200 transition-colors leading-snug">
                        {doc.title}
                      </h3>

                      <p className="text-xs text-stone-400 leading-relaxed line-clamp-3">
                        {doc.description}
                      </p>

                      <span className="text-[10px] font-mono text-amber-400/80 block pt-1 font-semibold">
                        {doc.author}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex flex-wrap gap-2">
                      {hasFullDetail && (
                        <button
                          onClick={() => handleOpenDocDetail(doc.id)}
                          className="flex-1 py-2 px-3 bg-amber-500/20 hover:bg-amber-400 hover:text-stone-950 text-amber-300 font-bold text-xs rounded-xl transition-all border border-amber-500/30 shadow flex items-center justify-center gap-1.5"
                        >
                          <BookOpen size={14} />
                          <span>Leer Dossier Completo</span>
                        </button>
                      )}

                      {'pdfUrl' in doc && doc.pdfUrl && (
                        <a
                          href={doc.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 px-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl transition-all shadow flex items-center justify-center gap-1.5"
                        >
                          <Download size={14} />
                          <span>Descargar ({doc.format.split('/')[0]?.trim() || 'Archivo'})</span>
                        </a>
                      )}

                      {'externalUrl' in doc && doc.externalUrl && (
                        <a
                          href={doc.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex-1 py-2 px-3 font-bold text-xs rounded-xl transition-colors border border-white/10 flex items-center justify-center gap-1.5 shadow ${
                            isYouTube 
                              ? 'bg-rose-950/60 hover:bg-rose-600 text-rose-200 hover:text-white border-rose-500/40' 
                              : 'bg-stone-800 hover:bg-stone-700 text-stone-200'
                          }`}
                        >
                          <ExternalLink size={14} />
                          <span>{isYouTube ? 'Ver Playlist en YouTube' : 'Consultar fuentes'}</span>
                        </a>
                      )}

                      {'audioUrl' in doc && doc.audioUrl && (
                        <a
                          href={doc.audioUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 px-3 bg-stone-800 hover:bg-stone-700 text-amber-300 rounded-xl transition-colors border border-white/10 flex items-center gap-1.5 text-xs font-semibold"
                          title="Escuchar audio de investigación"
                        >
                          <span>Audio</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. MÚSICA DEL NEXO (LEO CASTRILLO) */}
      {category === 'musica' && (
        <div className="space-y-4">
          {activeMusicTrack && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-950/60 to-stone-950 border border-teal-500/40 shadow-xl flex items-center justify-between gap-4 sticky top-4 z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center">
                  <Music size={20} className={isMusicPlaying ? 'animate-bounce' : ''} />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-teal-400 font-bold block">Reproduciendo ahora</span>
                  <h4 className="text-xs font-bold text-stone-100">{activeMusicTrack.description}</h4>
                </div>
              </div>
              <button
                onClick={() => handlePlayMusic(activeMusicTrack)}
                className="px-4 py-2 bg-teal-400 text-stone-950 font-bold text-xs rounded-full uppercase tracking-wider flex items-center gap-2 hover:bg-teal-300 shadow"
              >
                {isMusicPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
                <span>{isMusicPlaying ? 'Pausar' : 'Play'}</span>
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {LEO_CASTRILLO_TRACKS.filter(track => track.description.toLowerCase().includes(searchTerm.toLowerCase())).map(track => {
              const isThisPlaying = activeMusicTrack?.id === track.id && isMusicPlaying;
              const isThisSelected = activeMusicTrack?.id === track.id;

              return (
                <div
                  key={track.id}
                  onClick={() => handlePlayMusic(track)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 group ${
                    isThisSelected
                      ? 'bg-teal-950/40 border-teal-400/80 shadow-md'
                      : 'bg-stone-900/80 border-white/5 hover:border-teal-400/40 hover:bg-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                        isThisPlaying
                          ? 'bg-teal-400 text-stone-950 shadow'
                          : 'bg-stone-800 text-stone-300 group-hover:bg-teal-500 group-hover:text-stone-950'
                      }`}
                    >
                      {isThisPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
                    </button>
                    <span className="text-xs font-medium text-stone-200 group-hover:text-teal-300 transition-colors truncate">
                      {track.description}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest shrink-0">Leo Castrillo</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. PELÍCULAS */}
      {category === 'peliculas' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PELICULAS_ITEMS.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase())).map(peli => (
            <div key={peli.id} className="bg-stone-900/90 rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between group p-5 shadow-xl hover:border-indigo-500/40 transition-all">
              <div className="space-y-3">
                <div className="aspect-video rounded-xl overflow-hidden bg-black shadow-inner">
                  <video src={peli.videoUrl} controls playsInline className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold block">{peli.director}</span>
                <h3 className="font-serif text-lg font-bold text-stone-100 group-hover:text-amber-300 transition-colors">{peli.title}</h3>
                <p className="text-xs text-stone-400 leading-relaxed">{peli.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de Lectura Editorial Completa de Documentos */}
      {selectedDocItem && (
        <LibraryDetailModal
          isOpen={!!selectedDocItem}
          onClose={() => setSelectedDocItem(null)}
          item={selectedDocItem}
        />
      )}

    </div>
  );
};

export default AteneoCategoryView;
