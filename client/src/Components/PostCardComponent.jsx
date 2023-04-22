import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function PostCardComponent(props) {
    const navigate = useNavigate();
    const [edited, setEdited] = useState(<></>);
    const [buttons, setButtons] = useState(<></>);
    useEffect(() => {
        if (props.isUser) {
            setButtons(<>
                <Button variant='info' className='m-1' href={'/edit/' + props.post.id}>Edit</Button>
                <Button variant='danger' onClick={() => props.deleteModal(props.post.id)}>Delete</Button>
            </>);
        }
        if(props.post.createdAt!==props.post.updatedAt)setEdited(<sup><i>(edited)</i></sup>);
    }, []);
    return (
        <Card key={props.post.id} className="mb-3">
            <Card.Body>
                <Card.Title className='mb-3'>{props.post.title}</Card.Title>
                <Card.Subtitle className='mb-2'>by <span className='fullname' onClick={() => navigate(`/profile/${props.post.User.id}`)}>{props.post.User.fullname}</span></Card.Subtitle>
                <Card.Text className='text-muted mb-3'>{new Date(props.post.createdAt).toLocaleDateString("en-IN")}{edited}</Card.Text>
                <Card.Text>{props.post.body}</Card.Text>
                <Button href={'/post/' + props.post.id}>Read More</Button>
                {buttons}
            </Card.Body>
        </Card>
    )
}

export default PostCardComponent