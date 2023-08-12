import React from 'react'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentPage, selectCurrentPage, selectTotalPages } from '../../redux/filmSlice';
import './pagination.css'

const Pagination = () => {

  const dispatch = useDispatch();
  const totalPages = useSelector(selectTotalPages)
  const currentPage = useSelector(selectCurrentPage)
  const [page, setPage] = useState(currentPage);
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(setCurrentPage(newPage));
      setPage(newPage)
    }
  };

  const renderPageNumbers = () => {
    const pagesToShow = 5;
    const pageNumbers = [];
    if (totalPages <= pagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const middlePage = Math.floor(pagesToShow / 2);
      let startPage = page - middlePage;
      let endPage = page + middlePage;

      if (page <= middlePage) {
        startPage = 1;
        endPage = pagesToShow;
      } else if (page >= totalPages - middlePage) {
        startPage = totalPages - pagesToShow + 1;
        endPage = totalPages;
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers.map((pageNumber) => (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={pageNumber === page ? 'active' : ''}
      >
        {pageNumber}
      </button>
    ));
  };

  return (
    <div className="pagination">
      <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
        &lt;
      </button>

      {renderPageNumbers()}

      <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
        &gt;
      </button>
    </div>)
}

export default Pagination



