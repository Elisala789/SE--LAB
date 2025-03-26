// src/com/RequestListCom.js
import React from 'react';

const RequestListCom = ({ requests, onUpdateRequest }) => {
    return (
        <div>
            <h3>Requests</h3>
            {requests.length === 0 ? (
                <p>No requests available.</p>
            ) : (
                <ul>
                    {requests.map((request) => (
                        <li key={request.id} style={{ marginBottom: '10px' }}>
                            <p><strong>Description:</strong> {request.description}</p>
                            <p><strong>Status:</strong> {request.status}</p>
                            <button onClick={() => onUpdateRequest(request.id, 'Approved')}>Approve</button>
                            <button onClick={() => onUpdateRequest(request.id, 'Rejected')}>Reject</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RequestListCom;
