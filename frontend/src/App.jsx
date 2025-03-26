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
import ViewLabs from "./components/ViewLabs";
import RequestSpace from "./components/RequestSpace";
import ViewBookings from "./components/ViewBookings";
import ViewNotifications from "./components/ViewNotifications";
import SupervisorDashboard from "./components/SupervisorDashboard";
import Pendings from "./components/Pendings";
import Verified from "./components/Verified";
import Forwarded from "./components/Forwarded";
import GrafanaDashboard from "./components/GrafanaDashboard";
import Approved from "./components/Approved";
import Approved_reqs from "./components/Approved_reqs";
import Rejected_reqs from "./components/Rejected_reqs";
import GrafanaDashboard2 from "./components/GrafanaDashboard2";
import ServerUsage from "./components/ServerUsage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard Routes */}
        <Route path="/student-dashboard" element={<Dashboard1 />} />
        <Route path="/student-dashboard/view-all-labs" element={<ViewLabs />} />
        <Route path="/student-dashboard/request-space" element={<RequestSpace />} />
        <Route path="/student-dashboard/view-my-bookings" element={<ViewBookings />} />
        <Route path="/student-dashboard/view-my-notifications" element={<ViewNotifications />} />

        <Route path="/faculty-dashboard" element={<Dashboard2 />} />
        <Route path="/generaladmin-dashboard" element={<Dashboard3 />} />
        <Route path="/researcher-dashboard" element={<Dashboard4 />} />
        <Route path="/supervisor-dashboard" element={<SupervisorDashboard />} />
        <Route path="/supervisor-dashboard/pendings" element={< Pendings/>} />
        <Route path="/supervisor-dashboard/verified" element={< Verified/>} />
        <Route path="/supervisor-dashboard/forwards" element={< Forwarded/>} />

        
        <Route path="/stu" element={<GrafanaDashboard />} />
        <Route path="/labadmin-dashboard/view-server-usage" element={<GrafanaDashboard2 />} />



        <Route path="/labadmin-dashboard" element={<Dashboard5 />} />
        <Route path="/labadmin-dashboard/view-all-recieved-requests" element={<Approved />} />
        <Route path="/labadmin-dashboard/view-all-approved-requests" element={<Approved_reqs />} />
        <Route path="/labadmin-dashboard/view-all-rejected-requests" element={<Rejected_reqs />} />
        <Route path="/labadmin-dashboard/view-server-usagee" element={<ServerUsage />} />





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
