import React from "react";
import ErrorMessage from "../../components/ErrorMessage";
import FilterSidebar from "../../components/filters/FilterSidebar";
import HomePagination from "../../components/home-page/homePagination";
import LoadingSpinner from "../../components/LoadingSpinner";
import MovieList from "../../components/MovieList";
import SearchBar from "../../components/SearchBar";
import HomeHeader from "./home-header";
import MovieSearchHint from "./MovieSearchHint";
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
    handleClearFilters,
    handleFilterChange,
    handleMovieClick,
    searchQuery,
    filters,
    totalPages,
    movies,
    error,
    loading,
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
            <HomeHeader />
            <SearchBar />
          </div>
          <div>
            {loading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            {!loading && !error && movies.length > 0 && (
              <>
                <MovieList movies={movies} onMovieClick={handleMovieClick} />
                {totalPages > 1 && <HomePagination totalPages={totalPages} />}
              </>
            )}

            {!searchQuery && !loading && movies.length === 0 && (
              <MovieSearchHint />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
