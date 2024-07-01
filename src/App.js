import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddMovieForm from './pages/AddMovieForm';
import EditMovieForm from './pages/EditMovieForm';
import MovieDetails from './pages/MovieDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/add" element={<AddMovieForm />} />
      <Route path="/edit/:id" element={<EditMovieForm />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
    </Routes>
  );
}

export default App;
