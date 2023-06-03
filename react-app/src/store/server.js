const SET_SERVERS = "server/SET_SERVERS";
const SET_SERVER_MEMBERS = "server/SET_SERVER_MEMBERS";
const SET_CURRENT_SERVER = "server/SET_CURRENT_SERVER";

const setServers = (servers) => ({
    type: SET_SERVERS,
    payload: servers,
})

const setServerMembers = (serverMembers) => ({
    type: SET_SERVER_MEMBERS,
    payload: serverMembers,
})

const setCurrentServer = (server) => ({
    type: SET_CURRENT_SERVER,
    payload: server,
})

const initialState = {
    servers: [],
    serverMembers: [],
    currentServer: {},
}


export const fetchServers = () => async (dispatch) => {
    const response = await fetch("/api/servers");
    if (response.ok) {
        const data = await response.json();
        dispatch(setServers(data));
    }
}

export const fetchServerMembers = () => async (dispatch) => {
    const response = await fetch("/api/servers/server_members");
    if (response.ok) {
        const data = await response.json();
        dispatch(setServerMembers(data));
    }
}

export const fetchCurrentServer = (id) => async (dispatch) => {
    const response = await fetch(`/api/servers/${id}`);
    console.log('----------res', response)
    if (response.ok) {
        const data = await response.json();
        dispatch(setCurrentServer(data));
    }
}

export default function serverReducer(state = initialState, action) {
    let normalizedServers = {};
    switch (action.type) {
        case SET_SERVERS:
            action.payload.forEach(server => {
                normalizedServers[server.id] = server
            })
            return {
                ...state,
                servers: normalizedServers,
            };
        case SET_SERVER_MEMBERS:
            return {
                ...state,
                serverMembers: action.payload
            }
        case SET_CURRENT_SERVER:
            return {
                ...state,
                currentServer: action.payload
            }
        default:
            return state;
    }
}