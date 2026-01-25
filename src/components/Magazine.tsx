
import React from 'react';

const HEYZINE_FLIPBOOK_URL = "https://heyzine.com/flip-book/6419983d24.html";

const Magazine: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <div className="w-full flex flex-col items-center animate-fade-in">
      <h2 className="text-3xl md:text-5xl font-title text-carbon dark:text-gold mb-8 drop-shadow-sm">
        Edición Semanal
      </h2>

      <div className="relative w-full max-w-7xl aspect-[16/10] md:aspect-[16/9] lg:aspect-[3/2] bg-stone-200 dark:bg-stone-900 rounded shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden border-8 border-white dark:border-stone-800">

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-paper-light dark:bg-paper-dark z-10">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="font-mono text-sm text-stone-500 uppercase tracking-widest">Cargando Revista...</p>
            </div>
          </div>
        )}

        <iframe
          className="absolute top-0 left-0 w-full h-full border-0"
          src={HEYZINE_FLIPBOOK_URL}
          title="El Nexo Digital - Edición Semanal"
          allowFullScreen
          allow="fullscreen; clipboard-write"
          onLoad={() => setIsLoading(false)}
        >
          <p>Tu navegador no soporta iframes. <a href={HEYZINE_FLIPBOOK_URL} target="_blank" rel="noreferrer" className="text-gold underline">Accedé a la revista aquí.</a></p>
        </iframe>
      </div>

      <p className="mt-6 text-sm font-mono text-stone-500 dark:text-stone-400 max-w-2xl text-center">
        Disfruta de la experiencia de lectura inmersiva. Utiliza las flechas o arrastra las páginas para navegar.
      </p>
    </div>
  );
};

export default Magazine;
