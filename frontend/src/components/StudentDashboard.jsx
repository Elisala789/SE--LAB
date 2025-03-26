import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import photo2 from '../assets/photo2.png';
import Layout from "./Layout";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/auth/requests");
      setNotifications(response.data.slice(0, 3)); // Show latest 3 notifications
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleCheckStatus = async (notif) => {
    try {
      const response = await axios.get(`http://localhost:8081/api/auth/check_status/${notif.id}`);

      if (response.status === 200 && response.data) {
        const { requestSentToSupervisor, supervisorVerified, forwardedToLabAdmin, adminStatus } = response.data;
        
        setSelectedStatus(
          `Request Sent to Supervisor: ${requestSentToSupervisor ? "✅ Yes" : "❌ No"}\n
          Supervisor Verified: ${supervisorVerified ? "✅ Yes" : "❌ No"}\n
          Forwarded to Lab Admin: ${forwardedToLabAdmin ? "✅ Yes" : "❌ No"}\n
          Admin Status: ${adminStatus || "Not Available"}`
        );
      } else {
        setSelectedStatus("No status available");
      }
    } catch (error) {
      console.error("Error fetching check status:", error);
      setSelectedStatus("Error fetching status");
    }
    setShowPopup(true);
  };

  return (
    <Layout>
      <div className="flex justify-between items-center px-10 py-6 relative">
        {/* Background Image */}
        <img src={photo2} alt="Photo2" className="absolute inset-0 w-full object-cover opacity-30" />

        {/* Left Section - Explore Labs */}
        <div className="relative z-10 w-3/5 flex flex-col justify-center text-left">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Your Dashboard</h2>
          <p className="text-lg text-gray-700 max-w-2xl mb-6">
            Manage your lab space and server requests, check notifications, and stay updated with all your activities.
          </p>
          <button 
            onClick={() => navigate("/student-dashboard/view-all-labs")} 
            className="bg-[#8facdb] text-white px-6 py-3 rounded-lg shadow-md text-lg font-semibold hover:bg-[#14386f] transition"
          >
            Explore Labs
          </button>
        </div>

        {/* Right Section - Notifications */}
        <div className="relative z-10 w-2/5 bg-white p-4 shadow-md rounded-lg border border-gray-300">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Recent Requests</h3>
          
          {notifications.length === 0 ? (
            <p className="text-gray-600 text-sm text-center">No recent requests.</p>
          ) : (
            <div className="space-y-3">
              {notifications.map((notif) => (
                <div key={notif.id} className="p-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{notif.labName}</p>
                    <p className="text-xs text-gray-600">
                      {notif.serversRequired} Servers, {notif.processorsRequired} Processors
                    </p>
                  </div>
                  <button
                    onClick={() => handleCheckStatus(notif)}
                    className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                  >
                    Check Status
                  </button>
                </div>
              ))}
            </div>
          )}

          <button 
            onClick={() => navigate("/student-dashboard/view-my-notifications")} 
            className="mt-3 text-blue-500 text-xs hover:underline block text-center"
          >
            View All Requests
          </button>
        </div>
      </div>

      {/* Status Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center relative">
            <h3 className="text-lg font-semibold text-gray-800">Request Status</h3>
            <div className="mt-2 text-gray-600 text-sm text-left">
              {selectedStatus.split("\n").map((line, index) => (
                <p key={index} className="mb-1">{line}</p>
              ))}
            </div>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
      
    </Layout>
  );
};

export default StudentDashboard;
