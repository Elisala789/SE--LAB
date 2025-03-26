import React, { useState } from 'react';
import LabAdminLayout from './LabAdminLayout';
import { useNavigate } from 'react-router-dom';

const LabAdminDashboard = () => {
  const [showServerUsage, setShowServerUsage] = useState(false);
  const [showServerUsage1, setShowServerUsage1] = useState(false);

  const navigate = useNavigate(); 

  return (
    <LabAdminLayout>
      <div className="p-4">


        <div className="grid grid-cols-3 gap-4 mt-6">
          {/* Server Usage Card - Clickable */}
          <div
            className="bg-blue-500 text-white p-4 rounded-md shadow-md cursor-pointer hover:bg-blue-600"
            onClick={() => setShowServerUsage(!showServerUsage)}
          >
            <h2 className="text-lg font-semibold flex justify-between items-center">
              Server Usage
              <span className="ml-2">{showServerUsage ? "▲" : "▼"}</span>
            </h2>
            <p>Monitor server performance and usage details.</p>
          </div>

          <div className="bg-green-500 text-white p-4 rounded-md shadow-md flex flex-col items-center justify-center">
  <h2 className="text-lg font-semibold">User Management</h2>
  <p>View and manage lab users and access permissions.</p>
  <button
    onClick={() => navigate('/labadmin-dashboard/view-all-recieved-requests')}
    className="mt-2 bg-white text-green-600 font-semibold px-4 py-2 rounded-md hover:bg-gray-200"
  >
    Go to User Management
  </button>
</div>

          

          {/* Reports & Logs Card */}
          <div className="bg-purple-500 text-white p-4 rounded-md shadow-md"
            onClick={() => setShowServerUsage1(!showServerUsage1)}
          >
            <h2 className="text-lg font-semibold flex justify-between items-center">
            Reports & Logs
              <span className="ml-2">{showServerUsage1 ? "▲" : "▼"}</span>
            </h2>
            <p>Analyze system logs and generate reports.</p>
          </div>
        </div>

        {/* Toggle Section - Server Usage Details */}
{showServerUsage && (
  <div className="flex flex-col items-center justify-center min-h-screen mt-6 p-4 bg-gray-800 text-white rounded-md">
    <div className="grid grid-cols-2 gap-4">
      {/* Row 1 */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">CPU Usage</h3>
        <iframe
          src="http://localhost:3000/d-solo/X034JGT7Gz/springboot-apm-dashboard?orgId=1&timezone=browser&var-application=Server%20Monitoring%20&var-instance=$__all&var-hikaricp=HikariPool-2&var-memory_pool_heap=$__all&var-memory_pool_nonheap=$__all&theme=light&panelId=95&__feature.dashboardSceneSolo"
          width="550"
          height="300"
          frameborder="0"
        ></iframe>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">CPU Usage</h3>
        <iframe
          src="http://localhost:3000/d-solo/X034JGT7Gz/springboot-apm-dashboard?orgId=1&timezone=browser&var-application=Server%20Monitoring%20&var-instance=$__all&var-hikaricp=HikariPool-1&var-memory_pool_heap=$__all&var-memory_pool_nonheap=$__all&theme=light&panelId=66&__feature.dashboardSceneSolo"
          width="550"
          height="300"
          frameborder="0"
        ></iframe>
      </div>

      {/* Row 2 */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">CPU Usage</h3>
        <iframe
          src="http://localhost:3000/d-solo/X034JGT7Gz/springboot-apm-dashboard?orgId=1&timezone=browser&var-application=Server%20Monitoring%20&var-instance=$__all&var-hikaricp=HikariPool-1&var-memory_pool_heap=$__all&var-memory_pool_nonheap=$__all&theme=light&panelId=96&__feature.dashboardSceneSolo"
          width="550"
          height="300"
          frameborder="0"
        ></iframe>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">CPU Usage</h3>
        <iframe
          src="http://localhost:3000/d-solo/X034JGT7Gz/springboot-apm-dashboard?orgId=1&timezone=browser&var-application=Server%20Monitoring%20&var-instance=$__all&var-hikaricp=HikariPool-1&var-memory_pool_heap=$__all&var-memory_pool_nonheap=$__all&theme=light&panelId=58&__feature.dashboardSceneSolo"
          width="550"
          height="300"
          frameborder="0"
        ></iframe>
      </div>

      {/* Row 3 */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Non-heap Used</h3>
        <iframe
          src="http://localhost:3000/d-solo/X034JGT7Gz/springboot-apm-dashboard?orgId=1&timezone=browser&var-application=Server%20Monitoring%20&var-instance=$__all&var-hikaricp=HikariPool-1&var-memory_pool_heap=$__all&var-memory_pool_nonheap=$__all&theme=light&panelId=60&__feature.dashboardSceneSolo"
          width="550"
          height="300"
          frameborder="0"
        ></iframe>
      </div>
      
    </div>
  </div>
)}

        {/* Toggle Section - Server Usage Details */}
        {showServerUsage1 && (
  <div className="flex flex-col items-center justify-center min-h-screen mt-6 p-4 bg-gray-800 text-white rounded-md">
    <div className="grid grid-cols-2 gap-4">
      
      <div>
          <h3 className="text-xl font-semibold text-white mb-2">
            LogBack Statistics
          </h3>
          <iframe src="http://localhost:3000/d-solo/X034JGT7Gz/springboot-apm-dashboard?orgId=1&timezone=browser&var-application=Server%20Monitoring%20&var-instance=$__all&var-hikaricp=HikariPool-1&var-memory_pool_heap=$__all&var-memory_pool_nonheap=$__all&theme=all&panelId=6&__feature.dashboardSceneSolo" width="550" height="300" frameborder="0"></iframe>
        </div>

          <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            LogBack Statistics
          </h3>
          <iframe src="http://localhost:3000/d-solo/X034JGT7Gz/springboot-apm-dashboard?orgId=1&timezone=browser&var-application=Server%20Monitoring%20&var-instance=$__all&var-hikaricp=HikariPool-1&var-memory_pool_heap=$__all&var-memory_pool_nonheap=$__all&theme=all&panelId=10&__feature.dashboardSceneSolo" width="550" height="300" frameborder="0"></iframe>
        </div>
           <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            LogBack Statistics
          </h3>
          <iframe src="http://localhost:3000/d-solo/X034JGT7Gz/springboot-apm-dashboard?orgId=1&timezone=browser&var-application=Server%20Monitoring%20&var-instance=$__all&var-hikaricp=HikariPool-1&var-memory_pool_heap=$__all&var-memory_pool_nonheap=$__all&theme=all&panelId=14&__feature.dashboardSceneSolo" width="550" height="300" frameborder="0"></iframe>
        </div>
      <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            LogBack Statistics
          </h3>
          <iframe src="http://localhost:3000/d-solo/X034JGT7Gz/springboot-apm-dashboard?orgId=1&timezone=browser&var-application=Server%20Monitoring%20&var-instance=$__all&var-hikaricp=HikariPool-1&var-memory_pool_heap=$__all&var-memory_pool_nonheap=$__all&theme=all&panelId=16&__feature.dashboardSceneSolo" width="550" height="300" frameborder="0"></iframe>
        </div>
    
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            LogBack Statistics
          </h3>
          <iframe src="http://localhost:3000/d-solo/X034JGT7Gz/springboot-apm-dashboard?orgId=1&timezone=browser&var-application=Server%20Monitoring%20&var-instance=$__all&var-hikaricp=HikariPool-1&var-memory_pool_heap=$__all&var-memory_pool_nonheap=$__all&theme=all&panelId=20&__feature.dashboardSceneSolo" width="550" height="300" frameborder="0"></iframe>
        </div>
    </div>
  </div>
)}



      </div>
    </LabAdminLayout>
  );
};

export default LabAdminDashboard;
