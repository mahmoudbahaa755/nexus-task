import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import { useMovieSearch } from "../../hooks/useMovieSearch";

export default function useHomePageLogic() {
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
  // Update URL when search query or page changes
  useEffect(() => {
    const params: Record<string, string> = {};
    if (debouncedSearchQuery) params.q = debouncedSearchQuery;
    if (currentPage > 1) params.page = currentPage.toString();
    // Remove page parameter if there's no search query
    if (!debouncedSearchQuery) {
      delete params.page;
    }
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

  return {
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    handleMovieClick,
    handleFilterChange,
    handleClearFilters,
    filters,
    loading,
    movies,
    error,
    totalPages,
  };
}
