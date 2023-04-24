import React, { useState, useEffect } from 'react'
import Navigation from '../Components/Navigation'
import { useParams } from 'react-router-dom'
import { Button, Form, InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import postServices from '../services/postServices';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import DiscardModal from '../Components/DiscardModal';
import { FcLike } from 'react-icons/fc'
import { AiOutlineHeart } from 'react-icons/ai'
import { BiCommentDetail, BiShare } from 'react-icons/bi'
import { BsReply, BsSend } from 'react-icons/bs'
import likeServices from '../services/likeServices';
import commentServices from '../services/commentServices';
import moment from 'moment';
import '../Styles/post.css'

function Post() {
  moment().format();
  const [posts, setPosts] = useState({});
  const [comments, setComments] = useState([]);
  const [obj, setObj] = useState({});
  const [show, setShow] = useState(false);
  const [f, setF] = useState(false);
  const [buttons, setButtons] = useState(<></>);
  const [like, setLike] = useState(<></>)
  const [ln, setLn] = useState(<></>);
  const [cn, setCn] = useState(<></>);
  const [moreC, setMoreC] = useState(<></>);
  const [moreCn, setMoreCn] = useState(5);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!Cookies.get("jwt")) navigate('/');
    (async () => {
      console.log(id)
      const { post, user_id } = await postServices.getPost(id);
      console.log(post)
      if (!post) navigate("/*");
      setPosts(post);
      // setComments([post.Comments].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      if (user_id === post.user_id) setButtons(<>
        <Button variant='info' href={'/edit/' + id}>Edit</Button>
        <Button variant='danger' onClick={() => deleteModal(id)}>Delete</Button>
      </>);
      if (post.Likes?.find((ele) => Number(ele.user_id) === Number(user_id))) {
        setLike(<span className='like' onClick={() => unlikePost(post.Likes?.length, post.id)}><FcLike />Like</span>);
        setLn(<span>You and {post.Likes?.length - 1} others like this post</span>);
      } else {
        setLike(<span className='like' onClick={() => likePost(post.Likes?.length, post.id)}><AiOutlineHeart />Like</span>);
        setLn(<span>{post.Likes?.length} like this post</span>);
      }
      setCn(<span>{post.Comments?.length} Comments</span>);
      if (posts?.Comments?.length > moreCn) {
        setMoreC(<span className='d-block d-flex justify-content-between'>
            <span className='more-comments text-muted' onClick={() => setMoreCn(moreCn + 5)}><b><u>More Comments</u></b></span>
            <span className='text-muted'>{moreCn} of {posts?.Comments?.length}</span>
        </span>);
    }
    if (moreCn >= posts?.Comments?.length) setMoreC(<></>);
    })();
  }, []);
  useEffect(() => {
    if (posts?.Comments?.length > moreCn) {
        setMoreC(<span className='d-block d-flex justify-content-between'>
            <span className='more-comments text-muted' onClick={() => setMoreCn(moreCn + 5)}><b><u>More Comments</u></b></span>
            <span className='text-muted'>{moreCn} of {posts?.Comments?.length}</span>
        </span>);
    }
    if (moreCn >= posts?.Comments?.length) setMoreC(<></>);
}, [moreCn]);
  const deletePost = async (id) => {
    try {
      await postServices.deletePost(id);
      toast.success("Success, Post Deleted", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        onClose: () => { handleClose(); navigate('/') }
      });
    } catch (err) {
      const msg = err.response.data.status || "Backend Error, Couldn't delete post";
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
  const deleteModal = (id) => {
    setObj({
      title: "Delete Post",
      body: "Are you sure you want to delete this post?",
      b1: "Don't Delete",
      b2: "Delete",
      event: "deletepost",
      b2c: "danger",
      id,
      close: handleClose
    });
    handleShow();
  }
  const likePost = async (len, id) => {
    const data = await likeServices.like(id);
    console.log(data);
    setLike(<span className='like' onClick={() => unlikePost(len + 1, id)}><FcLike />Like</span>);
    setLn(<span>You and {len} others like this post</span>);
  }
  const unlikePost = async (len, id) => {
    const data = await likeServices.unlike(id);
    console.log(data);
    setLike(<span className='like' onClick={() => likePost(len - 1, id)}><AiOutlineHeart />Like</span>);
    setLn(<span>{len - 1} like this post</span>);
  }
  const newComment = async (event) => {
    event.preventDefault(); setF(false);
    const message = event.target.comment.value;
    const post_id = posts.id;
    console.log(message, post_id);
    event.target.comment.value = "";
    const data = await commentServices.newComment(message, post_id);
    console.log(data);
  }
  return (
    <>
      <Navigation />
      <h1 className='mx-3 mt-2'>{posts.title}</h1>
      <p>by Mallik Prabhanjan</p>
      <p className='text-muted'>{new Date(posts.createdAt).toLocaleDateString("en-IN")}</p>
      <Button variant='secondary' href='/home'>All Posts</Button>
      {buttons}
      <p>{posts.body}</p>
      <p className='likes-comments'>
        {ln}
        {cn}
      </p>
      <hr />
      <p className='likes-comments'>
        {like}
        <span className='comment'><BiCommentDetail />Comment</span>
        <span className='share'><BiShare />Share</span>
      </p>
      <hr />
      <Form onSubmit={newComment} className='w-100'>
        <Form.Group controlId='comment'>
          <InputGroup>
            <Form.Control onInput={() => setF(true)} placeholder='Write a new comment here' />
            <Button variant="outline-secondary" id="button-addon2" type='submit'><BsSend /></Button>
          </InputGroup>
        </Form.Group>
      </Form>
      <div className='container-sm'>
        {posts?.Comments?.slice(0,moreCn).map((el) => {
          return (
            <div key={el.id} className='container-sm'>
              <span><b className='user' onClick={() => navigate(`/profile/${el.User.id}`)}>{el.User.fullname}</b></span><br />
              <span className='text-muted'>{moment(new Date(el.createdAt)).fromNow()}</span>
              <p>{el.message}<br /><span className='reply'><BsReply />Reply</span></p>
            </div>
          )
        })}
        {moreC}
      </div>
      <DiscardModal show={show} obj={obj} deletePost={deletePost} />
    </>
  )
}

export default Post