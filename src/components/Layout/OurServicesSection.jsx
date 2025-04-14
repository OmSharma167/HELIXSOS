import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHospital,  FaAmbulance } from 'react-icons/fa';
import { TbMessageChatbotFilled } from "react-icons/tb";
import { PiPoliceCarThin } from "react-icons/pi";

const OurServicesSection = () => {
  return (
    <div className="bg-gradient-to-br from-blue-500 via-indigo-300 to-purple-500 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-1xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 text-center mb-6 sm:mb-8">
          Our Essential Services
        </h2>
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            From emergency assistance to wellness support, we've got you covered with a range of essential services at your fingertips.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Ambulance Service */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: -2, boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)' }}
            whileTap={{ scale: 0.95 }}
            className="bg-white p-6 sm:p-8 rounded-lg shadow-md transition duration-300 text-center "
          >
            <div className="mb-4 sm:mb-6">
              <FaAmbulance size={40} className="text-green-500 mx-auto" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Ambulance Service</h3>
            <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
              Get immediate ambulance assistance at the click of a button. Fast response times to help in emergencies.
            </p>
            <Link 
              to="/AmbulanceRequestSystem" 
              className="inline-block px-6 py-2 border-2 border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition duration-300"
            >
              Click
            </Link>
          </motion.div>

          {/* Police Service */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: -2, boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)' }}
            whileTap={{ scale: 0.95 }}
            className="bg-white p-6 sm:p-8 rounded-lg shadow-md transition duration-300 text-center"
          >
            <div className="mb-4 sm:mb-6">
              <PiPoliceCarThin size={40} className="text-red-500 mx-auto" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Police Assistance</h3>
            <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
              Quickly get connected with nearby police stations for emergencies or non-emergency assistance.
            </p>
            <Link 
              to="/NearbyPoliceChauks" 
              className="inline-block px-6 py-2 border-2 border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition duration-300"
            >
              Click
            </Link>
          </motion.div>

          {/* Pharmacy Locator */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: -2, boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)' }}
            whileTap={{ scale: 0.95 }}
            className="bg-white border-neutral-50p-6 sm:p-8 rounded-lg shadow-md transition duration-300 text-center"
          >
            <div className="mb-4 sm:mb-6">
              <FaHospital size={40} className="text-green-500 mx-auto" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Pharmacy Locator</h3>
            <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
              Find the nearest pharmacies and compare prices for medications to get the best deal.
            </p>
            <Link 
              to="/pharmacy-locator" 
              className="inline-block px-6 py-2 border-2 border-green-500 text-green-500 rounded-full hover:bg-green-500 hover:text-white transition duration-300"
            >
              Click
            </Link>
          </motion.div>

         
          

          {/* Chatbot */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: -2, boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)' }}
            whileTap={{ scale: 0.95 }}
            className="bg-white p-6 sm:p-8 rounded-lg shadow-md transition duration-300 text-center"
          >
            <div className="mb-4 sm:mb-6">
              <TbMessageChatbotFilled size={40} className="text-blue-700 mx-auto" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Chatbot</h3>
            <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
              Ask Health related Problems of Solution.
            </p>
            <Link 
              to="/chat-bot" 
              className="inline-block px-6 py-2 border-2 border-indigo-500 text-indigo-500 rounded-full hover:bg-indigo-500 hover:text-white transition duration-300"
            >
              Chatbot
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OurServicesSection;