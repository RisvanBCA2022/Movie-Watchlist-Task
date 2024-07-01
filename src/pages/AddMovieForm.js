import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMovie } from "../redux/features/movieSlice"; // Adjust the import path as per your project structure
import styles from "./AddMovieForm.module.css";
import { addMovieAsync } from "../redux/features/MoviesActionCreator";
import { useNavigate } from "react-router-dom";

const AddMovieForm = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.movies);
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    year: "",
    genre: "",
  });

  const [publishError, setPublishError] = useState(null);
  const loading = useSelector((state) => state.movies.loading);
  const error = useSelector((state) => state.movies.error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addMovieAsync(formData));
      setFormData({ title: "", description: "", year: "", genre: "" });
      setPublishError(null);
      navigate('/')
    } catch (error) {
      setPublishError(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.ctaForm}>
        <h2>Add a New Movie</h2>
        <p>
          Add movies to your watchlist by providing details such as the movie
          title, description, release year, and genre.
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Movie Title"
          className={styles.form__input}
          id="title"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <label htmlFor="title" className={styles.form__label}>
          Movie Title
        </label>

        <textarea
          placeholder="Description"
          className={styles.form__input}
          id="description"
          required
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <label htmlFor="description" className={styles.form__label}>
          Description
        </label>

        <input
          type="number"
          placeholder="Release Year"
          className={styles.form__input}
          id="year"
          required
          value={formData.year}
          onChange={(e) => setFormData({ ...formData, year: e.target.value })}
        />
        <label htmlFor="year" className={styles.form__label}>
          Release Year
        </label>

        <select
          className={styles.form__input}
          id="genre"
          required
          value={formData.genre}
          onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
        >
          <option value="" disabled>
            Select Genre
          </option>
          <option value="action">Action</option>
          <option value="comedy">Comedy</option>
          <option value="drama">Drama</option>
          <option value="horror">Horror</option>
          <option value="sci-fi">Sci-Fi</option>
        </select>
        <label htmlFor="genre" className={styles.form__label}>
          Genre
        </label>

        <input
          type="submit"
          value="Add Movie"
          className={styles.form__submit}
        />
      </form>
    </div>
  );
};

export default AddMovieForm;
