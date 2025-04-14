
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import Layout from '../Layout/Layout';

// // Haversine formula to calculate distance in kilometers
// const calculateDistance = (lat1, lon1, lat2, lon2) => {
//   const toRadians = (degrees) => (degrees * Math.PI) / 180;

//   const R = 6371; // Radius of Earth in kilometers
//   const dLat = toRadians(lat2 - lat1);
//   const dLon = toRadians(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
//     Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   const distance = R * c; // Distance in kilometers

//   return distance.toFixed(2); // Return distance rounded to 2 decimal places
// };

// const NearbyHealthcare = () => {
//   const [location, setLocation] = useState({ lat: null, lng: null });
//   const [hospitals, setHospitals] = useState([]);
//   const [error, setError] = useState(null);
//   const [radius, setRadius] = useState(2); // Default radius to 5 km
//   const [selectedHospital, setSelectedHospital] = useState(null);

//   // Get user's location on component mount
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setLocation({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           });
//         },
//         (err) => {
//           setError('Unable to retrieve location. Please allow location access.');
//         }
//       );
//     } else {
//       setError('Geolocation is not supported by this browser.');
//     }
//   }, []);

//   // Fetch nearby hospitals using OpenStreetMap Overpass API
//   useEffect(() => {
//     if (location.lat && location.lng) {
//       const fetchNearbyHospitals = async () => {
//         try {
//           const response = await axios.get(
//             `https://overpass-api.de/api/interpreter?data=[out:json];node[amenity=hospital](around:${
//               radius * 1000
//             },${location.lat},${location.lng});out;`
//           );
//           setHospitals(response.data.elements); // Extract hospitals from the response
//         } catch (err) {
//           setError('Error fetching nearby hospitals.');
//         }
//       };
//       fetchNearbyHospitals();
//     }
//   }, [location, radius]);

//   // Handle click on "Map" button to show selected hospital on map
//   const handleMapClick = (hospital) => {
//     setSelectedHospital(hospital);
//   };

//   return (
//     <Layout>
//       <div className="container mx-auto py-8">
//       <h1 className="text-2xl font-bold mb-6">Nearby Hospitals and Doctors</h1>

//       {error && <p className="text-red-500">{error}</p>}

//       {location.lat && location.lng ? (
//         <div>
//           <p className="mb-4">Your Location: {location.lat}, {location.lng}</p>

//           {/* Dropdown for selecting radius */}
//           <div className="mb-6">
//             <label htmlFor="radius" className="mr-2 font-semibold">Choose radius (km):</label>
//             <select
//               id="radius"
//               value={radius}
//               onChange={(e) => setRadius(e.target.value)}
//               className="border rounded px-3 py-2"
//             >
//               {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((r) => (
//                 <option key={r} value={r}>{r} km</option>
//               ))}
//             </select>
//           </div>

//           <ul>
//             {hospitals.map((hospital, index) => {
//               const distance = calculateDistance(location.lat, location.lng, hospital.lat, hospital.lon);
//               return (
//                 <li key={index} className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
//                   <h2 className="text-xl font-semibold">{hospital.tags.name || "Unnamed Hospital"}</h2>
//                   <p>Latitude: {hospital.lat}, Longitude: {hospital.lon}</p>
//                   <p>Distance: {distance} km</p>
//                   <button
//                     onClick={() => handleMapClick(hospital)}
//                     className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
//                   >
//                     Map
//                   </button>
//                 </li>
//               );
//             })}
//           </ul>

//           {/* Map section */}
//           {selectedHospital && (
//             <div className="mt-8">
//               <MapContainer
//                 center={[location.lat, location.lng]}
//                 zoom={13}
//                 scrollWheelZoom={false}
//                 style={{ height: '400px', width: '100%' }}
//               >
//                 <TileLayer
//                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 />
//                 {/* User location marker */}
//                 <Marker position={[location.lat, location.lng]}>
//                   <Popup>Your location</Popup>
//                 </Marker>
//                 {/* Hospital location marker */}
//                 <Marker position={[selectedHospital.lat, selectedHospital.lon]}>
//                   <Popup>{selectedHospital.tags.name || 'Unnamed Hospital'}</Popup>
//                 </Marker>
//                 {/* Path between user and hospital */}
//                 <Polyline
//                   positions={[
//                     [location.lat, location.lng],
//                     [selectedHospital.lat, selectedHospital.lon],
//                   ]}
//                   color="blue"
//                 />
//               </MapContainer>
//             </div>
//           )}
//         </div>
//       ) : (
//         <p>Loading your location...</p>
//       )}
//     </div>

//     </Layout>
//   );
// };

// export default NearbyHealthcare;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Layout from '../Layout/Layout';
import { Hospital, MapPin, Loader } from 'lucide-react';

// Haversine formula to calculate distance in kilometers
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRadians = (degrees) => (degrees * Math.PI) / 180;

  const R = 6371; // Radius of Earth in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(2); // Return distance rounded to 2 decimal places
};

const NearbyHealthcare = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [hospitals, setHospitals] = useState([]);
  const [error, setError] = useState(null);
  const [radius, setRadius] = useState(2);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        setError('Unable to retrieve location. Please allow location access.');
        setLoading(false);
      }
    );
  } else {
    setError('Geolocation is not supported by this browser.');
    setLoading(false);
  }
}, []);

  useEffect(() => {
    if (location.lat && location.lng) {
      const fetchNearbyHospitals = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `https://overpass-api.de/api/interpreter?data=[out:json];node[amenity=hospital](around:${radius * 1000},${location.lat},${location.lng});out;`
          );
          setHospitals(response.data.elements);
        } catch (err) {
          setError('Error fetching nearby hospitals.');
        }
        setLoading(false);
      };
      fetchNearbyHospitals();
    }
  }, [location, radius]);

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Nearby Hospitals</h1>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin h-8 w-8 text-blue-500" />
          </div>
        ) : location.lat && location.lng ? (
          <div>
            <div className="bg-blue-100 p-4 rounded-lg shadow-md">
              <p className="font-semibold flex items-center">
                <MapPin className="mr-2" /> Your Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
              </p>
            </div>

            <div className="flex items-center justify-center mb-6">
              <label htmlFor="radius" className="mr-2 font-semibold">Choose radius:</label>
              <select
                id="radius"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                className="border rounded px-3 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((r) => (
                  <option key={r} value={r}>{r} km</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {hospitals.map((hospital, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2 flex items-center">
                      <Hospital className="mr-2 text-blue-500" />
                      {hospital.tags.name || "Unnamed Hospital"}
                    </h2>
                    <p className="text-gray-600 mb-1">Latitude: {hospital.lat.toFixed(4)}</p>
                    <p className="text-gray-600 mb-2">Longitude: {hospital.lon.toFixed(4)}</p>
                    <p className="text-blue-600 font-semibold mb-3">Distance: {calculateDistance(location.lat, location.lng, hospital.lat, hospital.lon)} km</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-lg">
              <MapContainer
                center={[location.lat, location.lng]}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[location.lat, location.lng]}>
                  <Popup>Your location</Popup>
                </Marker>
                {hospitals.map((hospital, index) => (
                  <Marker key={index} position={[hospital.lat, hospital.lon]}>
                    <Popup>{hospital.tags.name || 'Unnamed Hospital'}</Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600">Loading your location...</p>
        )}
      </div>
    </Layout>
  );
};

export default NearbyHealthcare;
