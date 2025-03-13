import React, { useEffect, useState } from "react";
import axios from "axios";
import GeneralAdminLayout from "./GeneralAdminLayout";

const ManageLabAdmins = () => {
  const [labAdmins, setLabAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchLabAdmins = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/auth/lab-admins");
        setLabAdmins(response.data);
      } catch (err) {
        console.error("Error fetching lab admins:", err);
        setError("Failed to load lab admins.");
      } finally {
        setLoading(false);
      }
    };

    fetchLabAdmins();
  }, []);

  const handleEditClick = (admin) => {
    setEditingAdmin(admin);
    setFormData({ name: admin.name, email: admin.email });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!editingAdmin) return;
    setUpdating(true);

    try {
      await axios.put(`http://localhost:8081/api/auth/lab-admins/update${editingAdmin.id}`, formData);
      setLabAdmins((prevAdmins) =>
        prevAdmins.map((admin) =>
          admin.id === editingAdmin.id ? { ...admin, ...formData } : admin
        )
      );
      setEditingAdmin(null);
    } catch (err) {
      console.error("Error updating admin:", err);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <GeneralAdminLayout>
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Manage Lab Admins</h2>

        {loading ? (
          <p className="text-center text-gray-500 text-lg">Loading lab admins...</p>
        ) : error ? (
          <p className="text-center text-red-500 text-lg">{error}</p>
        ) : labAdmins.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No lab admins available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {labAdmins.map((admin) => (
              <div
                key={admin.id}
                className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="text-2xl font-semibold text-gray-900">{admin.name}</h3>
                <p className="text-gray-600 mt-2">
                  <strong className="text-gray-700">Email:</strong> {admin.email}
                </p>
                <p className="text-gray-600 mt-1">
                  <strong className="text-gray-700">Lab ID:</strong> {admin.adminId}
                </p>
                <button
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-300"
                  onClick={() => handleEditClick(admin)}
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Lab Admin</h2>
            <label className="block text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
            />

            <label className="block text-gray-700 mt-3">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
            />

            <div className="flex justify-end mt-4 space-x-3">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                onClick={() => setEditingAdmin(null)}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                onClick={handleUpdate}
                disabled={updating}
              >
                {updating ? "Updating..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </GeneralAdminLayout>
  );
};

export default ManageLabAdmins;
