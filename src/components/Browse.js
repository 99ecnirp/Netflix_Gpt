import Header from './Header'
import { API_OPTIONS } from '../utils/constant';
import { useEffect } from 'react';

const Browse = () => {

  const getNowPlayingMovies = async () => {
    const url = 'https://api.themoviedb.org/3/movie/now_playing?page=1';
    fetch(url, API_OPTIONS)
      .then(res => res.json())
      .then(json => console.log("------------------------",json))
      .catch(err => console.error('error:' + err));
  }

  useEffect(()=>{
    getNowPlayingMovies();
  }, []);

  return (
    <div>
      <Header />
    </div>
  )
}

export default Browse