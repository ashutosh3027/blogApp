import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { FcLike } from 'react-icons/fc'
import { AiOutlineHeart } from 'react-icons/ai'
import { BiCommentDetail, BiShare } from 'react-icons/bi'
import likeServices from '../services/likeServices'
import '../Styles/post.css'

function PostCardComponent(props) {
    const navigate = useNavigate();
    const [edited, setEdited] = useState(<></>);
    const [buttons, setButtons] = useState(<></>);
    const [like, setLike] = useState(<></>)
    const [ln, setLn] = useState(<></>);
    const [cn, setCn] = useState(<></>);
    useEffect(() => {
        if (props.isUser) {
            setButtons(<>
                <Button variant='info' className='m-1' href={'/edit/' + props.post.id}>Edit</Button>
                <Button variant='danger' onClick={() => props.deleteModal(props.post.id)}>Delete</Button>
            </>);
        }
        if (props.post.createdAt !== props.post.updatedAt) setEdited(<sup><i>(edited)</i></sup>);
        if (props.post.Likes?.find((ele) => Number(ele.user_id) === Number(props.user_id))) {
            setLike(<span className='like' onClick={unlikePost}><FcLike />Like</span>);
            setLn(<span>You and {props.post.Likes?.length - 1} others like this post</span>);
        }
        else {
            setLike(<span className='like' onClick={likePost}><AiOutlineHeart />Like</span>);
            setLn(<span>{props.post.Likes?.length} like this post</span>);
        }
        setCn(<span>{props?.post.Comments?.length} Comments</span>)
    }, []);
    const likePost = async () => {
        const data = await likeServices.like(props.post.id);
        console.log(data);
        setLike(<span className='like' onClick={unlikePost}><FcLike />Like</span>);
        setLn(<span>You and {props.post.Likes?.length} others like this post</span>);
    }
    const unlikePost = async () => {
        const data = await likeServices.unlike(props.post.id);
        console.log(data);
        setLike(<span className='like' onClick={likePost}><AiOutlineHeart />Like</span>);
        setLn(<span>{props.post.Likes?.length} like this post</span>);
    }
    return (
        <Card key={props.post.id} className="mb-3">
            <Card.Body>
                <Card.Title className='mb-3'>{props.post.title}</Card.Title>
                <Card.Subtitle className='mb-2'>by <span className='fullname' onClick={() => navigate(`/profile/${props.post.User.id}`)}>{props.post.User.fullname}</span></Card.Subtitle>
                <Card.Text className='text-muted mb-3'>{new Date(props.post.createdAt).toLocaleDateString("en-IN")}{edited}</Card.Text>
                <Card.Text>{props.post.body}</Card.Text>
                <Button href={'/post/' + props.post.id}>Read More</Button>
                {buttons}
                <footer>
                    <p className='likes-comments'>
                        {ln}
                        {cn}
                    </p>
                    <hr />
                    <p className='likes-comments'>
                        {like}
                        <span className='comment'><BiCommentDetail />Comment</span>
                        <span className='share'><BiShare />Share</span>
                    </p>
                </footer>
            </Card.Body>
        </Card>
    )
}

export default PostCardComponent