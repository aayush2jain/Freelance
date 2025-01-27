"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { motion } from "framer-motion";
import { ImagesSlider } from "../components/ui/images-slider.jsx";
import { BsSearch } from "react-icons/bs";
import { IoSearchCircle } from "react-icons/io5";
import { IoCartSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { IoStar } from "react-icons/io5";
export default function ImagesSliderDemo() {
   const images = [
    "images/image1.jpg",
    "images/image2.jpg",
    "images/image3.jpg",
    "images/image2.jpg",
  ];
  const [productDetails, setProductDetails] = useState([]);
    // Fetch product details
  const fetchProducts = async () => {
    try {
      const url = `https://freelancebackend.vercel.app/product/getall`;
      const response = await axios.get(url, { withCredentials: true });
      setProductDetails(response.data.products);
      console.log("productDetails",response.data.products);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
   <div id="nav" className="w-full py-2 flex items-center justify-between bg-white px-4">
  <h1 className="my-auto text-2xl md:text-3xl font-bold text-green-700">WepreOrder</h1>
  
  <div className="flex items-center space-x-4">
    <Link href="/login">
      <div id="login" className="p-2">
        <h1 className="text-sm sm:text-base">LogIn</h1>
      </div>
    </Link>
    
    <div id="bookDemo" className="bg-yellow-400 rounded-full px-4 py-2 text-sm sm:text-base cursor-pointer">
      <Link href={'/#service'}><h1>Book Demo</h1></Link>
    </div>
  </div>
</div>

    <div className = ''>
    <ImagesSlider className="h-[85vh] bg-pink-200" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center">
        <motion.p
          className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          Order Small Quantity at Bulk rates<br /><span className="text-white text-3xl">Get BestPrice,BestBrands and BestDeals.</span> 
        </motion.p>
        <button
          className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
          <Link href={'/#service'}><span>Order Now →</span></Link>
          <div
            className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button>
      </motion.div>
    </ImagesSlider>
    </div>
   <div id="aboutus" className="w-full mt-[8vh] h-full px-4">
  <h1 className="text-center text-4xl sm:text-5xl md:text-6xl font-semibold">Why Us?</h1>
  <div className="flex flex-col md:flex-row mt-[10vh] justify-center space-y-10 md:space-y-0 md:space-x-10">
    {/* Left Section: Image */}
    <div className="w-full h-[40vh] md:w-[40vw] px-[5vw] pt-0">
      <img className="rounded-lg w-full h-full object-cover" src="images/image1.jpg" alt="About Us" />
    </div>

    {/* Right Section: Content */}
    <div className="w-full md:w-[60vw] mt-[5vh]">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">NO MINIMUM ORDER QUANTITY</h1>
      <h1 className="mt-[2vh] text-xl sm:text-2xl text-green-600 font-semibold">NO MOQ</h1>
      <p className="text-lg sm:text-xl">Book any small quantity now. Get Bulk order price.</p>
      <h1 className="mt-[2vh] text-xl sm:text-2xl text-green-600 font-semibold">MOQ - Minimum Order Quantity</h1>
      <p className="text-lg sm:text-xl">Manufacturers do not take small orders. They give MOQ.</p>
    </div>
  </div>

  {/* Next Section: Hassle-Free Imports */}
  <div className="flex flex-col md:flex-row mt-[5vh] space-y-10 md:space-y-0 md:space-x-10">
    {/* Left Section: Content */}
    <div className="w-full md:w-[60vw] mt-[5vh] pl-[5vw]">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Hassle-free Imports</h1>
      <h1 className="mt-[2vh] text-xl sm:text-2xl text-green-600 font-semibold">Licenses & Return Filing</h1>
      <p className="text-lg sm:text-xl">No need to obtain and maintain Licenses, Certificates like DGFT, IEC, Customs, Pollution, EPR- Plastic Waste, ISO, etc.</p>
      <h1 className="mt-[2vh] text-xl sm:text-2xl text-green-600 font-semibold">Foreign Exchange</h1>
      <p className="text-lg sm:text-xl">No need to pay for foreign exchange. Pay in local Indian currency. Get volume pricing.</p>
      <h1 className="mt-[2vh] text-xl sm:text-2xl text-green-600 font-semibold">Logistics</h1>
      <p className="text-lg sm:text-xl">No need to appoint clearing agents, handle logistics, and manage risks.</p>
      <h1 className="mt-[2vh] text-xl sm:text-2xl text-green-600 font-semibold">Insurance</h1>
      <p className="text-lg sm:text-xl">No need to buy expensive transit insurance.</p>
    </div>

    {/* Right Section: Image */}
    <div className="w-full h-[40vh] md:h-[50vh] md:w-[40vw] px-[5vw] pt-0 md:pt-[10vh]">
      <img className="h-full rounded-lg w-full object-cover" src="images/image1.jpg" alt="Hassle Free Imports" />
    </div>
  </div>
</div>
<div className="mt-[10vh]" id="service">
  <h1 className='text-5xl font-bold pl-[5vw]'>Our Services:</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 my-[5vh] px-[5vw]">
    {
      productDetails.map((product)=>(
        <Link key={product.id} href={{pathname:'/product',query:{id:product._id}}}>
        <div className="relative hover:scale-110 rounded-3xl w-[80vw] h-[40vh] md:h-[40vh] sm:[40vw] md:w-[25vw] mx-auto shadow-2xl">
          <img className="rounded-3xl w-full h-full object-cover" src={product.image[0]} alt={product.name} />
          <h1 className="absolute bottom-4 text-2xl text-white left-[22vw] md:left-[8vw] font-semibold">{product.name}</h1>
        </div>
        </Link>
      ))
    }
  </div>
  <div className="mx-auto text-black rounded-3xl w-[40vw] sm:w-[30vw] md:w-[10vw] bg-slate-200">
    <h1 className="p-2 text-center">Explore More...</h1>
  </div>
</div>
    </div>
  );
}
