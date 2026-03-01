
import React, { useState, useEffect, lazy, Suspense, useRef } from 'react';
import type { VideoPodcast, HeaderControls } from './types.ts';
import Header from './components/Header.tsx';
import LoadingSpinner from './components/LoadingSpinner.tsx';
import Library from './components/Library.tsx';


// --- COMPONENTES CON LAZY LOADING ---
const PodcastModal = lazy(() => import('./components/PodcastModal.tsx'));
const Magazine = lazy(() => import('./components/Magazine.tsx'));
const Interviews = lazy(() => import('./components/Interviews.tsx'));
const Ateneo = lazy(() => import('./components/Ateneo.tsx'));

type View = 'magazine' | 'library' | 'interviews' | 'ateneo';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('magazine');
  const [dailyPodcast, setDailyPodcast] = useState<VideoPodcast | null>(null);
  const [isPodcastModalOpen, setIsPodcastModalOpen] = useState(false);
  const headerRef = useRef<HeaderControls>(null);

  // Carga del podcast del día
  useEffect(() => {
    const loadLocalData = async () => {
      try {
        const { VIDEO_PODCASTS } = await import('./data/podcasts.ts');
        if (VIDEO_PODCASTS && VIDEO_PODCASTS.length > 0) {
          const randomIndex = Math.floor(Math.random() * VIDEO_PODCASTS.length);
          setDailyPodcast(VIDEO_PODCASTS[randomIndex]);
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
      case 'interviews': return 'bg-archive'; // Separate interviews later if needed
      case 'ateneo': return 'bg-ateneo';
      default: return 'bg-industrial-base';
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden flex flex-col weathered-panel transition-colors duration-200 ${getViewBackground()}`}>
      <Header
        ref={headerRef}
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
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
            <Library onBackToMagazine={() => setCurrentView('magazine')} />
          )}
          {currentView === 'interviews' && <Interviews />}
          {currentView === 'ateneo' && <Ateneo />}
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
    </div>
  );
};

export default App;
