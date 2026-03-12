import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ExternalLink, ChevronDown, BookOpen } from 'lucide-react';

interface MagazineEdition {
  id: string;
  title: string;
  date: string;
  url: string;
  description: string;
  pdfUrl?: string;
  coverUrl?: string;
  isNew?: boolean;
}

const EDITIONS: MagazineEdition[] = [
  {
    id: 'current',
    title: "Edición Especial",
    date: "Marzo 2026",
    url: "https://heyzine.com/flip-book/628a405afd.html",
    description: "Guía de construcción en seco, lo que tenes que saber si o si.",
    pdfUrl: "https://drive.google.com/file/d/1bz2l4P9hPztmLDE-2BDJNWYknAT4Mf6e/view?usp=sharing",
    coverUrl: "https://res.cloudinary.com/dnauavz56/image/upload/v1773341305/yeso_para_digital_sfnem7.png",
    isNew: true
  },
  {
    id: 'previous-1',
    title: "Edición Anterior",
    date: "Febrero 2026",
    url: "https://heyzine.com/flip-book/a5b1698e99.html",
    description: "SEQUÍA \"cuando el mito del Uruguay natural se cae a pedazos\"",
    pdfUrl: "#"
  }
];

const Magazine: React.FC = () => {
  const [activeEdition, setActiveEdition] = useState<MagazineEdition>(EDITIONS[0]);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  const handleDownload = (pdfUrl?: string) => {
    if (pdfUrl && pdfUrl !== '#') {
      window.open(pdfUrl, '_blank');
    } else {
      alert("La descarga en PDF estará disponible próximamente para esta edición.");
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Magazine Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-zen-charcoal/10 pb-6 gap-6">
        <div className="space-y-4 w-full md:w-auto">
          <div className="flex items-center gap-3">
            <h2 className="text-4xl md:text-5xl font-serif font-black text-zen-charcoal tracking-tighter">
              Quiosco Digital
            </h2>
            {activeEdition.isNew && (
              <span className="px-2 py-1 bg-[#800020] text-white text-[10px] font-bold uppercase tracking-tighter rounded">
                Nuevo
              </span>
            )}
          </div>
          
          {/* Edition Selector */}
          <div className="relative">
            <button 
              onClick={() => setIsSelectorOpen(!isSelectorOpen)}
              className="flex items-center gap-3 px-4 py-2 bg-white border border-zen-charcoal/10 rounded-lg shadow-sm hover:border-zen-charcoal/30 transition-all group"
            >
              <BookOpen size={16} className="text-zen-charcoal/50" />
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-widest text-zen-charcoal/40 font-bold leading-none mb-1">Viendo ahora</p>
                <p className="text-sm font-bold text-zen-charcoal">{activeEdition.title} • {activeEdition.date}</p>
                <p className="text-[10px] text-zen-charcoal/60 mt-1 italic">{activeEdition.description}</p>
              </div>
              <ChevronDown size={16} className={`text-zen-charcoal/30 transition-transform ${isSelectorOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isSelectorOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-2 w-72 bg-white border border-zen-charcoal/10 rounded-xl shadow-xl z-50 overflow-hidden"
                >
                  {EDITIONS.map((edition) => (
                    <button
                      key={edition.id}
                      onClick={() => {
                        setActiveEdition(edition);
                        setIsSelectorOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-zen-charcoal/5 transition-colors border-b border-zen-charcoal/5 last:border-0 flex gap-3 items-center ${activeEdition.id === edition.id ? 'bg-zen-charcoal/5' : ''}`}
                    >
                      {edition.coverUrl && (
                        <div className="w-12 h-16 bg-zen-charcoal/5 rounded overflow-hidden flex-shrink-0 border border-zen-charcoal/10">
                          <img 
                            src={edition.coverUrl} 
                            alt={edition.title} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-bold text-zen-charcoal">{edition.title}</p>
                        <p className="text-[10px] text-zen-charcoal/50 uppercase tracking-widest mb-1">{edition.date}</p>
                        <p className="text-[9px] text-zen-charcoal/60 line-clamp-2 leading-tight">{edition.description}</p>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={() => handleDownload(activeEdition.pdfUrl)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-zen-charcoal/10 rounded-full text-xs font-bold uppercase tracking-widest text-zen-charcoal hover:bg-zen-charcoal/5 transition-all"
          >
            <Download size={14} />
            Descargar PDF
          </button>
          <a 
            href={activeEdition.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-zen-charcoal text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zen-charcoal/90 transition-all"
          >
            <ExternalLink size={14} />
            Pantalla Completa
          </a>
        </div>
      </div>

      {/* Heyzine Iframe Container */}
      <motion.div 
        key={activeEdition.id}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full bg-zen-charcoal/5 rounded-2xl shadow-2xl overflow-hidden border border-zen-charcoal/10"
        style={{ paddingTop: '70.71%' /* A4 Aspect Ratio */ }}
      >
        <iframe
          src={activeEdition.url}
          title={`El Nexo Digital - ${activeEdition.title}`}
          className="absolute top-0 left-0 w-full h-full border-0"
          allowFullScreen
          allow="fullscreen; clipboard-write"
        >
          <div className="flex flex-col items-center justify-center h-full p-12 text-center">
            <p className="text-zen-charcoal/60 mb-4">Tu navegador no soporta iframes.</p>
            <a 
              href={activeEdition.url} 
              className="text-[#800020] font-bold underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Haz clic aquí para ver la revista
            </a>
          </div>
        </iframe>
      </motion.div>

      {/* Footer Info */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-zen-charcoal/10">
        <div className="space-y-2">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-zen-charcoal/40">Experiencia</h4>
          <p className="text-sm text-zen-charcoal/70 leading-relaxed">
            Navega por las páginas arrastrando las esquinas o usando las flechas laterales.
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-zen-charcoal/40">Descarga</h4>
          <p className="text-sm text-zen-charcoal/70 leading-relaxed">
            Puedes bajar la versión en PDF para leerla sin conexión en cualquier dispositivo.
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-zen-charcoal/40">Archivo</h4>
          <p className="text-sm text-zen-charcoal/70 leading-relaxed">
            Usa el selector de arriba para explorar ediciones anteriores de nuestra revista.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Magazine;
