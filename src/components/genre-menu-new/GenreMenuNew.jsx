import React, { useState } from 'react'
import { Button, Collapse } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './genre-menu-new.scss'

const buttonList = [
	{
		name: 'Popular movies',
		to: '/popular-movies',
		variant: 'light',
	},
	{
		name: 'Top rated movies',
		to: '/top-rated',
		variant: 'light',
	},
	{
		name: 'Popular people',
		to: '/popular-actors',
		variant: 'light',
		divider: true,
	},
	{
		name: 'Action',
		to: '/genre/28',
		variant: 'warning',
		titled: true,
	},
	{
		name: 'Adventure',
		to: '/genre/12',
		variant: 'warning',
	},
	{
		name: 'Animation',
		to: '/genre/16',
		variant: 'warning',
	},
	{
		name: 'Comedy',
		to: '/genre/35',
		variant: 'warning',
	},
	{
		name: 'Crime',
		to: '/genre/80',
		variant: 'warning',
	},
	{
		name: 'Documentary',
		to: '/genre/99',
		variant: 'warning',
	},
	{
		name: 'Drama',
		to: '/genre/18',
		variant: 'warning',
	},
	{
		name: 'Family',
		to: '/genre/10751',
		variant: 'warning',
	},
	{
		name: 'Fantasy',
		to: '/genre/14',
		variant: 'warning',
	},
	{
		name: 'History',
		to: '/genre/36',
		variant: 'warning',
	},
	{
		name: 'Horror',
		to: '/genre/27',
		variant: 'warning',
	},
	{
		name: 'Music',
		to: '/genre/10402',
		variant: 'warning',
	},
	{
		name: 'Mystery',
		to: '/genre/9648',
		variant: 'warning',
	},
	{
		name: 'Romance',
		to: '/genre/10749',
		variant: 'warning',
	},
	{
		name: 'Science Fiction',
		to: '/genre/878',
		variant: 'warning',
	},
	{
		name: 'TV Movie',
		to: '/genre/10770',
		variant: 'warning',
	},
	{
		name: 'Thriller',
		to: '/genre/53',
		variant: 'warning',
	},
	{
		name: 'War',
		to: '/genre/10752',
		variant: 'warning',
	},
	{
		name: 'Western',
		to: '/genre/37',
		variant: 'warning',
	},
]

const GenreMenuNew = () => {
	const [open, setOpen] = useState(false)

	return (
		<div>
			<div
				id='overlay'
				style={{ display: open ? 'block' : 'none' }}
				onClick={() => setOpen(!open)}></div>
			<Button onClick={() => setOpen(!open)} variant='light' size='sm'>
				<span className='navbar-toggler-icon'></span>
			</Button>
			<div
				className='position-fixed h-100 bg-dark text-light'
				style={{ top: 0, left: 0, overflowY: 'scroll' }}>
				<Collapse in={open} dimension='width'>
					<div>
						<h3 style={{ wordBreak: 'break', width: '90%', marginLeft: '7px' }}>
							Discover
						</h3>
						{buttonList.map((item, index) => (
							<div style={{ margin: '5px' }} key={index}>
								{item.titled && (
									<h3
										style={{
											wordBreak: 'break',
											width: '95%',
											textAlign: 'center',
										}}>
										Movie genres
									</h3>
								)}
								<Link to={item.to}>
									<Button
										variant={item.variant}
										className='mb-2 w-100'
										onClick={() => setOpen(!open)}>
										<span className='text-nowrap'>{item.name}</span>
									</Button>
								</Link>
								{item.divider && <hr />}
							</div>
						))}
					</div>
				</Collapse>
			</div>
		</div>
	)
}

export default GenreMenuNew
