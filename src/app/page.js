"use client";
import { motion } from "framer-motion";
import React from "react";
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
  return (
    <div>
    <div id="nav" className='w-[100vw] py-2 flex items-center  bg-white'>
    <h1 className="my-auto text-3xl ml-[5vw] font-bold text-green-700">WepreOrder</h1>
    <div className="flex ml-[66vw]">
      <div id="login" className="p-2">
        <h1>LogIn</h1>
      </div>
      <div id='book Demo' className="bg-yellow-400 rounded-full mx-[1vw] px-[1vw]">
        <h1 className="p-2">Book Demo</h1>
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
          <span>Order Now →</span>
          <div
            className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button>
      </motion.div>
    </ImagesSlider>
    </div>
    <div id="aboutus" className="w-full mt-[8vh] h-full">
    <h1 className="text-center text-6xl font-semibold">Why Us?</h1>
    <div className="flex mt-[10vh]">
    <div className="w-[40vw] px-[5vw]">
      <img className="h-[40vh] rounded-lg" src='images/image1.jpg'></img>
    </div>
    <div className="w-[60vw] mt-[5vh]">
    <h1 className="text-5xl font-bold">
      NO MINIMUM ORDER QUANTITY
    </h1>
    <h1 className="mt-[2vh] text-2xl text-green-600 font-semibold">
      NO MOQ
    </h1>
    <p className="text-xl">Book any small quantity now.Get Bulk order price.</p>
    <h1 className="mt-[2vh] text-2xl text-green-600 font-semibold">
    MOQ- Minimum Order Quality
    </h1>
    <p className="text-xl">Manufacturer do not take small orders. Gives MOQ. </p>
    </div>
    </div>
     <div className="flex mt-[5vh]">
    <div className="w-[60vw] mt-[5vh] pl-[5vw]">
    <h1 className="text-5xl font-bold">
      Hassle free imports
    </h1>
    <h1 className="mt-[2vh] text-2xl text-green-600 font-semibold">
      Licenses & return filing 
    </h1>
    <p className="text-xl">No need to obtain and maintain Licenses , Certificates like DGFT, 
IEC,  
Customs, Pollution, EPR- Plastic Waste, ISO etc .</p>
    <h1 className="mt-[2vh] text-2xl text-green-600 font-semibold">
    Foreign Exchange 
    </h1>
    <p className="text-xl">No need to pay for foreign exchange etc. Pay in local Indian 
Currency.   
Get volume pricing.</p>
 <h1 className="mt-[2vh] text-2xl text-green-600 font-semibold">
    Logistics 
    </h1>
    <p className="text-xl">No need to appoint clearing agents, handle logistics and risks.</p>
 <h1 className="mt-[2vh] text-2xl text-green-600 font-semibold">
    Insurance 
    </h1>
    <p className="text-xl">No need to buy expensive transit insurance</p>
    </div>
     <div className="w-[40vw] pt-[15vh] px-[5vw]">
      <img className="h-[40vh] rounded-lg" src='images/image1.jpg'></img>
    </div>
    </div>
    </div>
    <div className="mt-[10vh]">
      <h1 className='text-5xl font-bold pl-[5vw]'>Our Services:</h1>
    <div className="flex justify-evenly  my-[5vh]">
     <div className="w-[25vw] object-cover relative">
        <img className="rounded-3xl" src='images/image2.jpg'></img>
        <h1 className="absolute bottom-[5vh] text-2xl text-white left-[8vw] font-semibold">PRODUCT</h1>
      </div>
       <div className=" w-[25vw] object-cover relative">
        <img className="rounded-3xl" src='images/image2.jpg'></img>
        <h1 className="absolute bottom-[5vh] text-2xl text-white left-[8vw] font-semibold">PRODUCT</h1>
      </div>
       <div className="w-[25vw] object-cover relative">
        <img className="rounded-3xl" src='images/image3.jpg'></img>
        <h1 className="absolute bottom-[5vh] text-2xl text-white left-[8vw] font-semibold">PRODUCT</h1>
      </div>
    </div>
    <div className="mx-auto text-black rounded-3xl w-[10vw] bg-slate-200 ">
      <h1 className="p-2  text-center ">Explore More...</h1>
    </div>
    </div>
    </div>
  );
}
