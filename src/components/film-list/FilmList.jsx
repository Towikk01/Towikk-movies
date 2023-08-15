import React, { useEffect } from 'react'
import FilmItem from '../film-item/FilmItem'
import { selectPopularFilmsResult, selectPaginationUrl, selectApiKey, setPopularFilmsResult, setPopularFilmsError, setPopularFilmsLoading, setCurrentPage, selectCurrentPage, setTotalPages } from '../../redux/filmSlice'
import { useSelector, useDispatch } from 'react-redux'
import './film-list.scss'
import Pagination from '../pagination/Pagination'


const FilmList = () => {
  const films = useSelector(selectPopularFilmsResult)
  const dispatch = useDispatch();
  const paginationUrl = useSelector(selectPaginationUrl)
  const apiKey = useSelector(selectApiKey)
  const currPage = useSelector(selectCurrentPage)



  useEffect(() => {
    setCurrentPage(1)
    dispatch(setPopularFilmsLoading(true))
    dispatch(setPopularFilmsError(false))
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${currPage}`
    fetch(url).then((res) =>
      res.json()
    ).then((res) => {
      dispatch(setPopularFilmsResult(res.results))
      dispatch(setTotalPages(res.total_pages))
    }).catch(error => {
      dispatch(setPopularFilmsError(true))
    }).finally(() => {
      dispatch(setPopularFilmsLoading(false))
    }
    )
  }, [dispatch, paginationUrl, currPage, apiKey])



  return (
    <div className='film-wrapper'>
      <img className='demo-bg' src='https://images.unian.net/photos/2018_04/thumb_files/1000_545_1523533032-4732.jpg?1' alt='background' />
      <h1>Popular films</h1>
      <div className='film-list'>
        {films?.map(film => <FilmItem film={film} key={film.id} />)}
      </div>
      <Pagination />
    </div>
  )
}

export default FilmList