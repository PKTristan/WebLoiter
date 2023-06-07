import React, {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CreateServerModal from "../CreateServerModal";
import CreateServerForm from "../CreateServerForm";
import OpenModalButton from "../OpenModalButton";
import * as serverActions from "../../store/server";
import './servernavbar.css'

function ServerNavBar() {
    const dispatch = useDispatch();
    const servers = useSelector(state => state.server.servers);
    const serverMembers = useSelector(state => state.server.serverMembers);
    const user = useSelector(state => state.session.user);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        dispatch(serverActions.fetchServers());
        dispatch(serverActions.fetchServerMembers());
    }, [dispatch]);

    const filteredServers = Object.values(servers).filter(server => serverMembers.some(membership => 
        membership.server_id === server.id && membership.member_id === user.id));

    const handleModalOpen = (e) => {
        e.preventDefault();
        setShowForm(true)
        console.log('modal open button', showForm);
    }

    

    return (
        <ul>
            {filteredServers.map(server => (
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
                                borderRadius: "50%" 
                            }}
                        />
                    </NavLink>
                </li>
            ))}
            {user && (
                < OpenModalButton 
                buttonText="+"
                modalComponent={<CreateServerForm />}
                />
            )}
        </ul>
    );
}


export default ServerNavBar