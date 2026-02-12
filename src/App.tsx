
import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import type { VideoPodcast, HeaderControls } from './types.ts';
import Header from './components/Header.tsx';
import LoadingSpinner from './components/LoadingSpinner.tsx';
import Library from './components/Library.tsx';

// --- COMPONENTES CON LAZY LOADING ---
const PodcastModal = lazy(() => import('./components/PodcastModal.tsx'));
const Magazine = lazy(() => import('./components/Magazine.tsx'));

const THEME_STORAGE_KEY = 'elNexoDigitalTheme';

type View = 'magazine' | 'library';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('magazine');
  const [dailyPodcast, setDailyPodcast] = useState<VideoPodcast | null>(null);
  const [isPodcastModalOpen, setIsPodcastModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const savedMode = window.localStorage.getItem(THEME_STORAGE_KEY);
      return savedMode === 'dark';
    } catch {
      return false;
    }
  });

  const headerRef = useRef<HeaderControls>(null);
  const wasRadioPlaying = useRef(false);

  // Sincronización del tema oscuro
  useEffect(() => {
    const body = document.body;
    if (isDarkMode) {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme to localStorage', error);
    }
  }, [isDarkMode]);

  // Carga del podcast del día
  useEffect(() => {
    const loadLocalData = async () => {
      try {
        const { VIDEO_PODCASTS } = await import('./data/podcasts.ts');
        if (VIDEO_PODCASTS && VIDEO_PODCASTS.length > 0) {
            const randomIndex = Math.floor(Math.random() * VIDEO_PODCASTS.length);
            setDailyPodcast(VIDEO_PODCASTS[randomIndex]);
        }
      } catch(e) {
        console.error("Error loading daily podcast:", e);
      }
    };
    loadLocalData();
  }, []);
  
  const toggleDarkMode = () => setIsDarkMode(prevMode => !prevMode);

  const openPodcastModal = () => {
    if (headerRef.current) {
      wasRadioPlaying.current = headerRef.current.getIsPlayingState();
      headerRef.current.pauseRadio(); 
    }
    setIsPodcastModalOpen(true);
  };

  const closePodcastModal = () => {
    setIsPodcastModalOpen(false);
    if (headerRef.current && wasRadioPlaying.current) {
      headerRef.current.playRadio();
    }
  };

  return (
    <div className="min-h-screen">
      <Header 
        ref={headerRef} 
        isPodcastModalOpen={isPodcastModalOpen}
        onPodcastButtonClick={openPodcastModal}
        showPodcastButton={!!dailyPodcast}
        onLibraryButtonClick={() => setCurrentView('library')}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<LoadingSpinner />}>
           {currentView === 'magazine' ? (
              <Magazine />
           ) : (
              <Library onBackToMagazine={() => setCurrentView('magazine')} />
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
    </div>
  );
};

export default App;
