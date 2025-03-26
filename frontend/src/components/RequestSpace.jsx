
import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RequestSpace = () => {
  const [labs, setLabs] = useState([]);
  const [selectedLab, setSelectedLab] = useState("");
  const [servers, setServers] = useState([]);
  const [freeServers, setFreeServers] = useState(0);
  const [freeProcessors, setFreeProcessors] = useState(0);
  const [processors, setProcessors] = useState([]);



  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNumber: "",
    labName: "",
    labId: "",
    serversRequired: "",
    processorsRequired: "",
    ramRequired: "",
  });
  const navigate = useNavigate();

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
///////fetch servers
  useEffect(() => {
    const fetchServers = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/auth/servers");
        setServers(response.data);
      } catch (err) {
        console.error("Failed to fetch servers:", err);
      }
    };
    fetchServers();
  }, []);
///fetch processors
  useEffect(() => {
    const fetchProcessors = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/auth/processors");
        setProcessors(response.data);
      } catch (err) {
        console.error("Failed to fetch processors:", err);
      }
    };
    fetchProcessors();
  }, []);
///////
  useEffect(() => {
    if (selectedLab) {
      const selectedLabObj = labs.find((lab) => lab.id === parseInt(selectedLab));
      setFormData((prev) => ({
        ...prev,
        labName: selectedLabObj ? selectedLabObj.name : "",
        labId: selectedLab,
      }));

      const filteredServers = servers.filter((server) => server.lab.id === parseInt(selectedLab));
      const totalFreeServers = filteredServers.reduce((sum, server) => sum + server.free, 0);
      setFreeServers(totalFreeServers);
      const filteredProcessors = processors.filter((processor) => processor.lab.id === parseInt(selectedLab));
    const totalFreeProcessors = filteredProcessors.reduce((sum, processor) => sum + processor.free, 0);
    setFreeProcessors(totalFreeProcessors);
    } else {
      setFreeServers(0);
      setFreeProcessors(0);
      setFormData((prev) => ({
        ...prev,
        labName: "",
        labId: "",
      }));
    }
  }, [selectedLab, labs, servers, processors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // First, submit the request
      const response = await axios.post("http://localhost:8081/api/auth/requests", formData);
      const requestId = response.data.id; // Assuming the backend returns the request ID
  
      // Then, update check_status
      await axios.post(`http://localhost:8081/api/auth/check_status/${requestId}`);
  
      alert("Request submitted successfully!");
      navigate("/student-dashboard/view-my-bookings");
  
      // Reset form fields
      setFormData({
        name: "",
        email: "",
        rollNumber: "",
        labName: "",
        labId: "",
        serversRequired: "",
        processorsRequired: "",
        ramRequired: "",
      });
      setSelectedLab("");
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Failed to submit request. Please try again.");
    }
  };
  

  return (
    <Layout>
      <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Request Lab Space & Servers
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" required />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" required />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Roll Number</label>
                <input type="text" name="rollNumber" value={formData.rollNumber} onChange={handleChange} placeholder="Enter your Roll Number" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" required />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Lab Name</label>
                <select name="labId" value={selectedLab} onChange={(e) => setSelectedLab(e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" required>
                  <option value="">Select a Lab</option>
                  {labs.length > 0 ? (
                    labs.map((lab) => (
                      <option key={lab.id} value={lab.id}>{lab.name}</option>
                    ))
                  ) : (
                    <option disabled>Loading labs...</option>
                  )}
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Lab ID</label>
                <input type="text" name="labId" value={formData.labId} readOnly className="w-full px-4 py-3 border rounded-lg bg-gray-100 text-lg" />
              </div>

              {/* <div>
                <label className="block text-gray-700 font-bold mb-2">Servers Required</label>
                <input type="number" name="serversRequired" value={formData.serversRequired} onChange={handleChange} placeholder={`Available: ${freeServers}`} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" required />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Processors Required</label>
                <input type="number" name="processorsRequired" value={formData.processorsRequired} onChange={handleChange} placeholder={`Available: ${freeProcessors}`} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" required />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">RAM Required (in GB)</label>
                <input type="number" name="ramRequired" value={formData.ramRequired} onChange={handleChange} placeholder="Enter RAM size (32 GB)" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" required />
              </div> */}
            </div>
          </div>

          <div className="mt-6">
            <button type="submit" className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-xl font-semibold hover:bg-blue-700 transition">
              Request Lab Space
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default RequestSpace;
