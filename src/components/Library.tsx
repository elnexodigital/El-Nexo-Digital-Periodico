
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

  const monthlyPick = useMemo(() => LIBRARY_CONTENT.find(item => item.id === 'libro1'), []);
  const archiveItems = useMemo(() => LIBRARY_CONTENT.filter(item => item.id !== 'libro1'), []);

  const filteredItems = useMemo(() => {
    let items = activeFilter === 'Todos' ? archiveItems : archiveItems.filter(item => item.category === activeFilter);
    if (activeFilter === 'Todos') {
      return [...items].sort((a, b) => {
        const priority: Record<string, number> = { 'Revistas': 1, 'Postales': 2, 'Podcasts': 3 };
        return (priority[a.category] || 99) - (priority[b.category] || 99);
      });
    }
    return items;
  }, [archiveItems, activeFilter]);

  if (!monthlyPick) return null;

  const handleOpenDetailModal = (item: LibraryItem) => setSelectedItem(item);
  const handleCloseDetailModal = () => setSelectedItem(null);

  return (
    <div className="w-full pb-32">
      <div className="text-center mb-24 pt-12">
        <button
          onClick={onBackToMagazine}
          className="mb-12 inline-flex items-center gap-3 px-8 py-2.5 bg-white/40 text-zen-charcoal/40 text-[9px] font-mono uppercase tracking-[0.3em] rounded-full hover:bg-white/60 hover:text-zen-charcoal/80 transition-all border border-black/5"
        >
          &larr; Volver
        </button>
        <h1 className="text-6xl mb-6 font-serif text-zen-charcoal/80 italic">
          Archivo & Biblioteca
        </h1>
        <div className="w-12 h-px bg-zen-bamboo/30 mx-auto mb-8"></div>
        <p className="text-zen-charcoal/30 max-w-2xl mx-auto text-[9px] font-mono uppercase tracking-[0.5em]">
          Curación Cultural • Memoria • Flow
        </p>
      </div>

      {/* --- Recomendación del Mes --- */}
      <section className="mb-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-8 mb-14">
            <h2 className="text-3xl font-serif text-zen-charcoal/70 italic">Recomendación</h2>
            <div className="h-px bg-black/5 flex-grow"></div>
          </div>

          <div className="bg-white shadow-sm rounded-3xl overflow-hidden md:grid md:grid-cols-5 gap-0 border border-black/5">
            <div className="md:col-span-2 relative min-h-[500px]">
              <img
                src={monthlyPick.imageUrl}
                alt={monthlyPick.title}
                className="absolute inset-0 w-full h-full object-cover grayscale-[0.2]"
              />
            </div>
            <div className="md:col-span-3 p-16 flex flex-col bg-white/60 backdrop-blur-xl">
              <div className="mb-10">
                <span className="inline-block px-5 py-1.5 bg-zen-tan/50 text-zen-charcoal/40 text-[9px] font-mono uppercase tracking-[0.3em] rounded-full mb-8 border border-black/5">
                  {monthlyPick.category}
                </span>
                <h3 className="text-4xl font-serif mb-4 text-zen-charcoal/90">{monthlyPick.title}</h3>
                <p className="text-xl text-zen-charcoal/40 italic font-serif">{monthlyPick.author}</p>
              </div>

              <div className="border-b border-black/5 mb-10">
                <nav className="-mb-px flex space-x-12">
                  {['analysis', 'audio', 'video'].map((tab) => {
                    if (tab === 'audio' && !monthlyPick.audioUrl) return null;
                    if (tab === 'video' && !monthlyPick.videoUrl) return null;
                    return (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`py-4 border-b font-mono text-[9px] uppercase tracking-[0.3em] transition-all ${activeTab === tab ? 'border-zen-bamboo text-zen-charcoal' : 'border-transparent text-zen-charcoal/30 hover:text-zen-charcoal/60'}`}
                      >
                        {tab}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="flex-grow flex flex-col">
                {activeTab === 'analysis' && (
                  <div className="flex-grow h-72 overflow-y-auto pr-6 text-sm leading-relaxed text-zen-charcoal/60 font-sans tracking-wide scrollbar-thin scrollbar-thumb-black/5">
                    <p className="whitespace-pre-wrap">{monthlyPick.review}</p>
                  </div>
                )}
                {activeTab === 'audio' && monthlyPick.audioUrl && (
                  <div className="py-8 my-auto bg-white/60 rounded-2xl p-8 border border-black/5">
                    <audio controls className="w-full opacity-40 hover:opacity-80 transition-opacity contrast-75 brightness-75">
                      <source src={monthlyPick.audioUrl} type="audio/mp4" />
                    </audio>
                  </div>
                )}
                {activeTab === 'video' && monthlyPick.videoUrl && (
                  <div className="aspect-video bg-black/5 rounded-2xl overflow-hidden shadow-inner my-auto border border-black/5">
                    <video controls className="w-full h-full opacity-90">
                      <source src={monthlyPick.videoUrl} type="video/mp4" />
                    </video>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Colección --- */}
      <section className="border-t border-black/5 pt-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center gap-6 mb-20 flex-wrap">
            {(['Todos', 'Revistas', 'Podcasts', 'Postales', 'Libros', 'Discos', 'Películas'] as CategoryFilter[]).map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-8 py-2.5 text-[9px] font-mono uppercase tracking-[0.3em] rounded-full transition-all duration-500 ${activeFilter === filter
                  ? 'bg-zen-bamboo text-white shadow-sm border border-zen-bamboo'
                  : 'text-zen-charcoal/30 hover:text-zen-charcoal/60 bg-white/40 border border-black/5'
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {filteredItems.length === 0 ? (
            <p className="text-center text-zen-charcoal/20 py-32 font-mono uppercase tracking-[0.5em] text-[10px]">Vacío</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10">
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
