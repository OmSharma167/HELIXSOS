

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const NearbyPoliceChauks = () => {
//     const [chauks, setChauks] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchNearbyChauks = async (latitude, longitude) => {
//             try {
//                 setLoading(true);
//                 const response = await axios.get('http://localhost:5000/api/police-chauks/nearest', {
//                     params: { latitude, longitude, maxDistance: 50000 },
//                 });
//                 setChauks(response.data);
//             } catch (err) {
//                 setError('Could not fetch nearby police chauks.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         navigator.geolocation.getCurrentPosition(
//             (position) => {
//                 const { latitude, longitude } = position.coords;
//                 fetchNearbyChauks(latitude, longitude);
//             },
//             () => setError('Could not get your location.')
//         );
//     }, []);

//     if (loading) return <div>Loading nearby police chauks...</div>;
//     if (error) return <div>{error}</div>;

//     return (
//         <div>
//             <h2>Nearby Police Chauks</h2>
//             {chauks.length > 0 ? (
//                 <ul>
//                     {chauks.map((chauk) => (
//                         <li key={chauk._id}>
//                             <h3>{chauk.name}</h3>
//                             <p>{chauk.address}</p>
//                             <p>Contact: {chauk.contactNumber}</p>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No police chauks found nearby.</p>
//             )}
//         </div>
//     );
// };

// export default NearbyPoliceChauks;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Phone, AlertTriangle, MapPin, Shield } from 'lucide-react';

const NearbyPoliceChauks = () => {
    const [chauks, setChauks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchNearbyChauks = async (latitude, longitude) => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:5000/api/police-chauks/nearest', {
                    params: { latitude, longitude, maxDistance: 50000 },
                });
                setChauks(response.data);
            } catch (err) {
                setError('Could not fetch nearby police chauks.');
            } finally {
                setLoading(false);
            }
        };

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchNearbyChauks(latitude, longitude);
            },
            () => setError('Could not get your location.')
        );
    }, []);

    const handleEmergencyCall = (phoneNumber) => {
        window.location.href = `tel:${phoneNumber}`;
    };

    const handleRegularCall = (phoneNumber) => {
        window.location.href = `tel:${phoneNumber}`;
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error! </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Nearby Police Stations</h1>
                    <p className="text-lg text-gray-600">Find and contact the closest police stations in your area</p>
                </div>

                {chauks.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2">
                        {chauks.map((chauk) => (
                            <div 
                                key={chauk._id}
                                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-semibold text-gray-900">{chauk.name}</h3>
                                        <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                            Police Station
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-2 text-gray-600 mb-3">
                                        <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                                        <p>{chauk.address}</p>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 text-gray-600 mb-6">
                                        <Phone className="w-5 h-5 text-gray-400" />
                                        <p>{chauk.contactNumber}</p>
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => handleEmergencyCall(chauk.contactNumber)}
                                            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300"
                                        >
                                            <AlertTriangle className="w-5 h-5" />
                                            Emergency
                                        </button>
                                        <button
                                            onClick={() => handleRegularCall(chauk.contactNumber)}
                                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300"
                                        >
                                            <Phone className="w-5 h-5" />
                                            Call
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center bg-white p-8 rounded-lg shadow">
                        <p className="text-gray-600">No police stations found nearby.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NearbyPoliceChauks;
