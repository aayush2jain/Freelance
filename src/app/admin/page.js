'use client'
import React, { useState } from "react";
import axios from "axios";

const FormWithImages = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    goalamount: "",
    description: "",
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      const response = await axios.post("http://localhost:4000/product/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (response.status === 200) {
        setMessage("Product submitted successfully!");
        setFormData({
          name: "",
          price: "",
          goalamount: "",
          description: "",
          image1: null,
          image2: null,
          image3: null,
          image4: null,
        });
      }
    } catch (error) {
      console.log("Error submitting product:", error);
      setMessage("Error submitting product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Create Entry</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">TokenPrice</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        {/* <div>
          <label className="block text-sm font-medium mb-1">Total Price</label>
          <input
            type="number"
            name="totalPrice"
            value={formData.totalPrice}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div> */}
        {/* <div>
          <label className="block text-sm font-medium mb-1">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div> */}
        <div>
          <label className="block text-sm font-medium mb-1">Goal Amount</label>
          <input
            type="number"
            name="goalamount"
            value={formData.goalamount}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Upload Image 1</label>
          <input
            type="file"
            name="image1"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Upload Image 2</label>
          <input
            type="file"
            name="image2"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Upload Image 3</label>
          <input
            type="file"
            name="image3"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Upload Image 4</label>
          <input
            type="file"
            name="image4"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: isSubmitting ? "#ccc" : "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
      {/* <div className="w-full h-[10vh]">
        <button  >BOOK DEMO</button>
      </div> */}
      {message && <p className="text-green-500 mt-4">{message}</p>}
    </div>
  );
};

export default FormWithImages;
