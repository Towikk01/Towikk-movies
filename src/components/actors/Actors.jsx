import React from 'react'
import { Link } from 'react-router-dom'

const Actors = ({ actor }) => {

  const imageUrl = actor.profile_path
    ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
    : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'

  return (
    <Link style={{ textDecoration: 'none', color: 'whitesmoke' }} to={`/actor/${actor.id}`}>
      <div key={actor.name} className='film-actors-item'>
        <div style={{ width: '150px', height: '150px' }}>
          <img style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} src={imageUrl} alt={actor.name} />
        </div>
        <h2 style={{ paddingTop: "1rem", textWrap: 'wrap', fontSize: '1.2rem' }}>{actor.name}</h2>
      </div>
    </Link>
  )
}

export default Actors