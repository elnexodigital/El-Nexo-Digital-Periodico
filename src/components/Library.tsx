
import React, { useState, useMemo } from 'react';
import { LIBRARY_CONTENT } from '../data/libraryContent.ts';
import type { LibraryItem } from '../types.ts';
import LibraryItemCard from './LibraryItemCard.tsx';
import LibraryDetailModal from './LibraryDetailModal.tsx';

interface LibraryProps {
  onBackToMagazine: () => void;
}

type CategoryFilter = 'Todos' | 'Revistas' | 'Podcasts' | 'Postales' | 'Libros' | 'Discos' | 'Películas';

const Library: React.FC<LibraryProps> = ({ onBackToMagazine }) => {
  const [activeTab, setActiveTab] = useState<'analysis' | 'audio' | 'video'>('analysis');
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('Todos');
  const [selectedItem, setSelectedItem] = useState<LibraryItem | null>(null);

  // Identificar la recomendación del mes (hardcoded por ID o lógica)
  const monthlyPick = useMemo(() => LIBRARY_CONTENT.find(item => item.id === 'libro1'), []);
  // El resto del contenido
  const archiveItems = useMemo(() => LIBRARY_CONTENT.filter(item => item.id !== 'libro1'), []);

  const filteredItems = useMemo(() => {
    let items = activeFilter === 'Todos' ? archiveItems : archiveItems.filter(item => item.category === activeFilter);

    if (activeFilter === 'Todos') {
      return [...items].sort((a, b) => {
        // Prioridad de categorías para la vista "Todos"
        const priority: Record<string, number> = {
          'Revistas': 1,
          'Postales': 2,
          'Podcasts': 3,
          // El resto tendrá prioridad baja (undefined o > 3)
        };
        const pA = priority[a.category] || 99;
        const pB = priority[b.category] || 99;
        return pA - pB;
      });
    }

    return items;
  }, [archiveItems, activeFilter]);

  if (!monthlyPick) {
    return <div>Error: No se encontró la recomendación del mes.</div>;
  }

  const handleOpenDetailModal = (item: LibraryItem) => {
    setSelectedItem(item);
  };

  const handleCloseDetailModal = () => {
    setSelectedItem(null);
  };

  const getNexoLogo = () => (
    <img
      src="https://res.cloudinary.com/ddmj6zevz/image/upload/w_32,h_32,c_fit,f_auto,q_auto/v1756714882/logo_el_nexo_digital_assa82.png"
      alt="Logo El Nexo"
      className="w-5 h-5 rounded-full border border-stone-300 dark:border-stone-600 animate-spin-very-slow"
    />
  );

  return (
    <div className="w-full pb-12 animate-fade-in">
      <div className="text-center mb-12 pt-4">
        <button
          onClick={onBackToMagazine}
          className="mb-6 inline-flex items-center gap-2 px-6 py-2 bg-white/10 dark:bg-black/20 text-brand-orange text-sm font-bold rounded-full hover:bg-brand-orange hover:text-white transition-all hover:scale-105 shadow-md backdrop-blur-md border border-brand-orange/30"
        >
          &larr; Volver a la Revista
        </button>
        <h1 className="text-5xl md:text-6xl mb-2 font-serif text-gray-900 dark:text-white">
          Archivo & Biblioteca
        </h1>
        <div className="w-24 h-1 bg-brand-orange mx-auto mb-4 rounded-full"></div>
        <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto text-lg">
          Un espacio de curación cultural y memoria digital.
        </p>
      </div>

      {/* --- Recomendación del Mes --- */}
      <section className="mb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold font-serif text-brand-green dark:text-brand-green">
              Recomendación del Mes
            </h2>
            <div className="h-px bg-brand-green/30 flex-grow"></div>
          </div>

          <div className="glass-panel rounded-2xl shadow-xl overflow-hidden md:grid md:grid-cols-5 gap-0 border border-white/20 dark:border-white/5">
            <div className="md:col-span-2 relative min-h-[400px]">
              <img
                src={monthlyPick.imageUrl}
                alt={`Portada de ${monthlyPick.title}`}
                className="absolute inset-0 w-full h-full object-cover md:rounded-l-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
            </div>
            <div className="md:col-span-3 p-8 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-wider rounded-full mb-3 border border-brand-orange/20">
                    {monthlyPick.category}
                  </span>
                  <h3 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white font-serif">{monthlyPick.title}</h3>
                  <p className="text-xl text-gray-600 dark:text-gray-400 italic font-serif">{monthlyPick.author}</p>
                </div>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                  <button
                    onClick={() => setActiveTab('analysis')}
                    className={`whitespace-nowrap py-2 border-b-2 font-bold text-sm transition-colors ${activeTab === 'analysis' ? 'border-brand-orange text-brand-orange' : 'border-transparent text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'}`}
                  >
                    Análisis
                  </button>
                  {monthlyPick.audioUrl && (
                    <button
                      onClick={() => setActiveTab('audio')}
                      className={`whitespace-nowrap py-2 border-b-2 font-bold text-sm transition-colors ${activeTab === 'audio' ? 'border-brand-orange text-brand-orange' : 'border-transparent text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'}`}
                    >
                      Escuchar
                    </button>
                  )}
                  {monthlyPick.videoUrl && (
                    <button
                      onClick={() => setActiveTab('video')}
                      className={`whitespace-nowrap py-2 border-b-2 font-bold text-sm transition-colors ${activeTab === 'video' ? 'border-brand-orange text-brand-orange' : 'border-transparent text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'}`}
                    >
                      Ver Video
                    </button>
                  )}
                </nav>
              </div>

              <div className="flex-grow flex flex-col">
                {activeTab === 'analysis' && (
                  <div className="flex-grow h-64 overflow-y-auto pr-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300 scrollbar-thin">
                    <p className="whitespace-pre-wrap">{monthlyPick.review}</p>
                  </div>
                )}
                {activeTab === 'audio' && monthlyPick.audioUrl && (
                  <div className="py-4 my-auto bg-gray-50 dark:bg-black/30 rounded-xl p-4 border border-gray-100 dark:border-white/5">
                    <audio controls className="w-full">
                      <source src={monthlyPick.audioUrl} type="audio/mp4" />
                      Tu navegador no soporta el elemento de audio.
                    </audio>
                  </div>
                )}
                {activeTab === 'video' && monthlyPick.videoUrl && (
                  <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg my-auto">
                    <video controls className="w-full h-full">
                      <source src={monthlyPick.videoUrl} type="video/mp4" />
                      Tu navegador no soporta el elemento de video.
                    </video>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Archivo de la Biblioteca --- */}
      <section className="border-t border-gray-200 dark:border-gray-800 pt-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-center font-bold mb-8 text-gray-900 dark:text-white font-serif">
            Colección
          </h2>

          <div className="flex justify-center gap-3 mb-10 flex-wrap">
            {(['Todos', 'Revistas', 'Podcasts', 'Postales', 'Libros', 'Discos', 'Películas'] as CategoryFilter[]).map(filter => {
              const isSpecial = filter === 'Revistas' || filter === 'Podcasts' || filter === 'Postales';
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`flex items-center gap-2 px-5 py-2 text-sm font-bold rounded-full transition-all duration-200 backdrop-blur-sm ${activeFilter === filter
                    ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/30 scale-105'
                    : 'bg-white/50 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10'
                    } ${isSpecial && activeFilter !== filter ? 'border border-brand-orange/30 text-brand-orange' : ''}`}
                >
                  {isSpecial && getNexoLogo()}
                  {filter}
                </button>
              );
            })}
          </div>

          {filteredItems.length === 0 ? (
            <p className="text-center text-gray-500 py-12">No hay items en esta categoría aún.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {filteredItems.map(item => (
                <LibraryItemCard key={item.id} item={item} onClick={() => handleOpenDetailModal(item)} />
              ))}
            </div>
          )}
        </div>
      </section>

      <LibraryDetailModal
        isOpen={!!selectedItem}
        onClose={handleCloseDetailModal}
        item={selectedItem}
      />
    </div>
  );
};

export default Library;
