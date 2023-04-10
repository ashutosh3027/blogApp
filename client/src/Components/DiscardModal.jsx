import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function DiscardModal(props) {
    const navigate = useNavigate();
    const close = () => {
        if (props.obj.event === "cancel") {
            props.obj.close();
            navigate("/home");
        }
        else if(props.obj.event === "deletepost")props.deletePost(props.obj.id);
    }
    return (
        <>
            <Modal show={props.show} onHide={props.obj.close} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.obj.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.obj.body}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.obj.close}>{props.obj.b1}</Button>
                    <Button variant={props.obj.b2c} onClick={close}>{props.obj.b2}</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DiscardModal