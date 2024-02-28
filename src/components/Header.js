import React from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const handleSignout = () => {
    signOut(auth).then(() => {
      navigate('/')
    }).catch((error) => {
      navigate('/error')
    });
  };

  return (
    <div className='absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-screen flex justify-between'>
      <img 
        className='w-44'
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt='logo'
        >
      </img>
      {user && (
        <div className='p-2'>
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