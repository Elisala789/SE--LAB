import React, { useState } from 'react';
import './EditLabSpace.css';

const EditLabSpace = ({ space, onUpdate, onCancel }) => {
  const [labName, setLabName] = useState(space.labName);
  const [capacity, setCapacity] = useState(space.capacity);

  const handleUpdate = () => {
    onUpdate({ ...space, labName, capacity });
  };

  return (
    <div className="edit-lab-space">
      <h3>Edit Lab Space</h3>
      <input
        type="text"
        value={labName}
        onChange={(e) => setLabName(e.target.value)}
      />
      <input
        type="number"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
      />
      <button onClick={handleUpdate}>Update</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditLabSpace;
