// src/com/UserProfileCom.js
import React, { useState } from 'react';

const UserProfileCom = () => {
    const [user, setUser ] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'Research Scholar',
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser ((prevUser ) => ({ ...prevUser , [name]: value }));
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        // Here you would typically send the updated info to your backend
        alert('Profile updated!');
        setIsEditing(false);
    };

    return (
        <div>
            <h2>User Profile</h2>
            <form onSubmit={handleUpdate}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        required
                    />
                </div>
                <div>
                    <label>Role:</label>
                    <input
                        type="text"
                        name="role"
                        value={user.role}
                        onChange={handleChange}
                        disabled={!isEditing}
                        required
                    />
                </div>
                <button type="button" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? 'Cancel' : 'Edit'}
                </button>
                {isEditing && <button type="submit">Update Profile</button>}
            </form>
        </div>
    );
};

export default UserProfileCom;
