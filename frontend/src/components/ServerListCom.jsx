// src/com/ServerListCom.js
import React, { useState } from 'react';

const ServerListCom = ({ servers, onSelectServer, onDeleteServer }) => {
    const [filter, setFilter] = useState('');
    const [filteredServers, setFilteredServers] = useState(servers);

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilter(value);
        if (value) {
            setFilteredServers(servers.filter(server => server.name.toLowerCase().includes(value.toLowerCase())));
        } else {
            setFilteredServers(servers);
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this server?')) {
            onDeleteServer(id);
        }
    };

    return (
        <div>
            <h2>Server List</h2>
            <input
                type="text"
                value={filter}
                onChange={handleFilterChange}
                placeholder="Filter by server name"
                style={{ marginBottom: '20px', padding: '8px', width: '300px' }}
            />
            {filteredServers.length === 0 ? (
                <p>No servers available.</p>
            ) : (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {filteredServers.map((server) => (
                        <li key={server.id} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                            <p><strong>Name:</strong> {server.name}</p>
                            <p><strong>IP Address:</strong> {server.ip}</p>
                            <p><strong>Status:</strong> {server.status || 'Unknown'}</p>
                            <button onClick={() => onSelectServer(server)}>View Details</button>
                            <button onClick={() => handleDelete(server.id)} style={{ marginLeft: '10px', color: 'red' }}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ServerListCom;
