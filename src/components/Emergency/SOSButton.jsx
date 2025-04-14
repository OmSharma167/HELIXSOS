// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { AlertTriangle, PhoneCall, MapPin, Loader2, Edit } from "lucide-react";
// import Layout from "../Layout/Layout";
// import axios from "axios";

// const SOSButton = () => {
//   const [isAlertSent, setIsAlertSent] = useState(false);
//   const [location, setLocation] = useState(null);
//   const [locationDetails, setLocationDetails] = useState(null);
//   const [locationError, setLocationError] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode

//   const geocodingApiKey = "73f3baf98bc04cbb90501f6673e059ae"; // Replace with your OpenCage API key

//   useEffect(() => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const coords = {
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           };
//           setLocation(coords);

//           try {
//             // Reverse geocode the coordinates
//             const response = await axios.get(
//               `https://api.opencagedata.com/geocode/v1/json?key=${geocodingApiKey}&q=${coords.latitude},${coords.longitude}&no_annotations=1`
//             );
//             const result = response.data.results[0];

//             if (result) {
//               setLocationDetails({
//                 street: result.components.roads || "",
//                 pincode: result.components.postcode || "",
//                 village: result.components.village || result.components.hamlet || "",
//                 city: result.components.city || result.components.town || "",
//                 district: result.components.county || "",
//                 state: result.components.state || "",
//               });
//             } else {
//               setLocationDetails(null);
//             }
//           } catch (error) {
//             setLocationError("Error fetching location details");
//           }
//           setIsLoading(false);
//         },
//         (error) => {
//           setLocationError(error.message);
//           setIsLoading(false);
//         },
//         { enableHighAccuracy: true }
//       );
//     } else {
//       setLocationError("Geolocation is not supported by your browser");
//       setIsLoading(false);
//     }
//   }, []);

//   const handleSOS = () => {
//     if (location) {
//       console.log("Sending SOS with location:", location);
//       setIsAlertSent(true);
//       setTimeout(() => setIsAlertSent(false), 5000);
//     }
//   };

//   const handleEdit = (field, value) => {
//     setLocationDetails((prevDetails) => ({
//       ...prevDetails,
//       [field]: value,
//     }));
//   };

//   return (
//     <Layout>
//       <div className="max-w-4xl mx-auto px-4 py-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white rounded-lg shadow-lg p-6 text-center"
//         >
//           <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center justify-center">
//             <AlertTriangle className="mr-2 text-red-500" />
//             Emergency SOS
//           </h2>

//           {/* Location Status */}
//           <div className="mb-6">
//             {isLoading ? (
//               <div className="flex items-center justify-center text-gray-600">
//                 <Loader2 className="animate-spin mr-2" />
//                 Getting your location...
//               </div>
//             ) : locationError ? (
//               <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
//                 Error getting location: {locationError}
//               </div>
//             ) : location ? (
//               <div className="flex flex-col items-center justify-center text-gray-600 space-y-2">
//                 <MapPin className="text-green-500" />
//                 <span>
//                   <strong>Location:</strong> {location.latitude.toFixed(4)}°, {location.longitude.toFixed(4)}°
//                 </span>
//                 {locationDetails ? (
//                   <>
//                     <div className="flex justify-between items-center">
//                       <span><strong>Street:</strong></span>
//                       {isEditing ? (
//                         <input
//                           type="text"
//                           value={locationDetails.street}
//                           onChange={(e) => handleEdit("street", e.target.value)}
//                           className="border p-1"
//                         />
//                       ) : (
//                         <span>{locationDetails.street || "Not available"}</span>
//                       )}
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span><strong>Pincode:</strong></span>
//                       {isEditing ? (
//                         <input
//                           type="text"
//                           value={locationDetails.pincode}
//                           onChange={(e) => handleEdit("pincode", e.target.value)}
//                           className="border p-1"
//                         />
//                       ) : (
//                         <span>{locationDetails.pincode || "Not available"}</span>
//                       )}
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span><strong>Village:</strong></span>
//                       {isEditing ? (
//                         <input
//                           type="text"
//                           value={locationDetails.village}
//                           onChange={(e) => handleEdit("village", e.target.value)}
//                           className="border p-1"
//                         />
//                       ) : (
//                         <span>{locationDetails.village || "Not available"}</span>
//                       )}
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span><strong>City:</strong></span>
//                       {isEditing ? (
//                         <input
//                           type="text"
//                           value={locationDetails.city}
//                           onChange={(e) => handleEdit("city", e.target.value)}
//                           className="border p-1"
//                         />
//                       ) : (
//                         <span>{locationDetails.city || "Not available"}</span>
//                       )}
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span><strong>District:</strong></span>
//                       {isEditing ? (
//                         <input
//                           type="text"
//                           value={locationDetails.district}
//                           onChange={(e) => handleEdit("district", e.target.value)}
//                           className="border p-1"
//                         />
//                       ) : (
//                         <span>{locationDetails.district || "Not available"}</span>
//                       )}
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span><strong>State:</strong></span>
//                       {isEditing ? (
//                         <input
//                           type="text"
//                           value={locationDetails.state}
//                           onChange={(e) => handleEdit("state", e.target.value)}
//                           className="border p-1"
//                         />
//                       ) : (
//                         <span>{locationDetails.state || "Not available"}</span>
//                       )}
//                     </div>
//                     {/* Toggle Edit button */}
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => setIsEditing(!isEditing)}
//                       className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full text-lg"
//                     >
//                       <Edit className="mr-2" size={18} />
//                       {isEditing ? "Save" : "Edit"}
//                     </motion.button>
//                   </>
//                 ) : (
//                   <span>Location details not available</span>
//                 )}
//               </div>
//             ) : null}
//           </div>

//           <p className="text-gray-600 mb-8">
//             Press the button below to send an immediate SOS alert to emergency services. Your location will be shared automatically.
//           </p>

//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={handleSOS}
//             disabled={!location || isLoading}
//             className={`bg-red-500 text-white px-8 py-4 rounded-full text-xl font-bold flex items-center justify-center transition duration-300 ${
//               (!location || isLoading) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'
//             }`}
//           >
//             <PhoneCall className="mr-2" size={24} />
//             Send SOS
//           </motion.button>

//           {isAlertSent && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="mt-6 p-4 bg-green-100 text-green-700 rounded-lg"
//             >
//               SOS Alert Sent! Emergency services have been notified of your location.
//             </motion.div>
//           )}
//         </motion.div>
//       </div>
//     </Layout>
//   );
// };

// export default SOSButton;






import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, PhoneCall, MapPin, Loader2, Edit } from "lucide-react";
import Layout from "../Layout/Layout";
import axios from "axios";

const SOSButton = () => {
  const [isAlertSent, setIsAlertSent] = useState(false);
  const [location, setLocation] = useState(null);
  const [locationDetails, setLocationDetails] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [emergencyType, setEmergencyType] = useState(""); // State to store the selected emergency type
  const [selectedServices, setSelectedServices] = useState([]); // State to store selected services (multiple)

  const geocodingApiKey = "73f3baf98bc04cbb90501f6673e059ae"; // Replace with your OpenCage API key

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(coords);

          try {
            // Reverse geocode the coordinates
            const response = await axios.get(
              `https://api.opencagedata.com/geocode/v1/json?key=${geocodingApiKey}&q=${coords.latitude},${coords.longitude}&no_annotations=1`
            );
            const result = response.data.results[0];

            if (result) {
              setLocationDetails({
                street: result.components.roads || "",
                pincode: result.components.postcode || "",
                village: result.components.village || result.components.hamlet || "",
                city: result.components.city || result.components.town || "",
                district: result.components.county || "",
                state: result.components.state || "",
              });
              
            } else {
              setLocationDetails(null);
            }
          } catch (error) {
            setLocationError("Error fetching location details");
          }
          setIsLoading(false);
        },
        (error) => {
          setLocationError(error.message);
          setIsLoading(false);
        },
        { enableHighAccuracy: true }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser");
      setIsLoading(false);
    }
  }, []);

  const handleSOS = () => {
    if (location && selectedServices.length > 0) {
      console.log("Sending SOS with location:", location, "Emergency Type:", emergencyType, "Service Types:", selectedServices);
      setIsAlertSent(true);
      setTimeout(() => setIsAlertSent(false), 5000);
    }
  };

  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedServices((prev) => [...prev, value]); // Add service to array
    } else {
      setSelectedServices((prev) => prev.filter((service) => service !== value)); // Remove service from array
    }
  };

  const handleEdit = (field, value) => {
    setLocationDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto  mt-[-65px] px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center justify-center">
            <AlertTriangle className="mr-2 text-red-500" />
            Emergency SOS
          </h2>

          {/* Emergency Type Selection */}
          <div className="mb-6">
            <label className="text-lg font-semibold">Select Emergency Type:</label>
            <select
              value={emergencyType}
              onChange={(e) => setEmergencyType(e.target.value)}
              className="mt-2 border p-2 rounded-md w-full"
            >
              <option value="">-- Select Emergency Type --</option>
              <option value="medical">Medical Emergency</option>
              <option value="fire">Fire Emergency</option>
              <option value="police">Police Assistance</option>
              <option value="accident">Accident</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Service Type Selection (Multiple Services) */}
          <div className="mb-6">
            <label className="text-lg font-semibold">Select Service Types:</label>
            <div className="flex justify-around mt-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value="police"
                  onChange={handleServiceChange}
                  checked={selectedServices.includes("police")}
                  className="h-5 w-5"
                />
                <span>Police</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value="ambulance"
                  onChange={handleServiceChange}
                  checked={selectedServices.includes("ambulance")}
                  className="h-5 w-5"
                />
                <span>Ambulance</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value="hospital"
                  onChange={handleServiceChange}
                  checked={selectedServices.includes("hospital")}
                  className="h-5 w-5"
                />
                <span>Hospital</span>
              </label>
            </div>
          </div>

          {/* Location Status */}
<div className="mb-6">
  {isLoading ? (
    <div className="flex items-center justify-center text-gray-600">
      <Loader2 className="animate-spin mr-2" />
      Getting your location...
    </div>
  ) : locationError ? (
    <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
      Error getting location: {locationError}
    </div>
  ) : location ? (
    <div className="flex flex-col items-center justify-center text-gray-600 space-y-2">
      <MapPin className="text-green-500" />
      <span>
        <strong>Location:</strong> {location.latitude.toFixed(4)}°, {location.longitude.toFixed(4)}°
      </span>
      {locationDetails ? (
        <>
          {/* Street */}
          <div className="flex justify-between items-center">
            <span><strong>Street:</strong></span>
            {isEditing ? (
              <input
                type="text"
                value={locationDetails.street}
                onChange={(e) => handleEdit("street", e.target.value)}
                className="border p-1"
              />
            ) : (
              <span>{locationDetails.street || "Not available"}</span>
            )}
          </div>

          {/* Pincode */}
          <div className="flex justify-between items-center">
            <span><strong>Pincode:</strong></span>
            {isEditing ? (
              <input
                type="text"
                value={locationDetails.pincode}
                onChange={(e) => handleEdit("pincode", e.target.value)}
                className="border p-1"
              />
            ) : (
              <span>{locationDetails.pincode || "Not available"}</span>
            )}
          </div>

          {/* Village */}
          <div className="flex justify-between items-center">
            <span><strong>Village:</strong></span>
            {isEditing ? (
              <input
                type="text"
                value={locationDetails.village}
                onChange={(e) => handleEdit("village", e.target.value)}
                className="border p-1"
              />
            ) : (
              <span>{locationDetails.village || "Not available"}</span>
            )}
          </div>

          {/* City */}
          <div className="flex justify-between items-center">
            <span><strong>City:</strong></span>
            {isEditing ? (
              <input
                type="text"
                value={locationDetails.city}
                onChange={(e) => handleEdit("city", e.target.value)}
                className="border p-1"
              />
            ) : (
              <span>{locationDetails.city || "Not available"}</span>
            )}
          </div>

          {/* District */}
          <div className="flex justify-between items-center">
            <span><strong>District:</strong></span>
            {isEditing ? (
              <input
                type="text"
                value={locationDetails.district}
                onChange={(e) => handleEdit("district", e.target.value)}
                className="border p-1"
              />
            ) : (
              <span>{locationDetails.district || "Not available"}</span>
            )}
          </div>

          {/* State */}
          <div className="flex justify-between items-center">
            <span><strong>State:</strong></span>
            {isEditing ? (
              <input
                type="text"
                value={locationDetails.state}
                onChange={(e) => handleEdit("state", e.target.value)}
                className="border p-1"
              />
            ) : (
              <span>{locationDetails.state || "Not available"}</span>
            )}
          </div>

          {/* Toggle Edit button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(!isEditing)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full text-lg"
          >
            <Edit className="mr-2" size={18} />
            {isEditing ? "Save" : "Edit"}
          </motion.button>
        </>
      ) : (
        <span>Location details not available</span>
      )}
    </div>
  ) : null}
</div>


          <p className="text-gray-600 mb-8">
            Press the button below to send an immediate SOS alert to emergency services. Your location, emergency type, and service types will be shared automatically.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSOS}
            disabled={!location || selectedServices.length === 0 || isLoading}
            className={`bg-red-500 text-white px-8 py-4 rounded-full text-xl font-bold flex items-center justify-center transition duration-300 ${
              (!location || selectedServices.length === 0 || isLoading)
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-red-600'
            }`}
          >
            <PhoneCall className="mr-2" size={24} />
            Send SOS
          </motion.button>

          {isAlertSent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-green-100 text-green-700 rounded-lg"
            >
              SOS Alert Sent! Emergency services have been notified of your location.
            </motion.div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default SOSButton;
