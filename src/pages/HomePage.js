import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMoviesAsync } from '../redux/features/MoviesActionCreator';

const HomePage = () => {
  const dispatch = useDispatch();
  const movies = useSelector(state => state.movies.movies);
  console.log(movies);
  const loading = useSelector(state => state.movies.loading);
  const error = useSelector(state => state.movies.error);

  useEffect(() => {
    dispatch(fetchMoviesAsync()); // Fetch movies when component mounts
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h1>Movie Watchlist</h1>
      {movies?.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <div>
          {movies?.map(movie => (
            <div key={movie?.id}>
            Hwllo
              {/* <h2>{movie?.title}</h2>
              <p>Description: {movie?.description}</p>
              <p>Release Year: {movie?.year}</p>
              <p>Genre: {movie?.genre}</p>
              <p>Watched: {movie?.watched ? 'Yes' : 'No'}</p>
              {movie.rating && <p>Rating: {movie.rating} stars</p>}
              {movie.review && <p>Review: {movie.review}</p>} */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
