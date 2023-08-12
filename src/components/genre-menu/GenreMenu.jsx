import React from 'react'
import './genre-menu.scss'
import { BsGraphUpArrow } from 'react-icons/bs'
import { AiOutlineLike } from 'react-icons/ai'
import { IoIosPeople } from 'react-icons/io'
import { Link } from 'react-router-dom'

const GenreMenu = () => {
  return (
    <div className='genre-menu'>

      <span style={{ color: 'whitesmoke', fontSize: '21px', paddingLeft: '0.5rem', paddingTop: '0.5rem' }}>Towikk Movies</span>
      <div className='genre-menu__top'>
        <p style={{ textAlign: 'left', color: 'whitesmoke' }}>Discover</p>
        <div className='genre-menu__bottom-actions'>
          <Link style={{ textDecoration: 'none' }} to='/popular-movies'>
            <button><BsGraphUpArrow style={{ marginRight: '0.5rem' }} />Popular movies</button>
          </Link>
          <Link style={{ textDecoration: 'none' }} to='/top-rated'>
            <button><AiOutlineLike style={{ marginRight: '0.5rem' }} />Top rated movies</button>
          </Link>
          <Link style={{ textDecoration: 'none' }} to='/popular-actors'>
            <button><IoIosPeople style={{ marginRight: '0.5rem' }} />Popular actors</button>
          </Link>
        </div>
      </div>
      <div className='genre-menu__bottom'>
        <p style={{ textAlign: 'left', color: 'whitesmoke', paddingTop: '1rem' }}>Genres</p>
        <div className='genre-menu__bottom-actions'>
          <button>Family</button>
          <button>Mystery</button>
          <button>Action</button>
          <button>Crime</button>
          <button>Comedy</button>
          <button>Animation</button>
          <button>Adventure</button>
          <button>Documentary</button>
          <button>Drama</button>
          <button>Fantasy</button>
          <button>History</button>
          <button>Horror</button>
          <button>Music</button>
          <button>Romance</button>
          <button>Science Fiction</button>
          <button>TV Movie</button>
          <button>Thriller</button>
          <button>War</button>
          <button>Western</button>
        </div>
      </div>
    </div >
  )
}

export default GenreMenu