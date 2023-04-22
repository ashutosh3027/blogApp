import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import authServices from '../services/authServices';
import postServices from '../services/postServices';
import Navigation from '../Components/Navigation';
import { Button } from 'react-bootstrap';
import ChangePasswordModal from '../Components/ChangePasswordModal';
import { toast } from 'react-toastify';
import DeleteUserModal from '../Components/DeleteUserModal';
import followServices from '../services/followServices';
import FollowModal from '../Components/FollowModal';
import PostCardComponent from '../Components/PostCardComponent';
import DiscardModal from '../Components/DiscardModal';
import '../Styles/profile.css'

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);
  const [obj, setObj] = useState({});
  const [obj1, setObj1] = useState({});
  useEffect(() => {
    if (!Cookies.get("jwt")) navigate('/');
    (async () => {
      const data = await authServices.getUser();
      const { follows } = await followServices.getFollows();
      const { followings } = await followServices.getFollowings();
      const { posts } = await postServices.getPostsById(data.user.id);
      console.log(data.user, follows, followings, posts);
      setUser({ ...data.user, follows: follows, followings: followings, fc: follows.length, flc: followings.length });
      setPosts([...posts])
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
  const deletePost = async (id) => {
    try {
      await postServices.deletePost(id);
      toast.success("Success, Post Deleted", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        onClose: () => { handleClose3(); navigate('/') }
      });
    } catch (err) {
      const msg = err.response.data.status || "Backend Error, Couldn't delete post";
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
  const deleteModal = (id) => {
    setObj1({
      title: "Delete Post",
      body: "Are you sure you want to delete this post?",
      b1: "Don't Delete",
      b2: "Delete",
      event: "deletepost",
      b2c: "danger",
      id,
      close: handleClose3
    });
    handleShow3();
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
      <div className='posts'>
        {
          posts.map((el) => {
            return (<PostCardComponent key={el.id} post={el} isUser={true} deleteModal={deleteModal} />)
          })
        }
      </div>
      <ChangePasswordModal show={show} close={handleClose} changePass={changePass} />
      <DeleteUserModal show={show1} close={handleClose1} deleteUser={deleteUser} />
      <FollowModal show={show2} close={handleClose2} obj={obj} />
      <DiscardModal show={show3} obj={obj1} deletePost={deletePost} />
    </>
  )
}

export default Profile