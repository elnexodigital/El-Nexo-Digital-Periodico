
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="mt-6 mb-4">
      <form onSubmit={handleSubmit} className="flex gap-2" role="search">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar noticias..."
          className="w-full px-4 py-2 border-2 border-stone-400 dark:border-stone-600 focus:border-black dark:focus:border-white focus:ring-0 transition-colors bg-white/50 dark:bg-stone-800"
          aria-label="Campo de búsqueda de noticias"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-stone-800 text-white hover:bg-black dark:bg-stone-200 dark:text-black dark:hover:bg-white transition-colors flex items-center"
          aria-label="Buscar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;