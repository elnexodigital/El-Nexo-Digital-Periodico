import React, { useEffect } from 'react';
import type { StickyNote } from '~/types.ts';

interface AdminNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  notes: StickyNote[];
  setNotes: React.Dispatch<React.SetStateAction<StickyNote[]>>;
}

const AdminNotesModal: React.FC<AdminNotesModalProps> = ({ isOpen, onClose, notes, setNotes }) => {
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
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.classList.remove('modal-open');
    };
  }, [isOpen, onClose]);

  const handleDeleteNote = (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta nota?')) {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="admin-notes-modal-backdrop"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div
        className="admin-notes-modal-content font-typewriter"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="admin-notes-modal-header">
          <h2>Notas Recibidas</h2>
          <button onClick={onClose} className="admin-notes-modal-close-btn" aria-label="Cerrar">&times;</button>
        </header>

        <main className="admin-notes-modal-body">
            {notes.length === 0 ? (
                <p className="text-center text-stone-500 italic">No hay notas por ahora.</p>
            ) : (
                <ul className="space-y-4">
                    {notes.slice().reverse().map(note => (
                        <li key={note.id} className="note-list-item" style={{ borderLeftColor: note.color }}>
                            <div className="flex-grow">
                                <p className="note-text">{note.text}</p>
                                <p className="note-author">- {note.name}</p>
                            </div>
                            <button 
                              onClick={() => handleDeleteNote(note.id)} 
                              className="note-delete-btn"
                              aria-label={`Eliminar nota de ${note.name}`}
                            >
                              &times;
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </main>
      </div>
    </div>
  );
};

export default AdminNotesModal;