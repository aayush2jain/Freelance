"use client";
import React, { useEffect, useState,Suspense } from "react";
import Link from "next/link";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const params = useSearchParams();
  const productId = params.get("id");
  const [product, setProductDetails] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [quantities, setQuantities] = useState({});
  const [mainImage, setMainImage] = useState("");

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  const getUser = async () => {
    try {
      const url = `https://freelancebackend.vercel.app/user/getuser`;
      const response = await axios.get(url, { withCredentials: true });
      setUserDetails(response.data);
    } catch (error) {
      alert("Please register yourself first.");
      router.push("/register");
      console.error("Error fetching user:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const url = `https://freelancebackend.vercel.app/product/${productId}`;
      const response = await axios.get(url, { withCredentials: true });
      setProductDetails(response.data);
      setMainImage(response.data.image[0]); // Set default main image
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    getUser();
  }, [productId]);

  const handleQuantityChange = (id, value) => {
    if (value >= 1) {
      setQuantities({ ...quantities, [id]: value });
    }
  };

  if (!product) {
    return <div>Loading product details, please wait...</div>;
  }

  return (
   <>
   <Suspense fallback={<div>Loading...</div>}>
  {/* Navbar */}
  <div className="w-full py-4 flex items-center bg-white shadow-md">
    <h1 className="text-2xl font-bold text-green-700 ml-8">WepreOrder</h1>
    <div className="ml-auto flex items-center gap-6 mr-8">
      <button className="bg-yellow-400 px-4 py-2 rounded-full hover:bg-yellow-500 transition">
        Book Demo
      </button>
    </div>
  </div>

  {/* Product Details */}
  <div className="w-[90vw] mx-auto mt-10 bg-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden">
    {/* Product Image Section */}
    <div className="w-full md:w-[40%] h-full p-6">
      <div className="w-full h-[60vh] bg-gray-200 rounded-xl overflow-hidden">
        <img
          src={mainImage || "https://via.placeholder.com/150"}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex gap-2 mt-4 justify-center">
        {product.image.map((thumb, index) => (
          <div
            key={index}
            className={`w-[15%] h-[10vh] border-2 ${
              thumb === mainImage ? "border-green-500" : "border-gray-300"
            } rounded-md overflow-hidden cursor-pointer hover:scale-105 transition-transform`}
            onClick={() => handleThumbnailClick(thumb)}
          >
            <img
              src={thumb || "https://via.placeholder.com/100"}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>

    {/* Product Info */}
    <div className="w-full md:w-[60%] p-6">
      <h1 className="text-2xl font-semibold text-center">{product.name}</h1>
      <h2 className="text-lg font-semibold mt-4">Terms:</h2>
      <p className="text-gray-700 mt-2">{product.description || "No description available."}</p>

      <div className="flex gap-10 font-semibold mt-6">
        <h3>
          Current Orders: <span className="font-bold">{product.amount || 0}</span>
        </h3>
        <h3>
          Goal: <span className="font-bold">{product.goalamount || "N/A"}</span>
        </h3>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center gap-4 mt-6">
        <label htmlFor={`quantity-${product._id}`} className="font-semibold text-gray-800">
          Quantity:
        </label>
        <div className="relative flex items-center border rounded-md shadow-sm overflow-hidden">
          <button
            onClick={() => handleQuantityChange(product._id, (quantities[product._id] || 1) - 1)}
            className="px-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold transition"
            disabled={(quantities[product._id] || 1) <= 1}
          >
            -
          </button>
          <input
            type="number"
            id={`quantity-${product._id}`}
            value={quantities[product._id] || 1}
            min="1"
            className="w-16 text-center border-l border-r focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => handleQuantityChange(product._id, parseInt(e.target.value))}
          />
          <button
            onClick={() => handleQuantityChange(product._id, (quantities[product._id] || 1) + 1)}
            className="px-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold transition"
          >
            +
          </button>
        </div>
      </div>

      {/* Price and Payment */}
      <div className="flex items-center justify-between mt-6">
        <h1 className="font-bold text-xl">
          Price: ₹{(quantities[product._id] || 1) * (product.price || 0)}
        </h1>
        <Link
          href={{
            pathname: "/order",
            query: {
              id: product._id,
              name: product.name,
              price: product.price,
              quantity: quantities[product._id] || 1,
              userId: userDetails._id,
              usermail: userDetails.email,
              contact: userDetails.contact,
            },
          }}
        >
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            Pay Now
          </button>
        </Link>
      </div>

      {/* Token Amount Info */}
      <h2 className="mt-4 text-gray-600">
        Pay only 10% as a token. Total token amount: ₹
        {((quantities[product._id] || 1) * (product.price || 0) * 0.1).toFixed(2)}
      </h2>

      {/* Book Demo */}
      <Link
        href={{
          pathname: "/booking",
          query: { id: userDetails._id, email: userDetails.email,productId:product._id,productName:product.name},
        }}
      >
        <button className="bg-yellow-400 mx-auto md:w-[30vw] w-full  text-center mt-6 px-4 py-2 rounded-full hover:bg-yellow-500 transition">
          Book Demo
        </button>
      </Link>
    </div>
  </div>
  </Suspense>
</>

  );
};
const ProductPage = () => {
  return(
    <Suspense fallback={<div>Loading...</div>}>
    <Page/>
    </Suspense>
    )
  }
export default ProductPage;
