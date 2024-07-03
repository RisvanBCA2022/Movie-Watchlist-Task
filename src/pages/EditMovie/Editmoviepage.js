import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editMovieAsync, fetchMoviesAsync } from "../../redux/features/MoviesActionCreator";
import { useParams, useNavigate } from "react-router-dom";
import "./EditMovie.css";

const EditMovieForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch movie details from Redux state
  const movies = useSelector((state) => state.movies.movies);
  const movie = movies.find((m) => m.id === id);

  const [formData, setFormData] = useState({
    title: movie?.title || "",
    description: movie?.description || "",
    year: movie?.year || "",
    genre: movie?.genre || "",
    poster: movie?.poster || "",
    watched: movie?.watched || false,
  });

  const [uploadError, setUploadError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!movie) {
      dispatch(fetchMoviesAsync(id));
    }
  }, [dispatch, id, movie]);

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title,
        description: movie.description,
        year: movie.year,
        genre: movie.genre,
        poster: movie.poster,
        watched: movie.watched,
      });
    }
  }, [movie]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      try {
        const imageUrl = await uploadImage(file);
        setFormData({ ...formData, poster: imageUrl });
        setUploadError(null);
      } catch (error) {
        console.error("Error uploading image:", error);
        setUploadError("Failed to upload image. Please try again.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    const data = await response.json();
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the updated movie data
    const updatedMovieData = { ...formData };
    if (!updatedMovieData.poster) {
      updatedMovieData.poster = movie.poster; // Retain the old poster if no new one is uploaded
    }

    try {
      await dispatch(editMovieAsync({ id, ...updatedMovieData }));
      navigate(`/movies/${id}`);
    } catch (error) {
      console.error("Error editing movie:", error);
      // Handle error state
    }
  };

  return (
    <div className="edit-movie-container">
      <div className="edit-ctaForm">
        <h2>Edit Movie Details</h2>
        <p>Update movie details and click 'Save Changes' to apply.</p>
      </div>
      <form className="edit-movie-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Movie Title</label>
          <input
            type="text"
            id="title"
            className="form-control"
            placeholder="Enter movie title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Movie Description</label>
          <textarea
            id="description"
            className="form-control"
            rows={4}
            placeholder="Provide a brief description of the movie"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="year">Release Year</label>
          <input
            type="number"
            id="year"
            className="form-control"
            placeholder="2023"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <select
            id="genre"
            className="form-control"
            value={formData.genre}
            onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
            required
          >
            <option value="" disabled>Select Genre</option>
            <option value="action">Action</option>
            <option value="comedy">Comedy</option>
            <option value="drama">Drama</option>
            <option value="sci-fi">Sci-Fi</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="poster">Movie Poster</label>
          <input
            type="file"
            id="poster"
            className="form-control"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {uploadError && <p className="error-message">{uploadError}</p>}

        <button type="submit" className="btn btn-primary" disabled={isUploading}>
          {isUploading ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditMovieForm;
