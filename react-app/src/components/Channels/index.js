import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { selChannels, createChannel, getChannelsByServer, editChannel, deleteChannel} from '../../store/channel';
import { useHistory, useParams } from 'react-router-dom';
import './Channels.css';
import CustomerContextMenu from './CustomContextMenu';

function Channels() {
    const serverChannels = useSelector(selChannels);
    const user = useSelector(state => state.session.user);
    const currServer = useSelector(state => state.server.currentServer)
    const dispatch = useDispatch();
    const [isOwner, setIsOwner] = useState(false);
    const [channels, setChannels] = useState([]);
    const [newChan, setNewChan] = useState('');
    const [createMode, setCreateMode] = useState(false);
    const [contextMenu, setContextMenu] = useState({
        visible: false,
        channel: null
    });
    const { id } = useParams();
    const history = useHistory();
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(getChannelsByServer(id)).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                const err = Object.values(data.errors);
                setErrors(err);
            }
        });
    }, [id, dispatch]);

    useEffect(() => {
        if (serverChannels) {
            setChannels(serverChannels);
        }
    }, [serverChannels]);

    const handleClick = (e, channel) => () => {
        e.preventDefault();
        summonPage(channel.id)
    }

    const summonPage = (id) => {
        history.push(`/channels/${id}`);
    }

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
                server_id: id
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
        if (currServer && user) {
            setIsOwner(currServer.owner_id === user.id);
        }
    }, [currServer, user]);

    useEffect(() => {

    }, [createMode, isOwner]);

    useEffect(() => {
        if (errors.length > 0) {
            const errorMessage = "Errors: " + errors.join(", ");
            alert(errorMessage);
        }
    }, [errors]);

    return (
        <section className="channels">
            {
                (channels.length > 0) &&
                channels.map((channel) => (
                    <button key={channel.id} className="channel-button" onContextMenu={e => handleRightClick(e, channel)} onClick={e => handleClick(e, channel)}>{`# ${channel.channel_name}`}</button>
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
                <div>
                    <input type="text" value={newChan} onChange={setNewChannel} />
                    <button className='create-channel' onClick={createChan}>Create</button>
                </div>
            }

            {isOwner &&
                <button className="new-channel-button" onClick={newChannel}>+ Create Channel</button>
            }
        </section>
    )
}

export default Channels;
