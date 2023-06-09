import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {loadMessagesByChannel} from '../../store/message';
import NewMessage from './post';
import './Messages.css'

function ChannelMessages() {
    const dispatch = useDispatch();
    const currentUserId = useSelector((state) => state.session.user.id)
    const {channelId} = useParams()
    const [hoveredMessage, setHoveredMessage] = useState(null)

    useEffect(() => {
        dispatch(loadMessagesByChannel(channelId))
    }, [dispatch, channelId])

    const messages = useSelector((state) => state.messages.messages);

    const handleMessageHover = (messageId) => {
        setHoveredMessage(messageId);
    };

    const handleMessageleave = (messageId) => {
        setHoveredMessage(null)
    }



    return (
        <div>
            {messages && (
                <div>
                    {Object.values(messages).map((message) => (
                        <>
                        <div
                            key={message.id}
                            onMouseEnter={() => handleMessageHover(message.id)}
                            onMouseLeave={handleMessageleave}
                            className ="message-container"
                            >
                                <div>{message.message}</div>
                                {hoveredMessage === message.id && currentUserId === message.user_id && (
                                    <div className='button-container'>
                                        <button>Edit</button>
                                        <button>Delete</button>
                                    </div>
                                )}
                                </div>
                        </>

                    )
                    )}
                </div>
            )}
            <div>
                <NewMessage />
            </div>
        </div>
    )

}

export default ChannelMessages