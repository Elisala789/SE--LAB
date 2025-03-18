import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiHome, FiClipboard, FiCheckSquare, FiSend, FiLogOut } from "react-icons/fi";

const SupervisorLayout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F5F9]">
      {/* Navbar */}
      <nav className="bg-[#8facdb] text-[#0b0c0c] p-4 flex items-center justify-between shadow-md">
        <h2 className="text-2xl font-bold">Supervisor Panel</h2>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          <NavItem to="/supervisor/dashboard" icon={<FiHome />} label="Dashboard" />
          <NavItem to="/supervisor/pending" icon={<FiClipboard />} label="Pending" />
          <NavItem to="/supervisor/verified" icon={<FiCheckSquare />} label="Verified" />
          <NavItem to="/supervisor/forwarded" icon={<FiSend />} label="Forwarded" />
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-lg hover:text-[#0e0e0f] transition">
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
          <NavItem to="/supervisor/dashboard" icon={<FiHome />} label="Dashboard" />
          <NavItem to="/supervisor/pending" icon={<FiClipboard />} label="Pending" />
          <NavItem to="/supervisor/verified" icon={<FiCheckSquare />} label="Verified" />
          <NavItem to="/supervisor/forwarded" icon={<FiSend />} label="Forwarded" />
          <button className="flex items-center gap-2 text-lg hover:text-[#E2E8F0] transition" onClick={() => navigate("/")}>
            <FiLogOut /> Logout
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-grow p-6 bg-gray-100 overflow-auto">{children}</div>
    </div>
  );
};

// Reusable Navigation Item Component
const NavItem = ({ to, icon, label }) => (
  <Link to={to} className="flex items-center gap-2 text-lg hover:text-[#0e0e0f] transition">
    {icon} {label}
  </Link>
);

export default SupervisorLayout;
