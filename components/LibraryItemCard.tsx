import React from 'react';
import type { LibraryItem } from '../types.ts';

interface LibraryItemCardProps {
  item: LibraryItem;
  onClick: () => void;
}

const LibraryItemCard: React.FC<LibraryItemCardProps> = ({ item, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="library-item-card group text-left bg-white rounded-lg shadow-lg overflow-hidden"
      aria-label={`Ver detalles de ${item.title}`}
    >
      <div className="aspect-[2/3] overflow-hidden">
        <img
          src={item.imageUrl}
          alt={`Portada de ${item.title}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-3">
        <h3 className="font-bold text-sm leading-tight truncate">{item.title}</h3>
        <p className="text-xs text-stone-500 truncate">{item.author}</p>
      </div>
    </button>
  );
};

export default LibraryItemCard;
