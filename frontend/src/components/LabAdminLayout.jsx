
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiHome, FiCalendar, FiBell, FiLogOut, FiBookmark, FiGitlab, FiMonitor, FiGitPullRequest, FiServer, FiActivity } from "react-icons/fi";
import { FileWarningIcon } from "lucide-react";

const LabAdminLayout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F5F9]">
      {/* Navbar */}
      <nav className="bg-[#8facdb] text-[#0b0c0c] p-4 flex items-center justify-between shadow-md">
        <h1 className="text-2xl font-semibold">Lab Admin Dashboard</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
        <button
            onClick={() => navigate("/labadmin-dashboard")}
            className="flex items-center gap-2 text-lg hover:text-[#0e0e0f] transition"
          >
            <FiHome /> DashBoard
          </button>
          <button
            onClick={() => navigate("/labadmin-dashboard/view-server-usagee")}
            className="flex items-center gap-2 text-lg hover:text-[#0e0e0f] transition"
          >
            <FiServer /> Server Usage
          </button>
          
  
          <button
            onClick={() => navigate("/labadmin-dashboard/view-all-recieved-requests")}
            className="flex items-center gap-2 text-lg hover:text-[#0e0e0f] transition"
          >
            <FiGitPullRequest /> View-Requests
          </button>
          <button
            onClick={() => navigate("/labadmin-dashboard/view-all-approved-requests")}
            className="flex items-center gap-2 text-lg hover:text-[#0e0e0f] transition"
          >
            <FiActivity /> Approved-Requests
          </button>
          <button
            onClick={() => navigate("/labadmin-dashboard/view-all-rejected-requests")}
            className="flex items-center gap-2 text-lg hover:text-[#0e0e0f] transition"
          >
            <FileWarningIcon /> Rejected-Requests
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-lg hover:bg-red-500 rounded-xl hover:text-[#0e0e0f] transition"
          >
            <FiLogOut /> Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-[#0b0c0c]" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#334155] text-[#E2E8F0] flex flex-col items-center gap-4 py-4">
          <button onClick={() => navigate("/student-dashboard/view-all-labs")} className="flex items-center gap-2 text-lg hover:text-[#E2E8F0] transition">
            <FiHome /> All Labs
          </button>
          <NavItem to="/my-bookings" icon={<FiCalendar />} label="View My Bookings" />
          <NavItem to="/notifications" icon={<FiBell />} label="Notifications" />
          <button className="flex items-center gap-2 text-lg hover:text-[#E2E8F0] transition" onClick={() => alert("Logging out...")}>
            <FiLogOut /> Logout
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-grow min-h-screen">{children}</div>
    </div>
  );
};

// Reusable Navigation Item Component
const NavItem = ({ to, icon, label }) => (
  <Link to={to} className="flex items-center gap-2 text-lg hover:text-[#0e0e0f] transition">
    {icon} {label}
  </Link>
);

export default LabAdminLayout;


