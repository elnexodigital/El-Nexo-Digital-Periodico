import React, { useState } from 'react';
import type { StickyNote } from '../types.ts';

// --- Single Note Display Component ---
interface StickyNoteDisplayProps {
    note: StickyNote;
    isNotesAdmin: boolean;
    onAdminAuthRequest: () => void;
}

const StickyNoteDisplay: React.FC<StickyNoteDisplayProps> = ({ note, isNotesAdmin, onAdminAuthRequest }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggleExpand = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isNotesAdmin) {
            setIsExpanded(!isExpanded);
        } else {
            onAdminAuthRequest();
        }
    };
    
    if (isExpanded) {
        return (
            <div className="sticky-note-backdrop" onClick={handleToggleExpand} role="dialog" aria-modal="true">
                <div 
                    className="sticky-note-expanded font-handwriting"
                    style={{ backgroundColor: note.color }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex-grow overflow-y-auto p-6 text-2xl leading-relaxed">
                      {note.text}
                    </div>
                    <p className="font-bold p-4 border-t border-black/10 text-right text-lg">
                        - {note.name}
                    </p>
                    <button onClick={handleToggleExpand} className="sticky-note-close-btn" aria-label="Cerrar nota">
                      &times;
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div 
            className="sticky-note font-handwriting"
            style={{ 
                top: `${note.position.y}%`, 
                left: `${note.position.x}%`, 
                transform: `translate(-50%, -50%) rotate(${note.rotation}deg)`,
                backgroundColor: note.color 
            }}
            onClick={handleToggleExpand}
            role="button"
            aria-label={`Nota de ${note.name}. Toca para leer.`}
        >
            <p className="sticky-note-text-preview">{note.text}</p>
            <p className="sticky-note-author">- {note.name}</p>
        </div>
    );
};


// --- Container for All Notes ---
interface StickyNotesContainerProps {
    notes: StickyNote[];
    isNotesAdmin: boolean;
    onAdminAuthRequest: () => void;
}

const StickyNotesContainer: React.FC<StickyNotesContainerProps> = ({ notes, isNotesAdmin, onAdminAuthRequest }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50" aria-live="polite">
            {notes.map(note => (
                <StickyNoteDisplay 
                    key={note.id} 
                    note={note} 
                    isNotesAdmin={isNotesAdmin} 
                    onAdminAuthRequest={onAdminAuthRequest}
                />
            ))}
        </div>
    );
};

export default StickyNotesContainer;