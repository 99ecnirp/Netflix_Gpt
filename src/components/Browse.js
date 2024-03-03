import { useSelector } from 'react-redux';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import Header from './Header'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import GptSearch from './GptSearch';


const Browse = () => {

  const showGptSearch = useSelector(store => store.gpt.showGptSearch);

  useNowPlayingMovies();

  return (
    <div>
      <Header />
      {showGptSearch ? 
        (<GptSearch />) : 
        (<>
          <MainContainer />
          <SecondaryContainer /> 
        </>)} 
    </div>
  )
}

export default Browse