import React from 'react';

export interface SocialItem {
  name: string;
  handle?: string;
  url: string;
  iconName: string;
  color: string;
  badge?: string;
}

export const SOCIAL_NETWORKS: SocialItem[] = [
  {
    name: 'YouTube',
    handle: '@leocastrillo',
    url: 'https://www.youtube.com/@leocastrillo',
    iconName: 'youtube',
    color: 'hover:text-red-500 hover:border-red-500/40 hover:bg-red-950/30',
    badge: 'Videos & Radio'
  },
  {
    name: 'WhatsApp',
    handle: 'Canal Oficial',
    url: 'https://whatsapp.com/channel/0029VbD2VcSJpe8oSr2aQE2Y',
    iconName: 'whatsapp',
    color: 'hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-emerald-950/30',
    badge: 'Comunidad'
  },
  {
    name: 'Instagram',
    handle: '@elnexodigitalperiodico',
    url: 'https://www.instagram.com/elnexodigitalperiodico/',
    iconName: 'instagram',
    color: 'hover:text-pink-400 hover:border-pink-500/40 hover:bg-pink-950/30'
  },
  {
    name: 'TikTok',
    handle: '@leocastrillo87',
    url: 'https://www.tiktok.com/@leocastrillo87',
    iconName: 'tiktok',
    color: 'hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-950/30'
  },
  {
    name: 'Facebook',
    handle: 'El Nexo Digital',
    url: 'https://www.facebook.com/profile.php?id=61559274585030',
    iconName: 'facebook',
    color: 'hover:text-blue-400 hover:border-blue-500/40 hover:bg-blue-950/30'
  },
  {
    name: 'Threads',
    handle: '@elnexodigitalperiodico',
    url: 'https://www.threads.net/@elnexodigitalperiodico',
    iconName: 'threads',
    color: 'hover:text-stone-200 hover:border-white/40 hover:bg-stone-800'
  },
  {
    name: 'X (Twitter)',
    handle: '@leocastrillo2',
    url: 'https://x.com/leocastrillo2',
    iconName: 'x',
    color: 'hover:text-stone-100 hover:border-white/40 hover:bg-stone-800'
  }
];

export const SocialIcon = ({ name }: { name: string }) => {
  switch (name) {
    case 'youtube':
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      );
    case 'whatsapp':
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.586 1.838.882 2.791.882h.001c3.182 0 5.768-2.587 5.769-5.766.001-3.182-2.585-5.768-5.77-5.768zm0-2.172c4.418 0 8 3.582 8 8 0 4.419-3.582 8.001-8 8.001-.989 0-1.936-.183-2.812-.516l-4.219 1.106 1.129-4.127c-.407-.946-.628-1.983-.628-3.064 0-4.418 3.582-8 8-8zm-2.031 6.5c-.276 0-.5.224-.5.5v1c0 .276.224.5.5.5h1c.276 0 .5-.224.5-.5v-1c0-.276-.224-.5-.5-.5h-1z"/>
        </svg>
      );
    case 'instagram':
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      );
    case 'tiktok':
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.3 6.3 0 0 0 1.96-4.48v-6.94a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.96-.16z"/>
        </svg>
      );
    case 'facebook':
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      );
    case 'threads':
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12.186 24C5.462 24 0 18.538 0 11.814 0 5.09 5.462 0 12.186 0c6.724 0 12.186 5.09 12.186 11.814 0 2.22-.58 4.29-1.6 6.08l-2.02-1.35c.78-1.39 1.23-2.99 1.23-4.73 0-5.38-4.36-9.74-9.74-9.74-5.38 0-9.74 4.36-9.74 9.74 0 5.38 4.36 9.74 9.74 9.74 2.37 0 4.54-.85 6.23-2.26l1.6 1.74C17.72 22.84 15.08 24 12.186 24z"/>
        </svg>
      );
    case 'x':
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      );
    default:
      return null;
  }
};

const SocialLinks: React.FC = () => {
  return (
    <section className="bg-stone-900/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-white/10 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
            Comunidad Digital
          </span>
          <h3 className="text-base sm:text-lg font-serif font-bold text-stone-100">
            Conéctate con El Nexo Digital
          </h3>
        </div>
        <p className="text-xs text-stone-400">
          Únete a nuestras redes para debates, primicias y emisiones en vivo.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3">
        {SOCIAL_NETWORKS.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-3 rounded-xl bg-stone-950/80 border border-white/5 flex flex-col items-center justify-center gap-2 text-stone-300 transition-all shadow-md hover:scale-105 active:scale-95 group ${social.color}`}
            title={`Seguir en ${social.name}`}
          >
            <div className="transition-transform group-hover:scale-110">
              <SocialIcon name={social.iconName} />
            </div>
            <span className="text-[11px] font-mono font-medium text-center truncate w-full">
              {social.name}
            </span>
            {social.handle && (
              <span className="text-[9px] font-mono text-stone-500 group-hover:text-stone-300 truncate w-full text-center transition-colors">
                {social.handle}
              </span>
            )}
            {social.badge && (
              <span className="text-[8px] font-mono uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {social.badge}
              </span>
            )}
          </a>
        ))}
      </div>
    </section>
  );
};

export default SocialLinks;
