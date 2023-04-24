import React, { useState } from 'react'
import { Modal, Form, InputGroup, Button } from 'react-bootstrap'
import moment from 'moment';
import { BsReply, BsSend } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import commentServices from '../services/commentServices';
import CommentModalLeave from './CommentModalLeave';
import '../Styles/post.css'

function CommentModal(props) {
    moment().format();
    const navigate = useNavigate();
    const [f, setF] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const closeModal = () => {
        console.log("Hello", f);
        if (f) handleShow();
        else props.close();
    }
    const newComment = async (event) => {
        event.preventDefault(); setF(false)
        const message = event.target.comment.value;
        const post_id = props.post_id;
        console.log(message, post_id);
        event.target.comment.value = "";
        const data = await commentServices.newComment(message, post_id);
        console.log(data);
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
                {props?.comments?.map((el) => {
                    return (
                        <div key={el.id} className='container-sm'>
                            <span><b className='user' onClick={() => navigate(`/profile/${el.User.id}`)}>{el.User.fullname}</b></span><br />
                            <span className='text-muted'>{moment(new Date(el.createdAt)).fromNow()}</span>
                            <p>{el.message}<br /><span className='reply'><BsReply />Reply</span></p>
                        </div>
                    )
                })}
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