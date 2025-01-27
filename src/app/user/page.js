"use client";
import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const UserOrders = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [errorOrders, setErrorOrders] = useState("");
  const [errorAppointments, setErrorAppointments] = useState("");

  // Fetch user details
  const getUser = async () => {
    try {
      const url = `https://freelancebackend.vercel.app/user/getuser`;
      const response = await axios.get(url, { withCredentials: true });
      setUserId(response.data._id);
    } catch (error) {
      console.error("Error fetching user:", error);
      alert("Please register yourself first.");
      // router.push("/register");
    }
  };

  const fetchUserOrders = async () => {
    try {
      const response = await axios.get(
        `https://freelancebackend.vercel.app/user/order/${userId}`,
        { withCredentials: true }
      );
      setOrders(response.data.orders);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setErrorOrders("Failed to load orders. Please try again.");
    } finally {
      setLoadingOrders(false);
    }
  };

  const fetchUserAppointments = async () => {
    try {
      const response = await axios.get(
        `https://freelancebackend.vercel.app/user/appointement/${userId}`,
        { withCredentials: true }
      );
      setAppointments(response.data.appointments);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setErrorAppointments("Failed to load appointments. Please try again.");
    } finally {
      setLoadingAppointments(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserOrders();
      fetchUserAppointments();
    }
  }, [userId]);

  const renderSection = (data, loading, error, renderItem, emptyMessage) => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!data || data.length === 0) return <p>{emptyMessage}</p>;
    return <ul className="space-y-4">{data.map(renderItem)}</ul>;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">My Dashboard</h1>
      <div className="flex gap-4 md:flex-row flex-col">
        {/* Orders Section */}
        <div className="md:w-1/2 w-full bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold bg-blue-500 text-white p-4 rounded-t-lg">
            My Orders
          </h2>
          <div className="h-[50vh] overflow-y-auto p-4">
            {renderSection(
              orders,
              loadingOrders,
              errorOrders,
              (order) => (
                <li key={order._id} className="bg-gray-100 p-4 rounded-md shadow">
                  <h3 className="font-semibold">{order.productName}</h3>
                  <p>Quantity: {order.quantity}</p>
                  <p>Price: ₹{order.productprice}</p>
                  <p>Status: {order.status}</p>
                </li>
              ),
              "No orders found."
            )}
          </div>
        </div>

        {/* Appointments Section */}
        <div className="md:w-1/2 w-full bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold bg-green-500 text-white p-4 rounded-t-lg">
            My Appointments
          </h2>
          <div className="h-[50vh] overflow-y-auto p-4">
            {renderSection(
              appointments,
              loadingAppointments,
              errorAppointments,
              (appointment) => (
                <li
                  key={appointment._id}
                  className="bg-gray-100 p-4 rounded-md shadow"
                >
                  <h3 className="font-semibold">{appointment.title}</h3>
                  <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
                  <p>Time: {appointment.time}</p>
                </li>
              ),
              "No appointments found."
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Page = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <UserOrders />
  </Suspense>
);

export default Page;
