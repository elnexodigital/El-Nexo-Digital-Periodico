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
import DesignMockupModal from './components/DesignMockupModal.tsx';
import GlobalSearchModal from './components/GlobalSearchModal.tsx';
import { SOCIAL_NETWORKS, SocialIcon } from './components/SocialLinks.tsx';

// --- COMPONENTES CON LAZY LOADING ---
const PodcastModal = lazy(() => import('./components/PodcastModal.tsx'));

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('hub');
  const [dailyPodcast, setDailyPodcast] = useState<VideoPodcast | null>(null);
  const [isPodcastModalOpen, setIsPodcastModalOpen] = useState(false);
  const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
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

      {/* Visor de los Bocetos Originales A y B para consulta */}
      <DesignMockupModal 
        isOpen={isDesignModalOpen} 
        onClose={() => setIsDesignModalOpen(false)} 
      />

      {/* Botón discreto para consultar los bocetos originales si se desea */}
      <button
        onClick={() => setIsDesignModalOpen(true)}
        className="fixed bottom-16 right-4 z-30 flex items-center gap-1.5 px-3 py-1.5 bg-stone-900/90 hover:bg-stone-800 text-amber-300 text-[10px] font-mono uppercase tracking-wider rounded-full shadow-lg border border-amber-500/30 transition-all hover:scale-105"
        title="Consultar bocetos de referencia A y B"
      >
        <span>📱 Bocetos A / B</span>
      </button>

      {/* Barra de navegación inferior táctil para celular */}
      <BottomNav
        currentView={currentView}
        onNavigate={navigateTo}
        onOpenSearch={() => setIsSearchModalOpen(true)}
      />

      {/* Pie de página con accesos a redes y contacto */}
      <footer className="mt-auto py-8 pb-24 text-center border-t border-white/5 bg-stone-950/60 backdrop-blur-sm">
        <div className="max-w-xl mx-auto px-4 flex flex-col items-center gap-4">
          {/* Barra rápida de redes sociales */}
          <div className="flex items-center justify-center flex-wrap gap-2">
            {SOCIAL_NETWORKS.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`${social.name} (${social.handle || ''})`}
                className={`w-8 h-8 rounded-full bg-stone-900 border border-white/10 flex items-center justify-center text-stone-400 hover:scale-110 active:scale-95 transition-all shadow-sm ${social.color}`}
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <SocialIcon name={social.iconName} />
                </div>
              </a>
            ))}
          </div>

          <div className="flex flex-col items-center gap-1">
            <p className="text-xs font-serif italic text-stone-400">
              El Nexo Digital — Mucho más que un podcast
            </p>
            <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.15em] text-stone-500">
              <a 
                href="mailto:leocastrillo@elnexodigital.com"
                className="hover:text-amber-400 transition-colors"
              >
                leocastrillo@elnexodigital.com
              </a>
              <span>•</span>
              <a 
                href="mailto:castrilloleo@gmail.com"
                className="hover:text-amber-400 transition-colors"
              >
                castrilloleo@gmail.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
