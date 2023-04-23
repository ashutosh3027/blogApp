import React, { useState } from 'react'
import { Modal, Form, InputGroup, Button } from 'react-bootstrap'
import moment from 'moment';
import { BsReply, BsSend } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import commentServices from '../services/commentServices';
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
        event.preventDefault();
        console.log(event.target.comment.value);
        event.target.comment.value = "";
    }
    return (
        <Modal show={props.show} onHide={(e) => closeModal(e)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
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
                <div className='container-sm'>
                    <span><b className='user'>Mallik Prabhanjan</b></span><br />
                    <span className='text-muted'>{moment(Date.now()).fromNow()}</span>
                    <p>Message<br /><span className='reply'><BsReply />Reply</span></p>
                </div>
                <div className='container-sm'>
                    <span><b className='user'>Mallik Prabhanjan</b></span><br />
                    <span className='text-muted'>{moment(Date.now()).fromNow()}</span>
                    <p>Message<br /><span className='reply'><BsReply />Reply</span></p>
                </div>
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
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Leave Page?</Modal.Title>
                </Modal.Header>
                <Modal.Body>You haven't finished your comment yet. Do you want to leave without finishing?</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>Stay on Page</Button>
                    <Button variant='primary' onClick={() => { setF(false); handleClose(); props.close(); }}>Leave Page</Button>
                </Modal.Footer>
            </Modal>
        </Modal>
    )
}

export default CommentModal