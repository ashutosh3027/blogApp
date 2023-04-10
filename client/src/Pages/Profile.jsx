import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import authServices from '../services/authServices';
import Navigation from '../Components/Navigation';
import { Button } from 'react-bootstrap';
import ChangePasswordModal from '../Components/ChangePasswordModal';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    if (!Cookies.get("jwt")) navigate('/');
    (async () => {
      const data = await authServices.getUser();
      console.log(data.user);
      setUser(data.user);
    })();
  }, [])
  const changePass = async (event) => {
    event.preventDefault();
    console.log(event);
    return;
  }
  return (
    <>
      <Navigation />
      <h1>Profile</h1>
      <h2>Name: {user.fullname}</h2>
      <h3>Email: {user.email}</h3>
      <Button variant='primary' onClick={handleShow}>Change Password</Button>
      <Button variant='danger'>Delete Account</Button>
      <ChangePasswordModal show={show} close={handleClose} changePass={changePass} />
    </>
  )
}

export default Profile