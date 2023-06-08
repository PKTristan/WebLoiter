import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import * as serverActions from "../../store/server";


function UpdateServerModal() {
    const dispatch = useDispatch();
    const currServer = useSelector(state => state.server.currentServer);
    const user = useSelector(state => state.session.user);
    const [serverName, setServerName] = useState("");
    const [serverType, setServerType] = useState("");
    const [avatar, setAvatar] = useState("");
    const [serverDetails, setServerDetails] = useState("");
    const [privateServer, setPrivateServer] = useState(false);
    const [directMessage, setDirectMessage] = useState(false);
    const { closeModal } = useModal();
    const { id } = useParams()
    const history = useHistory();

    useEffect(() => {
        setServerName(currServer.server_name)
        setServerType(currServer.server_type)
        setAvatar(currServer.avatar)
        setServerDetails(currServer.server_details)
        setPrivateServer(currServer.private)
        setDirectMessage(currServer.direct_message)
    }, [currServer]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedServer = {
            id: currServer.id,
            server_name: serverName,
            server_type: serverType,
            avatar: avatar,
            server_details: serverDetails,
            private: privateServer,
            direct_message: directMessage
        }
        dispatch(serverActions.updateServerThunk(updatedServer))
        window.location.reload()
        closeModal();
    }

    return (
        <div>
            <h1>Update {currServer.server_name}</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Server Name:
                    <input
                        type="text"
                        value={serverName}
                        onChange={(e) => setServerName(e.target.value)}
                        required
                    />
                </label>
                <br/>
                <label>
                    Server Type:
                    <select
                        value={serverType}
                        onChange={(e) => setServerType(e.target.value)}
                        required
                    >
                        <option value="gaming">Gaming</option>
                        <option value="sports">Sports</option>
                        <option value="anime">Anime</option>
                        <option value="art">Art</option>
                        <option value="studying">Studying</option>
                        <option value="misc">Miscellaneous</option>
                    </select>
                </label>
                <br/>
                <label>
                    Avatar:
                    <input
                        type="text"
                        value={avatar}
                        onChange={(e) => setAvatar(e.target.value)}
                        required
                    />
                </label>
                <br/>
                <label>
                    Server Details:
                    <input
                        type="text"
                        value={serverDetails}
                        onChange={(e) => setServerDetails(e.target.value)}
                        required
                    />
                </label>
                <br/>
                <label>
                    Private Server:
                    <input
                        type="checkbox"
                        checked={privateServer}
                        onChange={(e) => setPrivateServer(e.target.checked)}
                    />
                </label>
                <br/>
                <label>
                    Direct Message:
                    <input
                        type="checkbox"
                        checked={directMessage}
                        onChange={(e) => setDirectMessage(e.target.checked)}
                    />
                </label>
                <br/>
                <button type="submit">Update Server</button>
            </form>
        </div>
    )
}

export default UpdateServerModal