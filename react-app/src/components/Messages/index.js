import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { loadMessagesByChannel, editMessageChannel, deleteMessageChannel } from '../../store/message';
import { fetchAllUsers } from '../../store/session';
import NewMessage from './post';
import './Messages.css'

function ChannelMessages() {
    const dispatch = useDispatch();
    const currChannel = useSelector((state) => state.channels.channel)
    const currentUserId = useSelector((state) => state.session.user.id) || null
    const users = useSelector((state) => state.session.allUsers);
    const messages = useSelector((state) => state.messages.messages);
    const [hoveredMessage, setHoveredMessage] = useState(null)
    const [editMessage, setEditMessage] = useState({ id: null, text: '' });
    const { channelId } = useParams();

    const history = useHistory();
    useEffect(() => {
        dispatch(fetchAllUsers())

    }, [dispatch])
    useEffect(() => {
        // console.log('params', params);
        console.log('this is messages', Object.values(messages).length)
        if (currChannel) {
            dispatch(loadMessagesByChannel(currChannel.id))
        }

        return () => {
            if (currChannel) {
                dispatch(loadMessagesByChannel(currChannel.id))
            }
        }
    }, [dispatch, currentUserId, history, currChannel]);

    useEffect(() => {
        if (channelId) {
            dispatch(loadMessagesByChannel(channelId))
        }
        return () => {
            if (channelId) {
                dispatch(loadMessagesByChannel(channelId));
            }
        }
    }, [dispatch, channelId])


    const handleMessageHover = (messageId) => {
        setHoveredMessage(messageId);
    };

    const handleMessageleave = (messageId) => {
        setHoveredMessage(null)
    }
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    const handleKeyUp = (e, messageId, updatedMessage) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            dispatch(editMessageChannel(updatedMessage, currChannel.id, messageId));
            setEditMessage({ id: null, text: '' });
        }
    };

    const handleEditMessage = (messageId) => {

        const message = Object.values(messages).find((msg) => msg.id === messageId);
        if (message) {
            setEditMessage({ id: messageId, text: message.message });
        }
    };

    const handleDeleteMessage = (messageId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this message?')
        if (confirmDelete) {
            dispatch(deleteMessageChannel(currChannel.id, messageId));
            dispatch(loadMessagesByChannel(currChannel.id))
        }
    }

    return currChannel ? (
        <div className='messages-container'>
            {messages && users && Object.values(messages).length > 0 ? (
                <div>
                    {Object.values(messages).map((message) => {
                        const user = users.find((user) => user.id === message.user_id)
                        return (
                            <div
                                key={message.id}
                                onMouseEnter={() => handleMessageHover(message.id)}
                                onMouseLeave={handleMessageleave}
                                className="message-container"
                            >
                                {editMessage && editMessage.id === message.id ? (
                                    <textarea className='textarea-container edit-message'
                                        value={editMessage.text}
                                        onChange={(e) => setEditMessage({ ...editMessage, text: e.target.value })}
                                        onKeyDown={handleKeyDown}
                                        onKeyUp={(e) => handleKeyUp(e, message.id, e.target.value)}
                                    />
                                ) : (
                                    <div className='message-content'>{message.message}</div>
                                )}
                                {hoveredMessage === message.id && currentUserId === message.user_id && (
                                    <div className='button-container'>
                                        {editMessage !== message.id && (
                                            <button className='edit-button' onClick={() => handleEditMessage(message.id)}>Edit</button>
                                        )}
                                        <button className='delete-button' onClick={() => handleDeleteMessage(message.id)}>Delete</button>
                                    </div>
                                )}
                                {user && (
                                    <div className="user-info">
                                        <div className='user-avatar-box'>
                                        <img className='user-avatar' src={user.profile_pic} alt={user.display_name} />
                                            </div>
                                        <div className="user-displayname">{user.display_name}</div>
                                    </div>
                                )}
                            </div>

                        )
                    })}
                </div>
            ) : (
                <div className='no-message'>
                    <img src='http://www.clipartbest.com/cliparts/aiq/e9o/aiqe9o7kT.jpeg' alt='No messages' className='no-message-img'/>
                   <span>Be the first to send a message in this channel!</span> 
                    </div>
            )}
            <div>
                <NewMessage initalValue={editMessage} channelId={currChannel.id} />
            </div>
        </div>
    ) : null;

}

export default ChannelMessages
