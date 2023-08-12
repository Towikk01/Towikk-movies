import React, { useEffect } from 'react'
import FilmItem from '../film-item/FilmItem'
import { selectTopRatedResult, setTopRated, setTopRatedError, setTopRatedLoading } from '../../redux/filmSlice'
import { useSelector, useDispatch } from 'react-redux'
import './top-rated.scss'
import Pagination from '../pagination/Pagination'

const TopRated = () => {
  const dispatch = useDispatch();
  const top = useSelector(selectTopRatedResult)
  const apiKey = 'c20c870a9997852e1d7423c5e9069153';

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`).then(res => res.json()).then(res => dispatch(setTopRated(res.results))).catch(error => dispatch(setTopRatedError(error))).finally(() => dispatch(setTopRatedLoading(false)))
  }, [dispatch])

  return (
    <div className='film-wrapper'>
      <img className='demo-bg' src='https://images.unian.net/photos/2018_04/thumb_files/1000_545_1523533032-4732.jpg?1' alt='background' />
      <h1>Top rated movies</h1>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }} className='film-list'>
        {top?.map(film => (
          <FilmItem className='film-item' film={film} key={film.id} />))}
      </div>
      <Pagination />
    </div>
  )
}

export default TopRated