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
    
    
    
   
  );
};

export default GrafanaDashboard;

