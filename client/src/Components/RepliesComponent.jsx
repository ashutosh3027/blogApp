import React, { useState, useEffect, useRef } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { BsReply, BsArrowDownShort, BsSend } from 'react-icons/bs'
import { toast } from 'react-toastify';
import replyServices from '../services/replyServices'
import '../Styles/post.css'

function RepliesComponent(props) {
    moment().format();
    const inputRef = useRef(null)
    const navigate = useNavigate();
    const [replies, setReplies] = useState([]);
    const [moreR, setMoreR] = useState(<></>);
    const [num, setNum] = useState(0);
    const [show, setShow] = useState(false);
    const handleShow = () => { setShow(true); props.incrementCounter(); }
    const handleClose = () => { setShow(false); props.decrementCounter(); }
    useEffect(() => {
        (async () => {
            const data = await replyServices.get(props.post_id, props.comment_id);
            console.log(data);
            setReplies(data.replies);
        })();
    }, []);
    useEffect(() => {
        if (num === 0 && replies.length > 0) {
            setMoreR(<>
                <span className='reply reply-down' onClick={() => setNum(Math.min(num + 5, replies.length))}>{replies.length} Replies<BsArrowDownShort /></span>
            </>);
        } else if (num < replies.length) {
            setMoreR(<>
                <span className='text-muted reply' onClick={() => setNum(Math.min(num + 5, replies.length))}>View More Replies</span>
            </>);
        } else setMoreR(<></>);
    }, [replies, num]);
    useEffect(() => {
        if(show)inputRef.current.focus();
    },[show])
    const newReply = async (event) => {
        event.preventDefault();
        const message = event.target.reply.value;
        if (message.trim() === "") {
            toast.error("Can't Post an empty reply", {
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
        event.target.reply.value = "";
        const data = await replyServices.new(message, props.comment_id);
        setReplies([data.reply, ...replies]);
        setNum(num + 1);
        handleClose();
    }
    return (
        <div className='reply-container'>
            <p><span className='reply' onClick={handleShow}><BsReply /><small>Reply</small></span></p>
            {replies?.slice(0, num).map(el => {
                return (
                    <div key={el.id}>
                        <span><b className='user' onClick={() => navigate(`/profile/${el.User.id}`)}>{el.User.fullname}</b></span><br />
                        <span className='text-muted'>{moment(new Date(el.createdAt)).fromNow()}</span>
                        <p>{el.message}</p>
                    </div>
                )
            })}
            {moreR}
            {show ? (
                <Form onSubmit={newReply}>
                    <Form.Group controlId='reply'>
                        <InputGroup>
                            <Form.Control placeholder='Write a reply' ref={inputRef}/>
                            <Button variant="outline-secondary" id="button-addon2" type='submit'><BsSend /></Button>
                        </InputGroup>
                    </Form.Group>
                </Form>
            ) : (<></>)}
        </div>
    )
}

export default RepliesComponent