// src/com/AddServerCom.js
import React, { useState } from 'react';

const AddServerCom = ({ onAddServer }) => {
    const [name, setName] = useState('');
    const [ip, setIp] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
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
        const newServer = {
            id: Date.now(), // Unique ID for the server
            name,
            ip,
        };

        onAddServer(newServer);
        setSuccess('Server added successfully!');
        setName('');
        setIp('');
    };

    return (
        <div>
            <h2>Add New Server</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter server name"
                        required
                    />
                </div>
                <div>
                    <label>IP Address:</label>
                    <input
                        type="text"
                        value={ip}
                        onChange={(e) => setIp(e.target.value)}
                        placeholder="Enter server IP address"
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <button type="submit">Add Server</button>
            </form>
        </div>
    );
};

export default AddServerCom;
