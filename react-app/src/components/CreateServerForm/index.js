import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as serverActions from "../../store/server";
import { Redirect } from "react-router-dom";


const CreateServerForm = ({ hideForm }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [errors, setErrors] = useState([]);
    const [serverName, setServerName] = useState("");
    const [serverType, setServerType] = useState("");
    const [avatar, setAvatar] = useState("");
    const [serverDetails, setServerDetails] = useState("");
    const [privateServer, setPrivateServer] = useState(false);
    const [directMessage, setDirectMessage] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newServer = {
            server_name: serverName,
            server_type: serverType,
            avatar: avatar,
            server_details: serverDetails,
            private: privateServer,
            direct_message: directMessage
        }
    
        const data = await dispatch(serverActions.createServerAction(newServer));
            console.log('this is my currr data', newServer)
        // if (data) {
        //     setErrors(data)
        // } else {
        //     hideForm();
        // }
    }
    return (
        <div>
            <h1>Create Server</h1>
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
                    />
                </label>
                <br/>
                <label>
                    Server Details:
                    <textarea
                        type="text"
                        value={serverDetails}
                        onChange={(e) => setServerDetails(e.target.value)}
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
                    DM:
                    <input
                        type="checkbox"
                        checked={directMessage}
                        onChange={(e) => setDirectMessage(e.target.checked)}
                    />
                </label>
                <br/>
                <button type="submit">Create Server</button>
            </form>
        </div>

    )
}

export default CreateServerForm