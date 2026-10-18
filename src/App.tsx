import React, { useState, useEffect, lazy, Suspense, useRef } from 'react';
import type { VideoPodcast, HeaderControls, AppView } from './types.ts';
import Header from './components/Header.tsx';
import LoadingSpinner from './components/LoadingSpinner.tsx';
import ContentHub from './components/ContentHub.tsx';
import RevistasView from './components/RevistasView.tsx';
import PodcastsMP4View from './components/PodcastsMP4View.tsx';
import PodcastsMP3View from './components/PodcastsMP3View.tsx';
import AteneoCategoryView from './components/AteneoCategoryView.tsx';
import BottomNav from './components/BottomNav.tsx';
import GlobalSearchModal from './components/GlobalSearchModal.tsx';
import MasterInventoryModal from './components/MasterInventoryModal.tsx';

// --- COMPONENTES CON LAZY LOADING ---
const PodcastModal = lazy(() => import('./components/PodcastModal.tsx'));

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('hub');
  const [dailyPodcast, setDailyPodcast] = useState<VideoPodcast | null>(null);
  const [isPodcastModalOpen, setIsPodcastModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isMasterInventoryOpen, setIsMasterInventoryOpen] = useState(false);
  const headerRef = useRef<HeaderControls>(null);

  const fontUrl = 'https://res.cloudinary.com/dnauavz56/raw/upload/brittany_ifg3wl.ttf';

  // Carga del podcast del día
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

  // Detección de acceso editorial por URL (#inventario, #gestion, #admin, #planilla)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#inventario' || hash === '#admin' || hash === '#gestion' || hash === '#planilla') {
        setIsMasterInventoryOpen(true);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
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

  const navigateTo = (view: AppView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-[#1A1D20] text-stone-100 transition-colors duration-200">
      <style dangerouslySetInnerHTML={{ __html: `
        @font-face {
          font-family: 'Brittany';
          src: url('${fontUrl}') format('truetype');
          font-display: swap;
        }
      ` }} />

      {/* Reproductor superior compacto, con pantalla audiovisual, controles y marquesina viva unificada */}
      <Header
        ref={headerRef}
        currentView={currentView}
        onNavigate={(view) => navigateTo(view as AppView)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
      />

      {/* Contenido principal según la vista seleccionada */}
      <main className="container mx-auto px-3 sm:px-4 pt-2 pb-16 flex-1">
        <Suspense fallback={<LoadingSpinner />}>
          {currentView === 'hub' && (
            <ContentHub 
              onNavigate={navigateTo} 
              onOpenSearch={() => setIsSearchModalOpen(true)}
              onOpenVideoPodcast={openPodcastModal}
            />
          )}

          {currentView === 'revistas' && (
            <RevistasView 
              onBack={() => navigateTo('hub')} 
            />
          )}

          {currentView === 'podcasts-mp4' && (
            <PodcastsMP4View 
              onBack={() => navigateTo('hub')} 
            />
          )}

          {currentView === 'podcasts-mp3' && (
            <PodcastsMP3View 
              onBack={() => navigateTo('hub')} 
            />
          )}

          {['libros', 'biografias', 'reportajes', 'documentos', 'musica', 'peliculas'].includes(currentView) && (
            <AteneoCategoryView
              category={currentView as 'libros' | 'biografias' | 'reportajes' | 'documentos' | 'musica' | 'peliculas'}
              onBack={() => navigateTo('hub')}
              onNavigateCategory={navigateTo}
            />
          )}
        </Suspense>
      </main>

      {/* Modal de Podcast Diario */}
      {dailyPodcast && (
        <Suspense fallback={null}>
          <PodcastModal
            isOpen={isPodcastModalOpen}
            onClose={closePodcastModal}
            podcast={dailyPodcast}
          />
        </Suspense>
      )}

      {/* Modal de Búsqueda Contextual Global Inteligente */}
      <GlobalSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onNavigate={navigateTo}
      />

      {/* Modal Reservado: Planilla Maestra de Contenidos (Acceso Privado para Leo) */}
      <MasterInventoryModal
        isOpen={isMasterInventoryOpen}
        onClose={() => {
          setIsMasterInventoryOpen(false);
          if (window.location.hash) {
            window.history.replaceState(null, '', window.location.pathname);
          }
        }}
      />

      {/* Barra de navegación inferior táctil para celular */}
      <BottomNav
        currentView={currentView}
        onNavigate={navigateTo}
        onOpenSearch={() => setIsSearchModalOpen(true)}
      />

      {/* Pie de página limpio y sobrio */}
      <footer className="mt-auto py-8 pb-24 text-center border-t border-white/5 bg-stone-950/60 backdrop-blur-sm">
        <div className="max-w-xl mx-auto px-4 flex flex-col items-center gap-2">
          <p className="text-xs font-serif italic text-stone-400">
            El Nexo Digital — Mucho más que un podcast
          </p>
          <a 
            href="mailto:castrilloleo@gmail.com"
            className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-500 hover:text-amber-400 transition-colors"
          >
            castrilloleo@gmail.com
          </a>

          {/* Botón discreto y reservado para Leo: Planilla Maestra */}
          <button
            onClick={() => setIsMasterInventoryOpen(true)}
            className="text-[10px] font-mono text-stone-600 hover:text-amber-400/90 transition-colors mt-2 flex items-center gap-1.5 cursor-pointer select-none"
            title="Planilla Maestra de Contenidos (Control Editorial Privado)"
          >
            <span className="opacity-60 text-xs">🔒</span>
            <span>Planilla Maestra & Control Editorial</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
