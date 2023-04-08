import React, { useEffect } from 'react'
import Navigation from '../Components/Navigation'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import postServices from '../services/postServices';
import { toast } from 'react-toastify';

function NewPost() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!Cookies.get("jwt")) navigate('/')
    }, []);
    const newPost = async (event) => {
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        try{
            await postServices.newPost(title,body);
            toast.success("Success, Post Created", {
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
            <Navigation/>
            <h1 className='m-3'>New Post</h1>
            <div className='container-sm'>
                <Form onSubmit={newPost}>
                    <Form.Group className='m-3' controlId='title'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type='text' placeholder='Title' required />
                    </Form.Group>
                    <Form.Group className='mb-3 mx-3' controlId='body'>
                        <Form.Label>Body</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder='body' required />
                    </Form.Group>
                    <Form.Group className='mb-3 mx-3'>
                        <Button variant='danger' onClick={cancel}>Cancel</Button>
                        <Button variant='primary' type='submit' className="mx-3">Save</Button>
                    </Form.Group>
                </Form>
            </div>
        </>
    )
}

export default NewPost