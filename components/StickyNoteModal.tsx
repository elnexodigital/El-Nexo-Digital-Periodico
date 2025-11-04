import React, { useState, useEffect } from 'react';

interface StickyNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNote: (note: { name: string; text: string }) => void;
}

const StickyNoteModal: React.FC<StickyNoteModalProps> = ({ isOpen, onClose, onAddNote }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');

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
            setStep(1);
            setName('');
            setText('');
            setError('');
        }, 300);
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.classList.remove('modal-open');
    };
  }, [isOpen, onClose]);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleAddNote = () => {
    if (text.trim() === '') {
        setError('¡No puedes dejar la nota en blanco!');
        return;
    }
    onAddNote({ name, text });
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
        className="relative bg-stone-100 w-full max-w-sm rounded-lg shadow-2xl flex flex-col overflow-hidden font-typewriter transition-all duration-300"
        style={{ height: step === 1 ? 'auto' : '80vh', maxHeight: '450px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {step === 1 && (
            <form onSubmit={handleContinue} className="p-6 md:p-8 flex flex-col">
                <h2 className="text-2xl font-bold text-center mb-4">Dejá tu nota</h2>
                <p className="text-center text-stone-600 mb-6">
                    Compartí un saludo, un recordatorio o lo que quieras. Empezá por decirnos tu nombre.
                </p>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-bold text-stone-700 mb-1">Nombre</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-black focus:border-black"
                            placeholder="Tu nombre o apodo"
                            maxLength={20}
                        />
                    </div>
                     <p className="text-xs text-stone-500 text-center">Celular y email son opcionales y no se mostrarán públicamente.</p>
                </div>
                 <button type="submit" className="w-full mt-6 px-6 py-3 bg-stone-800 text-white font-bold rounded-md hover:bg-black transition-colors">
                    Continuar
                </button>
            </form>
        )}
        
        {step === 2 && (
            <div className="flex-1 flex flex-col p-4 bg-[#fffacd] h-full">
                <textarea
                    className="w-full flex-1 bg-transparent border-none focus:ring-0 resize-none text-2xl md:text-3xl text-stone-800 leading-snug font-handwriting p-4"
                    placeholder="Escribí acá tu mensaje..."
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value);
                        if(error) setError('');
                    }}
                    autoFocus
                />
                 {error && <p className="text-red-600 text-sm text-center font-sans py-2">{error}</p>}
                <button 
                    onClick={handleAddNote}
                    className="w-full mt-4 px-6 py-3 bg-stone-800 text-white font-bold rounded-md hover:bg-black transition-colors font-typewriter"
                >
                    Pegar Nota
                </button>
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

export default StickyNoteModal;