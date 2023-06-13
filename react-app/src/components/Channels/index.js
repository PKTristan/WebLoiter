import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { selChannels, createChannel, getChannelsByServer, editChannel, deleteChannel, getChannelById } from '../../store/channel';
import { loadMessagesByChannel } from '../../store/message';
import { useHistory, useParams } from 'react-router-dom';
import './Channels.css';
import ChannelMessages from '../Messages';
import CustomerContextMenu from './CustomContextMenu';

function Channels({ allUsers }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const serverChannels = useSelector(selChannels);
    const currUser = useSelector(state => state.session.user);
    const currServer = useSelector(state => state.server.currentServer)
    const currChannel = useSelector((state) => state.channels.channel)
    const [isOwner, setIsOwner] = useState(false);
    const [channels, setChannels] = useState([]);
    const [newChan, setNewChan] = useState('');
    const [createMode, setCreateMode] = useState(false);
    const { serverId, channelId } = useParams();
    const [selectedChannelId, setSelectedChannelId] = useState(channelId)
    const [contextMenu, setContextMenu] = useState({
        visible: false,
        channel: null
    });
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        console.log('----- this is currChannel in channels', currChannel)
        dispatch(getChannelsByServer(serverId)).catch(async (res) => {
        setCreateMode(false);
            const data = await res.json();
            if (data && data.errors) {
                const err = Object.values(data.errors);
                setErrors(err);
            }
        });

    }, [serverId, dispatch, currChannel]);


    useEffect(() => {
        
        if (serverChannels) {
            setChannels(serverChannels);
        }
    }, [serverChannels]);

    const handleClick = (e, channel) => {
        e.preventDefault()
        const serverId = currServer.id
        const channelId = channel.id
        history.push(`/servers/${serverId}/channels/${channelId}`)
        // setSelectedChannelId(channelId)
        // dispatch(getChannelById(channelId))
    }

    useEffect(() => {
        if (channelId) {
            setSelectedChannelId(channelId)
            dispatch(getChannelById(channelId))
        }
    }, [channelId]);

    // const summonPage = (id) => {
    //     history.push(`servers/${currServer.id}/channels/${id}`);
    // }

    const newChannel = (e) => {
        e.preventDefault();
        setCreateMode(true);
    }

    const createChan = async (e) => {
        e.preventDefault();
        setCreateMode(false);

        if (newChan.length > 0) {
            const body = {
                channel_name: newChan,
                server_id: serverId
            }

            await dispatch(createChannel(body)).catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    const err = Object.values(data.errors);
                    setErrors(err);
                }
            });
        }
        setNewChan('');

    }

    const setNewChannel = (e) => {
        e.preventDefault();
        const val = e.target.value.replace(' ', '-');

        setNewChan(val);
    }

    const handleRightClick = (e, channel) => {
        e.preventDefault();

        if (isOwner)
            setContextMenu({
                visible: true,
                channel: channel,
                position: {
                    x: e.clientX,
                    y: e.clientY
                }
            });
    }

    const updateChannel = (channel, id) => {
        dispatch(editChannel(channel, id)).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                const err = Object.values(data.errors);
                setErrors(err);
            }
        });
    };

    const delChannel = (channelId, server_id) => {
        dispatch(deleteChannel(channelId, server_id)).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                const err = Object.values(data.errors);
                setErrors(err);
            }
        });
    }

    useEffect(() => {
        if (currServer && currUser) {
            setIsOwner(currServer.owner_id === currUser.id);
        }
    }, [currServer, currUser]);

    useEffect(() => {

    }, [createMode, isOwner]);

    useEffect(() => {
        if (errors.length > 0) {
            const errorMessage = "Errors: " + errors.join(", ");
            alert(errorMessage);
        }
    }, [errors]);

    const createChannelWithUser = (e, user) => {
        e.preventDefault();
        const channelName = `private-${currUser.username} & ${user.username}`;
        const privateDm = {
            channel_name: channelName,
            server_id: currServer.id,
        }

        dispatch(createChannel(privateDm)).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                const err = Object.values(data.errors);
                setErrors(err);
            }
            setCreateMode(false);
            setNewChan('');
        })
    }


    const cancelCreate = (e) => {
        e.preventDefault();

        setNewChan('');
        setCreateMode(false);
    }

    return (
        <div>

            <section className="channels">
                {
                    (channels.length > 0) &&
                    channels.map((channel) => (
                        <button key={channel.id} className="channel-button" onContextMenu={e => handleRightClick(e, channel)} onClick={(e) => handleClick(e, channel)}>{`# ${channel.channel_name}`}</button>
                    ))
                }

                {
                    contextMenu.visible &&
                    <CustomerContextMenu
                        channel={contextMenu.channel}
                        position={contextMenu.position}
                        close={() => setContextMenu({ visible: false, channel: null })}
                        updateChannel={updateChannel}
                        delChannel={delChannel}
                    />
                }

                {
                    createMode &&
                    <div className="new-channel">
                        {currServer.direct_message === true && (
                            <ul className='users-list'>
                                {allUsers.map((user) => {
                                    if (user.id !== currUser.id) {
                                        return <li key={user.id} className='user'>
                                            <button className='create-dm-button' onClick={(e) => createChannelWithUser(e, user)}>{user.username}</button>
                                        </li>;
                                    }
                                    return null;
                                })}
                            </ul>
                        )}
                        {currServer.direct_message === false && (<>
                            <input type="text" value={newChan} onChange={setNewChannel} />
                            <button className='create-channel' onClick={createChan}>Create</button>
                        </>
                        )
                        }
                        <button className='cancel-create-channel' onClick={cancelCreate}>Cancel</button>
                    </div>
                }

                {isOwner &&
                    <button className="new-channel-button" onClick={newChannel}>+ Create Channel</button>
                }
            </section>
            {/* adding the messages for channels */}
            {selectedChannelId && <ChannelMessages channelId={selectedChannelId} />}

        </div>
    )
}

export default Channels;
