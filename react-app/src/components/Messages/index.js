import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { loadMessagesByChannel, editMessageChannel, deleteMessageChannel } from '../../store/message';
import NewMessage from './post';
import './Messages.css'

function ChannelMessages() {
    const dispatch = useDispatch();
    const currChannel = useSelector((state) => state.channels.channel)
    const currentUserId = useSelector((state) => state.session.user.id) || null
    const [hoveredMessage, setHoveredMessage] = useState(null)
    const [editMessage, setEditMessage] = useState({ id: null, text: '' });
    const params = useParams();

    const history = useHistory();

    useEffect(() => {
        console.log('params', params);
        if (currChannel) {
            dispatch(loadMessagesByChannel(currChannel.id))
        }
    }, [dispatch, currentUserId, history, currChannel]);

    const messages = useSelector((state) => state.messages.messages);

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
            setEditMessage('');
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

    return currChannel && (
        <div className='messages-container'>
            {messages && currChannel && (
                <div>
                    {Object.values(messages).map((message) => (
                        <div
                            key={message.id}
                            onMouseEnter={() => handleMessageHover(message.id)}
                            onMouseLeave={handleMessageleave}
                            className="message-container"
                        >
                            {editMessage && editMessage.id === message.id ? (
                                <textarea className='textarea-container'
                                    value={editMessage.text}
                                    onChange={(e) => setEditMessage({ ...editMessage, text: e.target.value })}
                                    onKeyDown={handleKeyDown}
                                    onKeyUp={(e) => handleKeyUp(e, message.id, e.target.value)}
                                />
                            ) : (
                                <div>{message.message}</div>
                            )}
                            {hoveredMessage === message.id && currentUserId === message.user_id && (
                                <div className='button-container'>
                                    {editMessage !== message.id && (
                                        <button onClick={() => handleEditMessage(message.id)}>Edit</button>
                                    )}
                                    <button onClick={() => handleDeleteMessage(message.id)}>Delete</button>
                                </div>
                            )}
                        </div>

                    )
                    )}
                </div>
            )}
            {currChannel &&
                <div>
                    <NewMessage initalValue={editMessage} channelId={currChannel.id} />
                </div>
            }
        </div>
    )

}

export default ChannelMessages
