import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import * as serverActions from "../../store/server";
import UpdateServerModal from "../UpdateServerModal";
import ConfirmServerDeleteModal from "../ConfirmServerDeleteModal";
import * as sessionActions from "../../store/session";
import Channels from "../Channels";
import "./CurrServer.css"
import { clearChannel } from "../../store/channel";

function CurrServer() {
    const dispatch = useDispatch();
    const currServer = useSelector(state => state.server.currentServer);
    const user = useSelector(state => state.session.user);
    const {serverId, channelId} = useParams();
    console.log(currServer)

    const update_server_button = () => {
        if ((user.id === currServer.owner_id)) {
            return (
                <OpenModalButton
                    buttonText="Update"
                    modalComponent={<UpdateServerModal />}
                    className="button-1"
                />
            )
        }
    }

    const delete_server_button = () => {
        if ((user.id === currServer.owner_id)) {
            return (
                <OpenModalButton
                    buttonText="Delete"
                    modalComponent={<ConfirmServerDeleteModal />}
                />
            )
        }
    }

    useEffect(() => {
        dispatch(sessionActions.fetchAllUsers());
        dispatch(serverActions.fetchCurrentServer(serverId))
    }, [dispatch, serverId]);

    useEffect (() => {
        dispatch(clearChannel())
    }, [serverId, channelId, dispatch]);

    return user && currServer ? (
        <div>
            <div className="curr-server">
                <div className="server-name">
                    <h3>{currServer.server_name}</h3>
                </div>
                { !currServer.direct_message ? (
                    <div className="buttons-container">
                        <div className="button-1">{update_server_button()}</div>
                        <div className="button-2">{delete_server_button()}</div>
                    </div>
                ): null }
                <br />
            </div>
            <div className="channels-container">
                <Channels />
            </div>
        </div>

    ) : null
}


export default CurrServer
