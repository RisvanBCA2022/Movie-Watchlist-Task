import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./MovieDetails.css";
import { fetchMoviesAsync, addRatingAsync } from "../../redux/features/MoviesActionCreator";
import StarRating from "../../components/Rating/StarRating";

const MovieDetailPage = () => {
  const { id } = useParams();
  const movie = useSelector((state) =>
    state.movies.movies.find((m) => m.id === id)
  );
  const dispatch = useDispatch();
  const [rating, setRating] = useState(null);

  useEffect(() => {
    dispatch(fetchMoviesAsync());
  }, [dispatch]);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const watchedStatusStyle = movie.watched
    ? { backgroundColor: "#4CAF50", color: "white" }
    : { backgroundColor: "#FFA500", color: "white" };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    dispatch(addRatingAsync({ id, rating: newRating }));
  };

  return (
    <div className="movie-details-container">
      <div className="movie-details">
        <div className="movie-details-header">
          <h1 className="movie-detail-title">{movie.title}</h1>
          <Link to={`/editmovie/${id}`} className="edit-button" style={{textDecoration:'none'}}>
            Edit Movie
          </Link>
        </div>
        <div className="movie-details-content">
          <div className="movie-details-poster">
            <img className="movie-poster" src={movie.poster} alt={movie.title} />
          </div>
          <div className="movie-details-info">
            <p className="movie-info-item">Release Year: {movie.year}</p>
            <p className="movie-info-item">Genre: {movie.genre}</p>
            <div className="watched-status" style={watchedStatusStyle}>
              {movie.watched ? "Watched" : "Not Watched"}
            </div>
            <StarRating rating={rating} onRatingChange={handleRatingChange} />
          </div>
        </div>
        <p className="movie-detail-description">{movie.description}</p>
      </div>
    </div>
  );
};

export default MovieDetailPage;
