import React from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { useEffect } from 'react';
import { LOGO } from '../utils/constant';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const showGptSearch = useSelector(store => store.gpt.showGptSearch);
  const dispatch = useDispatch();

  const handleSignout = () => {
    signOut(auth)
    .then(() => {})
    .catch((error) => {
      navigate('/error')
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          
          const {uid, email, displayName, photoURL} = user;
          dispatch(addUser({uid, email, displayName, photoURL}));
          
          navigate("/browse");
        } else {
          dispatch(removeUser());
          navigate("/");
        }
    });  

    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className='absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-screen flex justify-between'>
      <img 
        className='w-44'
        src={LOGO}
        alt='logo'
        >
      </img>
      {user && (
        <div className='flex p-2'>
          {showGptSearch && (
            <select 
              className='p-2 bg-gray-900 text-white m-2'
              onChange={handleLanguageChange}
            >
              <option value='en'>English</option>
              <option value='hindi'>Hindi</option>
            </select>
          )}
          <button 
            className='mx-4 my-2 py-2 px-4 bg-purple-800 text-white rounded-lg'
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
          <img
            className='w-10 h-10 '
            alt='usericon'
            // src="https://i.pinimg.com/736x/99/fd/e6/99fde65b336d554e117883d1aa76f0f0.jpg"
            src={user.photoURL}
          >
          </img>
          <button 
            onClick={handleSignout}
            className='font-bold text-white'>
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}

export default Header;