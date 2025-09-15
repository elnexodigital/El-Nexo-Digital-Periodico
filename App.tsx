
import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { NewsSection, GroundingSource, VideoPodcast, HeaderControls, Article } from './types';
import { fetchNews, searchNews } from './services/geminiService';
import { VIDEO_PODCASTS } from './data/podcasts';
import Header from './components/Header';
import ArticleCard from './components/ArticleCard';
import LoadingSpinner from './components/LoadingSpinner';
import Advertisement from './components/Advertisement';
import FloatingPodcastButton from './components/FloatingPodcastButton';
import PodcastModal from './components/PodcastModal';
import SearchBar from './components/SearchBar';


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
  
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  
  const headerRef = useRef<HeaderControls>(null);
  const wasRadioPlaying = useRef(false);

  const fetchAllNews = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setIsSearchActive(false);
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
  
  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    setIsLoading(true);
    setError(null);
    setSearchQuery(query);
    setIsSearchActive(true);

    try {
      const { articles, sources: searchSources } = await searchNews(query);
      setSearchResults(articles);
      setSources(searchSources);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ocurrió un error desconocido.';
      setError(`No se pudieron encontrar noticias para "${query}": ${errorMessage}`);
      setSearchResults([]);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setIsSearchActive(false);
    setSearchQuery('');
    setSearchResults([]);
    fetchAllNews();
  };

  let adIndex = 0;
  
  const renderArticlesWithAds = (articles: Article[], topicPrefix: string) => {
    const content: React.ReactNode[] = [];
    articles.forEach((article, articleIndex) => {
      content.push(<ArticleCard key={`article-${topicPrefix}-${articleIndex}`} article={article} />);
      if ((articleIndex + 1) % 2 === 0) {
        content.push(
          <Advertisement 
            key={`ad-${topicPrefix}-${articleIndex}`} 
            src={adUrls[(adIndex++) % adUrls.length]} 
          />
        );
      }
    });
    return content;
  };

  return (
    <>
      <div className="container mx-auto p-4 md:p-8 max-w-7xl font-typewriter">
        <Header ref={headerRef} isPodcastModalOpen={isPodcastModalOpen} />
        <SearchBar onSearch={handleSearch} />
        
        <main className="mt-8">
          {isLoading && <LoadingSpinner />}
          
          {error && (
            <div className="text-center py-10 bg-red-50/50 border border-red-200 rounded-lg">
              <p className="text-red-700 font-semibold">{error}</p>
            </div>
          )}

          {!isLoading && !error && (
            <>
              {isSearchActive ? (
                // SEARCH RESULTS VIEW
                <>
                  <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold border-b-2 border-black pb-2 mb-6 capitalize">
                      Resultados para: "{searchQuery}"
                    </h2>
                    <button 
                      onClick={clearSearch}
                      className="mb-6 bg-stone-800 text-white hover:bg-black transition-colors py-2 px-4 rounded"
                    >
                      Volver al inicio
                    </button>
                  </div>
                  {searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                      {renderArticlesWithAds(searchResults, 'search')}
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-gray-50/50 border border-gray-300 rounded-lg">
                      <p className="text-black font-semibold">No se encontraron noticias para tu búsqueda.</p>
                    </div>
                  )}
                </>
              ) : (
                // DEFAULT SECTIONS VIEW
                <>
                  {sections.map((section) => {
                    if (!section || !section.articles) return null;
                    return (
                      <React.Fragment key={section.topic}>
                        <h2 className="text-3xl font-bold border-b-2 border-black pb-2 mb-6 capitalize mt-10 first:mt-0">
                          {section.topic}
                        </h2>
                        {section.articles.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                            {renderArticlesWithAds(section.articles, section.topic)}
                          </div>
                        ) : (
                           <p className="text-black">No hay noticias recientes para esta sección.</p>
                        )}
                      </React.Fragment>
                    );
                  })}
                </>
              )}
              
              {!isLoading && sources.length > 0 && (
                <div className="mt-12 pt-6 border-t border-gray-400">
                  <h3 className="text-2xl font-bold border-b border-black pb-2 mb-4">
                    Fuentes de Información
                  </h3>
                  <ul className="list-disc list-inside space-y-2">
                    {sources.filter(source => source && source.web).map((source, index) => (
                      <li key={index}>
                        <a 
                          href={source.web.uri} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-black hover:underline"
                        >
                          {source.web.title || source.web.uri}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
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