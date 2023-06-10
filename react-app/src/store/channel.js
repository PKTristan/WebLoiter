


const LOAD_CHANNELS = "channels/LOAD_CHANNELS";
const LOAD_CHANNEL_BY_ID = "channels/LOAD_CHANNEL_BY_ID";

const loadChannels = (channels) => ({
    type: LOAD_CHANNELS,
    channels
});

const loadChannelById = (channel) => ({
    type: LOAD_CHANNEL_BY_ID,
    channel
})


export const getChannelsByServer = (serverId) => async (dispatch) => {
    const response = await fetch(`/api/servers/${serverId}/channels`);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadChannels(data.Server.Channels));
    }

    return response;
}

export const getChannelById = (id) => async (dispatch) => {
    const response = await fetch(`/api/channels/${id}`);

    if (response.ok) {
        const channel = await response.json();
        dispatch(loadChannelById(channel));
    }
}

export const createChannel = (channel) => async (dispatch) => {
    const response = await fetch('/api/channels', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "server_id": channel.server_id,
            "channel_name": channel.channel_name
        })
    });

    if (response.ok) {
        dispatch(getChannelsByServer(channel.server_id));
    }

    return response;
}

export const editChannel = (channel, id) => async (dispatch) => {
    const response = await fetch(`/api/channels/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(channel)
    });

    if (response.ok) {
        dispatch(getChannelsByServer(channel.server_id));
    }

    return response;
}

export const deleteChannel = (id, serverId) => async (dispatch) => {
    const response = await fetch(`/api/channels/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(getChannelsByServer(serverId));
    }

    return response;
}



export const selChannels = (state) => state.channels.channels;
export const selChannel = (state) => state.channels.channel;


const initialState = {channels: null, channel: null}

const channelsReducer = (state = initialState, action) => {
    let mutState = Object.assign(state);

    switch (action.type) {
        case LOAD_CHANNELS:

            return {...mutState, channels: action.channels}

        case LOAD_CHANNEL_BY_ID:

            return {...mutState, channel: action.channel}

        default:
            return state;
    }
}

export default channelsReducer;
