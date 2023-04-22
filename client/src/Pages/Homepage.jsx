import React, { useEffect, useState } from 'react'
import Navigation from '../Components/Navigation'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import postServices from '../services/postServices';
import Card from 'react-bootstrap/Card';
import { toast } from 'react-toastify';
import DiscardModal from '../Components/DiscardModal';
import PostCardComponent from '../Components/PostCardComponent';
import '../Styles/homepage.css'

function Homepage() {
    const [post, setPost] = useState([]);
    const [obj, setObj] = useState({});
    const [show, setShow] = useState(false);
    const [id, setId] = useState(0);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();
    useEffect(() => {
        if (!Cookies.get("jwt")) navigate('/');
        (async () => {
            const data = await postServices.getPosts();
            console.log(data.posts);
            console.log(data);
            setPost(data.posts);
            setId(data.user_id);
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
        <div className='m-3'>
            <Navigation />
            <h1 className='my-3'>This is home page of the user</h1>
            <h2 className='mb-3'>Blog Articles</h2>
            <Button variant="success" href="/newpost" className='mb-3'>New Post</Button>
            <div className='posts'>
                {
                    post.map((el) => {
                        return (<PostCardComponent key={el.id} post={el} isUser={id === el.User.id} deleteModal={deleteModal} />)
                    })
                }
            </div>
            <DiscardModal show={show} obj={obj} deletePost={deletePost} />
        </div>
    )
}

export default Homepage