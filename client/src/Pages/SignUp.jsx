import React, { useEffect } from 'react'
import Navigation from '../Components/Navigation'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import authServices from '../services/authServices';
import Cookies from 'js-cookie'

function SignUp() {
  const navigate = useNavigate();
  useEffect(() => {
    if (Cookies.get("jwt")) navigate('/home')
  }, []);
  const submit = async (event) => {
    event.preventDefault();
    if (!/\S+@\S+\.\S+/.test(event.target.email.value)) {
      toast.warning('Please enter a valid email', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    if (event.target.password.value !== event.target.confirmPassword.value) {
      toast.warning('Passwords are not matching', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    try {
      const data = await authServices.signup(event.target.fullname.value, event.target.email.value, event.target.password.value);
      toast.success("Account Created Successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        onClose: () => navigate('/login')
      });
      console.log(data);
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
      <div className='container-sm'>
        <Form onSubmit={submit}>
          <Form.Group className='m-3' controlId='fullname'>
            <Form.Label>Full Name</Form.Label>
            <Form.Control type='text' placeholder='Enter Full Name' required />
          </Form.Group>
          <Form.Group className='mb-3 mx-3' controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' placeholder='Enter Email' required />
          </Form.Group>
          <Form.Group className='mb-3 mx-3' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Enter Password' required />
          </Form.Group>
          <Form.Group className='mb-3 mx-3' controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type='password' placeholder='Retype Password' required />
          </Form.Group>
          <Form.Group className='mb-3 mx-3'>
            <Button variant='primary' type='submit'>Create Account</Button>
          </Form.Group>
          <Form.Group className='mb-3 mx-3'>
            <Form.Text>Have an account? Log in <a href='/login'>here</a></Form.Text>
          </Form.Group>
        </Form>
      </div>
    </>
  )
}

export default SignUp