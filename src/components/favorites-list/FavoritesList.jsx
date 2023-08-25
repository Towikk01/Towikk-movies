import React from 'react';
import './favorites-list.scss'
import { useSelector } from 'react-redux';
import { selectFavoriteFilms } from '../../redux/filmSlice';
import FilmItem from '../film-item/FilmItem';



const FavoritesList = () => {
  const favorites = useSelector(selectFavoriteFilms)
  return (
    <div className='film-wrapper' style={{
    }}>
      <img className='demo-bg' src='https://images.unian.net/photos/2018_04/thumb_files/1000_545_1523533032-4732.jpg?1' alt='background' />
      <h1 style={{ color: 'whitesmoke', paddingTop: '1rem', textAlign: "left" }}>Favorite films</h1>
      <div className='favorites-list'>
        {favorites.length ?
          (favorites.map(film => (
            <FilmItem film={film} />
          ))) : <h1 style={{ fontSize: '30px', color: 'whitesmoke', textAlign: 'center', paddingTop: '3rem' }}>Your favorites list is empty...</h1>
        }
      </div>
    </div >

  );
};

export default FavoritesList;