import React from 'react';

const Ateneo: React.FC = () => {
    return (
        <div className="space-y-8 animate-fade-in">
            <div className="text-center mb-12">
                <h2 className="text-5xl font-serif text-brand-green dark:text-brand-green mb-4">Ateneo Cultural</h2>
                <p className="text-xl opacity-70 max-w-2xl mx-auto">Un espacio para la reflexión, la cultura y el pensamiento crítico.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Cultural Cards */}
                <div className="glass-panel p-8 rounded-2xl text-center hover:bg-brand-green/5 transition-colors border border-gray-200 dark:border-gray-800 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <h3 className="text-2xl font-bold mb-3 relative z-10">Literatura</h3>
                    <p className="opacity-70 relative z-10">Reseñas y lecturas recomendadas.</p>
                </div>
                <div className="glass-panel p-8 rounded-2xl text-center hover:bg-brand-green/5 transition-colors border border-gray-200 dark:border-gray-800 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <h3 className="text-2xl font-bold mb-3 relative z-10">Filosofía</h3>
                    <p className="opacity-70 relative z-10">Ensayos sobre la vida moderna.</p>
                </div>
                <div className="glass-panel p-8 rounded-2xl text-center hover:bg-brand-green/5 transition-colors border border-gray-200 dark:border-gray-800 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <h3 className="text-2xl font-bold mb-3 relative z-10">Música</h3>
                    <p className="opacity-70 relative z-10">Selecciones curadas para el alma.</p>
                </div>
            </div>
        </div>
    );
};

export default Ateneo;
