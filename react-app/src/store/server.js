const SET_SERVERS = "server/SET_SERVERS";
const SET_SERVER_MEMBERS = "server/SET_SERVER_MEMBERS";

const setServers = (servers) => ({
    type: SET_SERVERS,
    payload: servers,
})

const setServerMembers = (serverMembers) => ({
    type: SET_SERVER_MEMBERS,
    payload: serverMembers,
})

const initialState = {
    servers: [],
    serverMembers: [],
}


export const fetchServers = () => async (dispatch) => {
    const response = await fetch("/api/servers/");
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
        default:
            return state;
    }
}