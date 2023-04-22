import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import authServices from '../services/authServices';
import Navigation from '../Components/Navigation';
import { Button } from 'react-bootstrap';
import ChangePasswordModal from '../Components/ChangePasswordModal';
import { toast } from 'react-toastify';
import DeleteUserModal from '../Components/DeleteUserModal';
import followServices from '../services/followServices';
import FollowModal from '../Components/FollowModal';
import '../Styles/profile.css'

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [obj, setObj] = useState({});
  useEffect(() => {
    if (!Cookies.get("jwt")) navigate('/');
    (async () => {
      const data = await authServices.getUser();
      const { follows } = await followServices.getFollows();
      const { followings } = await followServices.getFollowings();
      console.log(data.user, follows, followings);
      setUser({ ...data.user, follows: follows, followings: followings, fc: follows.length, flc: followings.length });
    })();
  }, [])
  const changePass = async (event) => {
    event.preventDefault();
    const oldpass = event.target.oldpass.value;
    const newpass = event.target.newpass.value;
    const newconpass = event.target.newconpass.value;
    console.log(oldpass, newpass, newconpass);
    if (newpass !== newconpass) {
      toast.warning('New Password does not match with confirm password. Please type again.', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    try {
      const data = await authServices.changePassword(oldpass, newpass);
      console.log(data)
      toast.success("Password Changed", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        onClose: () => handleClose()
      });
    } catch (err) {
      const msg = err.response.data.status || "Backend error, Password couldn't be changed";
      toast.error(msg, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    }
  }
  const deleteUser = async (event) => {
    event.preventDefault();
    const password = event.target.pass.value;
    try {
      const data = await authServices.deleteAccount(password);
      console.log(data)
      toast.success("Success Account Deleted", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        onClose: () => { handleClose(); navigate("/") }
      });
    } catch (err) {
      const msg = err.response.data.status || "Backend error, Password couldn't be changed";
      toast.error(msg, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    }
  }
  const showFollows = () => {
    setObj({
      "title": "Your Follows",
      "body": user.follows
    });
    handleShow2();
  }
  const showFollowings = () => {
    setObj({
      "title": "Your Followings",
      "body": user.followings
    });
    handleShow2();
  }
  return (
    <>
      <Navigation />
      <h1>Profile</h1>
      <h2>Name: {user.fullname}</h2>
      <h3>Email: {user.email}</h3>
      <p>Account Created On: {new Date(user.createdAt).toLocaleDateString("en-IN")}</p>
      <p><span className='follow' onClick={showFollows}>Follows: {user.fc}</span></p>
      <p><span className='follow' onClick={showFollowings}>Followings: {user.flc}</span></p>
      <Button variant='primary' onClick={handleShow}>Change Password</Button>
      <Button variant='danger' onClick={handleShow1}>Delete Account</Button>
      <ChangePasswordModal show={show} close={handleClose} changePass={changePass} />
      <DeleteUserModal show={show1} close={handleClose1} deleteUser={deleteUser} />
      <FollowModal show={show2} close={handleClose2} obj={obj} />
    </>
  )
}

export default Profile