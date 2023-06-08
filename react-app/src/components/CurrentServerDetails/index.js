import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import * as serverActions from "../../store/server";
import UpdateServerModal from "../UpdateServerModal";
import ConfirmServerDeleteModal from "../ConfirmServerDeleteModal";

function CurrServer(){
    const dispatch = useDispatch();
    const currServer = useSelector(state => state.server.currentServer);
    const user = useSelector(state => state.session.user);
    const { id } = useParams()

    const update_server_button = () => {
        if (user.id === currServer.owner_id) {
            return (
                <OpenModalButton 
                buttonText="Update"
                modalComponent={<UpdateServerModal />}
                />
            )
        }
    }

    const delete_server_button = () => {
        if (user.id === currServer.owner_id) {
            return (
                <OpenModalButton 
                buttonText="Delete"
                modalComponent={<ConfirmServerDeleteModal />}
                />
            )
        }
    }

    useEffect(() => {
        dispatch(serverActions.fetchCurrentServer(id))
    }, [dispatch, id]);

    return (
        <div>
            <h1>{currServer.server_name}</h1>
            {update_server_button()}
            {delete_server_button()}
        </div>
    )
}


export default CurrServer