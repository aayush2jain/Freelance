'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/product/getall");
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Delete product handler
  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/admin/product/${id}`);
      setMessage(response.data.message);

      // Remove the deleted product from the UI
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
        
      setMessage(error.response?.data?.message || "Error deleting product");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
  <h1 className="text-3xl font-bold mb-6 text-center">Product List</h1>
  {message && <p className="text-center text-green-600 mb-6">{message}</p>}

  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {products.map((product) => (
      <li
        key={product._id}
        className="flex flex-col bg-white border rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden"
      >
        {/* Product Image */}
        <img
          src={product.image[0]}
          alt={product.name}
          className="w-full h-48 object-cover"
        />

        {/* Product Info */}
        <div className="p-4 flex flex-col justify-between flex-grow">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {product.name}
            </h2>
            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
            <p className="text-lg font-bold text-gray-900">
              currentOrders:{product.amount}
            </p>
            <p className="text-lg font-bold text-gray-900">
              Goal:{product.goalamount}
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={() => deleteProduct(product._id)}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </li>
    ))}
  </ul>
</div>
  );
};

export default ProductList;
