import React from "react";
import ErrorMessage from "../../components/ErrorMessage";
import FilterSidebar from "../../components/FilterSidebar";
import HomePagination from "../../components/home-page/homePagination";
import LoadingSpinner from "../../components/LoadingSpinner";
import MovieList from "../../components/MovieList";
import SearchBar from "../../components/SearchBar";
import useHomePageLogic from "./useHomePageLogic";

interface HomePageProps {
  isFiltersOpen: boolean;
  onToggleFilters: () => void;
}

const HomePage: React.FC<HomePageProps> = ({
  isFiltersOpen,
  onToggleFilters,
}) => {
  const {
    currentPage,
    handleClearFilters,
    handleFilterChange,
    handleMovieClick,
    searchQuery,
    setCurrentPage,
    filters,
    totalPages,
    movies,
    error,
    loading,
    setSearchQuery,
  } = useHomePageLogic();
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
