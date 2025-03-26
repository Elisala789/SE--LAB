import React, { useState } from 'react';
import ServerItem from './ServerItem';
import EditServer from './EditServer';
import './ServerManagement.css';

const ServerManagement = () => {
  const [servers, setServers] = useState([]);
  const [serverName, setServerName] = useState('');
  const [serverStatus, setServerStatus] = useState('active');
  const [editingServer, setEditingServer] = useState(null);

  const handleAddServer = () => {
    if (serverName) {
      setServers([...servers, { serverName, serverStatus }]);
      setServerName('');
      setServerStatus('active');
    }
  };

  const handleEditServer = (server) => {
    setEditingServer(server);
  };

  const handleUpdateServer = (updatedServer) => {
    setServers(servers.map(server => 
      server.serverName === updatedServer.serverName ? updatedServer : server
    ));
    setEditingServer(null);
  };

  const handleDeleteServer = (serverName) => {
    setServers(servers.filter(server => server.serverName !== serverName));
  };

  return (
    <div className="server-management" id="server-management">
      <h2>Server Management</h2>
      <div className="server-form">
        <input
          type="text"
          placeholder="Server Name"
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
        <button onClick={handleAddServer}>Add Server</button>
      </div>
      <div className="server-list">
        <h3>Servers</h3>
        <ul>
          {servers.map((server, index) => (
            <ServerItem
              key={index}
              server={server}
              onEdit={handleEditServer}
              onDelete={handleDeleteServer}
            />
          ))}
        </ul>
      </div>
      {editingServer && (
        <EditServer
          server={editingServer}
          onUpdate={handleUpdateServer}
          onCancel={() => setEditingServer(null)}
        />
      )}
    </div>
  );
};

export default ServerManagement;
