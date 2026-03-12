
import React from 'react';
import { Download, Gift } from 'lucide-react';
import type { LibraryItem } from '../types.ts';

interface LibraryItemCardProps {
  item: LibraryItem;
  onClick: () => void;
}

const LibraryItemCard: React.FC<LibraryItemCardProps> = ({ item, onClick }) => {
  const isMagazine = item.category === 'Revistas';
  const isGift = item.category === 'Postales';
  const showGiftBadge = isGift || isMagazine;

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const getDownloadUrl = (url: string) => {
     if (url.includes('cloudinary.com') && url.includes('/upload/') && !url.includes('/fl_attachment/')) {
        return url.replace('/upload/', '/upload/fl_attachment/');
    }
    return url;
  };

  return (
    <div
      className="group text-left bg-white rounded-xl shadow-lg overflow-hidden w-full relative hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col border border-zen-charcoal/5"
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
      {showGiftBadge && (
        <div className="absolute top-3 right-3 z-20">
            <div className="bg-[#800020] text-white text-[9px] font-bold px-2 py-1 shadow-lg rounded flex items-center gap-1 animate-pulse">
                <Gift size={10} />
                REGALO
            </div>
        </div>
      )}

      <div className="aspect-[3/4] overflow-hidden relative w-full">
        <img
          src={item.imageUrl}
          alt={`Portada de ${item.title}`}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div className="mb-3">
            <h3 className="font-serif font-bold text-base leading-tight text-zen-charcoal group-hover:text-[#800020] transition-colors line-clamp-2">
              {item.title}
            </h3>
            <p className="text-xs text-zen-charcoal/40 italic font-serif mt-1 truncate">
              {item.author}
            </p>
        </div>

        {isMagazine && item.pdfUrl && (
            <a
                href={getDownloadUrl(item.pdfUrl)}
                download
                onClick={handleDownload}
                className="mt-2 w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-[#800020] hover:bg-[#800020]/90 text-white text-[10px] font-bold uppercase tracking-widest rounded transition-all z-10 relative shadow-sm"
                aria-label={`Descargar PDF de ${item.title}`}
            >
                <Download size={12} />
                Descargar PDF
            </a>
        )}
      </div>
    </div>
  );
};

export default LibraryItemCard;
