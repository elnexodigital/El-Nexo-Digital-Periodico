import React, { useState } from 'react';
import { ArrowLeft, BookOpen, ExternalLink, Download, Search, Sparkles } from 'lucide-react';
import { MAGAZINE_EDITIONS } from './ContentHub.tsx';

interface RevistasViewProps {
  onBack: () => void;
}

const ALL_MAGAZINES = [
  ...MAGAZINE_EDITIONS,
  {
    id: 'celulosa',
    title: "La Industria de Celulosa en Uruguay",
    date: "Especial 2025",
    url: "https://res.cloudinary.com/dnauavz56/raw/upload/Evoluci%C3%B3n_y_Trascendencia_de_la_Industria_de_Celulosa_en_Uruguay_Un_An%C3%A1lisis_Multidimensional_sobre_el_Desarrollo_la_Soberan%C3%ADa_y_el_Impacto_Socioambiental_y8opdq.docx",
    description: "Análisis multidimensional sobre el desarrollo, la soberanía y el impacto socioambiental de las plantas de celulosa.",
    coverUrl: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=600",
    pdfUrl: "https://res.cloudinary.com/dnauavz56/raw/upload/Evoluci%C3%B3n_y_Trascendencia_de_la_Industria_de_Celulosa_en_Uruguay_Un_An%C3%A1lisis_Multidimensional_sobre_el_Desarrollo_la_Soberan%C3%ADa_y_el_Impacto_Socioambiental_y8opdq.docx"
  },
  {
    id: 'bataille_mag',
    title: "Investigación Georges Bataille",
    date: "Investigación",
    url: "https://res.cloudinary.com/dnauavz56/image/upload/Investigaci%C3%B3n_sobre_Georges_Bataille_1_g1sjkw.pdf",
    description: "La noción de gasto, el erotismo y la soberanía del pensamiento en la obra de Georges Bataille.",
    coverUrl: "https://res.cloudinary.com/dnauavz56/image/upload/bataille_chwzaq.png",
    pdfUrl: "https://res.cloudinary.com/dnauavz56/image/upload/Investigaci%C3%B3n_sobre_Georges_Bataille_1_g1sjkw.pdf"
  }
];

const RevistasView: React.FC<RevistasViewProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [readingEditionUrl, setReadingEditionUrl] = useState<string | null>(null);

  const filtered = ALL_MAGAZINES.filter(mag => 
    mag.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mag.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mag.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-20 text-stone-100">
      
      {/* Barra de cabecera con retorno */}
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
              <BookOpen size={24} className="text-rose-400" />
              Quiosco Digital de Revistas
            </h1>
            <p className="text-xs text-stone-400">
              Colección completa de publicaciones periódicas de El Nexo Digital
            </p>
          </div>
        </div>

        {/* Buscador de ediciones */}
        <div className="relative w-full sm:w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por título o tema..."
            className="w-full bg-stone-900 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-400/50"
          />
        </div>
      </div>

      {/* Visor interactivo incrustado si el usuario elige leer dentro */}
      {readingEditionUrl && (
        <div className="p-4 bg-stone-950 rounded-2xl border border-amber-500/30 shadow-2xl relative space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold flex items-center gap-1.5">
              <Sparkles size={14} /> Visor de Revista Activo
            </span>
            <button
              onClick={() => setReadingEditionUrl(null)}
              className="text-xs font-mono uppercase tracking-wider text-stone-400 hover:text-white px-2.5 py-1 bg-stone-900 rounded-lg border border-white/10"
            >
              Cerrar visor
            </button>
          </div>
          <div className="w-full h-[550px] rounded-xl overflow-hidden bg-black">
            <iframe
              src={readingEditionUrl}
              title="Visor de Revista"
              className="w-full h-full border-0"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Grilla con todas las ediciones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((mag) => (
          <div
            key={mag.id}
            className="bg-stone-900/90 rounded-2xl border border-white/10 overflow-hidden flex flex-col group hover:border-amber-400/50 transition-all shadow-xl hover:scale-[1.01]"
          >
            {/* Tapa grande */}
            <div className="relative aspect-[3/4] bg-stone-950 overflow-hidden">
              <img
                src={mag.coverUrl}
                alt={mag.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent" />
              
              <span className="absolute bottom-3 left-3 px-2 py-0.5 bg-black/80 backdrop-blur-md rounded text-[11px] font-mono text-amber-300 font-semibold border border-white/10">
                {mag.date}
              </span>
              {'isNew' in mag && mag.isNew && (
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-rose-600 text-white rounded text-[10px] font-bold uppercase tracking-wider shadow">
                  Última Edición
                </span>
              )}
            </div>

            {/* Ficha descriptiva */}
            <div className="p-4 flex-1 flex flex-col justify-between gap-3">
              <div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                  {mag.title}
                </h3>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  {mag.description}
                </p>
              </div>

              {/* Botones de acción */}
              <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                {mag.url.includes('heyzine.com') ? (
                  <button
                    onClick={() => setReadingEditionUrl(mag.url)}
                    className="flex-1 py-2 px-3 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-xl transition-all shadow flex items-center justify-center gap-1.5"
                  >
                    <BookOpen size={14} />
                    <span>Leer aquí</span>
                  </button>
                ) : null}

                <a
                  href={mag.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold rounded-xl transition-colors border border-white/10 flex items-center justify-center gap-1.5"
                >
                  <ExternalLink size={14} />
                  <span>En pestaña</span>
                </a>

                {'pdfUrl' in mag && mag.pdfUrl && mag.pdfUrl !== '#' && (
                  <a
                    href={mag.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white rounded-xl transition-colors border border-white/10"
                    title="Descargar PDF"
                  >
                    <Download size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default RevistasView;
