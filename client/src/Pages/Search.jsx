import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useSearchParams } from 'react-router-dom';
import Navigation from '../Components/Navigation';
import authServices from '../services/authServices';
import { Card } from 'react-bootstrap';
import { Pagination } from 'react-bootstrap';

function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [num, setNum] = useState();
    const [results, setResults] = useState([]);
    const [pages, setPages] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (!Cookies.get("jwt" || searchParams.get("name").length < 3)) navigate('/');
        (async () => {
            let users, count;
            if (searchParams.get("page")) ({ users, count } = await authServices.getUsers(searchParams.get("name"), searchParams.get("page")));
            else ({ users, count } = await authServices.getUsers(searchParams.get("name")));
            console.log(users, count);
            setResults([...users]);
            setNum(count);
            let items = [];
            for (let i = 1; i <= Math.floor(count / 5) + Number(count % 5 ? 1 : 0); i++) {
                items.push(<Pagination.Item key={i} onClick={() => setSearchParams({ "name": searchParams.get("name"), "page": i })} active={i === (Number(searchParams.get("page")) || 1)}>{i}</Pagination.Item>);
            }
            setPages([...items]);
            console.log(items)
        })();
    }, [searchParams]);

    return (
        <>
            <Navigation />
            <h1>{num} results found for {searchParams.get("name")}</h1>
            <div className='m-3'>
                {
                    results.map((el, key) => {
                        const path = `/profile/${el.id}`;
                        return (
                            <Card className='mb-3' key={key}>
                                <Card.Body>
                                    <Card.Text><a href={path}>{el.fullname}</a></Card.Text>
                                </Card.Body>
                            </Card>
                        );
                    })
                }
            </div>
            <Pagination>{pages}</Pagination>
        </>
    )
}

export default Search