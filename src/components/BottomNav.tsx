import React from 'react';
import { Home, BookOpen, Search, Headphones, Layers } from 'lucide-react';
import type { AppView } from '../types.ts';

interface BottomNavProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  onOpenSearch?: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, onNavigate, onOpenSearch }) => {
  const isAteneoActive = ['libros', 'biografias', 'reportajes', 'documentos', 'musica', 'peliculas', 'podcasts-mp4'].includes(currentView);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-stone-950/95 backdrop-blur-xl border-t border-white/10 px-2 py-2 flex items-center justify-around max-w-lg mx-auto shadow-2xl sm:rounded-t-2xl">
      
      {/* 1. Inicio */}
      <button
        onClick={() => {
          onNavigate('hub');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all ${
          currentView === 'hub'
            ? 'text-amber-400 font-bold scale-105'
            : 'text-stone-400 hover:text-stone-200'
        }`}
      >
        <Home size={18} />
        <span className="text-[10px] tracking-wider uppercase font-mono">Inicio</span>
      </button>

      {/* 2. Revistas */}
      <button
        onClick={() => {
          onNavigate('revistas');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all ${
          currentView === 'revistas'
            ? 'text-rose-400 font-bold scale-105'
            : 'text-stone-400 hover:text-stone-200'
        }`}
      >
        <BookOpen size={18} />
        <span className="text-[10px] tracking-wider uppercase font-mono">Revistas</span>
      </button>

      {/* 3. Buscar Contextual (Botón Central Destacado) */}
      {onOpenSearch && (
        <button
          onClick={onOpenSearch}
          className="flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl text-amber-300 hover:text-amber-200 bg-amber-500/15 border border-amber-500/30 shadow transition-all hover:scale-105 active:scale-95"
          title="Buscar por contexto o tema"
        >
          <Search size={18} />
          <span className="text-[10px] tracking-wider uppercase font-mono font-bold">Buscar</span>
        </button>
      )}

      {/* 4. Podcasts MP3 */}
      <button
        onClick={() => {
          onNavigate('podcasts-mp3');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all ${
          currentView === 'podcasts-mp3'
            ? 'text-amber-400 font-bold scale-105'
            : 'text-stone-400 hover:text-stone-200'
        }`}
      >
        <Headphones size={18} />
        <span className="text-[10px] tracking-wider uppercase font-mono">Audio</span>
      </button>

      {/* 5. Ateneo / Secciones */}
      <button
        onClick={() => {
          onNavigate('libros');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all ${
          isAteneoActive
            ? 'text-amber-400 font-bold scale-105'
            : 'text-stone-400 hover:text-stone-200'
        }`}
      >
        <Layers size={18} />
        <span className="text-[10px] tracking-wider uppercase font-mono">Ateneo</span>
      </button>

    </nav>
  );
};

export default BottomNav;
