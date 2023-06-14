const SET_SERVERS = "server/SET_SERVERS";
const SET_SERVER_MEMBERS = "server/SET_SERVER_MEMBERS";
const SET_CURRENT_SERVER = "server/SET_CURRENT_SERVER";
const CREATE_SERVER = "server/CREATE_SERVER";
const UPDATE_SERVER = "server/UPDATE_SERVER";
const DELETE_SERVER = "server/DELETE_SERVER";

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

const createServer = (server) => ({
    type: CREATE_SERVER,
    payload: server,
})

const updateServer = (server) => ({
    type: UPDATE_SERVER,
    payload: server,
})

const deleteServer = (server) => ({
    type: DELETE_SERVER,
    payload: server,
})

const initialState = {
    servers: [],
    serverMembers: [],
    currentServer: {},
}


export const fetchServers = (setFetchedServers) => async (dispatch) => {
    const response = await fetch("/api/servers");
    if (response.ok) {
        const data = await response.json();
        dispatch(setServers(data));
        setFetchedServers(data);
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
    if (response.ok) {
        const data = await response.json();
        dispatch(setCurrentServer(data));
    }
}
export const createServerAction = (server) => async (dispatch) => {
    const response = await fetch("/api/servers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            {
                "server_name": server.server_name,
                "server_type": server.server_type,
                "avatar": server.avatar,
                "server_details": server.server_details,
                "private": server.private,
                "direct_message": server.direct_message,
            }
        ),
    });
    console.log('this is my response', response.statusText)
    if (response.ok) {
        const data = await response.json();
        dispatch(createServer(data));
        return data
    } else {
        const errData = await response.json()
        console.log(errData)
        return errData
    }
}

export const updateServerThunk = (server) => async (dispatch) => {
    const response = await fetch(`/api/servers/${server.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            {
                "server_name": server.server_name,
                "server_type": server.server_type,
                "avatar": server.avatar,
                "server_details": server.server_details,
                "private": server.private,
                "direct_message": server.direct_message,
            }
        ),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(updateServer(data));
        return data
    } else {
        const errorData = await response.json();
        return errorData
    }
}

export const deleteServerThunk = (server) => async (dispatch) => {
    const response = await fetch(`/api/servers/${server.id}`, {
        method: "DELETE",
    });
    console.log('this is my response', response)
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteServer(data));
    }
}

export default function serverReducer(state = initialState, action) {
    let normalizedServers = {};
    let newState = { ...state };
    switch (action.type) {
        case SET_SERVERS:
            action.payload.forEach(server => {
                normalizedServers[server.id] = server
            })
            newState.servers = normalizedServers
            return newState
        case SET_SERVER_MEMBERS:
            newState.serverMembers = action.payload
            return newState
        case SET_CURRENT_SERVER:
            newState.currentServer = action.payload
            return newState
        case CREATE_SERVER:
            newState.servers[action.payload.id] = action.payload
            return newState
        case UPDATE_SERVER:
            newState.servers[action.payload.id] = action.payload
            return newState
        case DELETE_SERVER:
            delete newState.servers[action.payload.id]
            return newState
        default:
            return state;
    }
}