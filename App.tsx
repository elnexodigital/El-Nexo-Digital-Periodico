
import React, { useState, useEffect, useRef } from 'react';
import type { VideoPodcast, HeaderControls } from './types';
import { VIDEO_PODCASTS } from './data/podcasts';
import Header from './components/Header';
import FloatingPodcastButton from './components/FloatingPodcastButton';
import PodcastModal from './components/PodcastModal';

const App: React.FC = () => {
  const [dailyPodcast, setDailyPodcast] = useState<VideoPodcast | null>(null);
  const [isPodcastModalOpen, setIsPodcastModalOpen] = useState(false);

  const headerRef = useRef<HeaderControls>(null);
  const wasRadioPlaying = useRef(false);
  
  useEffect(() => {
    if (VIDEO_PODCASTS.length > 0) {
      const randomIndex = Math.floor(Math.random() * VIDEO_PODCASTS.length);
      setDailyPodcast(VIDEO_PODCASTS[randomIndex]);
    }
  }, []);
  
  const openPodcast = () => {
    if (headerRef.current) {
      const isPlaying = headerRef.current.getIsPlayingState();
      wasRadioPlaying.current = isPlaying;
      if (isPlaying) {
        headerRef.current.pauseRadio();
      }
    }
    setIsPodcastModalOpen(true);
  };

  const closePodcast = () => {
    setIsPodcastModalOpen(false);
    if (headerRef.current && wasRadioPlaying.current) {
      headerRef.current.playRadio();
    }
  };

  return (
    <>
      <div className="container mx-auto p-4 md:p-8 max-w-7xl font-typewriter">
        <Header ref={headerRef} isPodcastModalOpen={isPodcastModalOpen} />
        
        <main className="mt-8 text-center">
          <h2 className="text-3xl font-bold my-16">
            Estamos construyendo tu espacio único, gracias por estar acá
          </h2>
        </main>

        <footer className="text-center mt-12 py-4 border-t border-gray-400">
          <p className="text-black text-sm">El Nexo Digital &copy; {new Date().getFullYear()}. Potenciado por Gemini.</p>
        </footer>
      </div>

      <FloatingPodcastButton onClick={openPodcast} />
      <PodcastModal 
        isOpen={isPodcastModalOpen}
        onClose={closePodcast}
        podcast={dailyPodcast}
      />
    </>
  );
};

export default App;
