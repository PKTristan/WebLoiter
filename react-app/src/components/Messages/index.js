import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {loadMessagesByChannel} from '../../store/message';
import './Messages.css'

function ChannelMessages() {
    const dispatch = useDispatch();
    const {channelId} = useParams()

    useEffect(() => {
        dispatch(loadMessagesByChannel(channelId))
    }, [dispatch, channelId])

    const messages = useSelector((state) => state.messages.messages);
    console.log(messages)

    return (
        <div>
            <h1>Messages</h1>
            {messages && (
                <ul>
                    {messages.map((message) => (
                        <li key={message.id}>{message.message}</li>
                    )
                    )}
                </ul>
            )}
        </div>
    )

}

export default ChannelMessages