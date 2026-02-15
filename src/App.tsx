
import React, { useState, useEffect, lazy, Suspense } from 'react';
import type { VideoPodcast } from './types.ts';
import Header from './components/Header.tsx';
import LoadingSpinner from './components/LoadingSpinner.tsx';
import Library from './components/Library.tsx';
import FloatingParticles from './components/FloatingParticles.tsx';
import HeroPlayer from './components/HeroPlayer.tsx';

// --- COMPONENTES CON LAZY LOADING ---
const PodcastModal = lazy(() => import('./components/PodcastModal.tsx'));
const Magazine = lazy(() => import('./components/Magazine.tsx'));
const Interviews = lazy(() => import('./components/Interviews.tsx'));
const Ateneo = lazy(() => import('./components/Ateneo.tsx'));

const THEME_STORAGE_KEY = 'elNexoDigitalTheme';

type View = 'magazine' | 'library' | 'interviews' | 'ateneo';

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

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      } catch (e) {
        console.error("Error loading daily podcast:", e);
      }
    };
    loadLocalData();
  }, []);

  const toggleDarkMode = () => setIsDarkMode(prevMode => !prevMode);

  const openPodcastModal = () => {
    setIsPodcastModalOpen(true);
  };

  const closePodcastModal = () => {
    setIsPodcastModalOpen(false);
  };



  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingParticles />
      <Header
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          setIsMobileMenuOpen(false);
        }}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<LoadingSpinner />}>
          {currentView === 'magazine' && (
            <>
              <HeroPlayer />
              <Magazine />
            </>
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

      {/* Botón flotante para el Podcast del día si estamos en magazine y hay podcast */}
      {currentView === 'magazine' && dailyPodcast && (
        <button
          onClick={openPodcastModal}
          className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-brand-orange text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-40"
        >
          <span className="text-2xl">🎙️</span>
        </button>
      )}
    </div>
  );
};

export default App;
