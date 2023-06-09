import {useSelector} from 'react-redux';
import { useState, useEffect } from 'react';
import { selChannels } from '../../store/channel';
import {useHistory} from 'react-router-dom';

function Channels() {
    const serverChannels = useSelector(selChannels);
    const [channels, setChannels] = useState([]);
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
        history.push('/channels/new');
    }

    return (
        <section className="channels">
            {
                channels.length &&
                channels.map((channel) => (
                    <button key={channel.id} className="channel-button" onClick={handleClick(e, channel)}>{`# ${channel.name}`}</button>
                ))
            }

            <button className="new-channel-button" onClick={newChannel(e)}>+ NEW CHANNEL</button>
        </section>
    )
}
