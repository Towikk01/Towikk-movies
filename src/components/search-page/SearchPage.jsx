import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTotalPages, selectCurrentPage, setCurrentPage, selectSearchText, selectSearchResult, selectSearchResultLoading, selectSearchResultError, selectApiKey, setSearchResult, setSearchResultError, setSearchResultLoading } from '../../redux/filmSlice';
import { Spinner, Row, Col } from 'react-bootstrap';
import './search-page.css';
import Pagination from '../pagination/Pagination';
import FilmItem from '../film-item/FilmItem';

const SearchPage = () => {
  const dispatch = useDispatch();
  const searchText = useSelector(selectSearchText);
  const searchResult = useSelector(selectSearchResult);
  const error = useSelector(selectSearchResultError);
  const loading = useSelector(selectSearchResultLoading);

  const currPage = useSelector(selectCurrentPage);
  const apiKey = useSelector(selectApiKey);

  useEffect(() => {
    setCurrentPage(1)
    if (searchText) {
      dispatch(setSearchResultLoading(true));
      dispatch(setSearchResultError(false));
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchText)}&page=${currPage}`;
      fetch(url)
        .then((res) => res.json())
        .then(({ results, total_pages }) => {
          dispatch(setSearchResult(results));
          dispatch(setTotalPages(total_pages));
        })
        .catch(() => {
          dispatch(setSearchResultError(true));
        })
        .finally(() => {
          dispatch(setSearchResultLoading(false));
        });
    }
  }, [searchText, currPage, dispatch, apiKey]);

  if (loading) {
    return (
      <div className='d-flex flex-column align-items-center gap-5'>
        <Spinner style={{ color: 'whitesmoke', marginTop: '5rem' }} animation="border" role="status" />
        <h2 style={{ color: 'whitesmoke' }}>Please, wait, it's loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <h1 className='text-danger'>Something went wrong...</h1>
    );
  }

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <img className='demo-bg' src='https://m.media-amazon.com/images/I/9111XWh5jRL._AC_UF1000,1000_QL80_.jpg' alt='background' />
      <h1 style={{ color: 'whitesmoke', paddingTop: '1rem', textAlign: 'center' }}>Searched films</h1>
      <div className='search-list'>
        {searchResult.map((film) => (
          <FilmItem film={film} />
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default SearchPage;
