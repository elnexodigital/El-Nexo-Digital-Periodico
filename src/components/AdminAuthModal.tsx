import React, { useState, useEffect, useRef } from 'react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (password: string) => boolean;
}

const AdminAuthModal: React.FC<AdminAuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
      setTimeout(() => inputRef.current?.focus(), 100); // Focus input when modal opens
    } else {
      document.body.classList.remove('modal-open');
      // Reset state on close
      setTimeout(() => {
        setPassword('');
        setError('');
      }, 300);
    }
  }, [isOpen]);
  
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(password);
    if (!success) {
      setError('Clave incorrecta. Inténtelo de nuevo.');
      setPassword('');
      inputRef.current?.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="admin-auth-modal-backdrop"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div
        className="admin-auth-modal-content font-typewriter"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-center mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Acceso de Administrador
        </h2>
        <p className="text-sm text-center text-stone-600 mb-6">
          Estos archivos son personales de cada usuario. Solo los lee El Nexo Digital.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-password" className="sr-only">Clave</label>
            <input
              ref={inputRef}
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-stone-300 rounded-md text-center focus:ring-2 focus:ring-black focus:border-black"
              placeholder="Ingrese la clave"
            />
          </div>
          {error && <p className="text-red-600 text-sm text-center -mt-2">{error}</p>}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-stone-800 text-white font-bold rounded-md hover:bg-black transition-colors"
          >
            Ver Notas
          </button>
        </form>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/20 text-black/50 hover:bg-black/40 hover:text-white transition-colors"
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

export default AdminAuthModal;