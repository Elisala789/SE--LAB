

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiUserPlus, FiSettings, FiUsers, FiPlusSquare } from "react-icons/fi";
import GeneralAdminLayout from "./GeneralAdminLayout";

const GeneralAdmin = () => {
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLab, setSelectedLab] = useState(null);

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

  return (
    <GeneralAdminLayout>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h1>
      
      <div className="flex gap-6">
        {/* Labs List - Left Side 40% */}
        {/* Dashboard Grid - Right Side 60% */}
        <div className="w-3/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <DashboardCard to="/generaladmin-dashboard/add-lab" icon={FiUserPlus} iconColor="blue" text="Add Lab" />
          <DashboardCard to="/generaladmin-dashboard/manage-labs" icon={FiSettings} iconColor="green" text="Manage Labs" />
          <DashboardCard to="/generaladmin-dashboard/add-lab-admin" icon={FiUsers} iconColor="purple" text="Add Lab Admin" />
          <DashboardCard to="/generaladmin-dashboard/manage-lab-admins" icon={FiPlusSquare} iconColor="red" text="Manage Lab Admins" />
        </div>
        <div className="w-2/5 p-4 bg-white shadow-md rounded-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Recent Labs Added</h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading labs...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : labs.length === 0 ? (
            <p className="text-center text-gray-500">No labs available.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {labs.slice(0, 3).map((lab) => (
                <div key={lab.id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800">{lab.name}</h3>
                  <button
                    onClick={() => setSelectedLab(lab)}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    View Details
                  </button>
                </div>
              ))}
              <a href="/generaladmin-dashboard/manage-labs" className="block mt-4 text-center text-blue-600 hover:underline">
                View All Labs
              </a>
            </div>
          )}
        </div>

        
      </div>
      
      {selectedLab && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedLab.name}</h2>
            <p className="text-gray-600">Servers: {selectedLab.servers}</p>
            <p className="text-gray-600">Location: {selectedLab.location}</p>
            <p className="text-gray-600">Operating Hours: {selectedLab.operating_hours}</p>
            <p className="text-gray-600">RAM: {selectedLab.ram}</p>
            <p className="text-gray-600">Processors: {selectedLab.processors}</p>
            <button
              onClick={() => setSelectedLab(null)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </GeneralAdminLayout>
  );
};

const DashboardCard = ({ to, icon: Icon, iconColor, text }) => (
  <a href={to} className="group">
    <div className="p-6 rounded-2xl bg-white shadow-lg flex flex-col items-center transition duration-300 transform hover:scale-105 hover:shadow-xl">
      <Icon className={`text-${iconColor}-600`} size={40} />
      <p className="mt-4 text-lg font-semibold text-gray-700 group-hover:text-gray-900">{text}</p>
    </div>
  </a>
);

export default GeneralAdmin;
