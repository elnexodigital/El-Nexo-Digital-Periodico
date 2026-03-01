import React from 'react';

const Interviews: React.FC = () => {
    return (
        <div className="space-y-12 boot-sequence">
            <div className="flex items-center gap-6 mb-10">
                <h2 className="text-5xl font-signature text-industrial-cream drop-shadow-md">Entrevistas</h2>
                <div className="h-px bg-industrial-orange/20 flex-grow"></div>
                <span className="archaic-text text-sm opacity-30 select-none text-industrial-orange">Ϟ Ѻ Ͽ</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Visual Discovery Cards */}
                <div className="glass-panel p-8 rounded-3xl shadow-2xl hover:bg-industrial-orange/10 transition-all border-white/5 group weathered-panel relative">
                    <div className="absolute top-3 left-3 remache opacity-30" />
                    <div className="aspect-video bg-industrial-slate/60 rounded-2xl mb-6 flex items-center justify-center border border-white/5 overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-industrial-orange/10 to-transparent flex items-center justify-center">
                            <span className="text-industrial-orange font-mono text-[10px] tracking-widest uppercase opacity-40">Signal_Lost_Reconstructing...</span>
                        </div>
                    </div>
                    <h3 className="text-3xl font-signature mb-3 text-industrial-cream">El Futuro de la IA</h3>
                    <p className="text-industrial-gray font-mono text-[10px] uppercase tracking-widest leading-relaxed">Hallazgos sobre la evolución de la consciencia sintética.</p>
                </div>

                <div className="glass-panel p-8 rounded-3xl shadow-2xl hover:bg-industrial-green/10 transition-all border-white/5 group weathered-panel relative">
                    <div className="absolute top-3 left-3 remache opacity-30" />
                    <div className="aspect-video bg-industrial-slate/60 rounded-2xl mb-6 flex items-center justify-center border border-white/5 overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-industrial-green/10 to-transparent flex items-center justify-center">
                            <span className="text-industrial-green font-mono text-[10px] tracking-widest uppercase opacity-40">Signal_Lost_Reconstructing...</span>
                        </div>
                    </div>
                    <h3 className="text-3xl font-signature mb-3 text-industrial-cream">Arqueología del Mañana</h3>
                    <p className="text-industrial-gray font-mono text-[10px] uppercase tracking-widest leading-relaxed">Diálogos sobre la memoria digital y el mito futurista.</p>
                </div>
            </div>
        </div>
    );
};

export default Interviews;
