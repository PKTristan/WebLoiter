import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as serverActions from "../../store/server";
import "./Confirm.css";
import { useHistory } from "react-router-dom";


function ConfirmServerDeleteModal() {
    const dispatch = useDispatch();
    const currServer = useSelector(state => state.server.currentServer);
    const { closeModal } = useModal();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(serverActions.deleteServerThunk(currServer))
        dispatch(serverActions.fetchServers());
        closeModal();
        history.push('/api/servers');
    }
    return (
        <div className="confirm-server-delete">
            <form onSubmit={handleSubmit}>
            <h2>Are you sure you want to delete {currServer.server_name}?</h2>
            <div className="button-container">
            <button type="submit">Delete</button>
            <button onClick={closeModal}>Cancel</button>
            </div>
            </form>
        </div>
    )
}

export default ConfirmServerDeleteModal
