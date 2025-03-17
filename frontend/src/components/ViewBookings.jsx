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
      <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">View Bookings</h2>
        {bookings.length === 0 ? (
          <p className="text-center text-gray-600">No bookings found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Roll Number</th>
                  <th className="px-4 py-2 border">Lab Name</th>
                  <th className="px-4 py-2 border">Servers Required</th>
                  <th className="px-4 py-2 border">Processors Required</th>
                  <th className="px-4 py-2 border">RAM Required (GB)</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={index} className="text-center border-b">
                    <td className="px-4 py-2 border">{booking.name}</td>
                    <td className="px-4 py-2 border">{booking.email}</td>
                    <td className="px-4 py-2 border">{booking.rollNumber}</td>
                    <td className="px-4 py-2 border">{booking.labName}</td>
                    <td className="px-4 py-2 border">{booking.serversRequired}</td>
                    <td className="px-4 py-2 border">{booking.processorsRequired}</td>
                    <td className="px-4 py-2 border">{booking.ramRequired}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ViewBookings;
