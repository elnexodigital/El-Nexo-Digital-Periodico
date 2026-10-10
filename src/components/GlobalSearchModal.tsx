import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { searchByContext, type SearchResultItem } from '../utils/searchEngine.ts';
import type { AppView } from '../types.ts';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: AppView) => void;
}

const POPULAR_TOPICS = [
  'Medio ambiente & Agua',
  'Filosofía & Bataille',
  'Geopolítica & Tutela',
  'Educación & IA',
  'Hesse & Literatura',
  'Leo Castrillo',
  'Tango & Rioplatense',
  'Microprogramas'
];

const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    return searchByContext(query);
  }, [query]);

  if (!isOpen) return null;

  const handleSelectResult = (item: SearchResultItem) => {
    onNavigate(item.targetView);
    onClose();
  };

  const getBadgeColor = (category: string) => {
    switch (category) {
      case 'Revista Digital': return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'Podcast MP4': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'Podcast MP3': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'Libros': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'Biografías': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Reportajes': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'Documentos': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'Música del Nexo': return 'bg-teal-500/20 text-teal-300 border-teal-500/30';
      default: return 'bg-stone-500/20 text-stone-300 border-stone-500/30';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl bg-[#1c1f24] rounded-2xl sm:rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] mt-4 sm:mt-10 text-stone-100">
        
        {/* Barra superior de entrada de búsqueda */}
        <div className="p-3 sm:p-4 border-b border-white/10 bg-stone-900/90 flex items-center gap-3">
          <Search size={20} className="text-amber-400 shrink-0 ml-1" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por tema o contexto (ej: agua, geopolítica, filosofía, tango, IA...)"
            className="w-full bg-transparent text-sm sm:text-base text-stone-100 placeholder-stone-500 focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-stone-400 hover:text-white"
            >
              <X size={16} />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-stone-800 text-stone-300 hover:text-white text-xs font-mono uppercase"
          >
            Esc
          </button>
        </div>

        {/* Sugerencias conceptuales cuando no ha escrito */}
        {!query && (
          <div className="p-4 sm:p-6 space-y-4 overflow-y-auto">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
              <Sparkles size={14} />
              <span>Búsqueda Contextual Inteligente</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              No necesitas saber el nombre exacto. Puedes buscar por conceptos, temas sociales, ideas o disciplinas y el motor rastreará todo el catálogo:
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {POPULAR_TOPICS.map((topic) => (
                <button
                  key={topic}
                  onClick={() => setQuery(topic.split('&')[0]?.trim() || topic)}
                  className="px-3 py-1.5 rounded-xl bg-stone-800/80 hover:bg-amber-500/20 hover:text-amber-300 text-xs text-stone-300 border border-white/5 transition-colors"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Lista de resultados encontrados */}
        {query && (
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2.5">
            <div className="flex items-center justify-between px-2 text-xs font-mono text-stone-400 pb-1">
              <span>{results.length} coincidencias contextuales encontradas</span>
              <span className="text-[10px] uppercase text-amber-400">Ordenadas por relevancia</span>
            </div>

            {results.length === 0 ? (
              <div className="text-center py-12 space-y-2">
                <p className="text-stone-400 text-sm">No encontramos contenidos que coincidan con &quot;{query}&quot;</p>
                <p className="text-xs text-stone-500">Prueba con palabras más generales: filosofía, agua, literatura, radio...</p>
              </div>
            ) : (
              results.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectResult(item)}
                  className="p-3 sm:p-3.5 rounded-xl bg-stone-900/80 hover:bg-stone-800/90 border border-white/5 hover:border-amber-400/40 transition-all cursor-pointer flex items-center justify-between gap-3 group shadow"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold shrink-0 border mt-0.5 ${getBadgeColor(item.category)}`}>
                      {item.category}
                    </span>

                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-stone-200 group-hover:text-amber-300 transition-colors truncate">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-stone-400 line-clamp-1 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 text-stone-500 group-hover:text-amber-400 transition-colors">
                    <span className="text-[10px] font-mono uppercase hidden sm:inline">Ir</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Pie del modal */}
        <div className="p-3 border-t border-white/5 bg-stone-950 flex items-center justify-between text-[11px] font-mono text-stone-500">
          <span>Búsqueda semántica y temática activa</span>
          <button onClick={onClose} className="hover:text-stone-300">Cerrar</button>
        </div>

      </div>
    </div>
  );
};

export default GlobalSearchModal;
