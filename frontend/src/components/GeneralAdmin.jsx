

import React from "react";
import { FiUserPlus, FiSettings, FiUsers, FiPlusSquare } from "react-icons/fi";
//import photo2 from '../assets/photo2.png';
import GeneralAdminLayout from "./GeneralAdminLayout"; 


const GeneralAdmin = () => {
  return (
    <GeneralAdminLayout>
            
              {/* <img src={photo2} alt="Photo2" className="absolute inset-0 w-full max-w-screen-2xl: object-cover opacity-30" /> */}
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard to="/generaladmin-dashboard/add-lab" icon={FiUserPlus} iconColor="blue" text="Add Lab" />
        <DashboardCard to="/generaladmin-dashboard/manage-labs" icon={FiSettings} iconColor="green" text="Manage Labs" />
        <DashboardCard to="/generaladmin-dashboard/add-lab-admin" icon={FiUsers} iconColor="purple" text="Add Lab Admin" />
        <DashboardCard to="/generaladmin-dashboard/manage-lab-admins" icon={FiPlusSquare} iconColor="red" text="Manage Lab Admins" />
      </div>
      
    </GeneralAdminLayout>
  );
};

const DashboardCard = ({ to, icon: Icon, iconColor, text }) => (
  <a href={to} className="group">
    <div className="p-6 rounded-2xl bg-white shadow-lg flex flex-col items-center transition duration-300 transform hover:scale-105 hover:shadow-xl">
      <Icon className={`text-${iconColor}-600`} size={40} />
      <p className="mt-4 text-lg font-semibold text-gray-700 group-hover:text-gray-900">{text}</p>
    </div>
  </a>
);

export default GeneralAdmin;


