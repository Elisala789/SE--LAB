import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./Layout";

const ViewNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/auth/requests");
      setNotifications(response.data);
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
      <div className="p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Notifications</h2>
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[70vh] text-gray-600">
            <img src="/empty.svg" alt="No Notifications" className="w-48 h-48 mb-4" />
            <p className="text-lg">No notifications found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notif) => (
              <div key={notif.id} className="p-4 border border-gray-300 rounded-lg shadow-md bg-white flex items-start">
                <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full text-lg font-bold">
                  {notif.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <p className="text-lg font-semibold text-gray-800">{notif.name}</p>
                  <p className="text-gray-600 text-sm">
                    Requested LabSpace in {notif.labName}
                  </p>
                  <p className="text-gray-500 text-xs">{new Date(notif.createdAt).toLocaleString()}</p>
                </div>
                <button
                  onClick={() => handleCheckStatus(notif)}
                  className="ml-auto bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-md"
                >
                  Check Status
                </button>
                {/*  */}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pop-up for Status */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h3 className="text-xl font-semibold text-gray-800">Request Status</h3>
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

export default ViewNotifications;
