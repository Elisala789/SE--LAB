import React, { useState } from 'react';
import './EditServer.css';

const EditServer = ({ server, onUpdate, onCancel }) => {
  const [serverName, setServerName] = useState(server.serverName);
  const [serverStatus, setServerStatus] = useState(server.serverStatus);

  const handleUpdate = () => {
    onUpdate({ ...server, serverName, serverStatus });
  };

  return (
    <div className="edit-server">
      <h3>Edit Server</h3>
      <input
        type="text"
        value={serverName}
        onChange={(e) => setServerName(e.target.value)}
      />
      <select
        value={serverStatus}
        onChange={(e) => setServerStatus(e.target.value)}
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <button onClick={handleUpdate}>Update</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditServer;
