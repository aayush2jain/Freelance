// 'use client'
// import React, { useState,Suspense } from 'react';
// import axios from 'axios';
// import { useSearchParams } from "next/navigation";
// import Script from "next/script";
// const CheckoutPage = () => {
//     const params = useSearchParams();
//     const productId = params.get("productId");
//     const quantity = params.get("quantity");
//     const productname = params.get("productname");
//     const price = params.get("productprice");
//     const username = params.get("username");
//     const usermail = params.get("usermail");
//     const contact = params.get("contact");
//     const address = params.get("address");
//     const pincode = params.get("pincode");
//     const userId = params.get("userId");
//   const userDetails = {
//     name: username,
//     email: usermail,
//     phone: contact,
//     address,
//     pincode,
//     price,
//     productId,
//     quantity,
//     productname,
//   };

//   const orderDetails = [
//     { id: 1, product: productname, quantity, price},
//   ];

//   const handleCheckout = () => {
//     alert("Proceeding to checkout!");
//   };

  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://freelancebackend.vercel.app';
//       const response = await axios.post(
//         `${API_URL}/user/order`,
//         {
//           name: username,
//           address,
//           pincode,
//           productId,
//           productname,
//           productprice:price,
//           userId,
//           usermail,
//           contact,
//           quantity,
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           withCredentials: true,
//         }
//       );

//       if (response.status === 200) {
//         alert('Order submitted successfully!');
//       } else {
//         alert('Failed to submit order!');
//       }
//     } catch (error) {
//       console.error('Error submitting the form:', error.message, error.response?.data || error);
//       alert('An error occurred while submitting your order.');
//     }
//   };

//   const paymentHandler = async (e) => {
//     e.preventDefault(); // Prevent the default form submission behavior

//     const currency = "INR";

//     // Step 1: Create an order in your backend
//     const response = await axios.post("https://freelancebackend.vercel.app/payment/", {
//       amount: price*quantity* 100, // Convert to subunits
//       receipt: productId,
//       currency,
//     });

//     const { id: orderId, amount } = response.data; // Extract order ID and amount from backend response

//     // Step 2: Configure Razorpay options
//     const options = {
//       key: "rzp_test_nKM2ZJwYmvqG01", // Replace with your Razorpay Key ID
//       amount,
//       currency,
//       name: "WePreOrder", // Your business name
//       description: "Test Transaction",
//       image: "https://example.com/your_logo", // Replace with your logo URL
//       order_id: orderId, // Order ID generated in Step 1
//       handler: async function (response) {
//         // Step 3: Verify the payment in your backend
//         const verificationResponse = await axios.post(
//           "https://freelancebackend.vercel.app/payment/verification",
//           {
//             paymentResponse: response, // Pass the entire Razorpay response
//           }
//         );

//         if (verificationResponse.data.msg === "success") {
//           alert("Payment Successful");
//           await handleSubmit(e);
//            // Call handleSubmit after successful payment
//           setTimeout(() => {
//             window.location.href = "/";
//           }, 3000);
//         } else {
//           alert("Payment Verification Failed");
//         }
//       },
//       prefill: {
//         name: username, // Use entered username
//         email: usermail, // Default email
//         contact: contact, // Use entered contact
//       },
//       notes: {
//         address: address, // Use entered address
//       },
//       theme: {
//         color: "#3399cc",
//       },
//     };

//     // Step 4: Open Razorpay payment gateway
//     const rzp1 = new window.Razorpay(options);

//     // Handle payment failures
//     rzp1.on("payment.failed", function (response) {
//       alert("Payment Failed");
//       console.error("Payment Failed:", response.error);
//     });

//     rzp1.open();
//   };

//   return (
//     <div className="min-h-screen p-4 bg-gray-100">
//       <div className="max-w-4xl mx-auto space-y-6">
//         {/* User Details */}
//         <div className="bg-white w-full shadow-md rounded-lg py-6">
//           <h2 className="text-2xl font-bold text-center mb-6">User Details</h2>
// <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white pl-[5vw] rounded-lg ">
//   <p className="text-lg">
//     <span className="font-semibold">Name:</span> {userDetails.name}
//   </p>
//   <p className="text-lg">
//     <span className="font-semibold">Email:</span> {userDetails.email}
//   </p>
//   <p className="text-lg">
//     <span className="font-semibold">Contact:</span> {userDetails.phone}
//   </p>
//   <p className="text-lg">
//     <span className="font-semibold">Address:</span> {userDetails.address}
//   </p>
//   <p className="text-lg">
//     <span className="font-semibold">Pincode:</span> {userDetails.pincode}
//   </p>
// </div>

//           <h2 className="text-xl text-center font-semibold  my-4">Order Details</h2>
//           <table className="w-full text-center border-collapse">
//             <thead>
//               <tr className="border-b">
//                 <th className="p-2">ProductName</th>
//                 <th className="p-2">Quantity</th>
//                 <th className="p-2">Price</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orderDetails.map((item) => (
//                 <tr key={item.id} className="border-b mr-[10vw]">
//                   <td className="p-2">{item.product}</td>
//                   <td className="p-2">{item.quantity}</td>
//                   <td className="p-2">₹{item.price}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//             <div className="mt-4 text-center">
//             <p className="text-lg font-semibold">Total: ₹{price*quantity}</p>
//         </div>
//         </div>
      
//         {/* Checkout Button */}
//         <div className="text-center">
//           <button
//             className="w-full bg-blue-600 text-white py-2 rounded-lg text-lg hover:bg-blue-700"
//             onClick={paymentHandler}
//           >
//             Checkout
//           </button>
//         </div>
//       </div>
//        <Script
//     src="https://checkout.razorpay.com/v1/checkout.js"
//     strategy="afterInteractive"
//   />
//     </div>
//   );
// };

// export default CheckoutPage;
