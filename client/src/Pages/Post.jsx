import React, { useState, useEffect } from 'react'
import Navigation from '../Components/Navigation'
import { useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import postServices from '../services/postServices';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import DiscardModal from '../Components/DiscardModal';

function Post() {
  const [post, setPost] = useState({});
  const [obj, setObj] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!Cookies.get("jwt")) navigate('/');
    (async () => {
      console.log(id)
      const { posts } = await postServices.getPost(id);
      console.log(posts)
      if(posts.length===0)navigate("/*");
      setPost(posts[0]);
    })();
  }, []);
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
        onClose: () => { handleClose(); navigate('/') }
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
    setObj({
      title: "Delete Post",
      body: "Are you sure you want to delete this post?",
      b1: "Don't Delete",
      b2: "Delete",
      event: "deletepost",
      b2c: "danger",
      id,
      close: handleClose
    });
    handleShow();
  }
  return (
    <>
      <Navigation />
      <h1 className='mx-3 mt-2'>{post.title}</h1>
      <p>by Mallik Prabhanjan</p>
      <p className='text-muted'>{new Date(post.createdAt).toLocaleDateString("en-IN")}</p>
      <Button variant='secondary' href='/home'>All Posts</Button>
      <Button variant='info' href={'/edit/' + id}>Edit</Button>
      <Button variant='danger' onClick={() => deleteModal(id)}>Delete</Button>
      <p>{post.body}</p>
      <DiscardModal show={show} obj={obj} deletePost={deletePost} />
    </>
  )
}

export default Post