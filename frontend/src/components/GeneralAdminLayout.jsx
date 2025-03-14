import React from "react";
import { Link } from "react-router-dom";
import { 
  Plus, Settings, Users, Building2, LogOut, Home, User 
} from "lucide-react";

const GeneralAdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-green-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white shadow-lg p-6">
        <h2 className="text-2xl font-bold flex items-center mb-6">
          <User className="mr-2" size={28} /> General Admin
        </h2>

        <nav className="space-y-4">
          <Link to="/generaladmin-dashboard" className="flex items-center space-x-2 hover:text-green-400 transition">
            <Home size={20} /> <span>Dashboard</span>
          </Link>
          <Link to="/generaladmin-dashboard/add-lab" className="flex items-center space-x-2 hover:text-blue-400 transition">
            <Building2 size={20} /> <span>Add Lab</span>
          </Link>
          <Link to="/generaladmin-dashboard/manage-labs" className="flex items-center space-x-2 hover:text-green-400 transition">
            <Settings size={20} /> <span>Manage Labs</span>
          </Link>
          <Link to="/generaladmin-dashboard/add-lab-admin" className="flex items-center space-x-2 hover:text-purple-400 transition">
            <Users size={20} /> <span>Add Lab Admin</span>
          </Link>
          <Link to="/generaladmin-dashboard/manage-lab-admins" className="flex items-center space-x-2 hover:text-red-400 transition">
            <Plus size={20} /> <span>Manage Lab Admins</span>
          </Link>
          <Link to="/" className="flex items-center space-x-2 text-red-500 hover:text-red-400 transition">
            <LogOut size={20} /> <span>Logout</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8">
        {children}
      </main>
      
    </div>
  );
};

export default GeneralAdminLayout;
