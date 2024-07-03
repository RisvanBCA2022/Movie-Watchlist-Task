import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMovieAsync,
  fetchMoviesAsync,
} from "../../redux/features/MoviesActionCreator";
import { useNavigate } from "react-router-dom";
import "./AddMovieForm.css";

const AddMovieForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    year: "",
    genre: "",
    poster: "",
    watched: false, // Add poster field
  });

  const [uploadError, setUploadError] = useState(null);
  const [publishError, setPublishError] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // Track upload state
  const loading = useSelector((state) => state.movies.loading);
  const error = useSelector((state) => state.movies.error);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true); // Start upload
      try {
        const imageUrl = await uploadImage(file); // Function to upload image and get URL
        console.log("Uploaded Image URL:", imageUrl); // Debugging line
        setFormData({ ...formData, poster: imageUrl });
        setUploadError(null);
      } catch (error) {
        console.error("Error uploading image:", error); // Debugging line
        setUploadError("Failed to upload image. Please try again.");
      } finally {
        setIsUploading(false); // End upload
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
    return data.secure_url; // URL of the uploaded image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUploading) {
      return; // Prevent submission if still uploading
    }
    try {
      await dispatch(addMovieAsync(formData));
      setFormData({
        title: "",
        description: "",
        year: "",
        genre: "",
        poster: "",
        watched: false, // Ensure all fields are reset
      });
      setPublishError(null);
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
      setPublishError("Failed to add movie. Please try again.");
    }
  };
  useEffect(() => {
    dispatch(fetchMoviesAsync());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="ctaForm">
        <h2>Add a New Movie</h2>
        <p>
          Add movies to your watchlist by providing details such as the movie
          title, description, release year, and genre.
        </p>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Movie Title</label>
          <input
            type="text"
            id="title"
            className="form-control"
            placeholder="Enter movie title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
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
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
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
            onChange={(e) =>
              setFormData({ ...formData, genre: e.target.value })
            }
            required
          >
            <option value="" disabled>
              Select Genre
            </option>
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
            required
          />
        </div>

        {uploadError && <p className="error">{uploadError}</p>}
        {publishError && <p className="error">{publishError}</p>}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Add Movie"}
        </button>
      </form>
    </div>
  );
};

export default AddMovieForm;
