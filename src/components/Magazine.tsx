import React from 'react';

// TODO: Reemplaza esta URL con el enlace real de tu flipbook de Heyzine.
// He utilizado un enlace de ejemplo.
const HEYZINE_FLIPBOOK_URL = "https://heyzine.com/flip-book/b2113a68c8.html";

const Magazine: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div 
        className="relative w-full max-w-4xl bg-stone-200 dark:bg-stone-900 rounded-lg shadow-2xl overflow-hidden mx-auto"
        style={{ paddingTop: '133.33%' /* 3:4 Aspect Ratio for better mobile view */ }}
      >
        <iframe
          className="absolute top-0 left-0 w-full h-full border-0"
          src={HEYZINE_FLIPBOOK_URL}
          title="El Nexo Digital - Edición Semanal"
          allowFullScreen
          allow="fullscreen"
        >
          {/* FIX: The href attribute was corrupted with the error message and has been restored. */}
          <p>Tu navegador no soporta iframes. <a href={HEYZINE_FLIPBOOK_URL}>Accedé a la revista aquí.</a></p>
        </iframe>
      </div>
    </div>
  );
};

// FIX: The component was missing a default export, which is required for React.lazy to work correctly.
export default Magazine;
