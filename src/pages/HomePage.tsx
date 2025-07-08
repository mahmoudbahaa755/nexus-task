import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import FilterSidebar from "../components/FilterSidebar";
import HomePagination from "../components/home-page/homePagination";
import LoadingSpinner from "../components/LoadingSpinner";
import MovieList from "../components/MovieList";
import SearchBar from "../components/SearchBar";
import { useDebounce } from "../hooks/useDebounce";
import { useMovieSearch } from "../hooks/useMovieSearch";

interface HomePageProps {
  isFiltersOpen: boolean;
  onToggleFilters: () => void;
}

const HomePage: React.FC<HomePageProps> = ({
  isFiltersOpen,
  onToggleFilters,
}) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1")
  );
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const {
    movies,
    loading,
    error,
    search,
    filters,
    updateFilters,
    totalResults,
  } = useMovieSearch();

  // Calculate total pages (assuming 10 results per page from OMDB API)
  const resultsPerPage = 10;
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  console.log(totalPages, "totalPages", totalResults);
  // Update URL when search query or page changes
  useEffect(() => {
    const params: Record<string, string> = {};
    if (debouncedSearchQuery) params.q = debouncedSearchQuery;
    if (currentPage > 1) params.page = currentPage.toString();
    setSearchParams(params);
  }, [debouncedSearchQuery, currentPage, setSearchParams]);

  useEffect(() => {
    if (debouncedSearchQuery) {
      search(debouncedSearchQuery, filters, currentPage);
    }
  }, [debouncedSearchQuery, search, filters, currentPage]);

  const handleMovieClick = (imdbID: string) => {
    navigate(`/movie/${imdbID}`);
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    updateFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
    if (debouncedSearchQuery) {
      search(debouncedSearchQuery, newFilters, 1);
    }
  };

  const handleClearFilters = () => {
    const clearedFilters = { type: "", year: "", genre: "", page: 1 };
    updateFilters(clearedFilters);
    setCurrentPage(1); // Reset to first page when clearing filters
    if (debouncedSearchQuery) {
      search(debouncedSearchQuery, clearedFilters, 1);
    }
  };

  // Update the movie search to handle pagination
  useEffect(() => {
    if (debouncedSearchQuery) {
      search(debouncedSearchQuery, filters, currentPage);
    }
  }, [debouncedSearchQuery, search, filters, currentPage]);

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
                Search through thousands of titles and explore detailed
                information about your favorite films.
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
            {!loading && !error && movies.length > 0 && (
              <>
                <MovieList movies={movies} onMovieClick={handleMovieClick} />
                {totalPages > 1 && (
                  <HomePagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                )}
              </>
            )}

            {!searchQuery && !loading && movies.length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-600 dark:text-gray-400 text-xl mb-4">
                  Start searching for movies
                </div>
                <p className="text-gray-500 dark:text-gray-500">
                  Type in the search box above to find your favorite movies
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
