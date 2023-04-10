import React from 'react'
import { Button, Modal, Form } from 'react-bootstrap'

function ChangePasswordModal(props) {
    const submit = (event) => props.changePass(event);
    return (
        <>
            <Modal show={props.show} onHide={props.close} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Form onSubmit={submit}>
                    <Modal.Body>
                        <Form.Group controlId='oldpass'>
                            <Form.Label>Old Password</Form.Label>
                            <Form.Control type='password' placeholder='Old Password' required />
                        </Form.Group>
                        <Form.Group controlId='newpass'>
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type='password' placeholder='New Password' required />
                        </Form.Group>
                        <Form.Group controlId='newconpass'>
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control type='password' placeholder='Retype New Password' required />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Form.Group>
                            <Button variant='secondary' onClick={props.close}>Cancel</Button>
                            <Button variant='primary' type='submit'>Change Password</Button>
                        </Form.Group>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default ChangePasswordModal