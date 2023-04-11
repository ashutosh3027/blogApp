import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie'
import Navigation from '../Components/Navigation'
import authServices from '../services/authServices';
import followServices from '../services/followServices';

function OtherProfile() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const { id } = useParams();
    const [f1,setF1] = useState(<></>);
    const [f2,setF2] = useState(<></>);
    useEffect(() => {
        if (!Cookies.get("jwt")) navigate("/");
        (async () => {
            const data = await authServices.getUserById(id);
            const follows = await followServices.getFollowsById(id);
            const followings = await followServices.getFollowingsByID(id);
            if(follows.status.includes("count")){
                setF1(<p>Follows: {follows.count}</p>);
                setF2(<p>Followings: {followings.count}</p>);
            }else{
                setF1(<p>Follows: {follows.follows.length}</p>);
                setF2(<p>Followings: {followings.followings.length}</p>);
            }
            console.log(data.user, follows, followings);
            setUser({ ...data.user, follows, followings});
        })();
    }, [])
    return (
        <>
            <Navigation />
            <h1>Profile</h1>
            <h2>Name: {user.fullname}</h2>
            <h3>Email: {user.email}</h3>
            <p>Account Created On: {new Date(user.createdAt).toLocaleDateString("en-IN")}</p>
            {f1}{f2}
        </>
    )
}

export default OtherProfile