// src/com/NotificationsCom.js
import React from 'react';

const NotificationsCom = ({ notifications }) => {
    return (
        <div>
            <h3>Notifications</h3>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>{notification}</li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationsCom;
