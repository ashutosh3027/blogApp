import React, { useEffect, useState } from 'react'
import Navigation from '../Components/Navigation'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import postServices from '../services/postServices';
import Card from 'react-bootstrap/Card';
import { toast } from 'react-toastify';

function Homepage() {
    const [post, setPost] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (!Cookies.get("jwt")) navigate('/');
        (async () => {
            const { posts } = await postServices.getPosts();
            console.log(posts)
            setPost(posts);
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
                onClose: () => navigate('/')
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
        <div className='m-3'>
            <Navigation />
            <h1 className='my-3'>This is home page of the user</h1>
            <h2 className='mb-3'>Blog Articles</h2>
            <Button variant="success" href="/newpost" className='mb-3'>New Post</Button>
            <div className='posts'>
                {
                    post.map((el) => {
                        return (
                            <Card key={el.id} className="mb-3">
                                <Card.Body>
                                    <Card.Title className='mb-3'>{el.title}</Card.Title>
                                    <Card.Subtitle className='mb-2'>by Mallik Prabhanjan</Card.Subtitle>
                                    <Card.Text className='text-muted mb-3'>{new Date(el.createdAt).toLocaleDateString("en-IN")}</Card.Text>
                                    <Card.Text>{el.body}</Card.Text>
                                    <Button href={'/post/'+el.id}>Read More</Button>
                                    <Button variant='info' className='m-1' href={'/edit/'+el.id}>Edit</Button>
                                    <Button variant='danger' onClick={()=>deletePost(el.id)}>Delete</Button>
                                </Card.Body>
                            </Card>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Homepage