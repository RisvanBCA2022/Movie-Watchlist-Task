// HomePage.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMoviesAsync, deleteMovieAsync, toggleWatchedAsync } from '../../redux/features/MoviesActionCreator';
import './Homepage.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();
  const movies = useSelector(state => state.movies.movies);
  const loading = useSelector(state => state.movies.loading);
  const error = useSelector(state => state.movies.error);
  console.log(movies);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchMoviesAsync()); // Fetch movies when component mounts
  }, [dispatch]);

  const handleDeleteMovie = (movieId) => {
    setMovieToDelete(movieId);
    setModalIsOpen(true);
  };

  const confirmDeleteMovie = () => {
    dispatch(deleteMovieAsync(movieToDelete));
    closeModal();
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setMovieToDelete(null);
  };

  const handleToggleWatched = (movieId, watched) => {
    dispatch(toggleWatchedAsync({ id: movieId, watched: !watched }));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="body">
      <h1 className="heading">My Movie Watchlist</h1>
      <div className="wrapper">
        {movies && movies.map(movie => (
          <Link to={`/movies/${movie.id}`} key={movie.id}>
            <div className="card">
              <img src={movie.poster} alt={movie.title} />
              <div className="descriptions">
                <h1 className='movie-title'>{movie.title}</h1>
                <p className='movie-description'>{movie.description}</p>
                <div className="card-buttons">
                  <button className="read-more-button" onClick={(e) => { e.preventDefault(); handleToggleWatched(movie.id, movie.watched); }}>
                    {movie.watched ? 'Unwatched' : 'Watched'}
                  </button>
                  <button className="read-more-button" onClick={(e) => { e.preventDefault(); handleDeleteMovie(movie.id); }}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {modalIsOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className='confirm-title'>Confirm Delete</h2>
            <p className='confirm-paragraph'>Are you sure you want to delete this movie?</p>
            <div className="modal-buttons">
              <button onClick={confirmDeleteMovie} className="confirm-button">Yes, Delete</button>
              <button onClick={closeModal} className="cancel-button">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
