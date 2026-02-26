import React, { useState, useEffect } from 'react';
import ListenerCounter from './ListenerCounter.tsx';
import { Library as LibraryIcon, BookOpen, Home } from 'lucide-react';

interface HeaderProps {
  currentView: 'magazine' | 'library' | 'interviews' | 'ateneo';
  onNavigate: (view: 'magazine' | 'library' | 'interviews' | 'ateneo') => void;
  onOpenPodcast?: () => void;
  hasPodcast?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenPodcast,
  hasPodcast
}) => {

  const NavItem = ({ view, label, icon: Icon, onClick, active }: { view?: any, label: string, icon: any, onClick?: () => void, active?: boolean }) => (
    <div className="flex flex-col items-center gap-2 px-6 group">
      <button
        onClick={onClick || (() => onNavigate(view))}
        title={label}
        className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-700 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border ${active || currentView === view
          ? 'bg-[#800020] text-white border-[#600010] shadow-md'
          : 'bg-white text-zen-charcoal/60 border-black/5 hover:text-[#800020] hover:border-[#800020]/20 hover:shadow-lg'
          }`}
      >
        <Icon size={18} strokeWidth={1.5} />
      </button>
      <span className={`text-[8px] font-mono tracking-[0.3em] uppercase transition-opacity duration-700 font-bold ${active || currentView === view ? 'opacity-100 text-[#800020]' : 'opacity-40 group-hover:opacity-100 text-zen-charcoal/80'}`}>{label}</span>
    </div>
  );

  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
      setCurrentDate(now.toLocaleDateString('es-AR', options).replace(',', ' -'));
    };
    updateDate();
    const interval = setInterval(updateDate, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="z-50 w-full pt-16 px-4 flex flex-col items-center">
      <div className="bg-white/90 backdrop-blur-xl px-16 py-12 rounded-3xl relative flex flex-col items-center max-w-5xl w-full border border-black/10 shadow-md overflow-hidden">

        {/* Top-Right Counter */}
        <div className="absolute top-8 right-8 flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-black/10 shadow-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-zen-bamboo animate-pulse" />
          <ListenerCounter />
        </div>

        <div className="text-center space-y-4 mb-8">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-5xl sm:text-7xl font-signature text-zen-charcoal/95">
              El Nexo Digital
            </h1>
            <span className="text-[16px] font-serif italic text-zen-charcoal/80 tracking-tight">mucho más que un podcast</span>
            <span className="text-[10px] font-mono text-zen-charcoal/50 tracking-widest uppercase pt-1 font-bold">{currentDate}</span>
          </div>
        </div>

        {/* Moss Green Divider Line */}
        <div className="w-full h-[1px] bg-[#7A907E] opacity-50 mb-10" />

        {/* Minimal Nav Below the line */}
        <nav className="flex items-center gap-2 p-1">
          <NavItem view="magazine" label="Explorar" icon={Home} />
          {hasPodcast && onOpenPodcast && (
            <NavItem label="Podcast" icon={() => <span className="text-lg">🎙️</span>} onClick={onOpenPodcast} />
          )}
          <NavItem view="ateneo" label="Ateneo" icon={BookOpen} />
          <NavItem view="library" label="Archivos" icon={LibraryIcon} />
        </nav>
      </div>
    </header>
  );
};

export default Header;