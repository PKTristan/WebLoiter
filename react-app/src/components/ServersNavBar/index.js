import React, {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as serverActions from "../../store/server";
import './servernavbar.css'

function ServerNavBar(){
    const dispatch = useDispatch();
    const servers = useSelector(state => state.server.servers);
    const serverMembers = useSelector(state => state.server.serverMembers);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(serverActions.fetchServers())
        dispatch(serverActions.fetchServerMembers())
    }, [dispatch]);
    const filteredServers = []
    Object.values(servers).forEach(server => {
        serverMembers.forEach(membership => {
            if (membership.server_id === server.id && membership.member_id === user.id) {
                filteredServers.push(server)
            }
        })
    })
    return (
        <ul>
            {filteredServers.map((server) => (
                <li key={server.id}>
                    <NavLink to={`/servers/${server.id}`} >
                        <img 
                            className='avatar' 
                            src={server.avatar} 
                            alt={server.server_name} 
                            title={server.server_name} 
                            style={{ 
                                width: "40px", 
                                height: "40px", 
                                borderRadius: "50%" }}>
                                </img>
                    </NavLink>
                </li>
            ))}
        </ul>
    )
}


export default ServerNavBar