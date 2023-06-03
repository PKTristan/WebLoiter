import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as serverActions from "../../store/server";


function CurrServer(){
    const dispatch = useDispatch();
    const currServer = useSelector(state => state.server.currentServer);
    const { id } = useParams()

    useEffect(() => {
        dispatch(serverActions.fetchCurrentServer(id))
    }, [dispatch, id]);

    return (
        <div>
            <h1>{currServer.server_name}</h1>
        </div>
    )
}


export default CurrServer