import React from 'react';

const Magazine: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto py-12">
      <div className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-sm overflow-hidden relative border border-black/5">

        <div className="p-10 bg-white/60 border-b border-black/5 flex justify-between items-center backdrop-blur-xl">
          <div className="flex flex-col">
            <span className="text-[9px] font-mono text-zen-charcoal/30 tracking-[0.4em] uppercase">Architecture Node 04</span>
            <h2 className="text-4xl font-serif text-zen-charcoal/80">
              Edición Interactiva
            </h2>
          </div>
          <span className="text-[10px] font-mono text-zen-bamboo px-4 py-1.5 bg-zen-bamboo/10 rounded-full border border-zen-bamboo/20 uppercase tracking-widest">Flow_Stable</span>
        </div>

        <div className="aspect-[4/3] sm:aspect-auto sm:min-h-[750px] w-full relative bg-[#FAF9F6]/50">
          <iframe
            src="https://heyzine.com/flip-book/a5b1698e99.html&sound=0"
            title="El Nexo Digital - Edición Semanal"
            className="absolute inset-0 w-full h-full border-0 opacity-90 contrast-[0.95]"
            allowFullScreen
          ></iframe>
        </div>

        <div className="p-8 text-center text-[10px] font-mono text-zen-charcoal/30 uppercase tracking-[0.4em] bg-white/40 backdrop-blur-md border-t border-black/5">
          Interacción: Desliza para explorar los mundos integrados.
        </div>
      </div>
    </div>
  );
};

export default Magazine;