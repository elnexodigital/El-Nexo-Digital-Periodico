import React from 'react';
import ListenerCounter from './ListenerCounter.tsx';
import { Menu, X, Library as LibraryIcon, Mic, BookOpen, Home } from 'lucide-react';

interface HeaderProps {
  currentView: 'magazine' | 'library' | 'interviews' | 'ateneo';
  onNavigate: (view: 'magazine' | 'library' | 'interviews' | 'ateneo') => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isMobileMenuOpen?: boolean;
  onToggleMobileMenu?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  isDarkMode,
  onToggleDarkMode,
  isMobileMenuOpen,
  onToggleMobileMenu
}) => {

  const NavItem = ({ view, label, icon: Icon }: { view: any, label: string, icon: any }) => (
    <button
      onClick={() => onNavigate(view)}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${currentView === view
        ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20'
        : 'hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300'
        }`}
    >
      <Icon size={18} />
      <span className="font-bold tracking-wide text-sm">{label}</span>
    </button>
  );

  return (
    <header className="sticky top-0 z-50 animate-fade-in-down w-full mb-8">
      <div className="glass-panel border-b border-white/20 dark:border-white/5 shadow-sm backdrop-blur-xl">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">

          {/* Logo area */}
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => onNavigate('magazine')}>
            <img
              src="https://res.cloudinary.com/ddmj6zevz/image/upload/f_auto,q_auto:good/v1756714882/logo_el_nexo_digital_assa82.png"
              alt="Logo"
              className="h-10 w-auto hover:brightness-110 transition-all"
            />
            <div className="hidden md:block">
              <h1 className="text-3xl font-title font-bold leading-none tracking-tight text-gray-800 dark:text-gray-100 newspaper-title">El Nexo Digital</h1>
              <span className="text-[10px] uppercase tracking-[0.3em] opacity-60 font-bold block ml-1">Ateneo Cultural</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 bg-gray-100/50 dark:bg-black/20 p-1.5 rounded-full border border-gray-200/50 dark:border-white/5">
            <NavItem view="magazine" label="Inicio" icon={Home} />
            <NavItem view="interviews" label="Entrevistas" icon={Mic} />
            <NavItem view="ateneo" label="Ateneo" icon={BookOpen} />
            <NavItem view="library" label="Biblioteca" icon={LibraryIcon} />
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <ListenerCounter />

            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              {isDarkMode ? '🌞' : '🌙'}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={onToggleMobileMenu}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;