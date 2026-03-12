
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Book, Music, Video, FileText, Mic, Image as ImageIcon, Star } from 'lucide-react';
import { LIBRARY_CONTENT } from '../data/libraryContent.ts';
import { PODCASTS_MP3 } from '../data/podcastsMP3.ts';
import type { LibraryItem, PodcastMP3 } from '../types.ts';
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

  const mp3Podcasts = useMemo(() => PODCASTS_MP3, []);

  const filteredItems = useMemo(() => {
    let items = activeFilter === 'Todos' ? archiveItems : archiveItems.filter(item => item.category === activeFilter);

    if (activeFilter === 'Todos') {
      return [...items].sort((a, b) => {
        const priority: Record<string, number> = {
          'Revistas': 1,
          'Postales': 2,
          'Podcasts': 3,
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

  const handleOpenDetailModal = (item: LibraryItem | PodcastMP3) => {
    if ('audioUrl' in item && !('category' in item)) {
      // Convert PodcastMP3 to LibraryItem for the modal
      const converted: LibraryItem = {
        id: item.id,
        category: 'Podcasts',
        title: item.title,
        author: item.artist,
        imageUrl: item.coverUrl,
        review: item.description,
        audioUrl: item.audioUrl,
        publicationDate: 'Audio Podcast',
      };
      setSelectedItem(converted);
    } else {
      setSelectedItem(item as LibraryItem);
    }
  };

  const handleCloseDetailModal = () => {
    setSelectedItem(null);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Libros': return <Book size={14} />;
      case 'Discos': return <Music size={14} />;
      case 'Películas': return <Video size={14} />;
      case 'Revistas': return <FileText size={14} />;
      case 'Podcasts': return <Mic size={14} />;
      case 'Postales': return <ImageIcon size={14} />;
      default: return null;
    }
  };

  return (
    <div className="w-full pb-12 animate-fade-in">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <button
              onClick={onBackToMagazine}
              className="group mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Volver a la Revista
            </button>
            <h1 className="text-6xl md:text-8xl font-serif font-black tracking-tighter text-zen-charcoal">
              Archivo
            </h1>
            <p className="text-xl font-serif italic text-zen-charcoal/60 mt-4 max-w-xl">
              Un espacio de curación cultural y memoria digital para el navegante contemporáneo.
            </p>
          </div>
          <div className="hidden md:block">
            <span className="font-script text-4xl opacity-20">El Nexo Digital</span>
          </div>
        </div>

        {/* --- Recomendación del Mes --- */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-2 px-3 py-1 bg-[#800020] text-white rounded-full">
              <Star size={14} fill="currentColor" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Recomendación del Mes</span>
            </div>
            <div className="h-px bg-zen-charcoal/10 flex-grow"></div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden md:grid md:grid-cols-5 gap-0 border border-zen-charcoal/5">
            <div className="md:col-span-2 relative min-h-[400px] group overflow-hidden">
              <img 
                src={monthlyPick.imageUrl} 
                alt={`Portada de ${monthlyPick.title}`}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="md:col-span-3 p-8 md:p-12 flex flex-col">
              <div className="mb-8">
                <div className="flex items-center gap-2 text-[#800020] mb-4">
                  {getCategoryIcon(monthlyPick.category)}
                  <span className="text-xs font-bold uppercase tracking-widest">
                    {monthlyPick.category}
                  </span>
                </div>
                <h3 className="text-4xl md:text-5xl font-serif font-bold mb-2 text-zen-charcoal leading-tight">
                  {monthlyPick.title}
                </h3>
                <p className="text-xl text-zen-charcoal/60 italic font-serif">{monthlyPick.author}</p>
              </div>
              
              <div className="border-b border-zen-charcoal/10 mb-8">
                <nav className="-mb-px flex space-x-8">
                  {(['analysis', 'audio', 'video'] as const).map((tab) => {
                    if (tab === 'audio' && !monthlyPick.audioUrl) return null;
                    if (tab === 'video' && !monthlyPick.videoUrl) return null;
                    
                    const labels = { analysis: 'Análisis', audio: 'Escuchar', video: 'Ver' };
                    
                    return (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`whitespace-nowrap py-4 border-b-2 font-bold text-xs uppercase tracking-widest transition-all ${
                          activeTab === tab 
                            ? 'border-[#800020] text-[#800020]' 
                            : 'border-transparent text-zen-charcoal/40 hover:text-zen-charcoal'
                        }`}
                      >
                        {labels[tab]}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="flex-grow">
                <AnimatePresence mode="wait">
                  {activeTab === 'analysis' && (
                    <motion.div 
                      key="analysis"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="h-64 overflow-y-auto pr-4 text-lg leading-relaxed text-zen-charcoal/80 font-serif"
                    >
                      <p className="whitespace-pre-wrap">{monthlyPick.review}</p>
                    </motion.div>
                  )}
                  {activeTab === 'audio' && monthlyPick.audioUrl && (
                    <motion.div 
                      key="audio"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-12 flex flex-col items-center justify-center bg-zen-charcoal/5 rounded-xl border border-zen-charcoal/10"
                    >
                      <Mic size={48} className="text-[#800020] mb-6 opacity-20" />
                      <audio controls className="w-full max-w-md">
                        <source src={monthlyPick.audioUrl} type="audio/mp4" />
                      </audio>
                    </motion.div>
                  )}
                  {activeTab === 'video' && monthlyPick.videoUrl && (
                    <motion.div 
                      key="video"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
                    >
                      <video controls className="w-full h-full">
                        <source src={monthlyPick.videoUrl} type="video/mp4" />
                      </video>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* --- Archivo de la Biblioteca --- */}
        <section className="pt-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <h2 className="text-3xl font-serif font-bold text-zen-charcoal">
              Colección Completa
            </h2>
            
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {(['Todos', 'Revistas', 'Podcasts', 'Postales', 'Libros', 'Discos', 'Películas'] as CategoryFilter[]).map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`whitespace-nowrap px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all ${
                    activeFilter === filter 
                      ? 'bg-zen-charcoal text-white shadow-lg' 
                      : 'bg-zen-charcoal/5 text-zen-charcoal/60 hover:bg-zen-charcoal/10'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {filteredItems.length === 0 && activeFilter !== 'Podcasts' ? (
            <div className="text-center py-24 bg-zen-charcoal/5 rounded-2xl border border-dashed border-zen-charcoal/20">
              <p className="text-zen-charcoal/40 font-serif italic">No hay elementos en esta categoría aún.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Grid for standard items */}
              {filteredItems.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                  {filteredItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <LibraryItemCard item={item} onClick={() => handleOpenDetailModal(item)} />
                    </motion.div>
                  ))}
                </div>
              )}

              {/* List for MP3 Podcasts */}
              {(activeFilter === 'Podcasts' || activeFilter === 'Todos') && (
                <div className="mt-16">
                  <div className="flex items-center gap-4 mb-8">
                    <h3 className="text-xl font-serif font-bold text-zen-charcoal/60">Podcasts de Audio ({mp3Podcasts.length})</h3>
                    <div className="h-px bg-zen-charcoal/10 flex-grow"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mp3Podcasts.map((podcast, index) => (
                      <motion.div
                        key={podcast.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.01 }}
                        onClick={() => handleOpenDetailModal(podcast)}
                        className="group flex items-center gap-4 p-3 bg-white rounded-xl border border-zen-charcoal/5 hover:border-[#800020]/30 hover:shadow-md transition-all cursor-pointer"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-zen-charcoal/10">
                          <img 
                            src={podcast.coverUrl} 
                            alt={podcast.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex-grow min-w-0">
                          <h4 className="text-sm font-bold text-zen-charcoal group-hover:text-[#800020] transition-colors truncate">
                            {podcast.title}
                          </h4>
                          <p className="text-[10px] text-zen-charcoal/40 uppercase tracking-widest font-bold truncate">
                            {podcast.artist}
                          </p>
                          <p className="text-xs text-zen-charcoal/60 line-clamp-1 mt-0.5 font-serif italic">
                            {podcast.description}
                          </p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-zen-charcoal/5 flex items-center justify-center group-hover:bg-[#800020] group-hover:text-white transition-all">
                          <Mic size={14} />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </div>

      <LibraryDetailModal
        isOpen={!!selectedItem}
        onClose={handleCloseDetailModal}
        item={selectedItem}
      />
    </div>
  );
};

export default Library;
