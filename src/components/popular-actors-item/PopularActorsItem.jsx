import React from 'react'
import './popular-actors-item.scss'
import { Link } from 'react-router-dom';

const PopularActorsItem = ({ actor }) => {

  const imageUrl = actor?.profile_path !== null
    ? `https://image.tmdb.org/t/p/w500${actor?.profile_path}`
    : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png';

  return (
    <Link style={{ textDecoration: 'none', color: 'whitesmoke' }} to={`/actor/${actor.id}`}>
      <div className='popular-actor__item'>
        <div className='popular-actor__item-image'>
          <img src={imageUrl} alt={actor.name} />
        </div>
        <h3 style={{ color: 'whitesmoke', fontSize: '25px', paddingTop: '7px' }}>{actor.name}</h3>
      </div>
    </Link>
  )
}

export default PopularActorsItem