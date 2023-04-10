import React from 'react'
import { Button, Modal, Form } from 'react-bootstrap'

function DeleteUserModal(props) {
    const submit = (event) => props.deleteUser(event);
    return (
        <Modal show={props.show} onHide={props.close} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Account</Modal.Title>
            </Modal.Header>
            <Form onSubmit={submit}>
                <Modal.Body>
                    <Form.Group controlId='pass'>
                        <Form.Label>Type your password to confirm account deletion.</Form.Label>
                        <Form.Control type='password' placeholder='Password' required />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Form.Group>
                        <Button variant='secondary' onClick={props.close}>Cancel</Button>
                        <Button variant='danger' type='submit'>Delete Account</Button>
                    </Form.Group>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default DeleteUserModal