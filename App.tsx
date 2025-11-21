
import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import type { VideoPodcast, HeaderControls, StickyNote } from './src/types.ts';
import Header from './src/components/Header.tsx';
import LoadingSpinner from './src/components/LoadingSpinner.tsx';
import Library from './src/components/Library.tsx';

const PodcastModal = lazy(() => import('./src/components/PodcastModal.tsx'));
const ProtectedContentModal = lazy(() => import('./src/components/ProtectedContentModal.tsx'));
const StickyNoteModal = lazy(() => import('./src/components/StickyNoteModal.tsx'));
const AdminNotesModal = lazy(() => import('./src/components/AdminNotesModal.tsx'));
const Magazine = lazy(() => import('./src/components/Magazine.tsx'));
const StickyNotesContainer = lazy(() => import('./src/components/StickyNotesContainer.tsx'));
const AdminAuthModal = lazy(() => import('./src/components/AdminAuthModal.tsx'));

const NOTES_STORAGE_KEY = 'elNexoDigitalAdminNotes';
const THEME_STORAGE_KEY = 'elNexoDigitalTheme';

type View = 'magazine' | 'library';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('magazine');
  const [dailyPodcast, setDailyPodcast] = useState<VideoPodcast | null>(null);
  const [isPodcastModalOpen, setIsPodcastModalOpen] = useState(false);
  const [isProtectedModalOpen, setIsProtectedModalOpen] = useState(false);
  const [isStickyNoteModalOpen, setIsStickyNoteModalOpen] = useState(false);
  const [isAdminNotesModalOpen, setIsAdminNotesModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const savedMode = window.localStorage.getItem(THEME_STORAGE_KEY);
      return savedMode === 'dark';
    } catch {
      return false;
    }
  });

  const [notes, setNotes] = useState<StickyNote[]>(() => {
    try {
      const savedNotes = window.localStorage.getItem(NOTES_STORAGE_KEY);
      if (!savedNotes) return [];
      
      let needsUpdate = false;
      const parsedNotes = JSON.parse(savedNotes);
      const migratedNotes = parsedNotes.map((note: any) => {
        if (note.position && typeof note.rotation !== 'undefined') {
          return note;
        }
        needsUpdate = true;
        return {
          ...note,
          position: { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 },
          rotation: Math.random() * 30 - 15,
        };
      });
      
      if (needsUpdate) {
        window.localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(migratedNotes));
      }
      return migratedNotes;
    } catch (error) {
      console.error('Error reading notes from localStorage', error);
      return [];
    }
  });

  const [isNotesAdmin, setIsNotesAdmin] = useState(false);
  
  const headerRef = useRef<HeaderControls>(null);
  const wasRadioPlaying = useRef(false);
  
  const NOTES_ADMIN_PASSWORD = 'sauce';

  useEffect(() => {
    const body = document.body;
    if (isDarkMode) {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme to localStorage', error);
    }
  }, [isDarkMode]);

  useEffect(() => {
    const loadLocalData = async () => {
      try {
        const { VIDEO_PODCASTS } = await import('./src/data/podcasts.ts');
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

  useEffect(() => {
    try {
      window.localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
    } catch (error) {
      console.error('Error saving notes to localStorage', error);
    }
  }, [notes]);
  
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

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

  const openStickyNoteModal = () => {
    setIsStickyNoteModalOpen(true);
  }

  const closeStickyNoteModal = () => {
    setIsStickyNoteModalOpen(false);
  }
  
  const handleAdminAuthRequest = () => {
    if (isNotesAdmin) {
      setIsAdminNotesModalOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };
  
  const handleAdminLogin = (password: string): boolean => {
    if (password === NOTES_ADMIN_PASSWORD) {
        setIsNotesAdmin(true);
        setIsAuthModalOpen(false);
        setIsAdminNotesModalOpen(true);
        return true;
    }
    return false;
  };

  const handleAddNote = (noteData: { name: string; text: string }) => {
    const noteColors = ['#ffc', '#cfc', '#ccf', '#fcc', '#cff', '#ffb3ba', '#ffffba', '#baffc9'];
    const newNote: StickyNote = {
        id: `note_${Date.now()}`,
        name: noteData.name.trim() || 'Anónimo',
        text: noteData.text,
        color: noteColors[Math.floor(Math.random() * noteColors.length)],
        position: { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 },
        rotation: Math.random() * 30 - 15,
    };
    setNotes(prevNotes => [...prevNotes, newNote]);
    closeStickyNoteModal();
  };

  return (
    <div className="min-h-screen">
      <Header 
        ref={headerRef} 
        isPodcastModalOpen={isPodcastModalOpen}
        onPodcastButtonClick={openPodcastModal}
        showPodcastButton={!!dailyPodcast}
        onProtectedButtonClick={openProtectedModal}
        onStickyNoteButtonClick={openStickyNoteModal}
        onLibraryButtonClick={() => setCurrentView('library')}
        notesCount={notes.length}
        onAdminAuthRequest={handleAdminAuthRequest}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<LoadingSpinner />}>
           {currentView === 'magazine' ? (
              <Magazine />
           ) : (
              <Library onBackToMagazine={() => setCurrentView('magazine')} />
           )}
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

      <Suspense fallback={null}>
        <StickyNoteModal
          isOpen={isStickyNoteModalOpen}
          onClose={closeStickyNoteModal}
          onAddNote={handleAddNote}
        />
      </Suspense>
      
      <Suspense fallback={null}>
        <AdminAuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLogin={handleAdminLogin}
        />
      </Suspense>

      <Suspense fallback={null}>
        <AdminNotesModal
          isOpen={isAdminNotesModalOpen}
          onClose={() => setIsAdminNotesModalOpen(false)}
          notes={notes}
          setNotes={setNotes}
        />
      </Suspense>

      <Suspense fallback={null}>
        <StickyNotesContainer 
          notes={notes}
          isNotesAdmin={isNotesAdmin}
          onAdminAuthRequest={handleAdminAuthRequest}
        />
      </Suspense>
    </div>
  );
};

export default App;
