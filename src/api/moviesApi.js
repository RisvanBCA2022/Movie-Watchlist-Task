import axios from 'axios';

const baseURL = 'http://localhost:5000'; // Your API base URL

const moviesAPI = {
  addMovie: async (movieData) => {
    try {
      const response = await axios.post(`${baseURL}/movies`, movieData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  },
  updateMovie: async (id, updatedMovie) => {
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
};

export default moviesAPI;
