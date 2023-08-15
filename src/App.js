import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header/Header';
import FilmList from './components/film-list/FilmList'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FavoritesList from './components/favorites-list/FavoritesList';
import FilmPage from './components/film-page/FilmPage';
import SearchPage from './components/search-page/SearchPage';
import PopularActors from './components/popular-actors/PopularActors';
import TopRated from './components/top-rated/TopRated';
import HomePage from './components/home-page/HomePage'
import GenreList from './components/genre-list/GenreList';
import ActorPage from './components/actor-page/ActorPage';




function App() {



  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/popular-movies' element={<FilmList />} />
          <Route path='/favorites' element={<FavoritesList />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/:filmId' element={<FilmPage />} />
          <Route path='/popular-actors' element={<PopularActors />} />
          <Route path='/top-rated' element={<TopRated />} />
          <Route path="/genre/:genreId" element={<GenreList />} />
          <Route path="/actor/:personId" element={<ActorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
