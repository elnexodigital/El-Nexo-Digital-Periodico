
import React from 'react';
import type { LibraryItem } from '../types.ts';

interface LibraryItemCardProps {
  item: LibraryItem;
  onClick: () => void;
}

const LibraryItemCard: React.FC<LibraryItemCardProps> = ({ item, onClick }) => {
  const isMagazine = item.category === 'Revistas';
  const isGift = item.category === 'Postales';
  const showGiftBadge = isGift || isMagazine; // Unify badge logic: both get the green "REGALO" style

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Helper to force download from Cloudinary
  const getDownloadUrl = (url: string) => {
     if (url.includes('cloudinary.com') && url.includes('/upload/') && !url.includes('/fl_attachment/')) {
        return url.replace('/upload/', '/upload/fl_attachment/');
    }
    return url;
  };

  return (
    <div
      className="library-item-card group text-left bg-white rounded-lg shadow-lg overflow-hidden w-full relative hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
      aria-label={`Ver detalles de ${item.title}`}
    >
      {/* Badge unificado para Regalos y Revistas */}
      {showGiftBadge && (
        <div className="absolute top-0 right-0 z-20">
            <div className="bg-green-600 text-white text-[10px] font-bold px-3 py-1 shadow-md rounded-bl-lg animate-bounce">
                REGALO
            </div>
        </div>
      )}

      <div className="aspect-[2/3] overflow-hidden relative w-full">
        <img
          src={item.imageUrl}
          alt={`Portada de ${item.title}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay sutil al hacer hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
      
      <div className="p-4 bg-white dark:bg-stone-800 flex-grow flex flex-col justify-between">
        <div className="mb-2">
            <h3 className="font-bold text-sm leading-tight text-stone-900 dark:text-stone-100 line-clamp-2 group-hover:text-red-700 transition-colors">{item.title}</h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 truncate mt-1">{item.author}</p>
        </div>

        {isMagazine && item.pdfUrl && (
            <a
                href={getDownloadUrl(item.pdfUrl)}
                download
                onClick={handleDownload}
                className="mt-2 w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-green-700 hover:bg-green-800 text-white text-xs font-bold rounded transition-colors z-10 relative shadow-sm"
                aria-label={`Descargar PDF de ${item.title}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                DESCARGAR PDF
            </a>
        )}
      </div>
    </div>
  );
};

export default LibraryItemCard;
