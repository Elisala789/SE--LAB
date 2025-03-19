import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Settings,
  Users,
  Building2,
  LogOut,
  Home,
  User
} from "lucide-react";

const GeneralAdminLayout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <nav className="bg-[#8facdb] text-[#0b0c0c] py-4 px- flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-4">
          <User size={28} />
          <h2 className="text-2xl font-bold">General Admin</h2>
        </div>
        <div className="flex space-x-6">
          {[
            { to: "/generaladmin-dashboard", icon: Home, text: "Dashboard" },
            { to: "/generaladmin-dashboard/add-lab", icon: Building2, text: "Add Lab" },
            { to: "/generaladmin-dashboard/manage-labs", icon: Settings, text: "Manage Labs" },
            { to: "/generaladmin-dashboard/add-lab-admin", icon: Users, text: "Add Lab Admin" },
            { to: "/generaladmin-dashboard/manage-lab-admins", icon: Plus, text: "Manage Lab Admins" }
          ].map(({ to, icon: Icon, text }) => (
            <button
              key={to}
              onClick={() => navigate(to)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg transition duration-300 hover:bg-gray-200 hover:text-gray-900"
            >
              <Icon size={20} className="text-gray-700" />
              <span className="text-lg font-medium">{text}</span>
            </button>
          ))}
        </div>
        <button
          onClick={() => navigate("/")}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg transition duration-300 hover:bg-red-500 hover:text-white"
        >
          <LogOut size={20} className="text-gray-700" />
          <span className="text-lg font-medium">Logout</span>
        </button>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 min-h-screen p-10 bg-gray-100">
        {children}
      </div>
    </div>
  );
};

export default GeneralAdminLayout;
