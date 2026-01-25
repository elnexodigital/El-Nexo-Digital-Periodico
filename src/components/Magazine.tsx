
import React from 'react';

const Magazine: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in">
      <div className="bg-white dark:bg-stone-800 rounded-lg shadow-2xl overflow-hidden border-4 border-double border-stone-800 dark:border-stone-600">
        <div className="p-4 bg-stone-100 dark:bg-stone-900 border-b-2 border-stone-800 dark:border-stone-700 flex justify-between items-center">
          <h2 className="text-xl font-bold uppercase tracking-tighter" style={{ fontFamily: "'Playfair Display', serif" }}>
            Edición Semanal Interactiva
          </h2>
          <span className="text-[10px] font-black bg-red-700 text-white px-2 py-1 rounded">REVISTA DIGITAL</span>
        </div>
        
        <div className="aspect-[4/3] w-full relative bg-stone-200">
          <iframe 
            src="https://heyzine.com/flip-book/6419983d24.html" 
            title="El Nexo Digital - Edición Semanal"
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
          ></iframe>
        </div>
        
        <div className="p-4 text-center text-xs text-stone-500 italic">
          Tip: Usa las flechas o arrastra las esquinas para pasar de página.
        </div>
      </div>
    </div>
  );
};

export default Magazine;
