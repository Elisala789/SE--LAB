import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Dashboard1 from "./components/StudentDashboard";
import Dashboard2 from "./components/FacultyDashboard";
import Dashboard3 from "./components/GeneralAdmin";
import Dashboard4 from "./components/ResearcherDashboard";
import Dashboard5 from "./components/LadAdminDashboard";
import AddLab from "./components/AddLab";
import ManageLabs from "./components/ManageLabs";
import AddLabAdmin from "./components/AddLabAdmin";
import ManageLabAdmins from "./components/ManageLabAdmins";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard Routes */}
        <Route path="/student-dashboard" element={<Dashboard1 />} />
        <Route path="/faculty-dashboard" element={<Dashboard2 />} />
        <Route path="/generaladmin-dashboard" element={<Dashboard3 />} />
        <Route path="/researcher-dashboard" element={<Dashboard4 />} />
        <Route path="/labadmin-dashboard" element={<Dashboard5 />} />

        {/* Lab Management (Only Accessible Inside GeneralAdmin) */}
        <Route path="/generaladmin-dashboard/add-lab" element={<AddLab />} />
        <Route path="/generaladmin-dashboard/manage-labs" element={<ManageLabs />} />
        <Route path="/generaladmin-dashboard/add-lab-admin" element={<AddLabAdmin />} />
        <Route path="/generaladmin-dashboard/manage-lab-admins" element={<ManageLabAdmins />} />
      </Routes>
    </Router>
  );
};

export default App;
