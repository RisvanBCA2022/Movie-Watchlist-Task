import { createAsyncThunk } from '@reduxjs/toolkit';
import moviesAPI from '../../api/moviesApi';

export const addMovieAsync = createAsyncThunk(
  'movies/addMovieAsync',
  async (movieData, { rejectWithValue }) => {
    try {
      const response = await moviesAPI.addMovie(movieData);
      return response; // Assuming API returns added movie data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchMoviesAsync = createAsyncThunk(
  'movies/fetchMoviesAsync',
  async () => {
    try {
      const response = await moviesAPI.fetchMovies();
      return response; // Return data directly
    } catch (error) {
      throw new Error(error.response.data); // Handle error as needed
    }
  }
);
export const deleteMovieAsync = createAsyncThunk(
  'movies/deleteMovieAsync',
  async (movieId, { rejectWithValue }) => {
    try {
      await moviesAPI.deleteMovie(movieId);
      return movieId; // Return movieId for optimistic update
    } catch (error) {
      return rejectWithValue(error.response.data); // Return specific error data
    }
  }
);


export const toggleWatchedAsync = createAsyncThunk(
  'movies/toggleWatchedAsync',
  async ({ id, watched }, { rejectWithValue }) => {
    try {
      const response = await moviesAPI.toggleWatched(id, watched);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editMovieAsync = createAsyncThunk(
  'movies/editMovieAsync',
  async ({ id, ...movieData }, { rejectWithValue }) => {
    try {
      const response = await moviesAPI.editMovie(id, movieData);
      return response.data; // Assuming API returns updated movie data
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const addRatingAsync = createAsyncThunk(
  "movies/addRatingAsync",
  async ({ id, rating }, { rejectWithValue }) => {
    try {
      const response = await moviesAPI.addRating(id, rating);
      return { id, rating: response.rating }; // Assuming API returns updated rating
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);