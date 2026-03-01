import React from 'react';
import { motion } from 'motion/react';
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
    <div className="w-full h-full bg-zen-light p-8 md:p-16 flex flex-col overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 border-b-4 border-zen-charcoal pb-6"
      >
        <h2 className="text-6xl md:text-8xl font-serif font-black tracking-tighter text-zen-charcoal">
          Índice
        </h2>
        <p className="font-display text-xs uppercase tracking-[0.4em] mt-4 opacity-50">Contenido de la Edición Actual</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        {articles.map((article, index) => {
          // Mobile: Cover=0, Index=1, pages start at 2.
          const mobilePageIndex = article.originalIndex + 2;
          // Desktop: Pairs. Paper 0 is Cover/Index. Paper 1 is Page 1/2.
          const desktopPaperIndex = Math.floor((article.originalIndex + 2) / 2);

          return (
            <motion.div 
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <button
                onClick={() => onNavigate(mobilePageIndex, desktopPaperIndex)}
                className="text-left w-full group focus:outline-none"
              >
                <div className="flex justify-between items-baseline border-b border-zen-charcoal/10 group-hover:border-[#800020] transition-colors pb-2">
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-zen-charcoal group-hover:text-[#800020] transition-colors leading-tight">
                    {article.headline}
                  </h3>
                  <span className="font-display text-sm font-bold opacity-30 group-hover:opacity-100 transition-opacity">
                    {article.pageNumber}
                  </span>
                </div>
                {article.subtitle && (
                  <p className="text-sm text-zen-charcoal/60 italic font-serif mt-2 line-clamp-2">
                    {article.subtitle}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 bg-zen-charcoal/5 rounded">
                    {article.category}
                  </span>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-auto pt-12 text-center opacity-20">
        <span className="font-script text-3xl">El Nexo Digital</span>
      </div>
    </div>
  );
};

export default IndexPage;