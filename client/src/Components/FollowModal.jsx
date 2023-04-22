import React, {useEffect,useState} from 'react'
import { Modal, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function FollowModal(props) {
    const navigate = useNavigate();
    const [users,setUsers] = useState([]);
    useEffect(()=>{
        setUsers(props.obj.body);
    },[props.obj.body])
    console.log(props.obj.body);
    return (
        <Modal show={props.show} onHide={props.close} scrollable={true}>
            <Modal.Header closeButton>
                <Modal.Title>{props.obj.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {users?.map((el, key) => {
                    console.log(el);
                    return (
                        <Card className='mb-3' key={key}>
                            <Card.Body><span className='follow' onClick={() => navigate(`/profile/${el?.follows_user?.id || el?.followings_user?.id}`)}>{el?.follows_user?.fullname || el?.followings_user?.fullname}</span></Card.Body>
                        </Card>
                    );
                })}
            </Modal.Body>
        </Modal>
    )
}

export default FollowModal