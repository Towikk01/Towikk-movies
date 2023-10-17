import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import { selectFavoriteFilms, updateSearchText } from '../../redux/filmSlice'

import './header.scss'
import GenreMenuNew from '../genre-menu-new/GenreMenuNew'

const Header = () => {
	const dispatch = useDispatch()
	const fav = useSelector(selectFavoriteFilms)
	const [searchText, setSearchText] = useState('')

	useEffect(() => {
		dispatch(updateSearchText(searchText))
	}, [dispatch, searchText])
	return (
		<header>
			<Navbar
				expand='lg'
				className='bg'
				style={{
					backgroundColor: '#fff',
					justifyContent: 'space-between',
					zIndex: '1',
				}}>
				<Container fluid>
					<GenreMenuNew />
					<Link className='text-decoration-none' to='/'>
						<Navbar.Brand
							className='logo'
							style={{ marginRight: '4rem', marginLeft: '2rem' }}>
							Towikk Movies
						</Navbar.Brand>
					</Link>
					<Navbar.Collapse id='navbarScroll'>
						<Form className='d-flex'>
							<Form.Control
								type='search'
								placeholder='Search films'
								className='me-2'
								aria-label='Search'
								value={searchText}
								onChange={(e) => setSearchText(e.target.value)}
							/>
							<Link to='/search'>
								<Button variant='dark'>Search</Button>
							</Link>
						</Form>
					</Navbar.Collapse>
					<div
						className=' my-2 my-lg-0 favorites-container'
						style={{ maxHeight: '100px', position: 'absolute', top: '10%' }}
						navbarScroll>
						<Link
							style={{
								textDecoration: 'none',
								display: 'flex',
								alignItems: 'center',
							}}
							to='/favorites'>
							<Nav.Link style={{ color: '#000' }} href='#action1'>
								Favorites:
							</Nav.Link>
							<span
								className='numbers'
								style={{
									backgroundColor: fav.length ? '#a9a6a3' : '#545251',
									color: fav.length ? '#fef9f5' : '#fff',
								}}>
								{fav.length ? fav.length : 0}
							</span>
						</Link>
					</div>
				</Container>
			</Navbar>
		</header>
	)
}

export default Header
