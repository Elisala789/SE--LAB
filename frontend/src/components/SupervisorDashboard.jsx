import React, { useEffect, useState } from "react";
import SupervisorLayout from "./SupervisorLayout";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import axios from "axios";

const COLORS = ["#F87171", "#34D399", "#60A5FA"]; // Red, Green, Blue

const SupervisorDashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStatusCounts = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/auth/check_status");
        const { pending, verified, forwarded } = response.data;

        console.log("API Response:", response.data); // Debugging output

        setData([
          { name: "Pending (Not Verified)", value: pending || 0, color: COLORS[0] }, // Red
          { name: "Verified (Approved)", value: verified || 0, color: COLORS[1] }, // Green
          { name: "Forwarded to Lab", value: forwarded || 0, color: COLORS[2] }, // Blue
        ]);
      } catch (error) {
        console.error("Error fetching status counts:", error);
      }
    };

    fetchStatusCounts();
  }, []);

  return (
    <SupervisorLayout>
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800">Requests Analytics</h1>

        <div className="flex justify-center mt-6">
          <PieChart width={350} height={350}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={120}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </SupervisorLayout>
  );
};

export default SupervisorDashboard;
