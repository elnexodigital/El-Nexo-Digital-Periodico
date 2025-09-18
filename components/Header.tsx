import React, { useState, useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import type { MusicTrack, HeaderControls, NewsBroadcast, PodcastMP3 } from '../types';
import { GREETING_AUDIOS } from '../greetings';
import { NEWS_BROADCASTS } from '../data/broadcasts';
import { SEPARATOR_AUDIOS } from '../data/separators';
import { MUSIC_TRACKS } from '../data/music';
import { PODCASTS_MP3 } from '../data/podcastsMP3';

const VIDEO_URLS: string[] = [
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1755907719/animaci%C3%B3n_APP_pvxjop.mp4',
  'https://res.cloudinary.com/demo/video/upload/elephants.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345297/14_okcuk0.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345296/13_debkpb.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345293/11_gud5kv.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345294/12_ringmi.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345294/9_ulzdcy.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345293/10_io3g8k.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345059/8_vng8sz.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345005/4_hczosi.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345005/6_jdroij.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345004/5_ivvibp.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345004/7_aw3cxt.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345003/3_thswfg.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345002/2_gthspn.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345001/1_ndgmbp.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1757874034/tu_compa%C3%B1%C3%ADa_247_srq9ah.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1757877430/tu_compa%C3%B1%C3%ADa3_aoreex.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1757877463/tu_compa%C3%B1%C3%ADa_4_jk7aeq.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1757877465/tu_compa%C3%B1%C3%ADa_5_x13zf0.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1757877467/tu_compa%C3%B1%C3%ADa_7_okxvw2.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1757877467/tu_compa%C3%B1%C3%ADa_6_kkiqlc.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1757877700/tu_compa%C3%B1%C3%ADa2_nalqjp.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1757877469/tu_compa%C3%B1%C3%ADa_8_bnqoa2.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1757877470/tu_compa%C3%B1%C3%ADa_9_iomwyb.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1757877473/tu_compa%C3%B1%C3%ADa_10_t5gpkm.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1757877508/tu_compa%C3%B1%C3%ADa_11_el38c4.mp4',
];

interface HeaderProps {
  isPodcastModalOpen: boolean;
}

const Header = forwardRef<HeaderControls, HeaderProps>(({ isPodcastModalOpen }, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>('');
  const [hasGreetingPlayed, setHasGreetingPlayed] = useState(false);
  const [playedBroadcasts, setPlayedBroadcasts] = useState<Record<number, boolean>>({});
  const [activeBroadcast, setActiveBroadcast] = useState<NewsBroadcast | null>(null);
  const [activePodcastMP3, setActivePodcastMP3] = useState<PodcastMP3 | null>(null);
  const [tracksSinceLastSeparator, setTracksSinceLastSeparator] = useState(0);
  const [separatorTrackCountTarget, setSeparatorTrackCountTarget] = useState(() => Math.floor(Math.random() * 5) + 2); // Random 2 to 6
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const greetingAudioRef = useRef<HTMLAudioElement | null>(null);
  const jingleAudioRef = useRef<HTMLAudioElement>(null);
  const newsAudioRef = useRef<HTMLAudioElement | null>(null);
  const separatorAudioRef = useRef<HTMLAudioElement | null>(null);
  const podcastMP3AudioRef = useRef<HTMLAudioElement | null>(null);
  const playAfterTrackChange = useRef(false);
  const musicVolumeRef = useRef(1.0);

  const currentDate = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const selectAndSetNextTrack = useCallback(() => {
    setCurrentTrack(prevTrack => {
      const availableTracks = MUSIC_TRACKS.filter(t => t.id !== prevTrack?.id);
      const randomIndex = Math.floor(Math.random() * availableTracks.length);
      return availableTracks[randomIndex];
    });
  }, []);

  const selectNextVideo = useCallback(() => {
    setCurrentVideoUrl(prevUrl => {
      const availableVideos = VIDEO_URLS.filter(v => v !== prevUrl);
      if (availableVideos.length === 0) return VIDEO_URLS[0];
      const randomIndex = Math.floor(Math.random() * availableVideos.length);
      return availableVideos[randomIndex];
    });
  }, []);

  useEffect(() => {
    selectAndSetNextTrack();
    selectNextVideo();
  }, [selectAndSetNextTrack, selectNextVideo]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && playAfterTrackChange.current) {
      playAfterTrackChange.current = false;
      audio.play().catch(e => console.error("Autoplay failed:", e));
    }
  }, [currentTrack]);

  const playBroadcast = useCallback((broadcast: NewsBroadcast, hour: number) => {
    const musicAudio = audioRef.current;
    const wasMusicPlaying = isPlaying;
    
    // Stop any active MP3 podcast
    if (podcastMP3AudioRef.current) {
      podcastMP3AudioRef.current.pause();
      podcastMP3AudioRef.current = null;
      setActivePodcastMP3(null);
      if (musicAudio) musicAudio.volume = musicVolumeRef.current; // Restore volume
    }

    setActiveBroadcast(broadcast);

    if (wasMusicPlaying) {
      if (musicAudio) musicAudio.pause();
      if (greetingAudioRef.current && !greetingAudioRef.current.paused) {
        greetingAudioRef.current.pause();
      }
    }
    
    const resumeMusic = () => {
      setActiveBroadcast(null);
      if (wasMusicPlaying && musicAudio) {
        musicAudio.play().catch(e => console.error("Failed to resume music", e));
      }
      if (newsAudioRef.current) {
          newsAudioRef.current.removeEventListener('ended', resumeMusic);
          newsAudioRef.current.removeEventListener('error', resumeMusic);
          newsAudioRef.current = null;
      }
    };

    newsAudioRef.current = new Audio(broadcast.url);
    newsAudioRef.current.addEventListener('ended', resumeMusic);
    newsAudioRef.current.addEventListener('error', (e) => {
        console.error("Broadcast play failed", e);
        resumeMusic();
    });

    newsAudioRef.current.play().catch(e => {
        console.error("Broadcast play promise rejected", e);
        resumeMusic();
    });
    
    setPlayedBroadcasts(prev => ({ ...prev, [hour]: true }));
  }, [isPlaying]);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const hour = now.getHours();
      const minutes = now.getMinutes();
  
      if (hour === 0 && minutes === 0) {
        if (Object.keys(playedBroadcasts).length > 0) {
          setPlayedBroadcasts({});
        }
        return;
      }
  
      const broadcast = NEWS_BROADCASTS[hour];
      if (broadcast && minutes === 0 && !playedBroadcasts[hour]) {
        playBroadcast(broadcast, hour);
      }
    };
  
    const mountTimeout = setTimeout(checkTime, 1000); 
    const intervalId = setInterval(checkTime, 60 * 1000);
  
    return () => {
      clearTimeout(mountTimeout);
      clearInterval(intervalId);
    };
  }, [playedBroadcasts, playBroadcast]);

  useEffect(() => {
    const playRandomPodcast = () => {
        if (isPlaying && !isPodcastModalOpen && !activeBroadcast && !activePodcastMP3) {
            const podcastToPlay = PODCASTS_MP3[Math.floor(Math.random() * PODCASTS_MP3.length)];
            const musicAudio = audioRef.current;
            if (!musicAudio) return;

            musicVolumeRef.current = musicAudio.volume;
            musicAudio.volume = 0.2; // Lower music volume

            setActivePodcastMP3(podcastToPlay);
            const podcastPlayer = new Audio(podcastToPlay.videoId);
            podcastMP3AudioRef.current = podcastPlayer;

            const handlePodcastEnd = () => {
                if (audioRef.current) {
                    audioRef.current.volume = musicVolumeRef.current;
                }
                setActivePodcastMP3(null);
                if (podcastMP3AudioRef.current) {
                    podcastMP3AudioRef.current.removeEventListener('ended', handlePodcastEnd);
                    podcastMP3AudioRef.current.removeEventListener('error', handlePodcastEnd);
                    podcastMP3AudioRef.current = null;
                }
            };

            podcastPlayer.addEventListener('ended', handlePodcastEnd);
            podcastPlayer.addEventListener('error', (e) => {
                console.error("Podcast MP3 play failed", e);
                handlePodcastEnd();
            });
            
            podcastPlayer.play().catch(e => {
                console.error("Podcast MP3 play promise rejected", e);
                handlePodcastEnd();
            });
        }
    };

    const podcastInterval = setInterval(playRandomPodcast, 40 * 60 * 1000);

    return () => {
        clearInterval(podcastInterval);
        if (podcastMP3AudioRef.current) {
            podcastMP3AudioRef.current.pause();
            podcastMP3AudioRef.current = null;
        }
    };
  }, [isPlaying, isPodcastModalOpen, activeBroadcast, activePodcastMP3]);

  const getGreetingTimeOfDay = (): 'morning' | 'afternoon' | 'night' | null => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    
    if ((hours === 7 && minutes >= 30) || (hours > 7 && hours < 12) || (hours === 12 && minutes === 0)) {
      return 'morning';
    }
    if ((hours === 12 && minutes >= 1) || (hours > 12 && hours < 18) || (hours === 18 && minutes === 0)) {
      return 'afternoon';
    }
    if ((hours === 18 && minutes >= 1) || (hours > 18 && hours < 22) || (hours === 22 && minutes === 0)) {
      return 'night';
    }
    return null;
  };

  const selectRandomGreeting = (): string | null => {
    const timeOfDay = getGreetingTimeOfDay();
    if (!timeOfDay) return null;
    const greetings = GREETING_AUDIOS[timeOfDay];
    if (!greetings || greetings.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * greetings.length);
    return greetings[randomIndex];
  };

  const togglePlayPause = () => {
    const musicAudio = audioRef.current;
    if (!musicAudio) return;

    // --- PAUSE LOGIC ---
    if (isPlaying) {
      if (greetingAudioRef.current && !greetingAudioRef.current.paused) greetingAudioRef.current.pause();
      if (separatorAudioRef.current && !separatorAudioRef.current.paused) separatorAudioRef.current.pause();
      if (podcastMP3AudioRef.current && !podcastMP3AudioRef.current.paused) podcastMP3AudioRef.current.pause();
      if (newsAudioRef.current && !newsAudioRef.current.paused) newsAudioRef.current.pause();
      musicAudio.pause();
      setIsPlaying(false);
      return;
    }

    // --- PLAY LOGIC ---
    setIsPlaying(true);
    
    // Resume whatever was paused
    if (newsAudioRef.current?.paused) {
      newsAudioRef.current.play().catch(e => console.error("Error resuming news", e));
      return;
    }
    if (podcastMP3AudioRef.current?.paused) {
      podcastMP3AudioRef.current.play().catch(e => console.error("Error resuming podcast mp3", e));
      musicAudio.play().catch(e => console.error("Error resuming music bed", e));
      return;
    }
    if (separatorAudioRef.current?.paused) {
      separatorAudioRef.current.play().catch(e => console.error("Error resuming separator", e));
      return;
    }
    if (greetingAudioRef.current?.paused) {
      greetingAudioRef.current.play().catch(e => console.error("Error resuming greeting", e));
      return;
    }
    
    // Standard play flow
    const playMusic = () => {
      if (musicAudio) {
        musicAudio.play().catch(error => {
          console.error("Error attempting to play music:", error);
          setIsPlaying(false);
        });
      }
    };
    
    if (!hasGreetingPlayed) {
      const greetingUrl = selectRandomGreeting();
      setHasGreetingPlayed(true);

      if (greetingUrl) {
        greetingAudioRef.current = new Audio(greetingUrl);
        greetingAudioRef.current.onended = () => {
          if (audioRef.current) {
             playMusic();
          }
        };
        greetingAudioRef.current.play().catch(error => {
          console.error("Error playing greeting audio, starting music directly:", error);
          playMusic();
        });
        return;
      }
    }
    
    playMusic();
  };

  useEffect(() => {
    const jingleInterval = setInterval(() => {
        const musicAudio = audioRef.current;
        const jingleAudio = jingleAudioRef.current;

        if (isPlaying && !isPodcastModalOpen && jingleAudio && musicAudio && jingleAudio.paused) {
            musicVolumeRef.current = musicAudio.volume;
            musicAudio.volume = 0.2;

            jingleAudio.play().catch(e => {
                console.error("Jingle play failed", e);
                musicAudio.volume = musicVolumeRef.current;
            });

            const handleJingleEnd = () => {
                musicAudio.volume = musicVolumeRef.current;
                jingleAudio.removeEventListener('ended', handleJingleEnd);
            };

            jingleAudio.addEventListener('ended', handleJingleEnd);
        }

    }, 30 * 60 * 1000); // 30 minutes

    return () => {
        clearInterval(jingleInterval);
    };
  }, [isPlaying, isPodcastModalOpen]);

  useImperativeHandle(ref, () => ({
    playRadio: () => {
      if (!isPlaying) {
        togglePlayPause();
      }
    },
    pauseRadio: () => {
      if (isPlaying) {
        togglePlayPause();
      }
    },
    getIsPlayingState: () => isPlaying,
  }));
  
  const handleTrackEnded = () => {
    const newCount = tracksSinceLastSeparator + 1;
  
    if (newCount >= separatorTrackCountTarget) {
      const separatorUrl = SEPARATOR_AUDIOS[Math.floor(Math.random() * SEPARATOR_AUDIOS.length)];
      const separatorPlayer = new Audio(separatorUrl);
      separatorAudioRef.current = separatorPlayer;
  
      const playNextMusicTrack = () => {
        playAfterTrackChange.current = true;
        selectAndSetNextTrack();
        if (separatorAudioRef.current) {
          separatorAudioRef.current.removeEventListener('ended', playNextMusicTrack);
          separatorAudioRef.current.removeEventListener('error', playNextMusicTrack);
          separatorAudioRef.current = null;
        }
      };
  
      separatorPlayer.addEventListener('ended', playNextMusicTrack);
      separatorPlayer.addEventListener('error', (e) => {
        console.error("Separator play failed, playing next track.", e);
        playNextMusicTrack();
      });
  
      separatorPlayer.play().catch(e => {
        console.error("Separator play promise rejected", e);
        playNextMusicTrack();
      });
  
      setTracksSinceLastSeparator(0);
      setSeparatorTrackCountTarget(Math.floor(Math.random() * 5) + 2); // Random target between 2 and 6
    } else {
      setTracksSinceLastSeparator(newCount);
      playAfterTrackChange.current = true;
      selectAndSetNextTrack();
    }
  };
  
  const bannerSrc = activeBroadcast?.bannerUrl || currentVideoUrl;

  const currentTitle = activeBroadcast?.description || activePodcastMP3?.title || currentTrack?.description || 'Cargando...';
  const currentArtist = activePodcastMP3?.artist || 'El Nexo Digital Radio';

  return (
    <header className="text-center relative">
      <div className="py-6 border-b-4 border-double border-stone-800">
        <img
          src="https://res.cloudinary.com/ddmj6zevz/image/upload/v1756714882/logo_el_nexo_digital_assa82.png"
          alt="Logo de El Nexo Digital"
          className="mx-auto h-20 mb-4"
        />
        <h1 className="text-5xl md:text-7xl tracking-tight newspaper-title">
          El Nexo Digital
        </h1>
        <p className="text-black mt-4 text-sm md:text-base">
          Periódico Digital Independiente // Resumen de <span className="font-bold">Noticias</span>.
        </p>
        <p className="text-black mt-1 text-sm md:text-base capitalize">{currentDate}</p>
      </div>

      <div className="my-4 overflow-hidden border-b-4 border-double border-stone-800 header-video-banner">
        <video
          key={bannerSrc}
          src={bannerSrc}
          autoPlay
          muted
          loop={!activeBroadcast}
          playsInline
          onEnded={activeBroadcast ? undefined : selectNextVideo}
          className="object-cover z-0"
          aria-hidden="true"
        />
        <div className="z-10 flex justify-start items-center gap-6 bg-black/30 px-6">
          <audio
            ref={audioRef}
            src={currentTrack?.url || ''}
            onEnded={handleTrackEnded}
          />
          <audio
            ref={jingleAudioRef}
            src="https://res.cloudinary.com/ddmj6zevz/video/upload/v1757900327/el_nexo_digital_nicolle_egtjoc.mp3"
            preload="auto"
          />
          <button
            onClick={togglePlayPause}
            className="flex-shrink-0 p-3 rounded-full border-2 border-white text-white hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            aria-label={isPlaying ? "Pausar radio" : "Reproducir radio"}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v4a1 1 0 11-2 0V8z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          <div className="flex-1 text-white text-base text-left min-w-0">
            <p className="font-bold text-lg truncate">{currentArtist}</p>
            <p className="opacity-80 text-xs truncate" title={currentTitle}>
              {currentTitle}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
});

// Fix: Add default export for Header component
export default Header;
