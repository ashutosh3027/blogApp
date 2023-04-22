import React, { useState, useEffect } from 'react'
import Navigation from '../Components/Navigation'
import { useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import postServices from '../services/postServices';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import DiscardModal from '../Components/DiscardModal';
import { FcLike } from 'react-icons/fc'
import { AiOutlineHeart } from 'react-icons/ai'

function Post() {
  const [posts, setPosts] = useState({});
  const [obj, setObj] = useState({});
  const [show, setShow] = useState(false);
  const [buttons, setButtons] = useState(<></>);
  const [like, setLike] = useState(<></>)
  const [ln, setLn] = useState(<></>);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!Cookies.get("jwt")) navigate('/');
    (async () => {
      console.log(id)
      const { post, user_id } = await postServices.getPost(id);
      console.log(post)
      if (!post) navigate("/*");
      setPosts(post);
      if (user_id === post.user_id) setButtons(<>
        <Button variant='info' href={'/edit/' + id}>Edit</Button>
        <Button variant='danger' onClick={() => deleteModal(id)}>Delete</Button>
      </>);
      if (post.Likes?.find((ele) => Number(ele.user_id) === Number(user_id))) {
        setLike(<span className='like' onClick={() => unlikePost(post.Likes?.length)}><FcLike />Like</span>);
        setLn(<span>You and {post.Likes?.length - 1} others like this post</span>);
      } else {
        setLike(<span className='like' onClick={() => likePost(post.Likes?.length)}><AiOutlineHeart />Like</span>);
        setLn(<span>{post.Likes?.length} like this post</span>);
      }
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
  const likePost = async (len) => {
    console.log(posts);
    setLike(<span className='like' onClick={() => unlikePost(len + 1)}><FcLike />Like</span>);
    setLn(<span>You and {len} others like this post</span>);
  }
  const unlikePost = async (len) => {
    setLike(<span className='like' onClick={() => likePost(len - 1)}><AiOutlineHeart />Like</span>);
    setLn(<span>{len - 1} like this post</span>);
  }
  return (
    <>
      <Navigation />
      <h1 className='mx-3 mt-2'>{posts.title}</h1>
      <p>by Mallik Prabhanjan</p>
      <p className='text-muted'>{new Date(posts.createdAt).toLocaleDateString("en-IN")}</p>
      <Button variant='secondary' href='/home'>All Posts</Button>
      {buttons}
      <p>{posts.body}</p>
      <p>{ln}</p>
      <hr />
      {like}
      <DiscardModal show={show} obj={obj} deletePost={deletePost} />
    </>
  )
}

export default Post