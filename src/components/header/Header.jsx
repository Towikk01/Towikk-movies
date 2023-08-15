import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { selectFavoriteFilms, updateSearchText } from '../../redux/filmSlice';

import './header.scss'
import GenreMenuNew from '../genre-menu-new/GenreMenuNew';

import logo from "../../assets/main-logo.jpeg"


const Header = () => {
  const dispatch = useDispatch();
  const fav = useSelector(selectFavoriteFilms)
  const [searchText, setSearchText] = useState('')





  useEffect(() => {
    dispatch(updateSearchText(searchText));

  }, [dispatch, searchText]);
  return (
    <header >
      <Navbar expand="lg" className="bg" style={{ backgroundColor: "rgb(210 209 209)", justifyContent: 'space-between', zIndex: '1' }}>
        <Container fluid>
          <GenreMenuNew />
          <div className='border-animated'>
            <Link className='text-decoration-none' to='/'>
              <Navbar.Brand className='navbar-logo' style={{ marginRight: '4rem', marginLeft: '2rem' }}>Towikk Movies</Navbar.Brand>
            </Link>
          </div>
          <Navbar.Collapse id="navbarScroll">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search movies"
                className="me-2"
                aria-label="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Link to='/search'>
                <Button variant="danger">Search</Button>
              </Link>
            </Form>
            <Nav
              className=" my-2 my-lg-0"
              style={{ maxHeight: '100px', position: 'absolute', top: '10%', right: '100px' }}
              navbarScroll>
              <Link style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }} to='/favorites'>
                <Nav.Link style={{ color: "whitesmoke" }} href="#action1">Favorites:
                </Nav.Link>
                <span className='numbers' style={{ backgroundColor: fav.length ? 'rgb(35 165 213)' : '#2d3d43', color: fav.length ? '#2d3d43' : 'hotpink' }}>{fav.length ? fav.length : 0}</span>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header >
  );
}

export default Header;