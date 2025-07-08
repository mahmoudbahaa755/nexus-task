import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import LoadingSpinner from "../../components/LoadingSpinner";
import MovieDetails from "../../components/MovieDetails";
import { useMovieDetails } from "../../hooks/useMovieSearch";
import BackButton from "../../utils/back-btn";

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movieDetails, loading, error, fetchDetails } = useMovieDetails();

  useEffect(() => {
    if (id) {
      fetchDetails(id);
    }
  }, [id, fetchDetails]);

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  if (!id) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage message="Movie ID not found" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton />
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {movieDetails && !loading && !error && (
        <MovieDetails movie={movieDetails} onBack={handleBack} />
      )}
    </div>
  );
};

export default MovieDetailsPage;
