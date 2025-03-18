import React, { useEffect, useState } from "react";
import axios from "axios";
import SupervisorLayout from "./SupervisorLayout";

const SupervisorDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isForwardMode, setIsForwardMode] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState({
    supervisorVerified: false,
    forwardedToLabAdmin: false,
    adminStatus: "",
  });

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/auth/requests");
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const checkStatus = async (reqId, mode) => {
    try {
      const response = await axios.get(`http://localhost:8081/api/auth/check_status/${reqId}`);
      if (response.status === 200 && response.data) {
        setSelectedRequest({ id: reqId, ...response.data });
        setUpdatedStatus({
          supervisorVerified: response.data.supervisorVerified || false,
          forwardedToLabAdmin: response.data.forwardedToLabAdmin || false,
          adminStatus: response.data.adminStatus || "",
        });
        setIsForwardMode(mode === "forward");
        setShowPopup(true);
      }
    } catch (error) {
      console.error("Error fetching check status:", error);
      setSelectedRequest(null);
      setShowPopup(true);
    }
  };

  const updateStatus = async () => {
    if (!selectedRequest) return;

    try {
      const response = await axios.put(
        `http://localhost:8081/api/auth/check_status/${selectedRequest.id}`,
        null,
        {
          params: {
            supervisorVerified: updatedStatus.supervisorVerified,
            forwardedToLabAdmin: updatedStatus.forwardedToLabAdmin,
          },
        }
      );

      if (response.status === 200) {
        alert("Status updated successfully!");
        setShowPopup(false);
        fetchRequests();
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    }
  };

  return (
    <SupervisorLayout>
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Supervisor Dashboard</h2>
      {requests.length === 0 ? (
        <p className="text-gray-600 text-center">No pending requests.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div key={req.id} className="p-4 border border-gray-300 rounded-lg shadow-md bg-white flex justify-between items-center">
              <p className="text-lg font-semibold text-gray-800">{req.name}</p>
              <div className="space-x-2">
                <button
                  onClick={() => checkStatus(req.id, "verify")}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Verify Request
                </button>
                <button
                  onClick={() => checkStatus(req.id, "forward")}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                >
                  Forward
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showPopup && selectedRequest && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h3 className="text-xl font-semibold text-gray-800">Request Status</h3>
            <div className="mt-2 text-gray-600 text-sm text-left">
              <p>Request Sent to Supervisor: {selectedRequest.requestSentToSupervisor ? "✅ Yes" : "❌ No"}</p>
              <p>
                Supervisor Verified:
                <input
                  type="checkbox"
                  className="ml-2"
                  checked={updatedStatus.supervisorVerified}
                  onChange={(e) =>
                    setUpdatedStatus({ ...updatedStatus, supervisorVerified: e.target.checked })
                  }
                  disabled={isForwardMode}
                />
              </p>
              <p>
                Forwarded to Lab Admin:
                <input
                  type="checkbox"
                  className="ml-2"
                  checked={updatedStatus.forwardedToLabAdmin}
                  onChange={(e) =>
                    setUpdatedStatus({ ...updatedStatus, forwardedToLabAdmin: e.target.checked })
                  }
                  disabled={!isForwardMode}
                />
              </p>
              <p>Admin Status: {selectedRequest.adminStatus || "Not Available"}</p>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={updateStatus}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Update
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </SupervisorLayout>
  );
};

export default SupervisorDashboard;
