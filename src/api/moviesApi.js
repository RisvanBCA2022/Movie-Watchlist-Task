import axios from 'axios';

const baseURL = 'https://json-dummy-server.onrender.com'; 
const moviesAPI = {
  addMovie: async (movieData) => {
    try {
      const response = await axios.post(`${baseURL}/movies`, movieData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  },
  editMovie: async (id, updatedMovie) => {
    try {
      const response = await axios.put(`${baseURL}/movies/${id}`, updatedMovie);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  },
  deleteMovie: async (id) => {
    try {
      const response = await axios.delete(`${baseURL}/movies/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  },
  fetchMovies: async () => {
    try {
      const response = await axios.get(`${baseURL}/movies`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  },
  toggleWatched: async (id, watched) => {
    try {
      const response = await axios.patch(`${baseURL}/movies/${id}`, { watched });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  },
  addRating: async (id, rating) => {
    try {
      const response = await axios.patch(`${baseURL}/movies/${id}`, { rating });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  },
};

export default moviesAPI;
