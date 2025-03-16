import React from "react";
import { useNavigate } from "react-router-dom";
import photo2 from '../assets/photo2.png';
import Layout from "./Layout";  // Import Layout

const StudentDashboard = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center text-center p-6 relative">
        {/* Background Image */}
        <img src={photo2} alt="Photo2" className="absolute inset-0 w-full max-w-screen-lg: object-cover opacity-30" />

        {/* Text Content */}
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Your Dashboard</h2>
          <p className="text-lg text-gray-700 max-w-2xl mb-6">
            Manage your lab bookings, check notifications, and stay updated with all your academic activities. Explore and make the most of your time!
          </p>
          <button 
            onClick={() => navigate("/student-dashboard/view-all-labs")} 
            className="bg-[#8facdb] text-white px-6 py-3 rounded-lg shadow-md text-lg font-semibold hover:bg-[#14386f] transition"
          >
            Explore Labs
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
