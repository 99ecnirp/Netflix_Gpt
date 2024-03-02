import { API_OPTIONS } from '../utils/constant';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addNowPlayingMovies } from '../utils/moviesSlice';

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();

    const getNowPlayingMovies = async () => {
        const url = 'https://api.themoviedb.org/3/movie/now_playing?page=1';
        fetch(url, API_OPTIONS)
        .then(res => res.json())
        .then(json => {
            dispatch(addNowPlayingMovies(json.results));
        })
        .catch(err => console.error('error:' + err));
    }

    useEffect(()=>{
        getNowPlayingMovies();
    }, []);
}

export default useNowPlayingMovies;