import { Route, Routes } from "react-router-dom";
import FavoritesPage from "../pages/favorites/FavoritesPage";
import HomePage from "../pages/home/HomePage";
import MovieDetailsPage from "../pages/movie-details/MovieDetailsPage";

interface AppRoutesProps {
  isFiltersOpen: boolean;
  onToggleFilters: () => void;
}

export default function AppRoutes({
  isFiltersOpen,
  onToggleFilters,
}: AppRoutesProps) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            isFiltersOpen={isFiltersOpen}
            onToggleFilters={onToggleFilters}
          />
        }
      />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/movie/:id" element={<MovieDetailsPage />} />
    </Routes>
  );
}
