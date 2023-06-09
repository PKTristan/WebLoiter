import React, {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CreateServerForm from "../CreateServerForm";
import OpenModalButton from "../OpenModalButton";
import * as serverActions from "../../store/server";
import './servernavbar.css'

function ServerNavBar() {
    const dispatch = useDispatch();
    const servers = useSelector(state => state.server.servers);
    const serverMembers = useSelector(state => state.server.serverMembers);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(serverActions.fetchServers());
        dispatch(serverActions.fetchServerMembers());
    }, [dispatch]);

    const filteredServers = Object.values(servers).filter(server => server.owner_id === user.id || serverMembers.some(membership => 
        membership.server_id === server.id && membership.member_id === user.id));

    
    return (
        <div className="server-navbar">

        <ul className="server-list">
            {filteredServers.map(server => (
                <li className="server-item" key={server.id}>
                    <NavLink to={`/servers/${server.id}`} className="server-link">
                        <img 
                            className='avatar' 
                            src={server.avatar} 
                            alt={server.server_name} 
                            title={server.server_name} 
                        />
                    </NavLink>
                </li>
            ))}
            {user && (
                < OpenModalButton 
                buttonText="+"
                modalComponent={<CreateServerForm />}
                className="open-modal-button"
                />
            )}
        </ul>
        </div>
    );
}


export default ServerNavBar