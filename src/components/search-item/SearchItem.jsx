import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { AiFillStar } from 'react-icons/ai'
import { addToFavoriteFilms, removeFromFavoriteFilms, selectFavoriteFilms } from '../../redux/filmSlice'
import { useDispatch, useSelector } from 'react-redux'


const SearchItem = ({ movie }) => {
  const favorites = useSelector(selectFavoriteFilms)
  const isFilmFav = favorites.some(e => e.id === movie.id)
  const dispatch = useDispatch();

  const handleAddToFavorites = () => {
    if (!isFilmFav) {
      dispatch(addToFavoriteFilms(movie));
    }
    else {
      dispatch(removeFromFavoriteFilms(movie))
    }
  };


  const imageUrl = movie?.poster_path !== null
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png';


  return (
    <div style={{
      width: '100%', backgroundColor: isFilmFav ? '#545454' : 'azure', borderRadius: '20px', transition: '.5s'
    }}>
      <div style={{ height: '500px', width: '100%', padding: '5px' }
      } >
        <img src={imageUrl} alt="film Poster" style={{ width: '100%', height: '100%', padding: '5px', borderRadius: '20px', objectFit: 'cover' }} />
      </div >
      <div style={{ padding: '15px', fontSize: '16px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <span>Release date: {movie.release_date}</span>
        <span>Rate: {movie?.vote_average.toFixed(1)}/10 <AiFillStar /></span>
      </div>
      <div className='mb-3' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
        <Link to={`/${movie?.id}`}>
          <Button style={{ borderRadius: '50px' }} variant="primary">Go to the film</Button>
        </Link>
        <button onClick={handleAddToFavorites} style={{ backgroundColor: isFilmFav ? 'darkgrey' : 'hotpink', border: 'none', display: 'flex', alignItems: 'center', gap: '5px', padding: '10px', borderRadius: '50px', transition: '.3s' }} className={`${isFilmFav ? 'text-secondary' : 'text-light'}`} >
          Add to favorite list
          <AiFillStar />
        </button>
      </div>
    </div >
  )
}

export default SearchItem