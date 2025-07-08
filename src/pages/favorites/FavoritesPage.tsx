import React from "react";
import { useNavigate } from "react-router-dom";
import MovieList from "../../components/MovieList";
import { useFavoritesStore } from "../../store/favoritesStore";
import FavoriteHeader from "./favourite-header";
import NoFavorite from "./no-favourites";

const FavoritesPage: React.FC = () => {
  const navigate = useNavigate();
  const { favorites } = useFavoritesStore();

  const handleMovieClick = (imdbID: string) => {
    navigate(`/movie/${imdbID}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <FavoriteHeader />
      {favorites.length === 0 ? (
        <NoFavorite />
      ) : (
        <MovieList movies={favorites} onMovieClick={handleMovieClick} />
      )}
    </div>
  );
};

export default FavoritesPage;
