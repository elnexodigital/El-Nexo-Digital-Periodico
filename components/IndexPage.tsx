import React from 'react';
import type { OddPage } from '../types.ts';

type ArticleForIndex = OddPage & {
  originalIndex: number;
  pageNumber: number;
};

interface IndexPageProps {
  articles: ArticleForIndex[];
  onNavigate: (mobilePage: number, desktopPage: number) => void;
}

const IndexPage: React.FC<IndexPageProps> = ({ articles, onNavigate }) => {
  return (
    <div className="w-full h-full bg-[#fdfaf4] p-6 md:p-10 flex flex-col font-typewriter overflow-y-auto">
      <h2 className="text-4xl md:text-5xl font-bold mb-6 pb-4 border-b-2 border-stone-300" style={{ fontFamily: "'Playfair Display', serif" }}>
        Índice
      </h2>
      <ul className="space-y-4">
        {articles.map((article) => {
          // Mobile: Cover=0, Index=1, pages start at 2.
          const mobilePageIndex = article.originalIndex + 2;
          // Desktop: Pairs. Paper 0 is Cover/Index. Paper 1 is Page 1/2.
          const desktopPaperIndex = Math.floor((article.originalIndex + 2) / 2);

          return (
            <li key={article.id}>
              <button
                onClick={() => onNavigate(mobilePageIndex, desktopPaperIndex)}
                className="text-left w-full hover:bg-stone-200/50 p-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-stone-400"
              >
                <h3 className="text-lg md:text-xl font-bold text-stone-800 leading-tight">{article.headline}</h3>
                {article.subtitle && (
                  <p className="text-sm text-stone-600 italic mt-1">{article.subtitle}</p>
                )}
                <span className="text-xs text-stone-500 font-bold uppercase mt-2 block">
                  Página {article.pageNumber}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default IndexPage;