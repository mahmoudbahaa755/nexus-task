import { Search, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface SearchBarProps {
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search for movies...",
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const isInternalUpdate = useRef(false);

  // Sync with URL changes (only external changes)
  useEffect(() => {
    if (!isInternalUpdate.current) {
      const urlQuery = searchParams.get("q") || "";
      setSearchQuery(urlQuery);
    }
    isInternalUpdate.current = false;
  }, [searchParams]);

  // Debounced search params update
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const trimmedQuery = searchQuery.trim();
      const currentQuery = searchParams.get("q") || "";

      if (trimmedQuery !== currentQuery) {
        isInternalUpdate.current = true;
        if (trimmedQuery) {
          setSearchParams({ q: trimmedQuery });
        } else {
          setSearchParams({});
        }
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchParams, setSearchParams]);

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-lg"
        />
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
