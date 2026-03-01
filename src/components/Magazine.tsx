import React from 'react';
import { motion } from 'motion/react';
import { Share2, Download, ExternalLink } from 'lucide-react';

const HEYZINE_URL = "https://heyzine.com/flip-book/a5b1698e99.html";

const Magazine: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Magazine Header */}
      <div className="flex justify-between items-end mb-8 border-b border-zen-charcoal/10 pb-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-serif font-black text-zen-charcoal tracking-tighter">
            Revista Digital Interactiva
          </h2>
          <p className="text-sm text-zen-charcoal/60 mt-2 font-light uppercase tracking-widest">
            Edición Semanal • El Nexo Digital
          </p>
        </div>
        
        <div className="hidden md:flex items-center gap-3">
          <button className="p-3 hover:bg-zen-charcoal/5 rounded-full transition-colors border border-zen-charcoal/10">
            <Share2 size={18} className="text-zen-charcoal/70" />
          </button>
          <button className="p-3 hover:bg-zen-charcoal/5 rounded-full transition-colors border border-zen-charcoal/10">
            <Download size={18} className="text-zen-charcoal/70" />
          </button>
          <a 
            href={HEYZINE_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 bg-zen-charcoal text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zen-charcoal/90 transition-colors"
          >
            <ExternalLink size={14} />
            Pantalla Completa
          </a>
        </div>
      </div>

      {/* Heyzine Iframe Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full bg-zen-charcoal/5 rounded-2xl shadow-2xl overflow-hidden border border-zen-charcoal/10"
        style={{ paddingTop: '70.71%' /* A4 Aspect Ratio for Flipbooks */ }}
      >
        <iframe
          src={HEYZINE_URL}
          title="El Nexo Digital - Revista Interactiva"
          className="absolute top-0 left-0 w-full h-full border-0"
          allowFullScreen
          allow="fullscreen; clipboard-write"
        >
          <div className="flex flex-col items-center justify-center h-full p-12 text-center">
            <p className="text-zen-charcoal/60 mb-4">Tu navegador no soporta iframes.</p>
            <a 
              href={HEYZINE_URL} 
              className="text-[#800020] font-bold underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Haz clic aquí para ver la revista
            </a>
          </div>
        </iframe>
      </motion.div>

      {/* Mobile Actions */}
      <div className="mt-6 flex md:hidden justify-center gap-4">
        <a 
          href={HEYZINE_URL} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-4 bg-zen-charcoal text-white rounded-full text-xs font-bold uppercase tracking-widest w-full justify-center"
        >
          <ExternalLink size={16} />
          Abrir Revista
        </a>
      </div>

      {/* Footer Info */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-zen-charcoal/10">
        <div className="space-y-2">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-zen-charcoal/40">Experiencia</h4>
          <p className="text-sm text-zen-charcoal/70 leading-relaxed">
            Navega por las páginas arrastrando las esquinas o usando las flechas laterales.
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-zen-charcoal/40">Interactividad</h4>
          <p className="text-sm text-zen-charcoal/70 leading-relaxed">
            Busca enlaces activos y contenido multimedia embebido en cada edición.
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-zen-charcoal/40">Archivo</h4>
          <p className="text-sm text-zen-charcoal/70 leading-relaxed">
            Puedes encontrar ediciones anteriores en nuestra sección de Biblioteca.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Magazine;
