import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {loadMessagesByChannel, newMessageChannel} from '../../store/message';

function NewMessage({ initialValue, channelId }) {
    const dispatch = useDispatch();
    const currentUserId = useSelector((state) => state.session.user.id);
    const [message, setMessage] = useState(initialValue || '')
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(message){
            const data = await dispatch(newMessageChannel(message, channelId));
            console.log(data)
            if(data) {
                setErrors(data)
            }
        } else {
            setErrors([
                "Can not send blank message"
            ]);
        }
        setMessage('')
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const handleChange = (e) => {
        setMessage(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                type='text' 
                placeholder='Send a message' 
                value={message} 
                onChange={handleChange} 
                onKeyDown={handleKeyDown}
                />
        </form>
    );
}

export default NewMessage