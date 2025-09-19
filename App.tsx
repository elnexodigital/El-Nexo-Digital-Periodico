
import React, { useState, useEffect, useRef } from 'react';
import type { VideoPodcast, HeaderControls, WeeklyContent, Article } from './types';
import { VIDEO_PODCASTS } from './data/podcasts';
import Header from './components/Header';
import PodcastModal from './components/PodcastModal';
import Magazine from './components/Magazine';
import LoadingSpinner from './components/LoadingSpinner';
import { generateWeeklyArticles } from './services/geminiService';

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
      const firstDay = new Date(now.setDate(now.getDate() - now.getDay()));
      return `${firstDay.getFullYear()}-${firstDay.getMonth()}-${firstDay.getDate()}`;
    };

    const fetchArticles = async () => {
      setIsLoading(true);
      setError(null);
      const weekKey = getWeekKey();
      const cacheKey = `weeklyArticles_${weekKey}`;
      
      try {
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
          setWeeklyContent(JSON.parse(cachedData));
        } else {
          const content = await generateWeeklyArticles(WEEKLY_THEME);
          setWeeklyContent(content);
          localStorage.setItem(cacheKey, JSON.stringify(content));
        }
      } catch (err) {
        console.error("Error fetching or generating articles:", err);
        setError("No se pudieron cargar los artículos. Por favor, intente de nuevo más tarde.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchArticles();
  }, []);
  
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

  const renderMagazineContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-96">
          <LoadingSpinner />
          <p className="mt-4 text-stone-600">Generando contenido semanal...</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-96 text-center">
          <p className="text-red-600 font-semibold">{error}</p>
        </div>
      );
    }
    if (weeklyContent) {
      return <Magazine cover={weeklyContent.cover} articles={weeklyContent.articles} />;
    }
    return null;
  };

  return (
    <>
      <div className="container mx-auto p-4 md:p-8 max-w-7xl font-typewriter">
        <Header ref={headerRef} isPodcastModalOpen={isPodcastModalOpen} />
        
        <div className="my-8 flex justify-center items-center">
          <button
            onClick={openPodcast}
            className="w-28 h-28 md:w-36 md:h-36 rounded-full shadow-2xl transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-black/50"
            aria-label="Mirá el podcast del día"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Spinning Text */}
              <svg viewBox="0 0 100 100" className="absolute top-0 left-0 w-full h-full animate-spin-very-slow text-black">
                <defs>
                  <path id="circle" d=" M 50, 50 m -39, 0 a 39,39 0 1,1 78,0 a 39,39 0 1,1 -78,0 "/>
                </defs>
                <text fill="currentColor" style={{fontSize: '14px', fontWeight: 'bold', letterSpacing: '0.5px'}} className="uppercase">
                  <textPath xlinkHref="#circle" startOffset="25%" textAnchor="middle">
                    NUEVO PODCAST
                  </textPath>
                </text>
              </svg>

              {/* Inner Image with Pulse Animation */}
              <div className="w-[70%] h-[70%] rounded-full animate-pulse-slow bg-white">
                  <img
                      src="https://res.cloudinary.com/ddmj6zevz/image/upload/v1756851098/Generated_Image_September_02__2025_-_1_54PM-removebg-preview_fpoafd.png"
                      alt="Abrir podcast del día"
                      className="w-full h-full object-cover rounded-full"
                  />
              </div>
            </div>
          </button>
        </div>

        <main>
           <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Artículos Destacados</h2>
           <div className="flex justify-center">
              {renderMagazineContent()}
           </div>
        </main>

        <footer className="text-center mt-12 py-4 border-t border-gray-400">
          <p className="text-black text-sm">El Nexo Digital &copy; {new Date().getFullYear()}. Potenciado por Gemini.</p>
        </footer>
      </div>

      <PodcastModal 
        isOpen={isPodcastModalOpen}
        onClose={closePodcast}
        podcast={dailyPodcast}
      />
    </>
  );
};

export default App;
