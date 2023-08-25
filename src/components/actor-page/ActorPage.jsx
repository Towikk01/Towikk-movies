import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentActorError, setCurrentActorLoading, selectCurrentActorLoading, selectCurrentActorError, selectApiKey, selectCurrentActorResult, setCurrentActorResult, selectCurrentActorImages, setCurrentActorImages, selectCurrentActorCast, setCurrentActorCast } from '../../redux/filmSlice';
import { Spinner, Card } from 'react-bootstrap';
import { AiFillStar } from 'react-icons/ai';
import './actor-page.scss';
import background from '../../assets/fvhvvx1wm6u71.jpg'
import { Link } from 'react-router-dom';

const ActorPage = () => {
  const { personId } = useParams();
  const dispatch = useDispatch();

  const actor = useSelector(selectCurrentActorResult);
  const loading = useSelector(selectCurrentActorLoading);
  const error = useSelector(selectCurrentActorError);
  const apiKey = useSelector(selectApiKey);
  const cast = useSelector(selectCurrentActorCast)
  const images = useSelector(selectCurrentActorImages)


  const imageUrl = cast?.poster_path !== null
    ? `https://image.tmdb.org/t/p/w500${cast.poster_path}`
    : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png';


  console.log(cast)

  useEffect(() => {
    if (personId) {
      dispatch(setCurrentActorLoading(true));
      dispatch(setCurrentActorError(false));

      const actorUrl = `https://api.themoviedb.org/3/person/${personId}?api_key=${apiKey}`;
      fetch(actorUrl)
        .then(res => res.json())
        .then(data => {
          dispatch(setCurrentActorResult(data));
        })
        .catch(error => {
          dispatch(setCurrentActorError(true));
        })
        .finally(() => {
          dispatch(setCurrentActorLoading(false));
        });
    }
    fetch(`https://api.themoviedb.org/3/person/${personId}/images?api_key=${apiKey}`).then(res => res.json()).then(res => dispatch(setCurrentActorImages(res.profiles))).catch(error => console.log(error))
    fetch(`https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${apiKey}`).then(res => res.json()).then(res => dispatch(setCurrentActorCast(res.cast))).catch(error => console.log(error))

  }, [personId, apiKey, dispatch]);

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (error) {
    return (
      <h1 className="text-danger">Sorry, something went wrong...</h1>
    );
  }




  return (
    <div className="actor-page">
      <img className='demo-bg' src={background} alt={actor?.backdrop_path} />
      <div className="actor-image">
        <Card.Img src={`https://image.tmdb.org/t/p/w500${actor?.profile_path}`} alt={actor.name} style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="actor-details">
        <div className='actor-text'>
          <div >
            <h2 className="actor-title">{actor.name}</h2>
          </div>
          <div className='actor-text__header flex-column align-items-start'>
            <h4>Personal info</h4>
            <div className='d-flex flex-column' style={{ textAlign: "left" }}>
              <span>Date of birth:{actor.birthday}</span>
              <span>Now {actor.known_for_department.toLowerCase()}</span>
              <span>Rate: {actor.popularity.toFixed(1)} <AiFillStar /></span>
            </div>
          </div>
          <p className="actor-description">{actor.biography}</p>
        </div>
        <div>
          <h2 style={{ textAlign: 'left', paddingTop: '2rem' }}>Images</h2>
          <div className="carousel-container">
            {images.map((image) => (
              <img className='carousel-container__image' src={`https://image.tmdb.org/t/p/w500${image.file_path}`} alt={image.index} />
            ))}
          </div>
        </div>
        <div>
          <h2 style={{ textAlign: 'left', paddingTop: '2rem' }}>Cast</h2>
          <div className="carousel-container">
            {cast.map((cast) => (
              <Link className='text-decoration-none' to={`/${cast.id}`}>
                <div>
                  <img className='carousel-container__img' src={imageUrl} alt={cast.id} />
                  <h5 style={{ paddingTop: '0.5rem', color: 'whitesmoke' }}>{cast.title}</h5>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActorPage;
