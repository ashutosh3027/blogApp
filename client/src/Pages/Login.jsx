import React, { useEffect } from 'react'
import Navigation from '../Components/Navigation'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import authServices from '../services/authServices';
import Cookies from 'js-cookie'

function Login() {
    const navigate = useNavigate();
    useEffect(() => {
        if (Cookies.get("jwt")) navigate('/')
    }, []);
    const submit = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.warning('Please enter a valid email', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                onClose: () => navigate('/signup')
            });
        }
        try {
            const data = await authServices.login(email, password);
            console.log(data);
            toast.success("Logged in Successfully", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                onClose: () => navigate('/')
            });
        } catch (err) {
            toast.error(err.response.data.status, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
        }
    }

    return (
        <>
            <Navigation />
            <div className="container-sm">
                <Form onSubmit={submit}>
                    <Form.Group className='m-3' controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' placeholder='Enter Email' required />
                    </Form.Group>
                    <Form.Group className='mb-3 mx-3' controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter Password' required />
                    </Form.Group>
                    <Form.Group className='mb-3 mx-3'>
                        <Form.Check type='checkbox' label='Remember Me' />
                    </Form.Group>
                    <Form.Group className='mb-3 mx-3'>
                        <Button variant='primary' type='submit'>Log In</Button>
                    </Form.Group>
                    <Form.Group className='mb-3 mx-3'>
                        <Form.Text>Don't have an account? Sign up <a href='/signup'>here</a></Form.Text>
                    </Form.Group>
                </Form>
            </div>
        </>
    )
}

export default Login