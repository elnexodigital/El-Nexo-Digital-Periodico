
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
      className="library-item-card group text-left glass-panel rounded-xl shadow-md overflow-hidden w-full relative hover:bg-white/5 transition-all duration-500 flex flex-col border border-white/5"
    >
      {showGiftBadge && (
        <div className="absolute top-0 right-0 z-20">
          <div className="bg-white/10 text-white/60 text-[8px] font-mono px-3 py-1 rounded-bl-lg backdrop-blur-md uppercase tracking-widest">
            Fragmento
          </div>
        </div>
      )}

      <div
        className="aspect-[3/4] overflow-hidden relative w-full cursor-pointer"
        onClick={onClick}
      >
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
        />
      </div>

      <div className="p-6 bg-black/20 backdrop-blur-md flex-grow flex flex-col justify-between border-t border-white/5">
        <div className="mb-4 cursor-pointer" onClick={onClick}>
          <h3 className="font-signature text-lg leading-tight text-white/90 line-clamp-2 transition-colors">{item.title}</h3>
          <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/30 truncate mt-2">{item.author}</p>
        </div>

        {isMagazine && item.pdfUrl && (
          <a
            href={getDownloadUrl(item.pdfUrl)}
            download
            onClick={handleDownload}
            className="mt-2 w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 text-white/40 hover:text-white/80 text-[9px] font-mono tracking-[0.2em] rounded-lg transition-all border border-white/5 uppercase"
          >
            Descargar_PDF
          </a>
        )}
      </div>
    </div>
  );
};

export default LibraryItemCard;
