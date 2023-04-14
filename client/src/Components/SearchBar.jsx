import React, { useState } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { BiSearch } from 'react-icons/bi'
import authServices from '../services/authServices';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SearchBar() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [results, setResults] = useState([]);
  const display = async (event) => {
    const name = event.target.value.trim()
    if (name.length < 3) {
      setShow(false);
      return;
    }
    const { users } = await authServices.getUsers(name);
    setResults([...users]);
    console.log(users);
  }

  const search = (event) => {
    event.preventDefault();
    const name = event.target.search.value.trim();
    if (name.length < 3) {
      toast.warning('Length should atleast be 3 characters', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    navigate(`/search?name=${name}`);
  }

  return (
    <Form onSubmit={search}>
      <Form.Group controlId='search'>
        <InputGroup>
          <Form.Control onInput={(event) => display(event)} onBlur={() => setShow(false)} placeholder='Search here' />
          <Button variant="outline-secondary" id="button-addon2" type='submit'><BiSearch /></Button>
        </InputGroup>
      </Form.Group>
    </Form>
  )
}

export default SearchBar