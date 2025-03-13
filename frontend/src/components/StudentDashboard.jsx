import React from "react";

const StudentDashboard = () => {
  // Sample data
  const allocatedLabs = [
    { labName: "AI Lab", server: "Server-12", usage: "75%" },
    { labName: "Cloud Computing Lab", server: "Server-7", usage: "60%" },
  ];

  const notifications = [
    "Server maintenance scheduled for March 20, 2025",
    "New lab allocation policy update available",
    "AI Lab server will undergo an upgrade next week",
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Student Dashboard</h2>
      
      {/* Allocated Labs Section */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Allocated Labs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allocatedLabs.map((lab, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4 border">
              <h4 className="text-xl font-bold text-gray-900">{lab.labName}</h4>
              <p className="text-gray-600">Server: {lab.server}</p>
              <p className="text-gray-600">Usage: {lab.usage}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Notifications Section */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Notifications</h3>
        <ul className="list-disc list-inside bg-gray-100 p-4 rounded-lg">
          {notifications.map((note, index) => (
            <li key={index} className="text-gray-700">{note}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentDashboard;
