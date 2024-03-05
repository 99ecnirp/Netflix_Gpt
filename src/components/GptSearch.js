import React from 'react'
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestions from './GptMovieSuggestions';
import { BACKGROUND_IMAGE } from "../utils/constant";

const GptSearch = () => {
  return (
    <div>
      <div className="fixed -z-10">           
        <img 
            className='h-screen w-screen object-cover'
            src={BACKGROUND_IMAGE}
            alt='background-img'
        >
        </img>
      </div>
      <div className=''>
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </div>
  );
};

export default GptSearch;