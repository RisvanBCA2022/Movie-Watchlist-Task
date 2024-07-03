import { createSlice } from "@reduxjs/toolkit";
import {
  addMovieAsync,
  addRatingAsync,
  deleteMovieAsync,
  fetchMoviesAsync,
  toggleWatchedAsync,
} from "./MoviesActionCreator";

const initialState = {
  movies: [],
  error: null,
  loading: false,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovie(state, action) {
      state.movies.push(action.payload);
    },
    editMovie(state, action) {
      const { id, updatedMovie } = action.payload;
      const index = state.movies.findIndex((movie) => movie.id === id);
      if (index !== -1) {
        state.movies[index] = { ...state.movies[index], ...updatedMovie };
      }
    },
    deleteMovie(state, action) {
      const id = action.payload;
      state.movies = state.movies.filter((movie) => movie.id !== id);
    },
    toggleWatched(state, action) {
      const id = action.payload;
      const index = state.movies.findIndex((movie) => movie.id === id);
      if (index !== -1) {
        state.movies[index].watched = !state.movies[index].watched;
      }
    },
    addRating(state, action) {
      const { id, rating } = action.payload;
      const index = state.movies.findIndex((movie) => movie.id === id);
      if (index !== -1) {
        state.movies[index].rating = rating;
      }
    },
    addReview(state, action) {
      const { id, review } = action.payload;
      const index = state.movies.findIndex((movie) => movie.id === id);
      if (index !== -1) {
        state.movies[index].review = review;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addMovieAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMovieAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.movies.push(action.payload);
      })
      .addCase(addMovieAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMoviesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesAsync.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.movies = action.payload;
      })
      .addCase(fetchMoviesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteMovieAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMovieAsync.fulfilled, (state, action) => {
        state.loading = false;
        // Remove deleted movie from state
        state.movies = state.movies.filter(
          (movie) => movie.id !== action.payload
        );
      })
      .addCase(deleteMovieAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Update error state with specific error data
      })
      .addCase(toggleWatchedAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleWatchedAsync.fulfilled, (state, action) => {
        state.loading = false;
        const { id, watched } = action.payload;
        const index = state.movies.findIndex((movie) => movie.id === id);
        if (index !== -1) {
          state.movies[index].watched = watched;
        }
      })
      .addCase(toggleWatchedAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addRatingAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRatingAsync.fulfilled, (state, action) => {
        state.loading = false;
        const { id, rating } = action.payload;
        const index = state.movies.findIndex((movie) => movie.id === id);
        if (index !== -1) {
          state.movies[index].rating = rating;
        }
      })
      .addCase(addRatingAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  addMovie,
  editMovie,
  deleteMovie,
  toggleWatched,
  addRating,
  addReview,
} = moviesSlice.actions;

export const selectAllMovies = (state) => state.movies.movies;
export const selectMovieById = (state, movieId) =>
  state.movies.movies.find((movie) => movie.id === movieId);

export default moviesSlice.reducer;
