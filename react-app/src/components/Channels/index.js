import {useSelector, useDispatch} from 'react-redux';
import { useState, useEffect} from 'react';
import { selChannels, createChannel } from '../../store/channel';
import {useHistory, useParams} from 'react-router-dom';

function Channels() {
    const serverChannels = useSelector(selChannels);
    const dispatch = useDispatch();
    const [channels, setChannels] = useState([]);
    const [newChan, setNewChan] = useState('');
    const [createMode, setCreateMode] = useState(false);
    const {serverId} = useParams();
    const history = useHistory();


    useEffect(() => {
        if (serverChannels.length > 0) {
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

        body = {
            name: newChan,
            server_id: serverId
        }

        //dispatch(createChannel());

    }

    useEffect(() => {

    }, [createMode]);

    return (
        <section className="channels">
            {
                channels.length &&
                channels.map((channel) => (
                    <button key={channel.id} className="channel-button" onClick={handleClick(e, channel)}>{`# ${channel.name}`}</button>
                ))
            }

            {
                createMode &&
                <div>
                    <input type="text" value={newChan} onChange={e => setNewChan(e.target.value)} />
                    <button className='create-channel' onClick={createChan()}>Create</button>
                </div>
            }

            <button className="new-channel-button" onClick={newChannel(e)}>+ Create Channel</button>
        </section>
    )
}
