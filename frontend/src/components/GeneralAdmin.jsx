import React from "react";
import { Link } from "react-router-dom";
import { 
  Plus, Settings, Users, Building2, LogOut, Home, User 
} from "lucide-react";

const GeneralAdmin = () => {
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
          <Link to="/generaladmin-dashboard/add-lab" className="flex items-center space-x-2 hover:text-green-400 transition">
            <Building2 size={20} /> <span>Add Lab</span>
          </Link>
          <Link to="/generaladmin-dashboard/manage-labs" className="flex items-center space-x-2 hover:text-green-400 transition">
            <Settings size={20} /> <span>Manage Labs</span>
          </Link>
          <Link to="/generaladmin-dashboard/add-lab-admin" className="flex items-center space-x-2 hover:text-purple-600 transition">
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

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Add Lab */}
          <Link to="/generaladmin-dashboard/add-lab" className="group">
            <div className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center hover:shadow-xl transition">
              <Building2 className="text-blue-600 group-hover:text-blue-800" size={40} />
              <p className="mt-4 text-lg font-semibold text-gray-700 group-hover:text-blue-900">Add Lab</p>
            </div>
          </Link>

          {/* Manage Labs */}
          <Link to="/generaladmin-dashboard/manage-labs" className="group">
            <div className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center hover:shadow-xl transition">
              <Settings className="text-green-600 group-hover:text-green-800" size={40} />
              <p className="mt-4 text-lg font-semibold text-gray-700 group-hover:text-green-900">Manage Labs</p>
            </div>
          </Link>

          {/* Add Lab Admin */}
          <Link to="/generaladmin-dashboard/add-lab-admin" className="group">
            <div className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center hover:shadow-xl transition">
              <Users className="text-purple-600 group-hover:text-purple-800" size={40} />
              <p className="mt-4 text-lg font-semibold text-gray-700 group-hover:text-purple-900">Add Lab Admin</p>
            </div>
          </Link>

          {/* Manage Lab Admins */}
          <Link to="/generaladmin-dashboard/manage-lab-admins" className="group">
            <div className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center hover:shadow-xl transition">
              <Plus className="text-red-600 group-hover:text-red-800" size={40} />
              <p className="mt-4 text-lg font-semibold text-gray-700 group-hover:text-red-900">Manage Lab Admins</p>
            </div>
          </Link>

        </div>
      </main>
      
    </div>
  );
};

export default GeneralAdmin;
