"use client";
import React, { useState, useEffect,Suspense } from "react";
import axios from "axios";

const UserOrders = () => {
  const userId = '67908ec63603d803918af25c';
   const [orders, setOrders] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [errorOrders, setErrorOrders] = useState("");
  const [errorAppointments, setErrorAppointments] = useState("");
  // Fetch user orders
  const fetchUserOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/user/order/${userId}`, {
        withCredentials: true,
      });
      setOrders(response.data.orders);
      setErrorOrders("");
    } catch (err) {
      console.error("Error fetching orders:", err);
      setErrorOrders("Failed to load orders. Please try again.");
    } finally {
      setLoadingOrders(false);
    }
  };

  const fetchUserAppointments = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/user/appointement/${userId}`, {
        withCredentials: true,
      });
      setAppointments(response.data.appointments);
      console.log("apointements",response.data);
      setErrorAppointments("");
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setErrorAppointments("Failed to load appointments. Please try again.");
    } finally {
      setLoadingAppointments(false);
    }
  };


  useEffect(() => {
    if (userId) {
      fetchUserOrders();
      fetchUserAppointments();
    }
  }, [userId]);

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
            {loadingOrders ? (
              <p>Loading orders...</p>
            ) : errorOrders ? (
              <p className="text-red-500">{errorOrders}</p>
            ) : orders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              <ul className="space-y-4">
                {orders.map((order) => (
                  <li key={order._id} className="bg-gray-100 p-4 rounded-md shadow">
                    <h3 className="font-semibold">{order.productName}</h3>
                    <p>Quantity:{order.quantity}</p>
                    <p>Price: ₹{order.productprice}</p>
                    <p>ProductName :{order.productname}</p>
                    <p>Staus: {order.status}</p>
                    {/* <p className="text-sm text-gray-600">
                      Order Date: {new Date(order.date).toLocaleDateString()}
                    </p> */}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Appointments Section */}
        <div className="md:w-1/2 w-full bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold bg-green-500 text-white p-4 rounded-t-lg">
            My Appointments
          </h2>
          <div className="h-[50vh] overflow-y-auto p-4">
            {loadingAppointments ? (
              <p>Loading appointments...</p>
            ) : errorAppointments ? (
              <p className="text-red-500">{errorAppointments}</p>
            ) : appointments.length === 0 ? (
              <p>No appointments found.</p>
            ) : (
              <ul className="space-y-4">
                {appointments.map((appointment) => (
                  <li key={appointment._id} className="bg-gray-100 p-4 rounded-md shadow">
                    <h3 className="font-semibold">{appointment.title}</h3>
                    <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
                    <p>Time: {appointment.time}</p>
                    <p>ProductName:{appointment.productName}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
const Page = () => {
  return(
    <Suspense fallback={<div>Loading...</div>}>
    <UserOrders/>
    </Suspense>
    )
  }
export default Page;
