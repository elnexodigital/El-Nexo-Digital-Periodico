import React, { useState, useRef } from 'react';
import type { Article, CoverStory } from '../types';

interface ArticlePageProps {
  article: Article;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ article }) => (
  <div className="w-full h-full p-6 md:p-8 flex flex-col overflow-hidden bg-[#fdfaf4]">
    <span className="font-bold uppercase text-xs text-black/60 mb-2">{article.category}</span>
    <h3 className="text-xl md:text-2xl font-bold leading-tight mb-4">{article.headline}</h3>
    <div className="w-full h-40 md:h-48 mb-4 overflow-hidden rounded-sm">
      {article.imageUrl ? (
        <img src={article.imageUrl} alt={article.headline} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-gray-300"></div>
      )}
    </div>
    <div className="text-black text-xs md:text-sm leading-relaxed overflow-y-auto flex-grow">
      {article.content}
    </div>
  </div>
);

interface CoverPageProps {
  coverStory: CoverStory;
}

const CoverPage: React.FC<CoverPageProps> = ({ coverStory }) => (
  <div className="w-full h-full relative text-white flex flex-col items-center justify-between p-6 md:p-8 text-center bg-stone-900">
    {coverStory.imageUrl && (
      <img 
        src={coverStory.imageUrl} 
        alt={coverStory.headline} 
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
    )}
    {/* Legibility Gradient Overlay */}
    <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/20 to-black/50"></div>
    
    <div className="relative z-20 flex flex-col justify-between h-full w-full">
      <div className="text-left [text-shadow:0_2px_5px_rgba(0,0,0,0.6)]">
        <img
          src="https://res.cloudinary.com/ddmj6zevz/image/upload/f_auto,q_auto:good/v1756714882/logo_el_nexo_digital_assa82.png"
          alt="Logo de El Nexo Digital"
          className="h-12 md:h-16 mb-2"
        />
        <h1 className="text-3xl md:text-4xl newspaper-title text-white">El Nexo Digital</h1>
      </div>
      
      <div className="flex-grow flex flex-col justify-center [text-shadow:0_2px_8px_rgba(0,0,0,0.7)]">
        <h2 className="text-4xl md:text-6xl font-bold leading-tight text-white font-serif tracking-tight">
          {coverStory.headline}
        </h2>
        <p className="mt-4 text-lg md:text-xl font-typewriter max-w-xl mx-auto">
          {coverStory.subtitle}
        </p>
      </div>

      <p className="font-typewriter text-sm [text-shadow:0_2px_5px_rgba(0,0,0,0.6)]">Edición Semanal</p>
    </div>
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
  articles: Article[];
  cover: CoverStory;
}

const Magazine: React.FC<MagazineProps> = ({ articles, cover }) => {
  const [currentDesktopPage, setCurrentDesktopPage] = useState(0);
  const [currentMobilePage, setCurrentMobilePage] = useState(0);

  const dragStartPos = useRef(0);
  const currentDragPos = useRef(0);
  const isDragging = useRef(false);
  const turningPageRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef(0);

  const pages: React.ReactNode[] = [
    <CoverPage key="cover" coverStory={cover} />,
    ...articles.map(article => <ArticlePage key={article.id} article={article} />),
    <BackCoverPage key="back" />
  ];

  const desktopPages = [...pages];
  if (desktopPages.length % 2 !== 0) {
    desktopPages.push(<div key="blank" className="w-full h-full bg-[#fdfaf4]" />);
  }
  const numPapers = desktopPages.length / 2;
  
  // --- Mobile Gesture Handlers ---
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>, index: number) => {
    if (index !== currentMobilePage) return;
    isDragging.current = true;
    dragStartPos.current = e.touches[0].clientX;
    currentDragPos.current = e.touches[0].clientX; // Initialize drag position
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
    
    const turningPageElement = turningPageRef.current; // Capture ref
    turningPageElement.classList.remove('turning');
    const dragDistance = dragStartPos.current - currentDragPos.current;
    
    if (dragDistance > turningPageElement.clientWidth / 3 && currentMobilePage < pages.length -1) {
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
      <div className="w-full max-w-md md:hidden">
        <div className="mobile-book" style={{ height: '70vh' }}>
            {pages.map((page, index) => {
                const isFlipped = currentMobilePage > index;
                const zIndex = pages.length - index;
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
      <div className="hidden md:block w-full max-w-6xl aspect-[2/1] relative book perspective-[2500px]">
        {Array.from({ length: numPapers }).map((_, index) => {
          const isFlipped = currentDesktopPage > index;
          const zIndex = (numPapers - index);
          return (
            <div
              key={index}
              className={`page-container absolute w-1/2 h-full top-0 right-0 ${isFlipped ? 'flipped' : ''}`}
              style={{ zIndex, perspective: '2500px' }}
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
          {currentMobilePage + 1} de {pages.length}
        </span>
        <button
          onClick={() => setCurrentMobilePage(p => Math.min(pages.length - 1, p + 1))}
          disabled={currentMobilePage === pages.length - 1}
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
