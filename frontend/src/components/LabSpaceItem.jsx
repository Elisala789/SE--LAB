import React from 'react';
import './LabSpaceItem.css';

const LabSpaceItem = ({ space, onEdit, onDelete }) => {
  return (
    <li className="lab-space-item">
      <span>{space.labName} - Capacity: {space.capacity}</span>
      <button onClick={() => onEdit(space)}>Edit</button>
      <button onClick={() => onDelete(space.labName)}>Delete</button>
    </li>
  );
};

export default LabSpaceItem;
