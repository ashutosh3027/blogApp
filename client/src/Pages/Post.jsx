import React, { useState, useEffect } from 'react'
import Navigation from '../Components/Navigation'
import { useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import postServices from '../services/postServices';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Post() {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!Cookies.get("jwt")) navigate('/');
    (async () => {
      console.log(id)
      const { posts } = await postServices.getPost(id);
      console.log(posts)
      setPost(posts[0]);
    })();
  }, []);
  const deletePost = async (id) => {
    try{
        await postServices.deletePost(id);
        toast.success("Success, Post Deleted", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            onClose: () => navigate('/home')
          });
    }catch(err){
        toast.error("Backend Error, Couldn't delete post", {
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
  return (
    <>
      <Navigation />
      <h1 className='mx-3 mt-2'>{post.title}</h1>
      <p>by Mallik Prabhanjan</p>
      <p className='text-muted'>{new Date(post.createdAt).toLocaleDateString("en-IN")}</p>
      <Button variant='secondary' href='/home'>All Posts</Button>
      <Button variant='info' href={'/edit/'+id}>Edit</Button>
      <Button variant='danger' onClick={() => deletePost(id)}>Delete</Button>
      <p>{post.body}</p>
    </>
  )
}

export default Post