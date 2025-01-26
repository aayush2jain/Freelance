'use client'
import React, { useState, useEffect,Suspense } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
function AppointmentBooking() {
  const params = useSearchParams();
  const router = useRouter();
  const userId = params.get("id");
  const usermail = params.get("email");
  const productName = params.get("productName");
  const productId = params.get("productId");
  const [date, setDate] = useState("");
 const [name, setname] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [message, setMessage] = useState("");

  const fetchSlots = async () => {
    try {
      const response = await axios.get("http://localhost:4000/appointment/slots", { params: { date } });
      setSlots(response.data.availableSlots);
      console.log(response.data.availableSlots);
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };

  const bookSlot = async () => {
    try {
      const response = await axios.post("http://localhost:4000/appointment/book", {
        username:name,
        userId,
        productName,
        productId,
        slot: selectedSlot,
        date,
        usermail,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error booking appointment");
    }
  };

  useEffect(() => {
    if (date) fetchSlots();
  }, [date]);

  return (
     <div className="p-4 max-w-lg mx-auto my-10 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-4">Book a Demo</h1>
      <div className="mb-4">
        <label htmlFor="date" className="block text-xl font-medium">Your Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          className="w-full p-2 mt-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      {/* Date Picker */}
      <div className="mb-4">
        <label htmlFor="date" className="block text-xl font-medium">Select Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 mt-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      {/* Available Slots */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Available Slots:</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {slots.map((slot) => (
            <button
              key={slot}
              onClick={() => setSelectedSlot(slot)}
              className={`px-4 py-2 rounded-md text-white ${selectedSlot === slot ? 'bg-green-500' : 'bg-gray-500'}`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      {/* Book Slot Button */}
      <button
        onClick={bookSlot}
        disabled={!selectedSlot || !date}
        className={`w-full p-3 mt-4 rounded-md text-white ${!selectedSlot || !date ? 'bg-gray-400' : 'bg-green-600'} `}
      >
        Book Slot
      </button>

      {/* Success Message */}
      {message && <p className="mt-4 text-green-600 text-xl text-center">{message}</p>}
    </div>
  );
}
const Page = () => {
  return(
    <Suspense fallback={<div>Loading...</div>}>
    <AppointmentBooking />
    </Suspense>
    )
}

export default Page;

