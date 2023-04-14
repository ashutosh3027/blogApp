import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie'
import Navigation from '../Components/Navigation'
import authServices from '../services/authServices';
import followServices from '../services/followServices';
import { toast } from 'react-toastify';

function OtherProfile() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [id, setId] = useState(null);
    const { id:tempId } = useParams();
    const [f1, setF1] = useState(<></>);
    const [f2, setF2] = useState(<></>);
    const [f3, setF3] = useState(<></>);

    useEffect(() => {
        if (!Cookies.get("jwt")) navigate("/");
        setId(tempId);
        (async () => {
            const {user} = await authServices.getUser();
            if(user.id===Number(id))navigate('/profile')
            const data = await authServices.getUserById(id);
            setUser({ ...data.user });
        })(); 
    }, [id]);
    useEffect(()=>{
        (async()=>{
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
        } else {
            setF1(<p>Follows: {follows.follows.length}</p>);
            setF2(<p>Followings: {followings.followings.length}</p>);
            setF3(<><p>You follow this user</p><Button variant='secondary' onClick={unfollow}>Unfollow</Button></>);
        }
        console.log(follows, followings);
    }

    const follow = async () => {
        try {
            const data = await followServices.follow(id);
            console.log(data);
            console.log("🔥🔥🔥🔥🔥",user.fullname);
            toast.success(`You started following ${user.fullname}`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                onClose: () => followData()
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
            console.log("test:",user);
            console.log("🔥🔥🔥🔥🔥",user.fullname);
            toast.success(`Unfollowed ${user.fullname}`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                onClose: () => followData()
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

    return (
        <>
            <Navigation />
            <h1>Profile</h1>
            <h2>Name: {user.fullname}</h2>
            <h3>Email: {user.email}</h3>
            <p>Account Created On: {new Date(user.createdAt).toLocaleDateString("en-IN")}</p>
            {f1}{f2}{f3}
        </>
    )
}

export default OtherProfile