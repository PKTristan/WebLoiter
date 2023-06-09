


const LOAD_CHANNELS = "channels/LOAD_CHANNELS";
const LOAD_CHANNEL_BY_ID = "channels/LOAD_CHANNEL_BY_ID";
const LOAD_NEW_ID = "channels/LOAD_NEW_ID";

const loadChannels = (channels) => ({
    type: LOAD_CHANNELS,
    channels
});

const loadChannelById = (channel) => ({
    type: LOAD_CHANNEL_BY_ID,
    channel
})

const loadNewId = (id) => ({
    type: LOAD_NEW_ID,
    id
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
        body: JSON.stringify(channel)
    });

    if (response.ok) {
        const newChannel = await response.json();
        dispatch(loadNewId(newChannel.id));
    }
}

export const editChannel = (channel, id) => async (dispatch) => {

}


export const selChannels = (state) => state.channels.channels;
export const selChannel = (state) => state.channels.channel;
export const selNewId = (state) => state.channels.newId;


const initialState = {channels: null, channel: null, newId: null}

const channelsReducer = (state = initialState, action) => {
    let mutState = Object.assign(state);

    switch (action.type) {
        case LOAD_CHANNELS:

            return {...mutState, channels: action.channels}

        case LOAD_CHANNEL_BY_ID:

            return {...mutState, channel: action.channel}

        case LOAD_NEW_ID:

            return {...mutState, newId: action.id}

        default:
            return state;
    }
}

export default channelsReducer;
