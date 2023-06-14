import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CreateServerForm from "../CreateServerForm";
import OpenModalButton from "../OpenModalButton";
import ServerListPopup from "./ServerListPopup";
import * as serverActions from "../../store/server";
import './servernavbar.css'

function ServerNavBar() {
  const dispatch = useDispatch();
  const servers = useSelector(state => state.server.servers);
  const serverMembers = useSelector(state => state.server.serverMembers);
  const user = useSelector(state => state.session.user);
  const [showPopup, setShowPopup] = useState(false);
  const [fetchedServers, setFetchedServers] = useState([]);

  useEffect(() => {
    dispatch(serverActions.fetchServers(setFetchedServers));
    dispatch(serverActions.fetchServerMembers());
  }, [dispatch, setFetchedServers]);

  const filteredServers = Object.values(servers).filter(server => server.owner_id === user.id || serverMembers.some(membership =>
    membership.server_id === server.id && membership.member_id === user.id));


  return user && filteredServers.length ? (
    <div className="server-navbar">
      <ul className="server-list">
        {/* Render servers with direct messages */}
        {filteredServers
          .filter(server => server.direct_message) // Filter servers with direct messages
          .map(server => (
            <li className="server-item" key={server.id}>
              <NavLink to={`/servers/${server.id}`} className="server-link">
                <img
                  className="avatar"
                  src={server.avatar}
                  alt={server.server_name}
                  title={server.server_name}
                />
                <span className="alt-text">{server.server_name}</span>
              </NavLink>
            </li>
          ))}
        {/* Render the rest of the servers */}
        {filteredServers
          .filter(server => !server.direct_message) // Filter servers without direct messages
          .map(server => (
            <li className="server-item" key={server.id}>
              <NavLink to={`/servers/${server.id}`} className="server-link">
                <img
                  className="avatar"
                  src={server.avatar}
                  alt={server.server_name}
                  title={server.server_name}
                />
              </NavLink>
              <span className="alt-text">{server.server_name}</span>
            </li>
          ))}
        {user && (
          <>
            <div className="open-modal-button">
              <OpenModalButton
                buttonText="+"
                modalComponent={<CreateServerForm />}
                title="create new server"
                className="create-server-button"
              />
              <span className="alt-text">create new server </span>
            </div>
            <button className="fetch-servers-button" onClick={() => setShowPopup(true)}>
              Explore Servers
            </button>
          </>
        )}
      </ul>
      {showPopup && <ServerListPopup servers={fetchedServers} />}

    </div>
  ) : null;
}


export default ServerNavBar