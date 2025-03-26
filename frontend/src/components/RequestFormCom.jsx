// src/com/RequestFormCom.js
import React, { useState } from 'react';

const RequestFormCom = ({ onSubmitRequest }) => {
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (description.trim() === '') {
            setError('Request description cannot be empty.');
            return;
        }
        setError('');
        const newRequest = {
            id: Date.now(), // Unique ID for the request
            description,
            status: 'Pending',
        };
        onSubmitRequest(newRequest);
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Request Lab Space</h2>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your request"
                required
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Submit Request</button>
        </form>
    );
};

export default RequestFormCom;
