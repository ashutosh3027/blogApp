import React, { useEffect, useState } from 'react'
import Navigation from '../Components/Navigation'
import { Form } from 'react-bootstrap'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import postServices from '../services/postServices';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import DiscardModal from '../Components/DiscardModal';

function EditPost() {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [obj,setObj] = useState({});
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
    setObj({
        title: "Discard",
        body: "Are you sure you want to leave. Your changes will be discarded.",
        b1: "Don't Leave",
        b2: "Leave",
        event: "cancel",
        b2c: "primary",
        close: handleClose
    });
    handleShow();
}
  return (
    <>
      <Navigation />
      <div className='container-sm'>
        <Form onSubmit={editPost}>
          <h1 className='m-3'>{post.title}</h1>
          <Form.Group className='mb-3 mx-3' controlId='body'>
            <Form.Label>Body</Form.Label>
            <Form.Control as='textarea' rows={3} defaultValue={post.body} required />
          </Form.Group>
          <Form.Group className='mb-3 mx-3'>
            <Button variant='danger' onClick={cancel}>Cancel</Button>
            <Button variant='primary' type='submit' className="mx-3">Edit</Button>
          </Form.Group>
        </Form>
      </div>
      <DiscardModal show={show} obj={obj} />
    </>
  )
}

export default EditPost