import React, { useState, useEffect } from 'react';
import { getRecommendation } from '~/services/geminiService.ts';

interface RecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'category' | 'query' | 'loading' | 'result' | 'error';
type Category = 'Libro' | 'Música' | 'Película';

interface ParsedResult {
  title: string;
  author: string;
  review: string;
}

const LoadingAnimation: React.FC = () => (
  <div className="flex flex-col items-center justify-center text-center h-full">
    <svg width="80" height="80" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="text-stone-800 dark:text-stone-200">
      <style>{`.spinner_qM83{animation:spinner_8HQG 1.05s infinite}.spinner_oXPr{animation-delay:.1s}.spinner_ZTLf{animation-delay:.2s}@keyframes spinner_8HQG{0%,57.14%{animation-timing-function:cubic-bezier(0.33,.66,.66,1);transform:translate(0)}28.57%{animation-timing-function:cubic-bezier(0.33,0,.66,.33);transform:translateY(-6px)}100%{transform:translate(0)}}`}</style>
      <circle className="spinner_qM83" cx="4" cy="12" r="3" fill="currentColor"/>
      <circle className="spinner_qM83 spinner_oXPr" cx="12" cy="12" r="3" fill="currentColor"/>
      <circle className="spinner_qM83 spinner_ZTLf" cx="20" cy="12" r="3" fill="currentColor"/>
    </svg>
    <p className="mt-4 font-handwriting text-2xl">Consultando a nuestro curador digital...</p>
  </div>
);

const RecommendationModal: React.FC<RecommendationModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<Step>('category');
  const [category, setCategory] = useState<Category | null>(null);
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<ParsedResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  const resetState = () => {
    setStep('category');
    setCategory(null);
    setQuery('');
    setResult(null);
    setError(null);
  };
  
  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleCategorySelect = (selectedCategory: Category) => {
    setCategory(selectedCategory);
    setStep('query');
  };

  const handleSubmitQuery = async () => {
    if (!category || query.trim() === '') return;
    setStep('loading');
    const response = await getRecommendation(category, query);
    
    if (response.startsWith('Error:')) {
      setError(response);
      setStep('error');
    } else {
      const parsed = parseResponse(response);
      setResult(parsed);
      setStep('result');
    }
  };

  const parseResponse = (responseText: string): ParsedResult => {
    const titleMatch = responseText.match(/TITULO:\s*(.*)/);
    const authorMatch = responseText.match(/AUTOR:\s*(.*)/);
    const reviewMatch = responseText.match(/RESEÑA:\s*([\s\S]*)/);
    
    return {
      title: titleMatch ? titleMatch[1].trim() : 'Título no encontrado',
      author: authorMatch ? authorMatch[1].trim() : 'Autor no encontrado',
      review: reviewMatch ? reviewMatch[1].trim() : responseText,
    };
  };

  if (!isOpen) return null;

  const renderContent = () => {
    switch (step) {
      case 'category':
        return (
          <div className="text-center">
            <div className="flex justify-center items-center gap-4 sm:gap-6 flex-wrap">
              {(['Libro', 'Música', 'Película'] as Category[]).map((cat, index) => (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className="relative w-28 h-28 rounded-full shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-black/50"
                  aria-label={`Seleccionar categoría ${cat}`}
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="absolute top-0 left-0 w-full h-full animate-spin-very-slow">
                      <defs>
                        <path id={`circle-cat-${index}`} d=" M 50, 50 m -39, 0 a 39,39 0 1,1 78,0 a 39,39 0 1,1 -78,0 "/>
                      </defs>
                      <text fill="currentColor" style={{fontSize: '14px', fontWeight: 'bold', letterSpacing: '0.5px'}} className="uppercase text-stone-800 dark:text-stone-200">
                        <textPath xlinkHref={`#circle-cat-${index}`} startOffset="25%" textAnchor="middle">
                          {cat}
                        </textPath>
                      </text>
                    </svg>
                    <div className="w-[70%] h-[70%] rounded-full animate-pulse-slow bg-white dark:bg-stone-800 shadow-inner flex items-center justify-center">
                      <span className="font-bold text-base text-stone-800 dark:text-stone-200">{cat}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      case 'query':
        return (
          <div>
            <p className="text-center text-stone-600 mb-6 text-sm">Podés poner un título, autor, o pedir una recomendación como "algo de ciencia ficción que me haga pensar".</p>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-32 p-3 border-2 border-stone-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black resize-none bg-stone-50 text-black dark:bg-stone-700 dark:border-stone-500 dark:text-stone-200"
              placeholder={`Buscando un ${category?.toLowerCase()}...`}
              autoFocus
            />
            <button onClick={handleSubmitQuery} disabled={!query.trim()} className="w-full mt-4 px-6 py-3 bg-stone-800 text-white font-bold rounded-md hover:bg-black transition-colors disabled:bg-stone-400 disabled:cursor-not-allowed">
              Buscar recomendación
            </button>
          </div>
        );
      case 'loading':
        return <LoadingAnimation />;
      case 'result':
        return result && (
          <div>
            <h3 className="text-2xl font-bold mb-1" style={{fontFamily: "'Playfair Display', serif"}}>{result.title}</h3>
            <p className="text-base text-stone-700 italic mb-4">{result.author}</p>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{result.review}</p>
            <button onClick={resetState} className="w-full mt-6 px-6 py-3 bg-stone-800 text-white font-bold rounded-md hover:bg-black transition-colors">
              Hacer otra búsqueda
            </button>
          </div>
        );
        case 'error':
          return (
            <div className="text-center flex flex-col justify-center items-center h-full">
              <h3 className="text-xl font-bold text-red-600 mb-4">Ocurrió un error</h3>
              <p className="text-stone-600 mb-6 text-sm">{error}</p>
              <button onClick={resetState} className="px-6 py-3 bg-stone-800 text-white font-bold rounded-md hover:bg-black transition-colors">
                Intentar de nuevo
              </button>
            </div>
          );
      default:
        return null;
    }
  }

  return (
    <div className="recommendation-modal-backdrop" onClick={handleClose}>
      <div className="recommendation-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex-grow p-8 overflow-y-auto">
          {renderContent()}
        </div>
        <button onClick={handleClose} className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/70 transition-colors" aria-label="Cerrar">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default RecommendationModal;