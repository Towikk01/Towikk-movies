import React, { useEffect } from 'react'
import './popular-actors.scss'
import { useSelector, useDispatch } from 'react-redux'
import { setPopularActors, setPopularActorsError, setPopularActorsLoading, selectPopularActorsLoading, selectPopularActorsError, selectPopularActorsResult, selectPaginationUrl, selectCurrentPage, selectApiKey, setTotalPages } from '../../redux/filmSlice'
import PopularActorsItem from '../popular-actors-item/PopularActorsItem'
import Pagination from '../pagination/Pagination'
import { Spinner } from 'react-bootstrap'


const PopularActors = () => {
  const paginationUrl = useSelector(selectPaginationUrl)
  const apiKey = useSelector(selectApiKey)

  const currPage = useSelector(selectCurrentPage)
  const dispatch = useDispatch()
  const actors = useSelector(selectPopularActorsResult)
  const error = useSelector(selectPopularActorsError)
  const loading = useSelector(selectPopularActorsLoading)



  useEffect(() => {
    dispatch(setPopularActorsLoading(true));
    dispatch(setPopularActorsError(false));
    fetch(`https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&page=${currPage}`)
      .then(res => res.json())
      .then(res => {
        dispatch(setPopularActors(res.results))
        dispatch(setTotalPages(res.total_pages))
      })
      .catch(error => dispatch(setPopularActorsError(true)))
      .finally(() => dispatch(setPopularActorsLoading(false)))
  }, [paginationUrl, currPage, dispatch, apiKey])





  if (loading) {
    return (
      <div className='d-flex flex-column align-items-center gap-5'>
        <Spinner style={{ color: 'whitesmoke', marginTop: '5rem' }} animation="border" role="status">
        </Spinner>
        <h2 style={{ color: 'whitesmoke' }}>Please, wait, it's loading...</h2>
      </div>
    )
  }

  if (error) {
    return (
      <h1 className='text-danger'>Something went wrong...</h1>
    )
  }

  return (
    <div className='popular-actors-wrapper'>
      <h1 style={{ color: 'whitesmoke', textAlign: 'left' }}>Popular Actors</h1>
      <div className='popular-actors-list' >
        {actors.map((actor) => <PopularActorsItem key={actor.id} actor={actor} />)}
      </div >
      <Pagination />
    </div >
  )
}

export default PopularActors