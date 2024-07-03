import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import AddMovieForm from './pages/AddMovie/AddMovieForm';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import Header from './components/Header';
import EditMovieForm from './pages/EditMovie/Editmoviepage';

function App() {
  return (
    <>

    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/add" element={<AddMovieForm />} />
      <Route path="/edit/:id" element={<EditMovieForm />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
      <Route path='/editmovie/:id' element={<EditMovieForm />} />
    </Routes>
    </>
  );
}

export default App;
