import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { FcLike } from 'react-icons/fc'
import { AiOutlineHeart } from 'react-icons/ai'
import { BiCommentDetail, BiShare } from 'react-icons/bi'
import likeServices from '../services/likeServices'
import CommentModal from './CommentModal'
import '../Styles/post.css'

function PostCardComponent(props) {
    const navigate = useNavigate();
    const [edited, setEdited] = useState(<></>);
    const [buttons, setButtons] = useState(<></>);
    const [like, setLike] = useState(<></>);
    const [likesArray, setLikes] = useState([]);
    const [type, setType] = useState("");
    const [ln, setLn] = useState(<></>);
    const [cn, setCn] = useState(<></>);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        if (props.isUser) {
            setButtons(<>
                <Button variant='info' className='m-1' href={'/edit/' + props.post.id}>Edit</Button>
                <Button variant='danger' onClick={() => props.deleteModal(props.post.id)}>Delete</Button>
            </>);
        }
        if (props.post.createdAt !== props.post.updatedAt) setEdited(<sup><i>(edited)</i></sup>);
        (async () => {
            const { likes } = await likeServices.get(props.post.id);
            console.log(likes);
            setLikes(likes);
            if (likes?.find((ele) => Number(ele.user_id) === Number(props.user_id))) {
                setLike(<span className='like' onClick={() => setType("unlike")}><FcLike />Like</span>);
                setLn(<span>You and {likes?.length - 1} others like this post</span>);
            }
            else {
                setLike(<span className='like' onClick={() => setType("like")}><AiOutlineHeart />Like</span>);
                setLn(<span>{likes?.length} like this post</span>);
            }
            setCn(<span>{props?.post.Comments?.length} Comments</span>)
        })();
    }, []);
    useEffect(() => {
        (async () => {
            if (type === "like") {
                let likes = likesArray;
                const { newlike } = await likeServices.like(props.post.id);
                likes.unshift(newlike);
                setLike(<span className='like' onClick={() => setType("unlike")}><FcLike />Like</span>);
                setLn(<span>You and {likes?.length - 1} others like this post</span>);
                setLikes(likes);
            } else if (type === "unlike") {
                let likes = likesArray;
                const data = await likeServices.unlike(props.post.id);
                console.log(data);
                function removeObj(value, index, arr) {
                    if (Number(value.user_id) === Number(props.user_id)) return false;
                    return true;
                }
                likes = likes.filter(removeObj);
                setLike(<span className='like' onClick={() => setType("like")}><AiOutlineHeart />Like</span>);
                setLn(<span>{likes?.length} like this post</span>);
                setLikes(likes);
            }
        })();
    }, [type]);
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
                        <span className='comment' onClick={handleShow}><BiCommentDetail />Comment</span>
                        <span className='share'><BiShare />Share</span>
                    </p>
                </footer>
            </Card.Body>
            <CommentModal show={show} close={handleClose} comments={props.post.Comments} user={props.post.User.fullname} post_id={props.post.id} />
        </Card>
    )
}

export default PostCardComponent