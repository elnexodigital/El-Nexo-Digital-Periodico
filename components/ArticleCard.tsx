
import React from 'react';
import type { Article } from '../types';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className="bg-white/40 rounded-lg overflow-hidden shadow-sm transition-shadow hover:shadow-md h-full flex flex-col border border-stone-200/80">
      {article.imageUrl && (
        <img
          src={article.imageUrl}
          alt={article.headline}
          className="w-full h-48 object-cover"
          width="400"
          height="400"
        />
      )}
      <div className="p-4 md:p-5 flex flex-col flex-grow">
        {article.category && (
          <span className="font-bold uppercase text-xs text-black/60 mb-2">
            {article.category}
          </span>
        )}
        <h3 className="text-xl font-bold leading-tight">
          {article.headline}
        </h3>
        {article.summary && (
          <p className="text-black text-sm leading-relaxed mt-2 flex-grow">
            {article.summary}
          </p>
        )}
      </div>
    </div>
  );
};

export default ArticleCard;
