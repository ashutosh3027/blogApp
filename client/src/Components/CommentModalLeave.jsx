import React from 'react'
import { Modal, Button } from 'react-bootstrap'

function CommentModalLeave(props) {
    return (
        <Modal show={props.show} onHide={props.handleClose} backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>Leave Page?</Modal.Title>
            </Modal.Header>
            <Modal.Body>You haven't finished your comment yet. Do you want to leave without finishing?</Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={props.handleClose}>Stay on Page</Button>
                <Button variant='primary' onClick={props.close1}>Leave Page</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CommentModalLeave