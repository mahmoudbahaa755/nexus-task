import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FilterSidebar from '../components/FilterSidebar';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useDebounce } from '../hooks/useDebounce';
import { useMovieSearch } from '../hooks/useMovieSearch';

interface HomePageProps {
  isFiltersOpen: boolean;
  onToggleFilters: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ isFiltersOpen, onToggleFilters }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  
  const { movies, loading, error, search, filters, updateFilters } = useMovieSearch();

  // Update URL when search query changes
  useEffect(() => {
    if (debouncedSearchQuery) {
      setSearchParams({ q: debouncedSearchQuery });
    } else {
      setSearchParams({});
    }
  }, [debouncedSearchQuery, setSearchParams]);

  useEffect(() => {
    if (debouncedSearchQuery) {
      search(debouncedSearchQuery, filters);
    }
  }, [debouncedSearchQuery, search, filters]);

  const handleMovieClick = (imdbID: string) => {
    navigate(`/movie/${imdbID}`);
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    updateFilters(newFilters);
    if (debouncedSearchQuery) {
      search(debouncedSearchQuery, newFilters);
    }
  };

  const handleClearFilters = () => {
    const clearedFilters = { type: '', year: '', genre: '' };
    updateFilters(clearedFilters);
    if (debouncedSearchQuery) {
      search(debouncedSearchQuery, clearedFilters);
    }
  };

  return (
    <div className="flex">
      <FilterSidebar
        isOpen={isFiltersOpen}
        onClose={() => onToggleFilters()}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />
      
      <main className="flex-1 lg:ml-0">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Discover Amazing Movies
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                Search through thousands of titles and explore detailed information about your favorite films.
              </p>
            </div>

            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search for movies, series, or episodes..."
            />
          </div>

          <div>
            {loading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            {!loading && !error && (
              <MovieList
                movies={movies}
                onMovieClick={handleMovieClick}
              />
            )}
            {!searchQuery && !loading && (
              <div className="text-center py-16">
                <div className="text-gray-600 dark:text-gray-400 text-xl mb-4">Start searching for movies</div>
                <p className="text-gray-500 dark:text-gray-500">Type in the search box above to find your favorite movies</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;