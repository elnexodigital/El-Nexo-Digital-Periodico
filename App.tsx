
import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import type { VideoPodcast, HeaderControls } from './types';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import { WEEKLY_EDITION_CONTENT } from './data/weeklyContent';


const PodcastModal = lazy(() => import('./components/PodcastModal'));
const Magazine = lazy(() => import('./components/Magazine'));

const App: React.FC = () => {
  const [dailyPodcast, setDailyPodcast] = useState<VideoPodcast | null>(null);
  const [isPodcastModalOpen, setIsPodcastModalOpen] = useState(false);
  
  const headerRef = useRef<HeaderControls>(null);
  const wasRadioPlaying = useRef(false);

  useEffect(() => {
    const loadLocalData = async () => {
      try {
        const { VIDEO_PODCASTS } = await import('./data/podcasts');
        if (VIDEO_PODCASTS.length > 0) {
            const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
            const podcastIndex = dayOfYear % VIDEO_PODCASTS.length;
            setDailyPodcast(VIDEO_PODCASTS[podcastIndex]);
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

  return (
    <div className="bg-[#fdfaf4] min-h-screen">
      <Header 
        ref={headerRef} 
        isPodcastModalOpen={isPodcastModalOpen}
        onPodcastButtonClick={openPodcastModal}
        showPodcastButton={!!dailyPodcast}
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
    </div>
  );
};

export default App;
