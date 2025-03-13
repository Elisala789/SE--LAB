import React, { useState } from "react";
import { addLab } from "../api";
import { useNavigate } from "react-router-dom";
import GeneralAdminLayout from "./GeneralAdminLayout"; 

const AddLab = () => {
  const [labData, setLabData] = useState({ name: "", servers: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLabData({ ...labData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addLab(labData);
      alert("Lab added successfully!");
      navigate("/generaladmin-dashboard");
    } catch (error) {
      console.error("Error adding lab:", error);
      alert("Failed to add lab.");
    }
  };

  return (
    <GeneralAdminLayout>
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Add New Lab</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm font-medium">Lab Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter lab name"
              value={labData.name}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium">Number of Servers</label>
            <input
              type="number"
              name="servers"
              placeholder="Enter number of servers"
              value={labData.servers}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-400 via-white to-green-600 text-gray-900 py-2 rounded-lg font-semibold text-lg shadow-lg transform transition hover:scale-105 hover:from-green-500 via-white hover:to-blue-700 duration-300"
          >
            Add Lab
          </button>
        </form>

        {/* Back Button
        <button
          onClick={() => navigate("/generaladmin-dashboard")}
          className="w-full mt-4 bg-gray-700 text-white py-2 rounded-lg font-semibold text-lg shadow-md hover:bg-gray-900 transition duration-300"
        >
          ⬅ Back to Dashboard
        </button> */}
        
      </div>
    </div>
    </GeneralAdminLayout>
  );
};

export default AddLab;
