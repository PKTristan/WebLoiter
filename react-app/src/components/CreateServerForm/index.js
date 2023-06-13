import React, {useState} from "react";
import { useDispatch } from "react-redux";
import * as serverActions from "../../store/server";
import { useModal } from "../../context/Modal";
import './ServerForm.css';

const CreateServerForm = ({ hideForm }) => {
    const dispatch = useDispatch();
    // const sessionUser = useSelector((state) => state.session.user);
    const [errors, setErrors] = useState([]);
    const [serverName, setServerName] = useState("");
    const [serverType, setServerType] = useState("");
    const [avatar, setAvatar] = useState("");
    const [serverDetails, setServerDetails] = useState("");
    const [privateServer, setPrivateServer] = useState(false);
    const [directMessage, setDirectMessage] = useState(false);
    const { closeModal } = useModal();

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
        dispatch(serverActions.fetchServers());
        if (data.errors) {
            setErrors(data.errors);
            } else {
                closeModal()
            }
    
    }
    return (
        <div className="server-form">
            <h2>Create Server</h2>
            {errors.map((error, idx) => (
                <div key={idx} className="errors-create">{error}</div>
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
                        <option value="" disabled>please make a selection....</option>
                        <option value="gaming">Gaming</option>
                        <option value="sports">Sports</option>
                        <option value="anime">Anime</option>
                        <option value="art">Art</option>
                        <option value="studying">Studying</option>
                        <option value="misc">Miscellaneous</option>
                        {/* error test purposes below */}
                        <option value="random">Random</option>
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
                <div className="server-submit-buttons">
                <br/>
                <button className="server-submit-btn" type="submit">Create</button>
                <br/>
                <button className="server-cancel-btn" onClick={closeModal}>Cancel</button>
                </div>
            </form>
        </div>

    )
}

export default CreateServerForm