import React from 'react';

const Interviews: React.FC = () => {
    return (
        <div className="space-y-8 animate-fade-in">
            <h2 className="text-4xl font-serif text-brand-orange dark:text-brand-orange mb-6">Entrevistas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Placeholder content */}
                <div className="glass-panel p-6 rounded-2xl shadow-lg hover:shadow-brand-orange/20 transition-all border border-gray-200 dark:border-gray-800">
                    <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-xl mb-4 flex items-center justify-center">
                        <span className="text-gray-400">Video Placeholder</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Futuro de la IA</h3>
                    <p className="opacity-80">Una conversación profunda sobre lo que nos espera.</p>
                </div>
                <div className="glass-panel p-6 rounded-2xl shadow-lg hover:shadow-brand-orange/20 transition-all border border-gray-200 dark:border-gray-800">
                    <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-xl mb-4 flex items-center justify-center">
                        <span className="text-gray-400">Video Placeholder</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Arte Digital</h3>
                    <p className="opacity-80">Explorando las nuevas fronteras de la creatividad.</p>
                </div>
            </div>
        </div>
    );
};

export default Interviews;
