// src/com/ServerDetailsCom.js
import React, { useState } from 'react';

const ServerDetailsCom = ({ server, onBack, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(server.name);
    const [ip, setIp] = useState(server.ip);
    const [error, setError] = useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleUpdate = () => {
        if (!name || !ip) {
            setError('Both fields are required.');
            return;
        }

        // Simple IP address validation
        const ipPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if (!ipPattern.test(ip)) {
            setError('Invalid IP address format.');
            return;
        }

        setError('');
        onUpdate({ ...server, name, ip });
        setIsEditing(false);
    };

    const handleDelete = () => {
        if (window.confirm(Are you sure you want to delete the server "${server.name}"?)) {
            onDelete(server.id);
            onBack(); // Go back to the server list after deletion
        }
    };

    return (
        <div>
            <h2>Server Details</h2>
            {isEditing ? (
                <div>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>IP Address:</label>
                        <input
                            type="text"
                            value={ip}
                            onChange={(e) => setIp(e.target.value)}
                        />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button onClick={handleUpdate}>Save Changes</button>
                    <button onClick={() => setIsEditing(false)} style={{ marginLeft: '10px' }}>Cancel</button>
                </div>
            ) : (
                <div>
                    <p><strong>Name:</strong> {server.name}</p>
                    <p><strong>IP Address:</strong> {server.ip}</p>
                    <p><strong>Status:</strong> {server.status || 'Unknown'}</p>
                    <button onClick={() => setIsEditing(true)}>Edit Server</button>
                    <button onClick={handleDelete} style={{ marginLeft: '10px', color: 'red' }}>Delete Server</button>
                    <button onClick={onBack} style={{ marginLeft: '10px' }}>Back to List</button>
                </div>
            )}
        </div>
    );
};

export default ServerDetailsCom;
