import React from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Settings,
  Users,
  Building2,
  LogOut,
  Home,
  User
} from "lucide-react";

const SidebarLink = ({ to, icon: Icon, text }) => (
  <Link
    to={to}
    className="flex items-center space-x-3 px-5 py-3 rounded-xl transition duration-300 hover:bg-white hover:text-gray-900 shadow-md"
  >
    <Icon size={22} className="text-gray-300 group-hover:text-gray-700" />
    <span className="text-lg font-medium">{text}</span>
  </Link>
);

const DashboardCard = ({ to, icon: Icon, iconColor, text }) => (
  <Link to={to} className="group">
    <div className="p-6 rounded-2xl bg-white shadow-lg flex flex-col items-center transition duration-300 transform hover:scale-105 hover:shadow-xl">
      <Icon className={`text-${iconColor}-600`} size={40} />
      <p className="mt-4 text-lg font-semibold text-gray-700 group-hover:text-gray-900">{text}</p>
    </div>
  </Link>
);

const GeneralAdmin = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      {/* Sidebar */}
      <aside className="w-72 p-6 bg-gray-900 text-white shadow-2xl rounded-r-3xl flex flex-col space-y-6">
        <h2 className="text-2xl font-bold flex items-center">
          <User className="mr-3" size={28} /> General Admin
        </h2>
        <nav className="space-y-4">
          <SidebarLink to="/generaladmin-dashboard" icon={Home} text="Dashboard" />
          <SidebarLink to="/generaladmin-dashboard/add-lab" icon={Building2} text="Add Lab" />
          <SidebarLink to="/generaladmin-dashboard/manage-labs" icon={Settings} text="Manage Labs" />
          <SidebarLink to="/generaladmin-dashboard/add-lab-admin" icon={Users} text="Add Lab Admin" />
          <SidebarLink to="/generaladmin-dashboard/manage-lab-admins" icon={Plus} text="Manage Lab Admins" />
          <SidebarLink to="/" icon={LogOut} text="Logout" className="text-red-500" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h1>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard to="/generaladmin-dashboard/add-lab" icon={Building2} iconColor="blue" text="Add Lab" />
          <DashboardCard to="/generaladmin-dashboard/manage-labs" icon={Settings} iconColor="green" text="Manage Labs" />
          <DashboardCard to="/generaladmin-dashboard/add-lab-admin" icon={Users} iconColor="purple" text="Add Lab Admin" />
          <DashboardCard to="/generaladmin-dashboard/manage-lab-admins" icon={Plus} iconColor="red" text="Manage Lab Admins" />
        </div>
      </main>
    </div>
  );
};

export default GeneralAdmin;
