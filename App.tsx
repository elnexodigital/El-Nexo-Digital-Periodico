
import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { NewsSection, GroundingSource, VideoPodcast, HeaderControls } from './types';
import { fetchNews } from './services/geminiService';
import { VIDEO_PODCASTS } from './data/podcasts';
import Header from './components/Header';
import ArticleCard from './components/ArticleCard';
import LoadingSpinner from './components/LoadingSpinner';
import Advertisement from './components/Advertisement';
import FloatingPodcastButton from './components/FloatingPodcastButton';
import PodcastModal from './components/PodcastModal';


const topics = [
  'Noticias destacadas de Uruguay',
  'Deportes en Uruguay',
  'Salud y vida sana',
  'Cultura y entretenimiento',
  'Recetas económicas y caseras',
  'Juan Lacaze hoy'
];

const adUrls = [
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756344401/spot_10_segundos_completo_gtdtqu.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756344390/spot10_segundos_completo_zsk1g7.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756344292/spot_10_segundos_completo_bkagma.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756344282/spot10segundos_completo_rku0iy.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756344274/spot_10_segundos_completo_fzdqlg.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756344264/spot_10_segundos_completo_kmryb2.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756344252/spot_10_segundos_yirf7x.mp4'
];

const App: React.FC = () => {
  const [sections, setSections] = useState<NewsSection[]>([]);
  const [sources, setSources] = useState<GroundingSource[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dailyPodcast, setDailyPodcast] = useState<VideoPodcast | null>(null);
  const [isPodcastModalOpen, setIsPodcastModalOpen] = useState(false);
  
  const headerRef = useRef<HeaderControls>(null);
  const wasRadioPlaying = useRef(false);

  const fetchAllNews = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { sections: fetchedSections, sources: fetchedSources } = await fetchNews(topics);
      setSections(fetchedSections);
      setSources(fetchedSources);
    } catch (err) {
       const errorMessage = err instanceof Error ? err.message : 'Ocurrió un error desconocido.';
      setError(`No se pudieron obtener las noticias: ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllNews();
    
    if (VIDEO_PODCASTS.length > 0) {
      const randomIndex = Math.floor(Math.random() * VIDEO_PODCASTS.length);
      setDailyPodcast(VIDEO_PODCASTS[randomIndex]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let timeoutId: number;

    const scheduleNextUpdate = () => {
      const now = new Date();
      const updateHours = [7, 11, 18];
      
      let nextUpdate = new Date();
      nextUpdate.setMinutes(0, 0, 0);

      let nextHour = updateHours.find(h => h > now.getHours());

      if (nextHour) {
        nextUpdate.setHours(nextHour);
      } else {
        nextUpdate.setDate(now.getDate() + 1);
        nextUpdate.setHours(updateHours[0]);
      }

      const delay = nextUpdate.getTime() - now.getTime();
      
      console.log(`Próxima actualización de noticias programada para: ${nextUpdate.toLocaleTimeString()}`);

      timeoutId = window.setTimeout(() => {
        fetchAllNews();
        scheduleNextUpdate();
      }, delay);
    };

    scheduleNextUpdate();

    return () => clearTimeout(timeoutId);
  }, [fetchAllNews]);
  
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


  let adIndex = 0;

  return (
    <>
      <div className="container mx-auto p-4 md:p-8 max-w-7xl font-typewriter">
        <Header ref={headerRef} />
        
        <main className="mt-8">
          {isLoading && <LoadingSpinner />}
          
          {error && (
            <div className="text-center py-10 bg-red-50/50 border border-red-200">
              <p className="text-red-700 font-semibold">{error}</p>
            </div>
          )}

          {!isLoading && !error && sections.length === 0 && (
              <div className="text-center py-10 bg-gray-50/50 border border-gray-300">
                <p className="text-gray-800 font-semibold">No se encontraron noticias.</p>
              </div>
          )}
          
          {!isLoading && sections.length > 0 && (
            <>
              {sections.map((section) => {
                if (!section || !section.articles) return null;

                const contentWithAds: React.ReactNode[] = [];
                section.articles.forEach((article, articleIndex) => {
                  contentWithAds.push(<ArticleCard key={`article-${section.topic}-${articleIndex}`} article={article} />);
                  if ((articleIndex + 1) % 2 === 0) {
                    contentWithAds.push(
                      <Advertisement 
                        key={`ad-${section.topic}-${articleIndex}`} 
                        src={adUrls[(adIndex++) % adUrls.length]} 
                      />
                    );
                  }
                });

                return (
                  <React.Fragment key={section.topic}>
                    <h2 className="text-3xl font-bold text-black border-b-2 border-black pb-2 mb-6 capitalize mt-10 first:mt-0">
                      {section.topic}
                    </h2>
                    {section.articles.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                        {contentWithAds}
                      </div>
                    ) : (
                       <p className="text-gray-600">No hay noticias recientes para esta sección.</p>
                    )}
                  </React.Fragment>
                );
              })}

              <div className="mt-12 pt-6 border-t border-gray-400">
                <h3 className="text-2xl font-bold text-black border-b border-black pb-2 mb-4">
                  Fuentes de Información
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  {sources.filter(source => source && source.web).map((source, index) => (
                    <li key={index}>
                      <a 
                        href={source.web.uri} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-stone-800 hover:underline hover:text-black"
                      >
                        {source.web.title || source.web.uri}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </main>

        <footer className="text-center mt-12 py-4 border-t border-gray-400">
          <p className="text-gray-600 text-sm">El Nexo Digital &copy; {new Date().getFullYear()}. Potenciado por Gemini.</p>
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