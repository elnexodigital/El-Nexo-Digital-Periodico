
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
    <div className="w-full font-typewriter pb-12 animate-fade-in">
      <div className="text-center mb-12 pt-4">
        <button
          onClick={onBackToMagazine}
          className="mb-6 inline-flex items-center gap-2 px-6 py-2 bg-stone-800 text-white text-sm font-bold rounded-full hover:bg-black transition-transform hover:scale-105 shadow-md"
        >
          &larr; Volver a la Revista
        </button>
        <h1 className="text-5xl md:text-6xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Archivo & Biblioteca
        </h1>
        <div className="w-24 h-1 bg-stone-800 mx-auto mb-4"></div>
        <p className="text-stone-600 mt-2 max-w-2xl mx-auto text-lg">
          Un espacio de curación cultural y memoria digital.
        </p>
      </div>

      {/* --- Recomendación del Mes --- */}
      <section className="mb-20 px-4">
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <h2 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                Recomendación del Mes
                </h2>
                <div className="h-px bg-stone-300 flex-grow"></div>
            </div>
            
            <div className="bg-white dark:bg-stone-800 rounded-lg shadow-xl overflow-hidden md:grid md:grid-cols-5 gap-0 border border-stone-200 dark:border-stone-700">
            <div className="md:col-span-2 relative min-h-[400px]">
                <img 
                src={monthlyPick.imageUrl} 
                alt={`Portada de ${monthlyPick.title}`}
                className="absolute inset-0 w-full h-full object-cover" 
                />
            </div>
            <div className="md:col-span-3 p-8 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                <div>
                    <span className="inline-block px-3 py-1 bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                        {monthlyPick.category}
                    </span>
                    <h3 className="text-4xl font-bold mb-2 text-stone-900 dark:text-stone-100" style={{ fontFamily: "'Playfair Display', serif" }}>{monthlyPick.title}</h3>
                    <p className="text-xl text-stone-700 dark:text-stone-400 italic font-serif">{monthlyPick.author}</p>
                </div>
                </div>
                
                <div className="border-b border-stone-200 dark:border-stone-600 mb-4">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    <button
                    onClick={() => setActiveTab('analysis')}
                    className={`whitespace-nowrap py-2 border-b-2 font-bold text-sm transition-colors ${activeTab === 'analysis' ? 'border-stone-800 text-stone-900 dark:border-stone-100 dark:text-stone-100' : 'border-transparent text-stone-500 hover:text-stone-700 dark:text-stone-500 dark:hover:text-stone-300'}`}
                    >
                    Análisis
                    </button>
                    {monthlyPick.audioUrl && (
                    <button
                        onClick={() => setActiveTab('audio')}
                        className={`whitespace-nowrap py-2 border-b-2 font-bold text-sm transition-colors ${activeTab === 'audio' ? 'border-stone-800 text-stone-900 dark:border-stone-100 dark:text-stone-100' : 'border-transparent text-stone-500 hover:text-stone-700 dark:text-stone-500 dark:hover:text-stone-300'}`}
                    >
                        Escuchar
                    </button>
                    )}
                    {monthlyPick.videoUrl && (
                    <button
                        onClick={() => setActiveTab('video')}
                        className={`whitespace-nowrap py-2 border-b-2 font-bold text-sm transition-colors ${activeTab === 'video' ? 'border-stone-800 text-stone-900 dark:border-stone-100 dark:text-stone-100' : 'border-transparent text-stone-500 hover:text-stone-700 dark:text-stone-500 dark:hover:text-stone-300'}`}
                    >
                        Ver Video
                    </button>
                    )}
                </nav>
                </div>

                <div className="flex-grow flex flex-col">
                {activeTab === 'analysis' && (
                    <div className="flex-grow h-64 overflow-y-auto pr-2 text-sm leading-relaxed text-stone-800 dark:text-stone-300 scrollbar-thin">
                    <p className="whitespace-pre-wrap">{monthlyPick.review}</p>
                    </div>
                )}
                {activeTab === 'audio' && monthlyPick.audioUrl && (
                    <div className="py-4 my-auto bg-stone-50 dark:bg-stone-900 rounded p-4">
                    <audio controls className="w-full">
                        <source src={monthlyPick.audioUrl} type="audio/mp4" />
                        Tu navegador no soporta el elemento de audio.
                    </audio>
                    </div>
                )}
                {activeTab === 'video' && monthlyPick.videoUrl && (
                    <div className="aspect-video bg-black rounded-md overflow-hidden shadow-lg my-auto">
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
      <section className="border-t border-stone-300 dark:border-stone-700 pt-12 px-4 bg-[#fdfaf4] dark:bg-[#1f2023]">
        <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-center font-bold mb-8 text-stone-900 dark:text-stone-100" style={{ fontFamily: "'Playfair Display', serif" }}>
            Colección
            </h2>
            
            <div className="flex justify-center gap-3 mb-10 flex-wrap">
            {(['Todos', 'Revistas', 'Podcasts', 'Postales', 'Libros', 'Discos', 'Películas'] as CategoryFilter[]).map(filter => {
                const isSpecial = filter === 'Revistas' || filter === 'Podcasts' || filter === 'Postales';
                return (
                  <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`flex items-center gap-2 px-5 py-2 text-sm font-bold rounded-full transition-all duration-200 ${
                      isSpecial ? 'border-2' : 'border'
                  } ${
                      activeFilter === filter 
                      ? 'bg-stone-900 text-white border-stone-900 dark:bg-stone-100 dark:text-stone-900 shadow-md transform scale-105' 
                      : 'bg-transparent text-stone-600 border-stone-400 hover:border-stone-900 hover:text-stone-900 dark:text-stone-400 dark:border-stone-600 dark:hover:border-stone-300 dark:hover:text-stone-200'
                  }`}
                  >
                  {isSpecial && getNexoLogo()}
                  {filter}
                  </button>
                );
            })}
            </div>

            {filteredItems.length === 0 ? (
                <p className="text-center text-stone-500 py-12">No hay items en esta categoría aún.</p>
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
