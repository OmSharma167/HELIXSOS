// import React, { useState } from "react";

// const HospitalLocator = () => {
//   const [location, setLocation] = useState("");
//   const [hospitals, setHospitals] = useState([]);

//   const findHospitals = () => {
//     // Replace with API call to get hospitals near location
//     setHospitals(["Hospital A", "Hospital B", "Hospital C"]);
//   };

//   return (
//     <div>
//       <h2>Find a Hospital</h2>
//       <input
//         type="text"
//         placeholder="Enter your location"
//         value={location}
//         onChange={(e) => setLocation(e.target.value)}
//       />
//       <button onClick={findHospitals}>Search</button>
//       <ul>
//         {hospitals.map((hospital, index) => (
//           <li key={index}>{hospital}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default HospitalLocator;


import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Hospital } from "lucide-react";
import Layout from "../Layout/Layout";

const HospitalLocator = () => {
  const [location, setLocation] = useState("");
  const [hospitals, setHospitals] = useState([]);

  const findHospitals = () => {
    // Replace with API call to get hospitals near location
    setHospitals([
      { name: "City General Hospital", distance: "2.5 km" },
      { name: "St. Mary's Medical Center", distance: "3.8 km" },
      { name: "Memorial Hospital", distance: "5.2 km" },
    ]);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <Hospital className="mr-2 text-blue-500" />
            Find a Hospital
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-grow">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={findHospitals}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg flex items-center justify-center hover:bg-blue-600 transition duration-300"
            >
              <Search className="mr-2" />
              Search
            </motion.button>
          </div>
          <motion.ul className="space-y-4">
            {hospitals.map((hospital, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-4 rounded-lg shadow flex justify-between items-center"
              >
                <span className="font-semibold text-gray-700">{hospital.name}</span>
                <span className="text-sm text-gray-500">{hospital.distance}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </Layout>
  );
};

export default HospitalLocator;