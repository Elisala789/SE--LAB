import React from 'react';
import './ServerItem.css';

const ServerItem = ({ server, onEdit, onDelete }) => {
  return (
    <li className="server-item">
      <span>{server.serverName} - Status: {server.serverStatus}</span>
      <button onClick={() => onEdit(server)}>Edit</button>
      <button onClick={() => onDelete(server.serverName)}>Delete</button>
    </li>
  );
};

export default ServerItem;
