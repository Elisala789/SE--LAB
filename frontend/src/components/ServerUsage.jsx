
import React, { useEffect, useState } from "react";
import axios from "axios";
import LabAdminLayout from './LabAdminLayout'
import { ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ServerUsage = () => {
  const [requests, setRequests] = useState([]);
  const [expandedRequest, setExpandedRequest] = useState(null);
    const navigate = useNavigate();
  

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/auth/requests");
      const filteredRequests = await Promise.all(
        response.data.map(async (req) => {
          try {
            const statusResponse = await axios.get(`http://localhost:8081/api/auth/check_status/${req.id}`);
            const { requestSentToSupervisor, supervisorVerified, forwardedToLabAdmin, adminStatus } = statusResponse.data;
            if (requestSentToSupervisor && supervisorVerified && forwardedToLabAdmin && adminStatus === "Approved") {
              return req;
            }
            return null;
          } catch (error) {
            console.error("Error checking request status:", error);
            return null;
          }
        })
      );
      setRequests(filteredRequests.filter(Boolean));
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const toggleDetails = (reqId) => {
    setExpandedRequest(expandedRequest === reqId ? null : reqId);
  };




  return (
    <LabAdminLayout>
      <div className="p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Usage Analytics</h2>
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
                   onClick={() => navigate("/labadmin-dashboard/view-server-usage")}
                    className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-md"
                  >
                    View Analytics
                  </button>
                  <button
                   //onClick={() => checkStatus(req.id, "approve")}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                  >
                    Approved
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
       
      </div>
    </LabAdminLayout>
  );
};
export default ServerUsage;
