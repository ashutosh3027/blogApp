import React, { useState, useEffect } from 'react'
import { Modal, Form, InputGroup, Button } from 'react-bootstrap'
import moment from 'moment';
import { BsSend } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import RepliesComponent from './RepliesComponent';
import commentServices from '../services/commentServices';
import CommentModalLeave from './CommentModalLeave';
import '../Styles/post.css'

function CommentModal(props) {
    moment().format();
    const navigate = useNavigate();
    const [f, setF] = useState(false);
    const [f1, setF1] = useState(false);
    const [show, setShow] = useState(false);
    const [replyCounter, setReplyCounter] = useState(0);
    const [moreC, setMoreC] = useState(<></>);
    const [moreCn, setMoreCn] = useState(5);
    const [comments, setComments] = useState([]);
    const [newc, setNewc] = useState("empty");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const incrementCounter = () => setReplyCounter(replyCounter + 1);
    const decrementCounter = () => setReplyCounter(replyCounter - 1);
    useEffect(() => {
        if (props.show === true) {
            (async () => {
                const data = await commentServices.get(props.post_id);
                setComments(data.comments);
                setMoreCn(Math.min(data.comments.length, 5));
            })();
        }
    }, [props.show]);
    useEffect(() => {
        console.log("Hello", comments.length);
        if (comments.length > 0) {
            if (comments.length > moreCn) {
                setMoreC(<span className='d-block d-flex justify-content-between'>
                    <span className='more-comments text-muted' onClick={() => setMoreCn(moreCn + 5)}><b><u>More Comments</u></b></span>
                    <span className='text-muted'>{moreCn} of {comments?.length}</span>
                </span>);
            }
            if (moreCn >= comments?.length) setMoreC(<span className='d-flex justify-content-end'><span className='text-muted'>{comments?.length} of {comments?.length}</span></span>);
        }
        else setMoreC(<h1>No Comments. Be the first to comment</h1>)
        if (newc !== "empty") {
            const len = comments.length;
            setComments([newc, ...comments]);
            setMoreCn(moreCn + 1);
            setNewc("empty");
        }
    }, [moreCn, comments, newc]);
    useEffect(() => {
        if (replyCounter > 0) setF1(true);
        else setF1(false);
    }, [replyCounter])
    const closeModal = () => {
        console.log("Hello", f);
        if (f || f1) handleShow();
        else props.close();
    }
    const newComment = async (event) => {
        event.preventDefault(); setF(false)
        const message = event.target.comment.value;
        if(message.trim() === ""){
            toast.error("Can't Post an empty comment", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
            return;
        }
        const post_id = props.post_id;
        console.log(message, post_id);
        event.target.comment.value = "";
        const data = await commentServices.newComment(message, post_id);
        console.log(data);
        setNewc(data.newcomment);
    }
    const close1 = () => {
        setF(false);
        handleClose();
        props.close();
    }
    return (
        <Modal show={props.show} onHide={(e) => closeModal(e)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered scrollable={true}>
            <Modal.Header closeButton>
                <Modal.Title>{props.user}'s Post Comments</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {comments?.slice(0, moreCn).map((el) => {
                    return (
                        <div key={el.id} className='container-sm'>
                            <span><b className='user' onClick={() => navigate(`/profile/${el.User.id}`)}>{el.User.fullname}</b></span><br />
                            <span className='text-muted'>{moment(new Date(el.createdAt)).fromNow()}</span>
                            <p className='mb-0'>{el.message}</p>
                            <RepliesComponent key={el.id} post_id={props.post_id} comment_id={el.id} incrementCounter={incrementCounter} decrementCounter={decrementCounter} />
                        </div>
                    )
                })}
                {moreC}
            </Modal.Body>
            <Modal.Footer className='justify-content-start'>
                <Form onSubmit={newComment} className='w-100'>
                    <Form.Group controlId='comment'>
                        <InputGroup>
                            <Form.Control onInput={() => setF(true)} placeholder='Write a new comment here' />
                            <Button variant="outline-secondary" id="button-addon2" type='submit'><BsSend /></Button>
                        </InputGroup>
                    </Form.Group>
                </Form>
            </Modal.Footer>
            <CommentModalLeave show={show} handleClose={handleClose} close1={close1} />
        </Modal>
    )
}

export default CommentModal