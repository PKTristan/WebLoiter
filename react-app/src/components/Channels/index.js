import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { selChannels, createChannel, getChannelsByServer } from '../../store/channel';
import { useHistory, useParams } from 'react-router-dom';
import CustomerContextMenu from './CustomContextMenu';

function Channels() {
    const serverChannels = useSelector(selChannels);
    const dispatch = useDispatch();
    const [channels, setChannels] = useState([]);
    const [newChan, setNewChan] = useState('');
    const [createMode, setCreateMode] = useState(false);
    const [updateMode, setUpdateMode] = useState([false, -1]);
    const [newName, setNewName] = useState('');
    const [contextMenu, setContextMenu] = useState({
        visible: false,
        channel: null
    });
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        dispatch(getChannelsByServer(id))
    }, [id]);

    useEffect(() => {
        if (serverChannels && serverChannels.length) {
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

    const createChan = (e) => {
        e.preventDefault();
        setCreateMode(false);

        if (newChan.length > 0) {
            const body = {
                channel_name: newChan,
                server_id: id
            }


            console.log(body);

        //dispatch(createChannel());

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

        setContextMenu({
            visible: true,
            channel: channel,
            position: {
                x: e.clientX,
                y: e.clientY
            }
        });
    }

    useEffect(() => {

    }, [createMode]);

    return (
        <section className="channels">
            {
                channels.length &&
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
                />
            }

            {
                createMode &&
                <div>
                    <input type="text" value={newChan} onChange={setNewChannel} />
                    <button className='create-channel' onClick={createChan}>Create</button>
                </div>
            }

            <button className="new-channel-button" onClick={newChannel}>+ Create Channel</button>
        </section>
    )
}

export default Channels;
