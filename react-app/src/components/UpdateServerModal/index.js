import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import * as serverActions from "../../store/server";
import './Update.css'


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
    const [errors, setErrors] = useState([]);
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
        const data = await dispatch(serverActions.updateServerThunk(updatedServer))
        dispatch(serverActions.fetchCurrentServer(updatedServer.id))
        window.location.reload()
        if (data) {
            setErrors(data);
            } else {
                closeModal()
            }
    }

    return (
        <div className="update-form">
            <h2>Update {currServer.server_name}</h2>
            {errors.map((error, idx) => (
                <div key={idx}>{error}</div>
            ))}
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
                    <textarea
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
                <div className="update-buttons">
                <button type="submit" className="update-submit-btn">Update Server</button>
                <button onClick={closeModal} className="update-cancel-btn">Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateServerModal