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
//   const [emergencyType, setEmergencyType] = useState(""); // State to store the selected emergency type
//   const [selectedServices, setSelectedServices] = useState([]); // State to store selected services (multiple)

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
//     if (location && selectedServices.length > 0) {
//       console.log("Sending SOS with location:", location, "Emergency Type:", emergencyType, "Service Types:", selectedServices);
//       setIsAlertSent(true);
//       setTimeout(() => setIsAlertSent(false), 5000);
//     }
//   };

//   const handleServiceChange = (e) => {
//     const { value, checked } = e.target;
//     if (checked) {
//       setSelectedServices((prev) => [...prev, value]); // Add service to array
//     } else {
//       setSelectedServices((prev) => prev.filter((service) => service !== value)); // Remove service from array
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
//       <div className="max-w-4xl mx-auto  mt-[-65px] px-4 py-8">
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

//           {/* Emergency Type Selection */}
//           <div className="mb-6">
//             <label className="text-lg font-semibold">Select Emergency Type:</label>
//             <select
//               value={emergencyType}
//               onChange={(e) => setEmergencyType(e.target.value)}
//               className="mt-2 border p-2 rounded-md w-full"
//             >
//               <option value="">-- Select Emergency Type --</option>
//               <option value="medical">Medical Emergency</option>
//               <option value="fire">Fire Emergency</option>
//               <option value="police">Police Assistance</option>
//               <option value="accident">Accident</option>
//               <option value="other">Other</option>
//             </select>
//           </div>

//           {/* Service Type Selection (Multiple Services) */}
//           <div className="mb-6">
//             <label className="text-lg font-semibold">Select Service Types:</label>
//             <div className="flex justify-around mt-2">
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   value="police"
//                   onChange={handleServiceChange}
//                   checked={selectedServices.includes("police")}
//                   className="h-5 w-5"
//                 />
//                 <span>Police</span>
//               </label>
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   value="ambulance"
//                   onChange={handleServiceChange}
//                   checked={selectedServices.includes("ambulance")}
//                   className="h-5 w-5"
//                 />
//                 <span>Ambulance</span>
//               </label>
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   value="hospital"
//                   onChange={handleServiceChange}
//                   checked={selectedServices.includes("hospital")}
//                   className="h-5 w-5"
//                 />
//                 <span>Hospital</span>
//               </label>
//             </div>
//           </div>

//           {/* Location Status */}
// <div className="mb-6">
//   {isLoading ? (
//     <div className="flex items-center justify-center text-gray-600">
//       <Loader2 className="animate-spin mr-2" />
//       Getting your location...
//     </div>
//   ) : locationError ? (
//     <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
//       Error getting location: {locationError}
//     </div>
//   ) : location ? (
//     <div className="flex flex-col items-center justify-center text-gray-600 space-y-2">
//       <MapPin className="text-green-500" />
//       <span>
//         <strong>Location:</strong> {location.latitude.toFixed(4)}°, {location.longitude.toFixed(4)}°
//       </span>
//       {locationDetails ? (
//         <>
//           {/* Street */}
//           <div className="flex justify-between items-center">
//             <span><strong>Street:</strong></span>
//             {isEditing ? (
//               <input
//                 type="text"
//                 value={locationDetails.street}
//                 onChange={(e) => handleEdit("street", e.target.value)}
//                 className="border p-1"
//               />
//             ) : (
//               <span>{locationDetails.street || "Not available"}</span>
//             )}
//           </div>

//           {/* Pincode */}
//           <div className="flex justify-between items-center">
//             <span><strong>Pincode:</strong></span>
//             {isEditing ? (
//               <input
//                 type="text"
//                 value={locationDetails.pincode}
//                 onChange={(e) => handleEdit("pincode", e.target.value)}
//                 className="border p-1"
//               />
//             ) : (
//               <span>{locationDetails.pincode || "Not available"}</span>
//             )}
//           </div>

//           {/* Village */}
//           <div className="flex justify-between items-center">
//             <span><strong>Village:</strong></span>
//             {isEditing ? (
//               <input
//                 type="text"
//                 value={locationDetails.village}
//                 onChange={(e) => handleEdit("village", e.target.value)}
//                 className="border p-1"
//               />
//             ) : (
//               <span>{locationDetails.village || "Not available"}</span>
//             )}
//           </div>

//           {/* City */}
//           <div className="flex justify-between items-center">
//             <span><strong>City:</strong></span>
//             {isEditing ? (
//               <input
//                 type="text"
//                 value={locationDetails.city}
//                 onChange={(e) => handleEdit("city", e.target.value)}
//                 className="border p-1"
//               />
//             ) : (
//               <span>{locationDetails.city || "Not available"}</span>
//             )}
//           </div>

//           {/* District */}
//           <div className="flex justify-between items-center">
//             <span><strong>District:</strong></span>
//             {isEditing ? (
//               <input
//                 type="text"
//                 value={locationDetails.district}
//                 onChange={(e) => handleEdit("district", e.target.value)}
//                 className="border p-1"
//               />
//             ) : (
//               <span>{locationDetails.district || "Not available"}</span>
//             )}
//           </div>

//           {/* State */}
//           <div className="flex justify-between items-center">
//             <span><strong>State:</strong></span>
//             {isEditing ? (
//               <input
//                 type="text"
//                 value={locationDetails.state}
//                 onChange={(e) => handleEdit("state", e.target.value)}
//                 className="border p-1"
//               />
//             ) : (
//               <span>{locationDetails.state || "Not available"}</span>
//             )}
//           </div>

//           {/* Toggle Edit button */}
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => setIsEditing(!isEditing)}
//             className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full text-lg"
//           >
//             <Edit className="mr-2" size={18} />
//             {isEditing ? "Save" : "Edit"}
//           </motion.button>
//         </>
//       ) : (
//         <span>Location details not available</span>
//       )}
//     </div>
//   ) : null}
// </div>

//           <p className="text-gray-600 mb-8">
//             Press the button below to send an immediate SOS alert to emergency services. Your location, emergency type, and service types will be shared automatically.
//           </p>

//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={handleSOS}
//             disabled={!location || selectedServices.length === 0 || isLoading}
//             className={`bg-red-500 text-white px-8 py-4 rounded-full text-xl font-bold flex items-center justify-center transition duration-300 ${
//               (!location || selectedServices.length === 0 || isLoading)
//                 ? 'opacity-50 cursor-not-allowed'
//                 : 'hover:bg-red-600'
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
import {
  AlertTriangle,
  PhoneCall,
  MapPin,
  Loader2,
  Edit,
  CheckCircle,
} from "lucide-react";
import Layout from "../Layout/Layout";
import axios from "axios";

const SOSButton = () => {
  const [isAlertSent, setIsAlertSent] = useState(false);
  const [location, setLocation] = useState(null);
  const [locationDetails, setLocationDetails] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [emergencyType, setEmergencyType] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState("");

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
                street: result.components.road || "",
                pincode: result.components.postcode || "",
                village:
                  result.components.village || result.components.hamlet || "",
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
      console.log(
        "Sending SOS with location:",
        location,
        "Emergency Type:",
        emergencyType,
        "Service Types:",
        selectedServices,
        "Additional Info:",
        additionalInfo
      );
      setIsAlertSent(true);

      // In a real implementation, you would call your emergency API here

      // Reset form after 5 seconds
      setTimeout(() => {
        setIsAlertSent(false);
        setEmergencyType("");
        setSelectedServices([]);
        setAdditionalInfo("");
      }, 5000);
    }
  };

  const handleServiceChange = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleEdit = (field, value) => {
    setLocationDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const emergencyTypes = [
    {
      value: "medical",
      label: "Medical Emergency",
      color: "bg-red-100 border-red-500",
    },
    {
      value: "fire",
      label: "Fire Emergency",
      color: "bg-orange-100 border-orange-500",
    },
    {
      value: "police",
      label: "Police Assistance",
      color: "bg-blue-100 border-blue-500",
    },
    {
      value: "accident",
      label: "Accident",
      color: "bg-yellow-100 border-yellow-500",
    },
    {
      value: "other",
      label: "Other Emergency",
      color: "bg-gray-100 border-gray-500",
    },
  ];

  const serviceTypes = [
    { value: "police", label: "Police", icon: "🚓" },
    { value: "ambulance", label: "Ambulance", icon: "🚑" },
    { value: "fire", label: "Fire Dept", icon: "🚒" },
    { value: "hospital", label: "Hospital", icon: "🏥" },
  ];

  return (
    <Layout>
      <div className=" mx-auto  -mt-15 px-4 py-8 sm:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-4 sm:p-6 text-center"
        >
          <div className="bg-red-50 p-3 rounded-lg mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-red-600 flex items-center justify-center">
              <AlertTriangle className="mr-2 text-red-500" />
              Emergency SOS
            </h2>
          </div>

          {/* Step 1: Emergency Type Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-left border-b pb-2">
              Step 1: Select Emergency Type
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {emergencyTypes.map((type) => (
                <motion.button
                  key={type.value}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setEmergencyType(type.value)}
                  className={`${
                    emergencyType === type.value
                      ? `${type.color} border-2`
                      : "bg-gray-50 border"
                  } rounded-lg p-3 flex flex-col items-center justify-center transition duration-200`}
                >
                  <span className="text-sm sm:text-base font-medium">
                    {type.label}
                  </span>
                  {emergencyType === type.value && (
                    <CheckCircle className="mt-1 text-green-500" size={16} />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Step 2: Service Type Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-left border-b pb-2">
              Step 2: Select Service Types (Select all that apply)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {serviceTypes.map((service) => (
                <motion.button
                  key={service.value}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleServiceChange(service.value)}
                  className={`${
                    selectedServices.includes(service.value)
                      ? "bg-blue-100 border-2 border-blue-500"
                      : "bg-gray-50 border"
                  } rounded-lg p-3 flex items-center justify-center transition duration-200`}
                >
                  <span className="mr-2 text-xl">{service.icon}</span>
                  <span>{service.label}</span>
                  {selectedServices.includes(service.value) && (
                    <CheckCircle className="ml-2 text-green-500" size={16} />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Step 3: Additional Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-left border-b pb-2">
              Step 3: Additional Information (Optional)
            </h3>
            <textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="Provide any additional details about your emergency..."
              className="w-full border rounded-lg p-3 h-24"
            />
          </div>

          {/* Step 4: Confirm Location */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-left border-b pb-2">
              Step 4: Confirm Your Location
            </h3>
            {isLoading ? (
              <div className="flex items-center justify-center text-gray-600 p-8">
                <Loader2 className="animate-spin mr-2" />
                <span>Getting your location...</span>
              </div>
            ) : locationError ? (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg text-left">
                <p className="font-semibold">Error getting location:</p>
                <p>{locationError}</p>
                <p className="mt-2">
                  Please ensure location services are enabled on your device.
                </p>
              </div>
            ) : location ? (
              <div className="bg-gray-50 rounded-lg p-4 text-left">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <MapPin className="text-green-500 mr-2" />
                    <span className="font-semibold">Location Found</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    <Edit className="mr-1" size={14} />
                    {isEditing ? "Save" : "Edit"}
                  </motion.button>
                </div>

                <div className="text-xs text-gray-500 mb-2">
                  GPS: {location.latitude.toFixed(6)},{" "}
                  {location.longitude.toFixed(6)}
                </div>

                {locationDetails ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {/* Street */}
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">Street</span>
                      {isEditing ? (
                        <input
                          type="text"
                          value={locationDetails.street}
                          onChange={(e) => handleEdit("street", e.target.value)}
                          className="border p-1 rounded"
                        />
                      ) : (
                        <span className="font-medium">
                          {locationDetails.street || "Not available"}
                        </span>
                      )}
                    </div>

                    {/* Pincode */}
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">Pincode</span>
                      {isEditing ? (
                        <input
                          type="text"
                          value={locationDetails.pincode}
                          onChange={(e) =>
                            handleEdit("pincode", e.target.value)
                          }
                          className="border p-1 rounded"
                        />
                      ) : (
                        <span className="font-medium">
                          {locationDetails.pincode || "Not available"}
                        </span>
                      )}
                    </div>

                    {/* Village */}
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">Village</span>
                      {isEditing ? (
                        <input
                          type="text"
                          value={locationDetails.village}
                          onChange={(e) =>
                            handleEdit("village", e.target.value)
                          }
                          className="border p-1 rounded"
                        />
                      ) : (
                        <span className="font-medium">
                          {locationDetails.village || "Not available"}
                        </span>
                      )}
                    </div>

                    {/* City */}
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">City</span>
                      {isEditing ? (
                        <input
                          type="text"
                          value={locationDetails.city}
                          onChange={(e) => handleEdit("city", e.target.value)}
                          className="border p-1 rounded"
                        />
                      ) : (
                        <span className="font-medium">
                          {locationDetails.city || "Not available"}
                        </span>
                      )}
                    </div>

                    {/* District */}
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">District</span>
                      {isEditing ? (
                        <input
                          type="text"
                          value={locationDetails.district}
                          onChange={(e) =>
                            handleEdit("district", e.target.value)
                          }
                          className="border p-1 rounded"
                        />
                      ) : (
                        <span className="font-medium">
                          {locationDetails.district || "Not available"}
                        </span>
                      )}
                    </div>

                    {/* State */}
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">State</span>
                      {isEditing ? (
                        <input
                          type="text"
                          value={locationDetails.state}
                          onChange={(e) => handleEdit("state", e.target.value)}
                          className="border p-1 rounded"
                        />
                      ) : (
                        <span className="font-medium">
                          {locationDetails.state || "Not available"}
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    Location details not available
                  </div>
                )}
              </div>
            ) : null}
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-gray-600 text-sm">
              Press the SOS button to send an immediate alert to emergency
              services. Your location, emergency type, and selected services
              will be shared.
            </p>
          </div>

          {/* SOS Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSOS}
            disabled={
              !location ||
              selectedServices.length === 0 ||
              isLoading ||
              !emergencyType
            }
            className={`w-full md:w-2/3 lg:w-1/2 mx-auto bg-red-600 text-white px-6 py-4 rounded-full text-xl font-bold flex items-center justify-center transition duration-300 ${
              !location ||
              selectedServices.length === 0 ||
              isLoading ||
              !emergencyType
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-red-700 shadow-lg"
            }`}
          >
            <PhoneCall className="mr-2" size={24} />
            SEND SOS ALERT
          </motion.button>

          {isAlertSent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-green-100 text-green-700 rounded-lg"
            >
              <div className="flex items-center justify-center">
                <CheckCircle className="mr-2" />
                <span className="font-bold">SOS Alert Sent!</span>
              </div>
              <p className="mt-2">
                Emergency services have been notified of your situation and
                location. Stay in place if possible and keep your phone
                accessible.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default SOSButton;
