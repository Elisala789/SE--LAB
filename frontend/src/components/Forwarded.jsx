import React, { useEffect, useState } from "react";
import axios from "axios";
import SupervisorLayout from "./SupervisorLayout";
import { ChevronDown, ChevronUp } from "lucide-react";

const Forwarded = () => {
  const [requests, setRequests] = useState([]);
  const [verifiedRequests, setVerifiedRequests] = useState({});
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isForwardMode, setIsForwardMode] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState({
    supervisorVerified: false,
    forwardedToLabAdmin: false,
    adminStatus: "",
  });
  const [expandedRequest, setExpandedRequest] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/auth/requests");
      console.log(response.data);

      const filteredRequests = await Promise.all(
        response.data.map(async (req) => {
          try {
            const statusResponse = await axios.get(`http://localhost:8081/api/auth/check_status/${req.id}`);
            const { forwardedToLabAdmin } = statusResponse.data;

            // Include only forwarded requests
            if (forwardedToLabAdmin) {
              return req;
            }
            return null; // Exclude other requests
          } catch (error) {
            console.error("Error checking request status:", error);
            return null; // Exclude in case of error
          }
        })
      );

      setRequests(filteredRequests.filter(Boolean)); // Remove null values
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const toggleDetails = (reqId) => {
    setExpandedRequest(expandedRequest === reqId ? null : reqId);
  };



  const checkStatus = async (reqId, mode) => {
    try {
      const response = await axios.get(`http://localhost:8081/api/auth/check_status/${reqId}`);
      console.log(response.data);

      if (response.status === 200 && response.data) {
        if (mode === "verify" && response.data.supervisorVerified) {
          alert("This request is already verified!");
          return;
        }

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
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Forwarded Requests</h2>
        {requests.length === 0 ? (
          <p className="text-gray-600 text-center">No Forward requests.</p>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div key={req.id} className="p-4 border border-gray-300 rounded-lg shadow-md bg-white">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold text-gray-800 flex items-center">
                    {req.name}
                    <button onClick={() => toggleDetails(req.id)} className="ml-2 text-gray-600 hover:text-gray-800">
                      {expandedRequest === req.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                    <span className="ml-16">Lab ID: {req.labId}</span> <span className="ml-4">Lab Name: {req.labName}</span>

                  </p>


                  <button
                            //onClick={() => checkStatus(req.id, "forward")}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                          >
                            Forwarded
                          </button>
                </div>

                {expandedRequest === req.id && (
                  <div className="mt-2 p-3 bg-gray-100 rounded-md">
                    <p><strong>Email:</strong> {req.email}</p>
                    <p><strong>Roll Number:</strong> {req.rollNumber}</p>
                    <p><strong>Lab Name:</strong> {req.labName}</p>
                    <p><strong>Processors Required:</strong> {req.processorsRequired}</p>
                    <p><strong>RAM Required:</strong> {req.ramRequired} GB</p>
                    <p><strong>Servers Required:</strong> {req.serversRequired}</p>
                    <p><strong>Requested At:</strong> {new Date(req.createdAt).toLocaleString()}</p>
                  </div>
                )}
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

export default Forwarded;
