import React, { useEffect } from 'react'
import './home-page.scss'
import logo from '../../assets/logo.jpeg'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { selectGenreSearchedResult, selectApiKey, selectGenres, setGenreSearchedError, setGenreSearchedLoading, setGenreSearchedResult, setGenres, setPopularFilmsLoading, setPopularFilmsError, setPopularFilmsResult, selectPopularFilmsResult } from '../../redux/filmSlice'
import { Button } from 'react-bootstrap'






const HomePage = () => {
  const genres = useSelector(selectGenres)
  const films = useSelector(selectPopularFilmsResult)
  const dispatch = useDispatch();
  const apiKey = useSelector(selectApiKey)
  const buttonList = [
    {
      name: 'Action',
      to: '/genre/28',
      variant: 'warning',
      titled: true
    },
    {
      name: 'Adventure',
      to: '/genre/12',
      variant: 'warning',
    },
    {
      name: 'Animation',
      to: '/genre/16',
      variant: 'warning',
    },
    {
      name: 'Comedy',
      to: '/genre/35',
      variant: 'warning',
    },
    {
      name: 'Crime',
      to: '/genre/80',
      variant: 'warning',
    },
    {
      name: 'Documentary',
      to: '/genre/99',
      variant: 'warning',
    },
    {
      name: 'Drama',
      to: '/genre/18',
      variant: 'warning',
    },
    {
      name: 'Family',
      to: '/genre/10751',
      variant: 'warning',
    },
    {
      name: 'Fantasy',
      to: '/genre/14',
      variant: 'warning',
    },
    {
      name: 'History',
      to: '/genre/36',
      variant: 'warning',
    },
    {
      name: 'Horror',
      to: '/genre/27',
      variant: 'warning',
    },
    {
      name: 'Music',
      to: '/genre/10402',
      variant: 'warning',
    },
    {
      name: 'Mystery',
      to: '/genre/9648',
      variant: 'warning',
    },
    {
      name: 'Romance',
      to: '/genre/10749',
      variant: 'warning',
    },
    {
      name: 'Science Fiction',
      to: '/genre/878',
      variant: 'warning',
    },
    {
      name: 'TV Movie',
      to: '/genre/10770',
      variant: 'warning',
    },
    {
      name: 'Thriller',
      to: '/genre/53',
      variant: 'warning',
    }, {
      name: 'War',
      to: '/genre/10752',
      variant: 'warning',
    },
    {
      name: 'Western',
      to: '/genre/37',
      variant: 'warning',
    },
  ];


  useEffect(() => {
    dispatch(setPopularFilmsLoading(true))
    dispatch(setPopularFilmsError(false))
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
    fetch(url).then((res) =>
      res.json()
    ).then((res) => {
      dispatch(setPopularFilmsResult(res.results))
    }).catch(error => {
      dispatch(setPopularFilmsError(true))
    }).finally(() => {
      dispatch(setPopularFilmsLoading(false))
    }
    )
  }, [dispatch, apiKey])


  return (
    <div className='home-page'>
      <img className='demo-bg' src='https://images7.alphacoders.com/130/1306926.jpeg' alt='bg' />
      <div className='home-page__header'>
        <h4 className='home-page__title'>
          Hello there and welcome to the Towikk Movies!
        </h4>
        <p className='home-page__details'>Here you can found details and information about all kinds of films, also create your favorite list and see something about actors</p>
      </div>
      <div className='home-page__wrapper'>
        <div className='home-page__img'>
          <img src={logo} alt='logo' />
        </div>
        <div>
          <h3 style={{ color: 'whitesmoke' }}>Search movies for genre!</h3>
          <div className='home-page__actions'>
            {
              buttonList.map((item, index) => (
                <div key={index}>
                  <Link to={item.to}>
                    <Button variant='light' className="mb-2 w-100">
                      <span className="text-nowrap">{item.name}</span>
                    </Button>
                  </Link>
                  {item.divider && <hr />}
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div className='home-page__popular-movies'>
        <h4 style={{ color: 'whitesmoke', paddingTop: '1.5rem' }}>Also check recent and popular movies!</h4>
        <div className='home-page__carousel'>
          {films.map(film => (
            <Link style={{ textDecoration: 'none', color: 'whitesmoke' }} to={`/${film.id}`}>
              <div>
                <img style={{ width: '10vw', borderRadius: '10px' }} src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt={film.id} />
                <h5 style={{ paddingTop: '0.5rem' }}>{film.title}</h5>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage