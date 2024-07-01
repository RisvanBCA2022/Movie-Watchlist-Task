import { createAsyncThunk } from '@reduxjs/toolkit';
import moviesAPI from '../../api/moviesApi';

export const addMovieAsync = createAsyncThunk(
  'movies/addMovieAsync',
  async (movieData, { rejectWithValue }) => {
    try {
      const response = await moviesAPI.addMovie(movieData);
      return response.data; // Assuming API returns added movie data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchMoviesAsync = createAsyncThunk(
  'movies/fetchMoviesAsync',
  async () => {
    try {

      const response = await moviesAPI.fetchMovies(); // Assuming an API method to fetch movies
      return response; // Assuming API returns an array of movies
    } catch (error) {
      throw new Error(error.response.data); // Handle error as needed
    }
  }
);
