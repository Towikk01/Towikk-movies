import React from 'react'
import './carousel.scss'
import Actors from '../actors/Actors'
import { useSelector } from 'react-redux'
import { selectMovieCreditsResult } from '../../redux/filmSlice'



const Carousel = () => {
  const actors = useSelector(selectMovieCreditsResult)
  return (
    <div className="carousel-container">
      {actors.map((actor, index) => (
        <Actors key={index} actor={actor} />
      ))}
    </div>
  )
}

export default Carousel