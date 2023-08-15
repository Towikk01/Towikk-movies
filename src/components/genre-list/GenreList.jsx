import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectGenreSearchedResult, setGenreSearchedError, setGenreSearchedLoading, setGenreSearchedResult, setTotalPages, selectApiKey, selectCurrentPage, setGenres, selectGenres } from '../../redux/filmSlice'
import FilmItem from '../film-item/FilmItem'
import Pagination from '../pagination/Pagination'
import './genre-list.scss'


const GenreList = () => {
  const dispatch = useDispatch()
  const { genreId } = useParams()
  const selectGenreSearched = useSelector(selectGenreSearchedResult)
  const apiKey = useSelector(selectApiKey)
  const currPage = useSelector(selectCurrentPage)
  const genres = useSelector(selectGenres)


  useEffect(() => {
    dispatch(setGenreSearchedLoading(true));
    dispatch(setGenreSearchedError(false));
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&page=${currPage}`)
      .then(res => res.json())
      .then(res => {
        dispatch(setGenreSearchedResult(res.results))
        dispatch(setTotalPages(res.total_pages))
      })
      .catch(error => dispatch(setGenreSearchedError(true)))
      .finally(() => dispatch(setGenreSearchedError(false)))
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`).then(res => res.json()).then(res => dispatch(setGenres(res.genres))).catch(error => console.log('something went wrong'))
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&page=${currPage}`)
      .then(res => res.json()).then(res => dispatch(selectGenreSearchedResult(res.results))).catch(error => dispatch(setGenreSearchedError(true))).finally(() => { dispatch(setGenreSearchedLoading(false)) })
  }, [genreId, currPage, dispatch, apiKey])

  const genreName = genres.find(genre => genre.id.toString() === genreId)?.name;


  return (
    <div className='genre-wrapper'>
      <img className='demo-bg' src='https://images.unian.net/photos/2018_04/thumb_files/1000_545_1523533032-4732.jpg?1' alt='background' />
      <h1 className='genre-list__title'>{genreName} movies</h1>
      <div className='genre-list'>
        {selectGenreSearched?.map(film => <FilmItem film={film} key={film.id} />)}
      </div>
      <Pagination />
    </div>
  )
}

export default GenreList