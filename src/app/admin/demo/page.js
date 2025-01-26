'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:4000/admin/bookings");
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  // Update booking status
  const updateStatus = async (id, status) => {
    try {
      const response = await axios.put(`http://localhost:4000/admin/bookings/${id}`, { status });
      setMessage(response.data.message);
      fetchBookings(); // Refresh bookings after update
    } catch (error) {
      console.error("Error updating status:", error);
      setMessage(error.response?.data?.message || "Error updating status");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
  <h1 className="text-2xl font-bold mb-6 text-center">Admin: Manage Bookings</h1>
  {message && <p className="text-center text-green-600 mb-4">{message}</p>}
  
  <div className="overflow-x-auto">
    <table className="w-full table-auto border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
      <thead className="bg-pink-200">
        <tr>
          <th className="px-4 py-2 text-left">User</th>
          <th className="px-4 py-2 text-left">Date</th>
          <th className="px-4 py-2 text-left">Time</th>
          <th className="px-4 py-2 text-left">Status</th>
          <th className="px-4 py-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking) => (
          <tr key={booking._id} className="border-t hover:bg-pink-50">
            <td className="px-4 py-2">{booking.username || "Unknown"}</td>
            <td className="px-4 py-2">
              {new Date(booking.date).toLocaleDateString()}
            </td>
            <td className="px-4 py-2">{booking.time}</td>
            <td className="px-4 py-2">
              <span
                className={`px-2 py-1 rounded text-white ${
                  booking.status === "Cancelled"
                    ? "bg-red-500"
                    : booking.status === "Delivered"
                    ? "bg-green-500"
                    : "bg-gray-500"
                }`}
              >
                {booking.status}
              </span>
            </td>
            <td className="px-4 py-2 flex space-x-2">
              <button
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                onClick={() => updateStatus(booking._id, "Cancelled")}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                onClick={() => updateStatus(booking._id, "Delivered")}
              >
                Deliver
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
}

export default AdminBookings;
