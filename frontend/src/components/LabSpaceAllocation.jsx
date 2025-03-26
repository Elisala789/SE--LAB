import React, { useState } from 'react';
import LabSpaceItem from './LabSpaceItem';
import EditLabSpace from './EditLabSpace';
import './LabSpaceAllocation.css';

const LabSpaceAllocation = () => {
  const [allocatedSpaces, setAllocatedSpaces] = useState([]);
  const [labName, setLabName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [editingSpace, setEditingSpace] = useState(null);

  const handleAllocateSpace = () => {
    if (labName && capacity) {
      setAllocatedSpaces([...allocatedSpaces, { labName, capacity }]);
      setLabName('');
      setCapacity('');
    }
  };

  const handleEditSpace = (space) => {
    setEditingSpace(space);
  };

  const handleUpdateSpace = (updatedSpace) => {
    setAllocatedSpaces(allocatedSpaces.map(space => 
      space.labName === updatedSpace.labName ? updatedSpace : space
    ));
    setEditingSpace(null);
  };

  const handleDeleteSpace = (labName) => {
    setAllocatedSpaces(allocatedSpaces.filter(space => space.labName !== labName));
  };

  return (
    <div className="lab-space-allocation" id="lab-space">
      <h2>Lab Space Allocation</h2>
      <div className="allocation-form">
        <input
          type="text"
          placeholder="Lab Name"
          value={labName}
          onChange={(e) => setLabName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
        <button onClick={handleAllocateSpace}>Allocate Space</button>
      </div>
      <div className="allocated-spaces">
        <h3>Allocated Lab Spaces</h3>
        <ul>
          {allocatedSpaces.map((space, index) => (
            <LabSpaceItem
              key={index}
              space={space}
              onEdit={handleEditSpace}
              onDelete={handleDeleteSpace}
            />
          ))}
        </ul>
      </div>
      {editingSpace && (
        <EditLabSpace
          space={editingSpace}
          onUpdate={handleUpdateSpace}
          onCancel={() => setEditingSpace(null)}
        />
      )}
    </div>
  );
};

export default LabSpaceAllocation;
