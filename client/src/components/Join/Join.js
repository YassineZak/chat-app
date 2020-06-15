import React,  { useState } from 'react';
import { Link } from 'react-router-dom';

import './Join.css';

const Join = () => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    const handleNameInput = (event) => {
        setName(event.target.value.trim())
    }
    const handleRoomInput = (event) => {
        setRoom(event.target.value.trim())
    }
    const handleSubmit = (event) => {
        if (!name || !room){
            event.preventDefault();
        }
    } 

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div>
                    <input placeholder="Name" type="text" className="joinInput" onChange={handleNameInput}/>
                </div>
                <div>
                    <input placeholder="Room" type="text" className="joinInput mt-20" onChange={handleRoomInput}/>
                </div>
                <Link onClick={handleSubmit} to={`/chat?name=${name}&room=${room}`}>
                    <button className="button mt-20" type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    );
};

export default Join;