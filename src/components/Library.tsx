import React, { useState } from 'react';
import { LIBRARY_CONTENT } from '~/data/libraryContent.ts';
import RecommendationModal from './RecommendationModal.tsx';

interface LibraryProps {
  onBackToMagazine: () => void;
}

const Library: React.FC<LibraryProps> = ({ onBackToMagazine }) => {
  const [activeTab, setActiveTab] = useState<'analysis' | 'audio' | 'video'>('analysis');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  const monthlyPick = LIBRARY_CONTENT.find(item => item.id === 'libro1');

  if (!monthlyPick) {
    return <div>Error: No se encontró la recomendación del mes.</div>;
  }

  return (
    <div className="w-full font-typewriter pb-12">
      <div className="text-center mb-12">
        <button
          onClick={onBackToMagazine}
          className="mb-4 inline-flex items-center gap-2 px-6 py-2 bg-stone-800 text-white text-sm font-bold rounded-full hover:bg-black transition-colors"
        >
          &larr; Volver a la Revista
        </button>
        <h1 className="text-5xl md:text-6xl" style={{ fontFamily: "'Playfair Display', serif" }}>
          Biblioteca del Nexo
        </h1>
        <p className="text-stone-600 mt-2 max-w-2xl mx-auto">
          Un espacio de curación cultural. Cada mes, una obra destacada. Y siempre, nuestro asistente listo para encontrar tu próxima obsesión.
        </p>
      </div>

      {/* --- Recomendación del Mes --- */}
      <section className="mb-16">
        <h2 className="text-3xl md:text-4xl text-center font-bold mb-8 pb-2 border-b-2 border-stone-300" style={{ fontFamily: "'Playfair Display', serif" }}>
          Recomendación del Mes
        </h2>
        <div className="bg-white rounded-lg shadow-xl overflow-hidden md:grid md:grid-cols-5 gap-8 max-w-5xl mx-auto">
          <div className="md:col-span-2">
            <img 
              src={monthlyPick.imageUrl} 
              alt={`Portada de ${monthlyPick.title}`}
              className="w-full h-full object-cover min-h-[400px]" 
            />
          </div>
          <div className="md:col-span-3 p-8 flex flex-col justify-center">
            <span className="font-bold uppercase text-xs text-stone-500 mb-2">{monthlyPick.category}</span>
            <h3 className="text-4xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{monthlyPick.title}</h3>
            <p className="text-lg text-stone-700 italic mb-4">{monthlyPick.author}</p>
            
            <div className="border-b border-stone-200">
              <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('analysis')}
                  className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'analysis' ? 'border-stone-800 text-black' : 'border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300'}`}
                  aria-current={activeTab === 'analysis' ? 'page' : undefined}
                >
                  Análisis
                </button>
                {monthlyPick.audioUrl && (
                  <button
                    onClick={() => setActiveTab('audio')}
                    className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'audio' ? 'border-stone-800 text-black' : 'border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300'}`}
                    aria-current={activeTab === 'audio' ? 'page' : undefined}
                  >
                    Escuchar Audio
                  </button>
                )}
                {monthlyPick.videoUrl && (
                  <button
                    onClick={() => setActiveTab('video')}
                    className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'video' ? 'border-stone-800 text-black' : 'border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300'}`}
                    aria-current={activeTab === 'video' ? 'page' : undefined}
                  >
                    Ver Video
                  </button>
                )}
              </nav>
            </div>

            <div className="mt-4 min-h-[250px] flex flex-col justify-center">
              {activeTab === 'analysis' && (
                <div className="h-64 overflow-y-auto pr-2 text-sm leading-relaxed text-stone-800">
                  <p className="whitespace-pre-wrap">{monthlyPick.review}</p>
                </div>
              )}
              {activeTab === 'audio' && monthlyPick.audioUrl && (
                <div className="py-4">
                  <audio controls className="w-full">
                    <source src={monthlyPick.audioUrl} type="audio/mp4" />
                    Tu navegador no soporta el elemento de audio.
                  </audio>
                </div>
              )}
              {activeTab === 'video' && monthlyPick.videoUrl && (
                <div className="aspect-video bg-black rounded-md overflow-hidden shadow-inner">
                  <video controls className="w-full h-full">
                    <source src={monthlyPick.videoUrl} type="video/mp4" />
                    Tu navegador no soporta el elemento de video.
                  </video>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- Asistente de Búsqueda --- */}
      <section className="text-center border-t-2 border-dashed border-stone-300 pt-12">
         <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          ¿Buscás algo en especial?
        </h2>
        <p className="text-stone-600 max-w-xl mx-auto mb-8">
          Decile a nuestro curador digital qué tenés en mente, desde un título específico hasta una idea vaga, y dejá que te sorprenda.
        </p>
        <button
          onClick={() => setIsAssistantOpen(true)}
          className="px-8 py-4 bg-stone-800 text-white text-lg font-bold rounded-lg hover:bg-black transition-all transform hover:scale-105 shadow-lg"
        >
          Te ayudo a buscar... ¡empecemos!
        </button>
      </section>

      <RecommendationModal
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
      />
    </div>
  );
};

export default Library;