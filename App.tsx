
import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import type { VideoPodcast, HeaderControls, WeeklyContent } from './types';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import { COVER_IMAGE_URL } from './data/cover';
import { IMAGE_LIBRARY } from './data/images';


const PodcastModal = lazy(() => import('./components/PodcastModal'));
const Magazine = lazy(() => import('./components/Magazine'));

const App: React.FC = () => {
  const [dailyPodcast, setDailyPodcast] = useState<VideoPodcast | null>(null);
  const [isPodcastModalOpen, setIsPodcastModalOpen] = useState(false);
  const [weeklyContent, setWeeklyContent] = useState<WeeklyContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const headerRef = useRef<HeaderControls>(null);
  const wasRadioPlaying = useRef(false);

  const WEEKLY_THEME = 'Los nuevos superalimentos: ¿Son realmente saludables o solo una moda?';
  
  useEffect(() => {
    const getWeekKey = () => {
      const now = new Date();
      // Use Sunday as the start of the week for calculation
      const firstDay = new Date(now.setDate(now.getDate() - now.getDay()));
      return `${firstDay.getFullYear()}-${firstDay.getMonth()}-${firstDay.getDate()}`;
    };

    // Load local data like the daily podcast immediately. This is fast and shouldn't fail.
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

    // Fetch remote magazine content. This can be slow or fail.
    const fetchMagazineContent = async () => {
      setIsLoading(true);
      setError(null);
      const weekKey = getWeekKey();
      const cacheKey = `weeklyArticles_${weekKey}`;
      
      try {
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
          setWeeklyContent(JSON.parse(cachedData));
        } else {
          const { generateWeeklyArticles } = await import('./services/geminiService');
          // 1. Fetch text-only content from the server
          const textContent = await generateWeeklyArticles(WEEKLY_THEME);
          
          // 2. Enrich the content with images locally for reliability
          const enrichedContent: WeeklyContent = {
            cover: {
              ...textContent.cover,
              imageUrl: COVER_IMAGE_URL,
            },
            articles: textContent.articles.map((article, index) => ({
              ...article,
              imageUrl: IMAGE_LIBRARY[index % IMAGE_LIBRARY.length],
            })),
          };

          setWeeklyContent(enrichedContent);
          localStorage.setItem(cacheKey, JSON.stringify(enrichedContent));
        }
      } catch (err) {
        setError('No se pudo cargar el contenido de la revista. Por favor, inténtalo de nuevo más tarde.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadLocalData();
    fetchMagazineContent();
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
        {isLoading && !weeklyContent && <LoadingSpinner />}
        
        {error && !weeklyContent && (
          <div className="text-center text-red-600 bg-red-100 p-4 rounded-md border border-red-300">
            <h2 className="font-bold text-lg">Error al cargar contenido</h2>
            <p>{error}</p>
          </div>
        )}
        
        <Suspense fallback={<LoadingSpinner />}>
            {weeklyContent && <Magazine articles={weeklyContent.articles} cover={weeklyContent.cover} />}
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
