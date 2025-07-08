import React from 'react';
import MovieCard from './MovieCard';
import { Movie } from '../types/movie';

interface MovieListProps {
  movies: Movie[];
  onMovieClick: (imdbID: string) => void;
}

const MovieList: React.FC<MovieListProps> = ({ movies, onMovieClick }) => {
  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-600 dark:text-gray-400 text-lg">No movies found</div>
        <p className="text-gray-500 dark:text-gray-500 mt-2">Try searching for a different movie title</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onClick={() => onMovieClick(movie.imdbID)}
        />
      ))}
    </div>
  );
};

export default MovieList;