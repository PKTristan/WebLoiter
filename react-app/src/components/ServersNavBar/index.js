import React, {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CreateServerModal from "../CreateServerModal";
import * as serverActions from "../../store/server";
import './servernavbar.css'

function ServerNavBar() {
    const dispatch = useDispatch();
    const servers = useSelector(state => state.server.servers);
    const serverMembers = useSelector(state => state.server.serverMembers);
    const user = useSelector(state => state.session.user);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(serverActions.fetchServers());
        dispatch(serverActions.fetchServerMembers());
    }, [dispatch]);

    const filteredServers = Object.values(servers).filter(server => serverMembers.some(membership => 
        membership.server_id === server.id && membership.member_id === user.id));

    const PlusButton = () => user && (
        <li>
            <button 
                onClick={() => setShowModal(true)} 
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            >
                <img 
                    src="https://i.imgur.com/iztujJc.png" 
                    alt="Button Img" 
                    style={{ width: "25px", height: "25px"}}
                />
            </button>
        </li>
    );

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
            {PlusButton()}
            {showModal && <CreateServerModal hideForm={() => setShowModal(false)}/>}
        </ul>
    );
}


export default ServerNavBar