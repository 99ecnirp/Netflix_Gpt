import { API_OPTIONS } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addTrailerVideo } from '../utils/moviesSlice';
import { useEffect } from 'react'

const useMovieTrailer = (movieId) => {

  const dispatch = useDispatch();
  const trailerVideo = useSelector(store => store.movies.trailerVideo);
  const url = "https://api.themoviedb.org/3/movie/" + movieId + "/videos?language=en-US";

  const getMovieVideos = async () => {
    const data = await fetch(url, API_OPTIONS);
    const json = await data.json();
    const trailers  = json.results.filter(video => video.type === 'Trailer');
    const trailer = trailers.length ? trailers[0] : json.results[0];
    dispatch(addTrailerVideo(trailer));
  }

  useEffect(() => {
    !trailerVideo && getMovieVideos();
  }, []);
}

export default useMovieTrailer;