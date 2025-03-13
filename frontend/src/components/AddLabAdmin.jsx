import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GeneralAdminLayout from "./GeneralAdminLayout";

const AddLabAdmin = () => {
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    lab_id: "",
  });

  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch available labs from backend
  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/auth/labs");
        console.log(response.data);
        setLabs(response.data);
      } catch (err) {
        setError("Failed to fetch labs. Try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchLabs();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };
  const handleLabChange = (e) => {
    setAdminData({
      ...adminData,
      lab_id: e.target.value,  // Directly store the selected lab_id
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!adminData.lab_id) {
      alert("Please select a lab!");
      return;
    }
    console.log("Selected Lab ID:", adminData.lab_id);
    console.log("Selected Lab ID:", adminData.email);


    try {
      await axios.post(`http://localhost:8081/api/auth/lab-admins/add/${adminData.lab_id}`, {
        name: adminData.name,
        email: adminData.email,
        phone: adminData.phone,
        password: adminData.password,
      });
      
      alert("Lab Admin added successfully!");
      navigate("/generaladmin-dashboard/");
    } catch (err) {
      alert("Lab already has an assigned admin");
      console.error("Error:", err);
    }
  };

  return (
    <GeneralAdminLayout>
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Add Lab Admin</h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading available labs...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-600 text-sm font-medium">Admin Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter admin name"
                value={adminData.name}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={adminData.email}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm font-medium">Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                value={adminData.phone}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={adminData.password}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm font-medium">Assign Lab</label>
              <select name="lab_id" value={adminData.lab_id} onChange={handleLabChange} required>
  <option value="">Select a lab</option>
  {labs.map((lab) => (
    <option key={lab.id} value={lab.id}>
      {lab.name}
    </option>
  ))}
</select>

            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-400 via-white to-green-600 text-gray-800 py-3 rounded-lg font-semibold shadow-lg hover:from-blue-500 hover:to-green-700 transition"
            >
              Add Lab Admin
            </button>
          </form>
        )}
      </div>
    </div>
    </GeneralAdminLayout>
  );
};

export default AddLabAdmin;