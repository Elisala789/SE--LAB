import React from "react";
import Layout from "./Layout";

const GrafanaDashboard = () => {
  return (
     <Layout>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
       {/* 1........ */}
      {/* Grid Layout for Server Monitoring Panels */}
      <div className="grid grid-cols-2 gap-6 w-full max-w-screen-xl ">
    
      <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Basic Statistics
          </h3>
          <iframe src="http://localhost:3000/d-solo/X034JGT7Gz/springboot-apm-dashboard?orgId=1&timezone=browser&var-application=Server%20Monitoring%20&var-instance=$__all&var-hikaricp=HikariPool-1&var-memory_pool_heap=$__all&var-memory_pool_nonheap=$__all&theme=light&panelId=52&__feature.dashboardSceneSolo" width="450" height="200" frameborder="0"></iframe>
        </div>
     <div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Basic Statistics
          </h3>
          <iframe src="http://localhost:3000/d-solo/X034JGT7Gz/springboot-apm-dashboard?orgId=1&timezone=browser&var-application=Server%20Monitoring%20&var-instance=$__all&var-hikaricp=HikariPool-1&var-memory_pool_heap=$__all&var-memory_pool_nonheap=$__all&theme=light&panelId=56&__feature.dashboardSceneSolo" width="450" height="200" frameborder="0"></iframe>
        </div>
      </div>
    
    
      <hr class="border-t-4 border-gray-600"></hr>
    <div className="grid grid-cols-2 gap-6 w-full max-w-screen-xl mt-3 ">
          {/* JDBC Connections */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            CPU Statistics
          </h3>
          <iframe src="http://localhost:3000/d-solo/X034JGT7Gz/springboot-apm-dashboard?orgId=1&timezone=browser&var-application=Server%20Monitoring%20&var-instance=$__all&var-hikaricp=HikariPool-1&var-memory_pool_heap=$__all&var-memory_pool_nonheap=$__all&theme=light&panelId=58&__feature.dashboardSceneSolo" width="450" height="200" frameborder="0"></iframe>
        </div>
     <div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Non-heap Used
          </h3>
          <iframe src="http://localhost:3000/d-solo/X034JGT7Gz/springboot-apm-dashboard?orgId=1&timezone=browser&var-application=Server%20Monitoring%20&var-instance=$__all&var-hikaricp=HikariPool-1&var-memory_pool_heap=$__all&var-memory_pool_nonheap=$__all&theme=light&panelId=60&__feature.dashboardSceneSolo" width="450" height="200" frameborder="0"></iframe>
        </div>
  
        {/* Thread Activity */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Process Open Files
          </h3>
          <iframe src="http://localhost:3000/d-solo/X034JGT7Gz/springboot-apm-dashboard?orgId=1&timezone=browser&var-application=Server%20Monitoring%20&var-instance=$__all&var-hikaricp=HikariPool-1&var-memory_pool_heap=$__all&var-memory_pool_nonheap=$__all&theme=light&panelId=66&__feature.dashboardSceneSolo" width="550" height="300" frameborder="0"></iframe>
        </div>
    
    
    
   
  );
};

export default GrafanaDashboard;

