import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import axios from "axios";

const RequestSpace = () => {
  const [labs, setLabs] = useState([]);
  const [selectedLab, setSelectedLab] = useState(""); // Stores selected lab ID

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/auth/labs");
        setLabs(response.data);
      } catch (err) {
        console.error("Failed to fetch labs:", err);
      }
    };
    fetchLabs();
  }, []);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Request Lab Space & Servers
        </h2>

        <form className="space-y-4">
          {/* Lab Name Dropdown */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Lab Name
            </label>
            <select
              name="labName"
              value={selectedLab}
              onChange={(e) => setSelectedLab(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a Lab</option>
              {labs.length > 0 ? (
                labs.map((lab) => (
                  <option key={lab.id} value={lab.id}>
                    {lab.name}
                  </option>
                ))
              ) : (
                <option disabled>Loading labs...</option>
              )}
            </select>
          </div>

          {/* Lab ID (Autofilled) */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Lab ID
            </label>
            <input
              type="text"
              name="labId"
              value={selectedLab}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            />
          </div>

          {/* Servers Required */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Servers Required
            </label>
            <input
              type="number"
              name="servers"
              placeholder="Enter number of servers"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Processors Required */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Processors Required
            </label>
            <input
              type="number"
              name="processors"
              placeholder="Enter number of processors"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* RAM Required */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              RAM Required (in GB)
            </label>
            <input
              type="number"
              name="ram"
              placeholder="Enter RAM size"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default RequestSpace;
