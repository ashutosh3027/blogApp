import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import authServices from '../services/authServices';
import Cookies from 'js-cookie'
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Navigation() {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await authServices.logout();
      toast.success("Logged out Successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        onClose: () => navigate('/login')
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
  const links = () => {
    if (Cookies.get('jwt')) {
      return (
        <>
          <Nav.Link href="/profile">Profile</Nav.Link>
          <Button variant='secondary' onClick={logout}>Logout</Button>
        </>
      );
    } else {
      return (
        <>
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/signup">Sign Up</Nav.Link>
        </>
      )
    }
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href='/'>BlogApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id='responsive-navbar-nav' className='justify-content-end'>
          <Nav>{links()}</Nav>
        </Navbar.Collapse>
      </Container>
      <ToastContainer position='top-center' autoClose={5000} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} draggable pauseOnHover={false} theme='colored' limit={3} />
    </Navbar>
  )
}

export default Navigation