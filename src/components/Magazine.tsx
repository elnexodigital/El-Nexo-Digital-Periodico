import React from 'react';

const Magazine: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in">
      <div className="glass-panel rounded-2xl shadow-2xl overflow-hidden border border-white/20 dark:border-white/5">
        <div className="p-4 bg-gray-50/50 dark:bg-black/40 border-b border-gray-200 dark:border-white/10 flex justify-between items-center backdrop-blur-sm">
          <h2 className="text-xl font-bold uppercase tracking-tighter text-gray-800 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Edición Semanal Interactiva
          </h2>
          <span className="text-[10px] font-black bg-brand-orange text-white px-2 py-1 rounded shadow-lg shadow-brand-orange/20">REVISTA DIGITAL</span>
        </div>

        <div className="aspect-[4/3] sm:aspect-auto sm:min-h-[600px] w-full relative bg-gray-200 dark:bg-stone-900">
          <iframe
            src="https://heyzine.com/flip-book/a5b1698e99.html"
            title="El Nexo Digital - Edición Semanal"
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
          ></iframe>
        </div>

        <div className="p-4 text-center text-xs text-gray-600 dark:text-gray-400 italic bg-gray-50/50 dark:bg-black/40 backdrop-blur-sm">
          Tip: Usa las flechas o arrastra las esquinas para pasar de página.
        </div>
      </div>
    </div>
  );
};

export default Magazine;