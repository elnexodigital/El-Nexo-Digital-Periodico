
import React, { useState, useEffect, lazy, Suspense, useRef } from 'react';
import type { VideoPodcast, HeaderControls } from './types.ts';
import Header from './components/Header.tsx';
import LoadingSpinner from './components/LoadingSpinner.tsx';
import Library from './components/Library.tsx';

// --- COMPONENTES CON LAZY LOADING ---
const PodcastModal = lazy(() => import('./components/PodcastModal.tsx'));
const Magazine = lazy(() => import('./components/Magazine.tsx'));

type View = 'magazine' | 'library';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('magazine');
  const [dailyPodcast, setDailyPodcast] = useState<VideoPodcast | null>(null);
  const [isPodcastModalOpen, setIsPodcastModalOpen] = useState(false);
  const headerRef = useRef<HeaderControls>(null);

  const fontUrl = 'https://res.cloudinary.com/dnauavz56/raw/upload/brittany_ifg3wl.ttf';

  // Carga del podcast del día (cambia cada día basado en la fecha)
  useEffect(() => {
    const loadLocalData = async () => {
      try {
        const { VIDEO_PODCASTS } = await import('./data/podcasts.ts');
        if (VIDEO_PODCASTS && VIDEO_PODCASTS.length > 0) {
          const today = new Date();
          const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
          const index = dayOfYear % VIDEO_PODCASTS.length;
          setDailyPodcast(VIDEO_PODCASTS[index]);
        }
      } catch (e) {
        console.error("Error loading daily podcast:", e);
      }
    };
    loadLocalData();
  }, []);

  const openPodcastModal = () => {
    if (headerRef.current?.getIsPlayingState()) {
      headerRef.current.pauseRadio();
    }
    setIsPodcastModalOpen(true);
  };

  const closePodcastModal = () => {
    setIsPodcastModalOpen(false);
  };

  const getViewBackground = () => {
    switch (currentView) {
      case 'magazine': return 'bg-command-center';
      case 'library': return 'bg-archive';
      default: return 'bg-industrial-base';
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden flex flex-col weathered-panel transition-colors duration-200 ${getViewBackground()}`}>
      <style dangerouslySetInnerHTML={{ __html: `
        @font-face {
          font-family: 'Brittany';
          src: url('${fontUrl}') format('truetype');
          font-display: swap;
        }
      ` }} />
      <Header
        ref={headerRef}
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view as View);
        }}
        onOpenPodcast={openPodcastModal}
        hasPodcast={!!dailyPodcast}
      />

      <main className="container mx-auto px-4 pt-1 pb-4">
        <Suspense fallback={<LoadingSpinner />}>
          {currentView === 'magazine' && (
            <div className="flex flex-col gap-2">
              <Magazine />
            </div>
          )}
          {currentView === 'library' && (
            <div className="flex flex-col gap-2">
              <Library onBackToMagazine={() => setCurrentView('magazine')} />
            </div>
          )}
        </Suspense>
      </main>

      {dailyPodcast && (
        <Suspense fallback={null}>
          <PodcastModal
            isOpen={isPodcastModalOpen}
            onClose={closePodcastModal}
            podcast={dailyPodcast}
          />
        </Suspense>
      )}

      <footer className="mt-auto py-6 text-center border-t border-stone-200/30">
        <a 
          href="mailto:leocastrillo@elnexodigital.com"
          className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-500 hover:text-[#800020] transition-colors duration-500"
        >
          leocastrillo@elnexodigital.com
        </a>
      </footer>
    </div>
  );
};

export default App;
