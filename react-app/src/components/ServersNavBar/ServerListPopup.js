import React from "react";

const ServerListPopup = ({ servers }) => {
    return (
        <div className="server-list-popup">
            {servers.map(server => (
                <div key={server.id} className="server-popup-item">
                    <img
                        className="avatar"
                        src={server.avatar}
                        alt={server.server_name}
                    />
                    <span>{server.server_name}</span>
                </div>
            ))}
        </div>
    )
}

export default ServerListPopup