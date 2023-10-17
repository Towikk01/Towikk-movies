import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
	setCurrentFilm,
	setCurrentFilmError,
	setCurrentFilmLoading,
	selectCurrentFilm,
	selectCurrentFilmLoading,
	selectCurrentFilmError,
	addToFavoriteFilms,
	removeFromFavoriteFilms,
	selectFavoriteFilms,
	setMovieCreditsResult,
	setMovieCreditsError,
	setMovieCreditsLoading,
	setMovieImages,
	setMovieImagesError,
	setMovieImagesLoading,
	selectMovieImagesResult,
	selectApiKey,
} from '../../redux/filmSlice'
import { Spinner, Card } from 'react-bootstrap'
import { AiFillStar } from 'react-icons/ai'
import './film-page.scss'

import Carousel from '../carousel/Carousel'

const FilmPage = () => {
	const { filmId } = useParams()

	const dispatch = useDispatch()
	const film = useSelector(selectCurrentFilm)
	const loading = useSelector(selectCurrentFilmLoading)
	const error = useSelector(selectCurrentFilmError)
	const favorites = useSelector(selectFavoriteFilms)
	const images = useSelector(selectMovieImagesResult)
	const apiKey = useSelector(selectApiKey)
	const handleAddToFavorites = () => {
		if (!isFilmFav) {
			dispatch(addToFavoriteFilms(film))
		} else {
			dispatch(removeFromFavoriteFilms(film))
		}
	}

	const isFilmFav = favorites.some((e) => e.id === film?.id)

	useEffect(() => {
		if (filmId) {
			dispatch(setCurrentFilmLoading(true))
			dispatch(setCurrentFilmError(false))
			const options = {
				method: 'GET',
				headers: {
					accept: 'application/json',
					Authorization:
						'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjBjODcwYTk5OTc4NTJlMWQ3NDIzYzVlOTA2OTE1MyIsInN1YiI6IjY0Y2EyNGQxMGI3NGU5MDBjOTk4M2YyYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SOzPUQUmdmt2GO6P_zZ8B30RBLuubJQLTwZlvzS3vT0',
				},
			}
			const url = `https://api.themoviedb.org/3/movie/${filmId}?api_key=${apiKey}`
			fetch(url, options)
				.then((res) => res.json())
				.then((res) => {
					dispatch(setCurrentFilm(res))
				})
				.catch((error) => {
					dispatch(setCurrentFilmError(true))
				})
				.finally(() => {
					dispatch(setCurrentFilmLoading(false))
				})
			fetch(
				`https://api.themoviedb.org/3/movie/${filmId}/credits?api_key=${apiKey}`
			)
				.then((res) => res.json())
				.then((res) => {
					dispatch(setMovieCreditsResult(res.cast))
				})
				.catch((error) => {
					dispatch(setMovieCreditsError(true))
				})
				.finally(() => {
					dispatch(setMovieCreditsLoading(false))
				})
			fetch(
				`https://api.themoviedb.org/3/movie/${filmId}/images?api_key=${apiKey}`
			)
				.then((res) => res.json())
				.then((res) => {
					dispatch(setMovieImages(res.backdrops))
				})
				.catch((error) => dispatch(setMovieImagesError(true)))
				.finally(() => {
					dispatch(setMovieImagesLoading(false))
				})
		}
	}, [filmId, dispatch, apiKey])

	if (loading) {
		return (
			<Spinner animation='border' role='status'>
				<span className='visually-hidden'>Loading...</span>
			</Spinner>
		)
	}

	if (error) {
		return <h1 className='text-danger'>Sorry, something wen't wrong...</h1>
	}

	return (
		<div className='film-page'>
			<img
				className='demo-bg'
				src={`https://image.tmdb.org/t/p/w500${film?.backdrop_path} `}
				alt={film?.backdrop_path}
			/>
			<div className='film-image'>
				<Card.Img
					key={film.id}
					src={`https://image.tmdb.org/t/p/w500${film?.poster_path}`}
					alt={film.title}
				/>
			</div>
			<div className='film-details'>
				<div className='film-text'>
					<h2 className='film-title'>{film.title}</h2>
					<p>{film.tagline}</p>
					<span>
						{film.runtime} minutes · {film.release_date}
					</span>
					<span>
						{film.vote_average.toFixed(1)} <AiFillStar />
					</span>
					<span>Overview:</span>
					<p className='film-description'>{film.overview}</p>
				</div>
				<h3 className='genres'>Genres:</h3>
				<div className='film-actions'>
					<div className='film-genres'>
						{film.genres &&
							film.genres.map((genre) => (
								<Link
									style={{ textDecoration: 'none' }}
									key={genre.id}
									to={`/genre/${genre.id}`}>
									<button
										style={{ border: 'none' }}
										key={genre.name}
										className='film-genres__item'>
										{genre.name}
									</button>
								</Link>
							))}
					</div>
					<button
						onClick={handleAddToFavorites}
						style={{
							backgroundColor: isFilmFav ? 'darkgrey' : 'hotpink',
							border: 'none',
							display: 'flex',
							alignItems: 'center',
							gap: '5px',
							padding: '10px 25px',
							borderRadius: '50px',
						}}
						className={`${isFilmFav ? 'text-secondary' : 'text-light'}`}>
						{isFilmFav ? 'Remove from' : 'Add to'} favorite list
						<AiFillStar />
					</button>
				</div>
				<div>
					<h2 className='images'>Images</h2>
					<div className='carousel-container'>
						{images.map((image, index) => (
							<img
								key={image.id}
								style={{ width: '100%' }}
								className='carousel-container__img'
								src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
								alt={image.index}
							/>
						))}
					</div>
				</div>
				<div>
					<h2 className='cast'>Cast</h2>
					<Carousel />
				</div>
			</div>
		</div>
	)
}

export default FilmPage
