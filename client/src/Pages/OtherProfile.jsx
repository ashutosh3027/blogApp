import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie'
import Navigation from '../Components/Navigation'
import authServices from '../services/authServices';
import followServices from '../services/followServices';
import postServices from '../services/postServices';
import { toast } from 'react-toastify';
import FollowModal from '../Components/FollowModal';
import { AiOutlineLock } from 'react-icons/ai'
import PostCardComponent from '../Components/PostCardComponent';
import '../Styles/profile.css'

function OtherProfile() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [id, setId] = useState(null);
    const { id: tempId } = useParams();
    const [f1, setF1] = useState(<></>);
    const [f2, setF2] = useState(<></>);
    const [f3, setF3] = useState(<></>);
    const [f4, setF4] = useState(<></>);
    const [show, setShow] = useState(false);
    const [obj, setObj] = useState({});
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (!Cookies.get("jwt")) navigate("/");
        setId(tempId);
        (async () => {
            const { user } = await authServices.getUser();
            if (user.id === Number(id)) navigate('/profile')
            const data = await authServices.getUserById(id);
            setUser({ ...data.user });
        })();
    }, [id]);
    useEffect(() => {
        (async () => {
            await followData();
        })();
    }, [user]);
    const followData = async () => {
        const follows = await followServices.getFollowsById(id);
        const followings = await followServices.getFollowingsByID(id);

        if (follows.status.includes("count")) {
            setF1(<p>Follows: {follows.count}</p>);
            setF2(<p>Followings: {followings.count}</p>);
            setF3(<><p>You don't follow this user</p><Button variant='primary' onClick={follow}>Follow</Button></>);
            setF4(<><div>This Account is Private</div><AiOutlineLock /></>)
        } else {
            const { posts, user_id } = await postServices.getPostsById(id);
            setF1(<p><span className='follow' onClick={() => showFollows(follows.follows)}>Follows: {follows.follows.length}</span></p>);
            setF2(<p><span className='follow' onClick={() => showFollowings(followings.followings)}>Followings: {followings.followings.length}</span></p>);
            setF3(<><p>You follow this user</p><Button variant='secondary' onClick={unfollow}>Unfollow</Button></>);
            setF4(<>
                <div>
                    {
                        posts.map((el) => {
                            return (<PostCardComponent key={el.id} post={el} isUser={false} user_id={user_id} />)
                        })
                    }
                </div>
            </>)
        }
        console.log(follows, followings);
    }

    const follow = async () => {
        try {
            const data = await followServices.follow(id);
            console.log(data);
            console.log("🔥🔥🔥🔥🔥", user.fullname);
            await followData();
            toast.success(`You started following ${user.fullname}`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
        } catch (err) {
            const msg = err.response.data.status || "Backend Error, Couldn't create follow";
            toast.error(msg, {
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

    const unfollow = async () => {
        try {
            const data = await followServices.unfollow(id);
            console.log(data);
            console.log("test:", user);
            console.log("🔥🔥🔥🔥🔥", user.fullname);
            await followData();
            toast.success(`Unfollowed ${user.fullname}`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
        } catch (err) {
            const msg = err.response.data.status || "Backend Error, Couldn't create follow";
            toast.error(msg, {
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

    const showFollows = (follows) => {
        setObj({
            "title": `${user.fullname}'s Follows`,
            "body": follows
        });
        handleShow();
    }

    const showFollowings = (followings) => {
        setObj({
            "title": `${user.fullname}'s Followings`,
            "body": followings
        });
        handleShow();
    }

    return (
        <>
            <Navigation />
            <h1>Profile</h1>
            <h2>Name: {user.fullname}</h2>
            <h3>Email: {user.email}</h3>
            <p>Account Created On: {new Date(user.createdAt).toLocaleDateString("en-IN")}</p>
            {f1}{f2}{f3}{f4}
            <FollowModal show={show} close={handleClose} obj={obj} />
        </>
    )
}

export default OtherProfile