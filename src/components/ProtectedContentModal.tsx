import React, { useState, useEffect } from 'react';
import { PATRON_CONTENT } from '../data/protectedContent.ts';
import type { Patron } from '../types.ts';

interface ProtectedContentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PASSWORD = 'Juan Lacaze';

const ProtectedContentModal: React.FC<ProtectedContentModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');
  const [openPatronId, setOpenPatronId] = useState<string | null>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
      // Reset state on close
      setTimeout(() => {
        setPasswordInput('');
        setError('');
        setIsAuthenticated(false);
        setOpenPatronId(null);
      }, 300);
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.classList.remove('modal-open');
    };
  }, [isOpen, onClose]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Clave incorrecta. Inténtalo de nuevo.');
      setPasswordInput('');
    }
  };

  const togglePatron = (patronId: string) => {
    setOpenPatronId(prevId => (prevId === patronId ? null : patronId));
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div
        className="relative bg-stone-100 w-full max-w-md h-full max-h-[90vh] rounded-lg shadow-2xl flex flex-col overflow-hidden font-typewriter"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 flex-shrink-0 border-b border-stone-300">
           <h2 className="text-2xl font-bold text-center">
            {isAuthenticated ? 'Contenido para Mecenas' : 'Acceso para Mecenas'}
          </h2>
        </div>

        {isAuthenticated ? (
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-2">
            {PATRON_CONTENT.map((patron) => (
              <div key={patron.id} className="border border-stone-200 rounded-md bg-white">
                <button
                  onClick={() => togglePatron(patron.id)}
                  className="w-full flex justify-between items-center text-left p-4 hover:bg-stone-50 transition-colors"
                  aria-expanded={openPatronId === patron.id}
                >
                  <span className="font-bold text-lg text-stone-800">{patron.name}</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 text-stone-500 transition-transform ${openPatronId === patron.id ? 'rotate-180' : ''}`} 
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openPatronId === patron.id && (
                  <div className="p-4 border-t border-stone-200">
                    {patron.content.length > 0 ? (
                      <div className="space-y-4">
                        {patron.content.map((item) => (
                           <div key={item.id} className="flex items-start gap-4">
                              <div className="flex-shrink-0 text-stone-500 mt-1">
                                {item.type === 'audio' ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" /></svg>
                                ) : item.type === 'image' ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-md text-stone-800">{item.title}</h3>
                                <p className="text-sm text-stone-600 mb-3">{item.description}</p>
                                <a
                                  href={item.url}
                                  download
                                  className="inline-flex items-center gap-2 px-4 py-2 bg-stone-800 text-white text-sm font-bold rounded-md hover:bg-black transition-colors"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                  Descargar
                                </a>
                              </div>
                            </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-stone-500 text-center italic">No hay contenido disponible por el momento.</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 p-6 flex flex-col justify-center">
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <p className="text-center text-stone-600">
                Esta sección es un agradecimiento para nuestros mecenas. Por favor, introduce la clave de acceso.
              </p>
              <div>
                <label htmlFor="password" className="sr-only">Clave</label>
                <input
                  id="password"
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-4 py-3 border border-stone-300 rounded-md text-center focus:ring-2 focus:ring-black focus:border-black"
                  placeholder="********"
                  autoFocus
                />
              </div>
              {error && <p className="text-red-600 text-sm text-center">{error}</p>}
              <button
                type="submit"
                className="w-full px-6 py-3 bg-stone-800 text-white font-bold rounded-md hover:bg-black transition-colors"
              >
                Ingresar
              </button>
            </form>
          </div>
        )}
        
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/70 transition-colors"
          aria-label="Cerrar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProtectedContentModal;
