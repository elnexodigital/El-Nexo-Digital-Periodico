import React from 'react';

const Ateneo: React.FC = () => {
    return (
        <div className="space-y-16 py-16">
            <div className="text-center mb-24 relative">
                <span className="text-[9px] font-mono text-zen-charcoal/20 tracking-[1em] uppercase mb-4 block">Reflexión & Cultura</span>
                <h2 className="text-5xl font-serif text-zen-charcoal/80 mb-6 italic">Ateneo Cultural</h2>
                <div className="w-12 h-px bg-zen-bamboo/30 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-6">
                {/* Cultural Cards */}
                <div className="bg-white/40 backdrop-blur-xl p-14 rounded-3xl text-center hover:bg-white/60 hover:shadow-sm transition-all duration-700 group relative cursor-pointer border border-black/5">
                    <h3 className="text-2xl font-serif mb-8 text-zen-charcoal/70 group-hover:text-zen-charcoal transition-colors italic">Literatura</h3>
                    <p className="text-zen-charcoal/40 font-mono text-[10px] uppercase tracking-[0.2em] leading-relaxed">Reseñas y hallazgos bibliográficos de mundos etéreos.</p>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-zen-bamboo/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                <div className="bg-white/40 backdrop-blur-xl p-14 rounded-3xl text-center hover:bg-white/60 hover:shadow-sm transition-all duration-700 group relative cursor-pointer border border-black/5">
                    <h3 className="text-2xl font-serif mb-8 text-zen-charcoal/70 group-hover:text-zen-charcoal transition-colors italic">Filosofía</h3>
                    <p className="text-zen-charcoal/40 font-mono text-[10px] uppercase tracking-[0.2em] leading-relaxed">Ensayos sobre la consciencia y la paradoja orgánica.</p>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-zen-earth/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                <div className="bg-white/40 backdrop-blur-xl p-14 rounded-3xl text-center hover:bg-white/60 hover:shadow-sm transition-all duration-700 group relative cursor-pointer border border-black/5">
                    <h3 className="text-2xl font-serif mb-8 text-zen-charcoal/70 group-hover:text-zen-charcoal transition-colors italic">Música</h3>
                    <p className="text-zen-charcoal/40 font-mono text-[10px] uppercase tracking-[0.2em] leading-relaxed">Frecuencias naturales para armonizar el espíritu.</p>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-zen-bamboo/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
            </div>
        </div>
    );
};

export default Ateneo;
