import React, { useRef } from 'react';
import lang from '../utils/languageConstants';
import { useDispatch, useSelector } from 'react-redux';
import openai from '../utils/openai';
import { API_OPTIONS } from '../utils/constant';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {

  const searchText = useRef(null);
  const dispatch = useDispatch();
  
  const langKey = useSelector(store => store.config.lang);

  const searchMovieTMDB = async (movie) => {

    const url = 'https://api.themoviedb.org/3/search/movie?query='
      + movie +
      '&include_adult=false&language=en-US&page=1';
    const data = await fetch(url, API_OPTIONS);
    const json = await data.json();
    return json.results;
  }

  const handleGptSearchClick = async () => {

    // const gptQuery = "Act as a movie recommendation system and suggest some movies for the query " + searchText.current.value + ". Only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay,Don, Golmaal, Koi Mil Gaya";
    // console.log("Query->", gptQuery);
    // let gptResults;
    
      //   gptResults = await openai.chat.completions.create({
        //     messages: [{role: 'user', content: gptQuery}],
        //     model: 'gpt-3.5-turbo'
        //   });
        // } catch (error) {
          //   console.log("Error while openai request: ", error);
          // }
          
          // if(!gptResults || 
          //   !gptResults.choices[0] || 
          //   !gptResults.choices[0].message ||
          //   !gptResults.choices[0].message.content){
            //     console.log("Error hai bhai");
            //     return;
            // }
            // const gptMovies = gptResults.choices?.[0]?.message?.content.split(", ");
    const gptMovies = ["Koi Mil Gaya", "Don", "Superman", "Naruto", "Love Aaj Kal"];
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

    const tmdbResults = await Promise.all(promiseArray);
    dispatch(addGptMovieResult({movieNames: gptMovies, movieResults: tmdbResults}));
  };

  return (
    <div className='pt-[35%] md:pt-[10%] flex justify-center'>
      <form 
        className='w-full md:w-1/2 bg-black grid grid-cols-12'
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text" 
          placeholder={lang[langKey].gptSearchPlaceHolder}
          className='p-4 m-4 col-span-9'
        />
        <button
          className='py-2 px-2 m-4 bg-red-700 text-white rounded-lg col-span-3'
          onClick = {handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  )
}

export default GptSearchBar