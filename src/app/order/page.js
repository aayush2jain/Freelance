'use client';
import React, { useState,Suspense } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import Script from 'next/script';

const OrderForm = () => {
  const params = useSearchParams();
  const productId = params.get('id');
  const productname = params.get('name');
  const productprice = params.get('price');
  const userId = params.get('userId');
  const quantity = params.get('quantity');
  const usermail = params.get('usermail');
  const contact = params.get('contact');
  console.log("userId",userId,"usermail",usermail);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    pincode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://freelancebackend.vercel.app';
      const response = await axios.post(
        `${API_URL}/user/order`,
        {
          ...formData,
          productId,
          productname,
          productprice,
          userId,
          usermail,
          contact,
          quantity,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert('Order submitted successfully!');
      } else {
        alert('Failed to submit order!');
      }
    } catch (error) {
      console.error('Error submitting the form:', error.message, error.response?.data || error);
      alert('An error occurred while submitting your order.');
    }
  };

  const paymentHandler = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const currency = "INR";

    // Step 1: Create an order in your backend
    const response = await axios.post("https://freelancebackend.vercel.app/payment/", {
      amount: productprice*quantity* 100, // Convert to subunits
      receipt: productId,
      currency,
    });

    const { id: orderId, amount } = response.data; // Extract order ID and amount from backend response

    // Step 2: Configure Razorpay options
    const options = {
      key: "rzp_test_nKM2ZJwYmvqG01", // Replace with your Razorpay Key ID
      amount,
      currency,
      name: "MISTHAN", // Your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo", // Replace with your logo URL
      order_id: orderId, // Order ID generated in Step 1
      handler: async function (response) {
        // Step 3: Verify the payment in your backend
        const verificationResponse = await axios.post(
          "https://freelancebackend.vercel.app/payment/verification",
          {
            paymentResponse: response, // Pass the entire Razorpay response
          }
        );

        if (verificationResponse.data.msg === "success") {
          alert("Payment Successful");
          await handleSubmit(e);
           // Call handleSubmit after successful payment
          setTimeout(() => {
            window.location.href = "/";
          }, 3000);
        } else {
          alert("Payment Verification Failed");
        }
      },
      prefill: {
        name: formData.username, // Use entered username
        email: "webdevmatrix@example.com", // Default email
        contact: formData.contact, // Use entered contact
      },
      notes: {
        address: formData.address, // Use entered address
      },
      theme: {
        color: "#3399cc",
      },
    };

    // Step 4: Open Razorpay payment gateway
    const rzp1 = new window.Razorpay(options);

    // Handle payment failures
    rzp1.on("payment.failed", function (response) {
      alert("Payment Failed");
      console.error("Payment Failed:", response.error);
    });

    rzp1.open();
  };

  return (
<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
  <div className="max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden">
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Order Form
      </h1>
      <form onSubmit={paymentHandler} className="space-y-5">
        {/* Name Input */}
        <div>
          <label
            htmlFor="name"
            className="block text-md font-medium text-black mb-1"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
          />
        </div>

        {/* Address Input */}
        <div>
          <label
            htmlFor="address"
            className="block text-md font-medium text-black mb-1"
          >
            Address:
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent resize-none"
          ></textarea>
        </div>

        {/* Pincode Input */}
        <div>
          <label
            htmlFor="pincode"
            className="block text-sm font-medium text-black mb-1"
          >
            Pincode:
          </label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) handleChange(e); // Allow only digits
            }}
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-gray-700 transition-all duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
  <Script
    src="https://checkout.razorpay.com/v1/checkout.js"
    strategy="afterInteractive"
  />
</div>


  );
};
const Page = () => {
  return(
    <Suspense fallback={<div>Loading...</div>}>
    <OrderForm />
    </Suspense>
    )
  }
export default Page;
