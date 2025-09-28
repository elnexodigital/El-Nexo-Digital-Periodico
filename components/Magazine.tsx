import React, { useRef, FC, useState } from 'react';
import type { Page, OddPage, EvenPage, CoverStory } from '../types';

// --- NUEVO: Componente para Páginas Impares (con texto) ---
const OddPageLayout: FC<{ page: OddPage }> = ({ page }) => {
  const layout = page.layout || 'hoja-completa';

  const layoutStyles = {
    'columna-izquierda': 'w-[calc(500/1080*100%)] h-full top-1/2 -translate-y-1/2 left-[calc(90/1080*100%)]',
    'columna-derecha': 'w-[calc(500/1080*100%)] h-full top-1/2 -translate-y-1/2 right-[calc(90/1080*100%)]',
    'columna-centro': 'w-[calc(500/1080*100%)] h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'media-hoja': 'w-[calc(850/1080*100%)] h-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'hoja-completa': 'w-[calc(864/1080*100%)] h-[calc(1700/1920*100%)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'columna-izquierda-centrada': 'w-[calc(500/1080*100%)] h-full top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2',
  };
  
  const contentWrapperClass = `absolute ${layoutStyles[layout] || layoutStyles['hoja-completa']} bg-[rgba(255,255,255,0.7)] backdrop-blur-sm rounded-md shadow-lg flex flex-col`;

  return (
    <div className="w-full h-full relative bg-stone-900">
      {/* Background Image */}
      <img 
        src={page.backgroundUrl} 
        alt="" 
        aria-hidden="true" 
        className="w-full h-full object-cover" 
      />

      {/* Text Content Overlay */}
      <div className={contentWrapperClass}>
        <div className="flex-grow p-4 md:p-6 overflow-y-auto">
          <span className="font-bold uppercase text-xs text-black/60 mb-2">{page.category}</span>
          <h3 className="text-xl md:text-2xl font-bold leading-tight">{page.headline}</h3>
          {page.subtitle && (
            <p className="text-md md:text-lg text-black/70 font-serif italic mb-4 -mt-1">{page.subtitle}</p>
          )}
          {page.content && (
            <div className="text-black text-sm leading-relaxed mb-4 whitespace-pre-wrap">
              {page.content}
            </div>
          )}
          {page.sources && page.sources.length > 0 && (
              <div className="pt-2 border-t border-stone-400/50">
                  <h4 className="font-bold text-xs uppercase text-black/60 mb-1">Fuentes</h4>
                  <ul className="list-disc list-inside text-xs text-stone-700">
                      {page.sources.map((source, index) => (
                          <li key={index}>{source}</li>
                      ))}
                  </ul>
              </div>
          )}
        </div>
        {/* Banner */}
        {page.bannerUrl && (
          <div className="flex-shrink-0 h-[15%] max-h-24 p-2 flex items-center justify-center bg-stone-200/50 border-t border-stone-400/30">
              <img src={page.bannerUrl} alt="Publicidad" className="max-w-full max-h-full object-contain"/>
          </div>
        )}
      </div>
    </div>
  );
};


// --- NUEVO: Componente para Páginas Pares (imagen completa) ---
const EvenPageLayout: FC<{ page: EvenPage }> = ({ page }) => {
  return (
    <div className="w-full h-full relative bg-stone-900">
      <img 
        src={page.imageUrl} 
        alt="Imagen de página" 
        className="w-full h-full object-cover" 
      />
      {page.bannerUrl && (
        <div className="absolute bottom-0 left-0 w-full h-[15%] max-h-24 p-2 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <img 
            src={page.bannerUrl} 
            alt="Publicidad" 
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
};

// --- Componentes de Portada y Contraportada (sin cambios) ---
interface CoverPageProps {
  coverStory: CoverStory;
}

const CoverPage: React.FC<CoverPageProps> = ({ coverStory }) => (
  <div className="w-full h-full bg-stone-900">
    {coverStory.imageUrl ? (
      <img 
        src={coverStory.imageUrl} 
        alt={`Portada: ${coverStory.headline}`} 
        className="w-full h-full object-cover"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center text-white bg-stone-800">
        <p>Portada no disponible</p>
      </div>
    )}
  </div>
);

const BackCoverPage: React.FC = () => (
    <div className="w-full h-full bg-stone-800 flex items-center justify-center">
        <img
            src="https://res.cloudinary.com/ddmj6zevz/image/upload/f_auto,q_auto:good/v1756714882/logo_el_nexo_digital_assa82.png"
            alt="Logo de El Nexo Digital"
            className="h-28 opacity-50"
        />
    </div>
);


interface MagazineProps {
  pages: Page[];
  cover: CoverStory;
}

const Magazine: React.FC<MagazineProps> = ({ pages, cover }) => {
  const [currentDesktopPage, setCurrentDesktopPage] = useState(0);
  const [currentMobilePage, setCurrentMobilePage] = useState(0);

  const dragStartPos = useRef(0);
  const currentDragPos = useRef(0);
  const isDragging = useRef(false);
  const turningPageRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef(0);

  const allPages: React.ReactNode[] = [
    <CoverPage key="cover" coverStory={cover} />,
    ...pages.map((page, index) => {
      if (page.type === 'odd') {
        return <OddPageLayout key={page.id} page={page} />;
      } else {
        return <EvenPageLayout key={`even-${index}`} page={page} />;
      }
    }),
    <BackCoverPage key="back" />
  ];

  const desktopPages = [...allPages];
  if (desktopPages.length % 2 !== 0) {
    desktopPages.push(<div key="blank" className="w-full h-full bg-[#fdfaf4]" />);
  }
  const numPapers = desktopPages.length / 2;
  
  // --- Mobile Gesture Handlers ---
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>, index: number) => {
    if (index !== currentMobilePage) return;
    isDragging.current = true;
    dragStartPos.current = e.touches[0].clientX;
    currentDragPos.current = e.touches[0].clientX;
    turningPageRef.current = e.currentTarget as HTMLDivElement;
    turningPageRef.current.classList.add('turning');
    cancelAnimationFrame(animationFrameRef.current);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging.current || !turningPageRef.current) return;
    currentDragPos.current = e.touches[0].clientX;
    animationFrameRef.current = requestAnimationFrame(updatePageTurn);
  };
  
  const handleTouchEnd = () => {
    if (!isDragging.current || !turningPageRef.current) return;
    isDragging.current = false;
    
    const turningPageElement = turningPageRef.current;
    turningPageElement.classList.remove('turning');
    const dragDistance = dragStartPos.current - currentDragPos.current;
    
    if (dragDistance > turningPageElement.clientWidth / 3 && currentMobilePage < allPages.length - 1) {
      setCurrentMobilePage(p => p + 1);
    } else if (dragDistance < -turningPageElement.clientWidth / 3 && currentMobilePage > 0) {
      setCurrentMobilePage(p => p - 1);
    } else {
       turningPageElement.style.transform = ``;
    }
    turningPageRef.current = null;
  };

  const updatePageTurn = () => {
      if (!isDragging.current || !turningPageRef.current) return;
      const dragDistance = dragStartPos.current - currentDragPos.current;
      const rotation = Math.max(-180, Math.min(0, (-dragDistance / turningPageRef.current.clientWidth) * 180));
      turningPageRef.current.style.transform = `rotateY(${rotation}deg)`;
  };


  // --- Desktop Navigation ---
  const goToDesktopPage = (pageIndex: number) => {
    setCurrentDesktopPage(Math.max(0, Math.min(pageIndex, numPapers)));
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Mobile 3D Flip View */}
      <div className="w-full max-w-md md:hidden px-2">
        <div className="mobile-book">
            {allPages.map((page, index) => {
                const isFlipped = currentMobilePage > index;
                const zIndex = allPages.length - index;
                return (
                    <div 
                        key={index} 
                        className={`mobile-page ${isFlipped ? 'flipped' : ''}`}
                        style={{ zIndex }}
                        onTouchStart={(e) => handleTouchStart(e, index)}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        {page}
                    </div>
                )
            })}
        </div>
      </div>


      {/* Desktop Book View */}
      <div className="hidden md:block w-full max-w-6xl aspect-[18/16] relative book perspective-[2500px]">
        {Array.from({ length: numPapers }).map((_, index) => {
          const isFlipped = currentDesktopPage > index;
          const zIndex = isFlipped ? index : (numPapers * 2) - index;
          return (
            <div
              key={index}
              className={`page-container absolute w-1/2 h-full top-0 right-0 ${isFlipped ? 'flipped' : ''}`}
              style={{ zIndex }}
              onClick={() => goToDesktopPage(isFlipped ? index : index + 1)}
              role="button"
              aria-label={`Pasar a la página ${isFlipped ? index * 2 : index * 2 + 3}`}
            >
              <div className="page-front absolute w-full h-full border-r border-stone-300/50 shadow-2xl bg-[#fdfaf4]">
                {desktopPages[index * 2]}
              </div>
              <div className="page-back absolute w-full h-full border-l border-stone-300/50 shadow-2xl bg-[#fdfaf4]">
                {desktopPages[index * 2 + 1]}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex justify-center mt-6 gap-4 items-center w-full">
        <button
          onClick={() => setCurrentMobilePage(p => Math.max(0, p - 1))}
          disabled={currentMobilePage === 0}
          className="px-4 py-2 bg-stone-800 text-white hover:bg-black transition-colors disabled:bg-stone-400 disabled:cursor-not-allowed rounded-md"
          aria-label="Página anterior"
        >
          Anterior
        </button>
        <span className="text-sm text-stone-600 font-semibold">
          {currentMobilePage + 1} de {allPages.length}
        </span>
        <button
          onClick={() => setCurrentMobilePage(p => Math.min(allPages.length - 1, p + 1))}
          disabled={currentMobilePage === allPages.length - 1}
          className="px-4 py-2 bg-stone-800 text-white hover:bg-black transition-colors disabled:bg-stone-400 disabled:cursor-not-allowed rounded-md"
          aria-label="Página siguiente"
        >
          Siguiente
        </button>
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex justify-center mt-8 gap-4 items-center">
        <button
          onClick={() => goToDesktopPage(currentDesktopPage - 1)}
          disabled={currentDesktopPage === 0}
          className="px-5 py-2 bg-stone-800 text-white hover:bg-black transition-colors disabled:bg-stone-400 disabled:cursor-not-allowed rounded-md"
          aria-label="Página anterior"
        >
          Anterior
        </button>
        <span className="text-base text-stone-600 font-semibold">
          Página {currentDesktopPage} de {numPapers}
        </span>
        <button
          onClick={() => goToDesktopPage(currentDesktopPage + 1)}
          disabled={currentDesktopPage === numPapers}
          className="px-5 py-2 bg-stone-800 text-white hover:bg-black transition-colors disabled:bg-stone-400 disabled:cursor-not-allowed rounded-md"
          aria-label="Página siguiente"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Magazine;