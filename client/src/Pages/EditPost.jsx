import React, { useEffect, useState } from 'react'
import Navigation from '../Components/Navigation'
import { Form } from 'react-bootstrap'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import postServices from '../services/postServices';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

function EditPost() {
  const [post, setPost] = useState({});
  const { id } = useParams();
  useEffect(() => {
    if (!Cookies.get("jwt")) navigate('/');
    (async () => {
      const { posts } = await postServices.getPost(id);
      console.log(posts)
      setPost(posts[0]);
    })();
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    if (!Cookies.get("jwt")) navigate('/')
  }, []);
  const editPost = async (event) => {
    event.preventDefault();
    const body = event.target.body.value;
    try {
      await postServices.editPost(id, body);
      toast.success("Success, Post Edited", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        onClose: () => navigate('/home')
      });
    } catch (err) {
      toast.error("Backend Error, Couldn't create post", {
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
  const cancel = () => {

    navigate("/home");
  }
  return (
    <>
      <Navigation />
      <div className='container-sm'>
        <Form onSubmit={editPost}>
          <h1 className='m-3'>{post.title}</h1>
          <Form.Group className='mb-3 mx-3' controlId='body'>
            <Form.Label>Body</Form.Label>
            <Form.Control type='textarea' value={post.body} required />
          </Form.Group>
          <Form.Group className='mb-3 mx-3'>
            <Button variant='danger' onClick={cancel}>Cancel</Button>
            <Button variant='primary' type='submit' className="mx-3">Edit</Button>
          </Form.Group>
        </Form>
      </div>
    </>
  )
}

export default EditPost