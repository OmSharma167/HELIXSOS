// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import Layout from "./Layout";
// import { Link } from "react-router-dom";
// import { Hospital, Phone } from 'lucide-react';
// import { useAuth } from '../../context/authContext';
// import OurServicesSection from "./OurServicesSection";

// const Home = () => {
//   const [scrollY, setScrollY] = useState(0);
//   const { auth } = useAuth();

//   useEffect(() => {
//     const handleScroll = () => setScrollY(window.scrollY);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <Layout>
//       <div className="bg-gray-100 overflow-hidden">
//         {/* Dynamic Background */}
//         <motion.div
//           className="fixed inset-0 bg-gradient-to-br from-blue-400 to-purple-500 z-0"
//           style={{
//             opacity: 0.8 - scrollY / 1000,
//           }}
//         />

//         <div className="relative flex flex-col justify-center items-center lg:px-8">
//           {/* Main Content */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-center max-w-4xl mx-auto px-4"
//           >
//             {/* Conditional check for auth.user */}
//             {auth.user ? (
//               <span className="text-white text-xl">Hello: {auth.user.name}</span>
//             ) : (
//               <span className="text-white text-xl">Loading...</span>
//             )}

//             <h1 className="text-2xl sm:text-4xl md:text-4xl lg:text-4xl font-extrabold text-white mb-6 sm:mb-10">
//               Get Immediate Medical Attention Anytime, Anywhere.
//               <br />
//               Your Health and Safety, Our Priority
//             </h1>
//             <p className="text-lg sm:text-xl md:text-2xl text-white mb-6 sm:mb-8">
//              Whether it's a medical consultation, police assistance, ambulance service, AI support, or pharmacy needs, our platform is here for you 24/7. In any emergency, connect instantly and receive the help you deserve.
//             </p>


//             <div className="flex flex-col gap-6 md:flex-row justify-center flex-wrap">
//               {/* Emergency SOS Button */}
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-red-600 flex items-center justify-center text-white font-semibold py-3 px-8 sm:py-3 sm:px-8 rounded-full text-lg shadow-lg hover:bg-red-500 transition duration-300 w-full sm:w-auto"
//               >
//                 <Phone className="mr-2" size={20} />
//                 <Link to="/sos">Emergency SOS</Link>
//               </motion.button>

//               {/* Consult with Doctor Button */}
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-white flex items-center justify-center text-blue-600 font-semibold py-3 px-8 sm:py-3 sm:px-8 rounded-full text-lg shadow-lg hover:bg-blue-50 transition duration-300 w-full sm:w-auto"
//               >
//                 <Hospital className="mr-2" size={20} />
//                 <Link to="/DoctorList">Consult with Doctor</Link>
//               </motion.button>

//               {/* Your Nearest Hospital Button */}
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-white flex items-center justify-center text-blue-600 font-semibold py-3 px-8 sm:py-3 sm:px-8 rounded-full text-lg shadow-lg hover:bg-blue-50 transition duration-300 w-full sm:w-auto"
//               >
//                 <Hospital className="mr-2" size={20} />
//                 <Link to="/NearbyHealthcare">Your Nearest Hospital</Link>
//               </motion.button>

//               {/* Get All Services Button */}
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-white flex items-center justify-center text-blue-600 font-semibold py-3 px-8 sm:py-3 sm:px-8 rounded-full text-lg shadow-lg hover:bg-blue-50 transition duration-300 w-full sm:w-auto"
//               >
//                 <Link to="/our-services">Get All Services</Link>
//               </motion.button>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Home;




import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Hospital, Phone } from "lucide-react";
import { useAuth } from "../../context/authContext";

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const { auth } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // <Layout>
      <div className="flex items-center justify-center min-h-screen ">
        {/* Dynamic Background */}
        <motion.div
          className="fixed inset-0 bg-gradient-to-br from-blue-400 to-purple-500 z-0"
          style={{
            opacity: 0.8 - scrollY / 1000,
          }}
        />

        <div className="relative flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 min-h-screen">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-7xl mx-auto w-full"
          >
            {/* User Greeting */}
            <div className="mb-6 md:mb-10">
              {auth.user ? (
                <span className="text-white text-lg sm:text-xl md:text-2xl block">
                  Hello: {auth.user.name}
                </span>
              ) : (
                <span className="text-white text-lg sm:text-xl md:text-2xl block">
                  Loading...
                </span>
              )}
            </div>

            {/* Main Heading */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 md:mb-8 leading-tight md:leading-snug">
              Get Immediate Medical Attention Anytime, Anywhere.
              <br className="hidden lg:block" />
              <span className="block mt-2 md:mt-4 text-xl sm:text-2xl md:text-3xl font-semibold">
                Your Health and Safety, Our Priority
              </span>
            </h1>

            {/* Description Text */}
            <p className="text-base sm:text-lg md:text-xl text-white mb-6 sm:mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
              Whether it's a medical consultation, police assistance, ambulance
              service, AI support, or pharmacy needs, our platform is here for
              you 24/7. In any emergency, connect instantly and receive the help
              you deserve.
            </p>

            {/* Action Buttons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {/* Emergency SOS Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-600 flex items-center justify-center text-white font-semibold py-3 px-4 sm:py-4 sm:px-6 rounded-xl shadow-lg hover:bg-red-500 transition-colors duration-300"
              >
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                <Link to="/sos" className="text-sm sm:text-base">
                  Emergency SOS
                </Link>
              </motion.button>

              {/* Consult with Doctor Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white flex items-center justify-center text-blue-600 font-semibold py-3 px-4 sm:py-4 sm:px-6 rounded-xl shadow-lg hover:bg-blue-50 transition-colors duration-300"
              >
                <Hospital className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                <Link to="/DoctorList" className="text-sm sm:text-base">
                  Consult Doctor
                </Link>
              </motion.button>

              {/* Nearest Hospital Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white flex items-center justify-center text-blue-600 font-semibold py-3 px-4 sm:py-4 sm:px-6 rounded-xl shadow-lg hover:bg-blue-50 transition-colors duration-300"
              >
                <Hospital className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                <Link to="/NearbyHealthcare" className="text-sm sm:text-base">
                  Nearest Hospital
                </Link>
              </motion.button>

              {/* All Services Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white flex items-center justify-center text-blue-600 font-semibold py-3 px-4 sm:py-4 sm:px-6 rounded-xl shadow-lg hover:bg-blue-50 transition-colors duration-300"
              >
                <Link to="/our-services" className="text-sm sm:text-base">
                  All Services
                </Link>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    // </Layout>
  );
};

export default Home;