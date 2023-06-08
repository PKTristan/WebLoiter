const LOAD_MESSAGES = 'messages/LOAD_MESSAGES';
const NEW_MESSAGE = 'messages/NEW_MESSAGE';
const EDIT_MESSAGE = 'messages/EDIT_MESSAGE';
const DELETE_MESSAGE = 'messages/DELETE_MESSAGE';


const loadMessages = (messages) => ({
    type: LOAD_MESSAGES,
    payload: messages
})

const newMessage = (message) => ({
    type: NEW_MESSAGE,
    payload: message
})

const editMessage = (message) => ({
    type: EDIT_MESSAGE,
    payload: message
})

const deleteMessage = (message) => ({
    type: DELETE_MESSAGE,
})

export const loadMessagesByChannel = (channelId) => async (dispatch) => {
    const response = await fetch(`/api/channels/${channelId}/messages`);
    if (response.ok) {
        const messages = await response.json();
        dispatch(loadMessages(messages));
    }
    return response
}

export const newMessageChannel = (message, channelId) => async (dispatch) => {
    const response = await fetch(`/api/channels/${channelId}/messages/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            message
        })
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(newMessage(data));
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occured. Please try again."];
    }
}

export const editMessageChannel = (message, channelId, messageId) => async (dispatch) => {
    const response = await fetch(`/api/channels/${channelId}/messages/${messageId}`, {
        method: "PUT",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            message
        })
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(editMessage(data));
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occured. Please try again."];
    }
}

export const deleteMessageChannel = (channelId, messageId) => async (dispatch) => {
    const response = await fetch(`/api/channels/${channelId}/messages/${messageId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(deleteMessage(data));
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occured. Please try again."];
    }
}

const initialState = {messages: [], message: null}

export default function messageReducer(state = initialState, action) {
    let newState = Object.assign(state)
    switch (action.type) {
        case LOAD_MESSAGES:
            return {...newState, messages: action.payload}
        case NEW_MESSAGE:
            return {...newState, message: action.payload}
        case EDIT_MESSAGE:
            return {...newState, message: action.payload}
        case DELETE_MESSAGE:
            return {...newState}
        default:
            return state;
    }
}