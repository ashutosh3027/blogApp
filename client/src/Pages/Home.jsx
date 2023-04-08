import React, {useEffect} from 'react'
import Navigation from '../Components/Navigation'
import background from '../Images/background.jpeg'
import '../Styles/home.css'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if (Cookies.get("jwt")) navigate('/home')
  }, []);
  return (
    <>
      <Navigation />
      <div className='parent'>
        <div className='child1'>
          <h1>BlogApp</h1>
          <h2>Write your own blogs</h2>
          <p>Join our community of avid readers and writers, and be a part of a platform that celebrates creativity and learning.</p>
        </div>
        <div className='child2'>
          <img src={background} alt='background' className='bg-img'></img>
        </div>
      </div>
    </>
  )
}

export default Home