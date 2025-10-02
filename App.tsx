
import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import type { VideoPodcast, HeaderControls } from './types.ts';
import Header from './components/Header.tsx';
import LoadingSpinner from './components/LoadingSpinner.tsx';
import { WEEKLY_EDITION_CONTENT } from './data/weeklyContent.ts';


const PodcastModal = lazy(() => import('./components/PodcastModal.tsx'));
const ProtectedContentModal = lazy(() => import('./components/ProtectedContentModal.tsx'));
const Magazine = lazy(() => import('./components/Magazine.tsx'));

const App: React.FC = () => {
  const [dailyPodcast, setDailyPodcast] = useState<VideoPodcast | null>(null);
  const [isPodcastModalOpen, setIsPodcastModalOpen] = useState(false);
  const [isProtectedModalOpen, setIsProtectedModalOpen] = useState(false);
  
  const headerRef = useRef<HeaderControls>(null);
  const wasRadioPlaying = useRef(false);

  useEffect(() => {
    const loadLocalData = async () => {
      try {
        const { VIDEO_PODCASTS } = await import('./data/podcasts.ts');
        if (VIDEO_PODCASTS.length > 0) {
            const randomIndex = Math.floor(Math.random() * VIDEO_PODCASTS.length);
            setDailyPodcast(VIDEO_PODCASTS[randomIndex]);
        }
      } catch(e) {
        console.error("Error loading daily podcast:", e);
      }
    };

    loadLocalData();
  }, []);

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

  const openProtectedModal = () => {
    if (headerRef.current) {
      wasRadioPlaying.current = headerRef.current.getIsPlayingState();
      headerRef.current.pauseRadio();
    }
    setIsProtectedModalOpen(true);
  };

  const closeProtectedModal = () => {
    setIsProtectedModalOpen(false);
    if (headerRef.current && wasRadioPlaying.current) {
      headerRef.current.playRadio();
    }
  };

  return (
    <div className="bg-[#fdfaf4] min-h-screen">
      <Header 
        ref={headerRef} 
        isPodcastModalOpen={isPodcastModalOpen}
        onPodcastButtonClick={openPodcastModal}
        showPodcastButton={!!dailyPodcast}
        onProtectedButtonClick={openProtectedModal}
      />

      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<LoadingSpinner />}>
            <Magazine pages={WEEKLY_EDITION_CONTENT.pages} cover={WEEKLY_EDITION_CONTENT.cover} />
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

      <Suspense fallback={null}>
        <ProtectedContentModal
          isOpen={isProtectedModalOpen}
          onClose={closeProtectedModal}
        />
      </Suspense>
    </div>
  );
};

export default App;