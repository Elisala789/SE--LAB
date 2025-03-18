import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import axios from "axios";

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/auth/requests");
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <Layout>
  <div className="p-8">
    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">View Bookings</h2>
    {bookings.length === 0 ? (
      <div className="flex flex-col items-center justify-center h-[70vh] text-gray-600">
        <img src="/empty.svg" alt="No Bookings" className="w-48 h-48 mb-4" />
        <p className="text-lg">No bookings found.</p>
      </div>
    ) : (
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="px-4 py-2 border">S.No.</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Roll Number</th>
            <th className="px-4 py-2 border">Lab Name</th>
            <th className="px-4 py-2 border">Servers Required</th>
            <th className="px-4 py-2 border">Processors Required</th>
            <th className="px-4 py-2 border">RAM Required (GB)</th>
            <th className="px-4 py-2 border">Created At</th>
            <th className="px-4 py-2 border">Request Sent</th> 
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index} className="text-center border-b">
              <td className="px-4 py-2 border">{index + 1}</td>
              <td className="px-4 py-2 border">{booking.name}</td>
              <td className="px-4 py-2 border">{booking.email}</td>
              <td className="px-4 py-2 border">{booking.rollNumber}</td>
              <td className="px-4 py-2 border">{booking.labName}</td>
              <td className="px-4 py-2 border">{booking.serversRequired}</td>
              <td className="px-4 py-2 border">{booking.processorsRequired}</td>
              <td className="px-4 py-2 border">{booking.ramRequired}</td>
              <td className="px-4 py-2 border">{new Date(booking.createdAt).toLocaleString()}</td>
              <td className="px-4 py-2 border">✅</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
</Layout>


  );
};

export default ViewBookings;
