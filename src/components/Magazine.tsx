import React from 'react';

const HEYZINE_FLIPBOOK_URL = "https://heyzine.com/flip-book/c3e3e76d64.html";

const Magazine: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div 
        className="relative w-full max-w-6xl bg-stone-200 dark:bg-stone-900 rounded-lg shadow-2xl overflow-hidden"
        style={{ paddingTop: '70.71%' /* Proporción para flipbooks A4 */ }}
      >
        <iframe
          className="absolute top-0 left-0 w-full h-full border-0"
          src={HEYZINE_FLIPBOOK_URL}
          title="El Nexo Digital - Edición Semanal"
          allowFullScreen
          allow="fullscreen; clipboard-write"
        >
          <p>Tu navegador no soporta iframes. <a href={HEYZINE_FLIPBOOK_URL}>Accedé a la revista aquí.</a></p>
        </iframe>
      </div>
    </div>
  );
};

export default Magazine;
