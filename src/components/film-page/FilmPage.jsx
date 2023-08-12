import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentFilm, setCurrentFilmError, setCurrentFilmLoading, selectCurrentFilm, selectCurrentFilmLoading, selectCurrentFilmError, addToFavoriteFilms, removeFromFavoriteFilms, selectFavoriteFilms, setMovieCreditsResult, setMovieCreditsError, setMovieCreditsLoading, setMovieImages, setMovieImagesError, setMovieImagesLoading, selectMovieImagesResult } from '../../redux/filmSlice';
import { Spinner, Card } from 'react-bootstrap';
import { AiFillStar } from 'react-icons/ai';
import './film-page.css'

import Carousel from '../carousel/Carousel';




const FilmPage = () => {
  const { filmId } = useParams();

  const dispatch = useDispatch();
  const film = useSelector(selectCurrentFilm)
  const loading = useSelector(selectCurrentFilmLoading)
  const error = useSelector(selectCurrentFilmError)
  const favorites = useSelector(selectFavoriteFilms)
  const images = useSelector(selectMovieImagesResult)
  const api_key = 'c20c870a9997852e1d7423c5e9069153'
  const handleAddToFavorites = () => {
    if (!isFilmFav) {
      dispatch(addToFavoriteFilms(film));
    }
    else {
      dispatch(removeFromFavoriteFilms(film))
    }
  };

  const isFilmFav = favorites.some(e => e.id === film?.id)

  useEffect(() => {
    if (filmId) {
      dispatch(setCurrentFilmLoading(true))
      dispatch(setCurrentFilmError(false))
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjBjODcwYTk5OTc4NTJlMWQ3NDIzYzVlOTA2OTE1MyIsInN1YiI6IjY0Y2EyNGQxMGI3NGU5MDBjOTk4M2YyYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SOzPUQUmdmt2GO6P_zZ8B30RBLuubJQLTwZlvzS3vT0'
        }
      };
      const url = `https://api.themoviedb.org/3/movie/${filmId}?=api_key=${api_key}`
      fetch(url, options).then(res => res.json()).then(res => {
        dispatch(setCurrentFilm(res))
      }).catch(error => {
        dispatch(setCurrentFilmError(true))
      }).finally(() => {
        dispatch(setCurrentFilmLoading(false))
      }
      )
      fetch(`https://api.themoviedb.org/3/movie/${filmId}/credits?api_key=${api_key}`).then(res => res.json()).then(res => {
        dispatch(setMovieCreditsResult(res.cast))
      }).catch(error => {
        dispatch(setMovieCreditsError(true))
      }).finally(() => {
        dispatch(setMovieCreditsLoading(false))
      })
      fetch(`https://api.themoviedb.org/3/movie/${filmId}/images?api_key=${api_key}`).then(res =>
        res.json()).then(res => {
          dispatch(setMovieImages(res.backdrops))
          console.log(res)
        }).catch(error => dispatch(setMovieImagesError(error))).finally(() => {
          dispatch(setMovieImagesLoading(false))
        })
    }



  }, [filmId, dispatch])

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  }

  if (error) {
    return (
      <h1 className='text-danger'>Sorry, something wen't wrong...</h1>
    )
  }

  return (
    <div className="film-page">
      <img className='demo-bg' src={`https://image.tmdb.org/t/p/w500${film?.backdrop_path} `} alt={film?.backdrop_path} />
      <div className="film-image">
        <Card.Img src={`https://image.tmdb.org/t/p/w500${film?.poster_path}`} alt={film.title} style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="film-details">
        <div className='film-text'>
          <h2 className="film-title">{film.title}</h2>
          <p>{film.tagline}</p>
          <span>{film.runtime} minutes · {film.release_date}</span>
          <span>{film.vote_average} <AiFillStar /></span>
          <span>Overview:</span>
          <p className="film-description">{film.overview}</p>
        </div>
        <h3 style={{ textAlign: "left" }}>Genres:</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className='film-actions'>
          <div className='film-genres'>
            {film.genres.map(genre => <div key={genre.name} className='film-genres__item'>{genre.name}</div>)}
          </div>
          <button onClick={handleAddToFavorites} style={{ backgroundColor: isFilmFav ? 'darkgrey' : 'hotpink', border: 'none', display: 'flex', alignItems: 'center', gap: '5px', padding: '5px', borderRadius: '50px', }} className={`${isFilmFav ? 'text-secondary' : 'text-light'}`} >
            Add to favorite list
            <AiFillStar />
          </button>
        </div>
        <div>
          <h2 style={{ textAlign: 'left', paddingTop: '2rem' }}>Images</h2>
          <div className="carousel-container">
            {images.map((image, index) => (
              <img style={{ width: '10vw', borderRadius: '10px' }} src={`https://image.tmdb.org/t/p/w500${image.file_path}`} alt={image.index} />
            ))}
          </div>
        </div>
        <div>
          <h2 style={{ textAlign: 'left', paddingTop: '2rem' }}>Cast</h2>
          <Carousel />
        </div>
      </div>
    </div>
  );
};

export default FilmPage;