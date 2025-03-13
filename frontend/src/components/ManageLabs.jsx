import React, { useEffect, useState } from "react";
import axios from "axios";
import GeneralAdminLayout from "./GeneralAdminLayout";

const ManageLabs = () => {
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingLab, setEditingLab] = useState(null);
  const [editName, setEditName] = useState("");
  const [editServers, setEditServers] = useState("");

  useEffect(() => {
    const getLabs = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/auth/labs");
        setLabs(response.data);
      } catch (err) {
        console.error("Error fetching labs:", err);
        setError("Failed to load labs.");
      } finally {
        setLoading(false);
      }
    };
    getLabs();
  }, []);

  const handleEdit = (lab) => {
    setEditingLab(lab);
    setEditName(lab.name);
    setEditServers(lab.servers);
  };

  const handleUpdate = async () => {
    if (!editingLab) return;

    try {
      const updatedLab = { name: editName, servers: editServers };
      await axios.put(`http://localhost:8081/api/auth/labs/${editingLab.id}`, updatedLab);

      setLabs(labs.map(lab => (lab.id === editingLab.id ? { ...lab, ...updatedLab } : lab)));
      setEditingLab(null);
    } catch (err) {
      console.error("Error updating lab:", err);
      alert("Failed to update the lab.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lab?")) return;

    try {
      await axios.delete(`http://localhost:8081/api/auth/labs/${id}`);
      setLabs(labs.filter((lab) => lab.id !== id));
    } catch (err) {
      console.error("Error deleting lab:", err);
      alert("Failed to delete the lab.");
    }
  };

  return (
    <GeneralAdminLayout>
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Manage Labs</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading labs...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : labs.length === 0 ? (
        <p className="text-center text-gray-500">No labs available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {labs.map((lab) => (
            <div key={lab.id} className="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">{lab.name}</h3>
              <p className="text-gray-600 mt-1">{lab.servers} Servers</p>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleEdit(lab)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(lab.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingLab && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Edit Lab</h3>
          <label className="block mb-2">Name:</label>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="w-full p-2 border rounded"
          />

          <label className="block mt-4 mb-2">Servers:</label>
          <input
            type="number"
            value={editServers}
            onChange={(e) => setEditServers(e.target.value)}
            className="w-full p-2 border rounded"
          />

          <div className="mt-4 flex gap-4">
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Update
            </button>
            <button
              onClick={() => setEditingLab(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
    </GeneralAdminLayout>
  );
};

export default ManageLabs;
