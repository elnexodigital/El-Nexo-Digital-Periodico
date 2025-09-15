import React from 'react';
import type { Article } from '../types';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2 text-xs">
          <span className="font-bold uppercase text-black">
          {article.category}
          </span>
          <span className="text-gray-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {article.publishedDate}
          </span>
      </div>
      <h3 className="text-xl font-bold text-black leading-tight">
        {article.headline}
      </h3>
      <p className="text-gray-800 text-sm leading-relaxed">
        {article.summary}
      </p>
    </div>
  );
};

export default ArticleCard;
