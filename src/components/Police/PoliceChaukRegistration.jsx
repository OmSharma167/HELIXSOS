
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/authContext';
import axiosInstance from './api/axios';

const PoliceChaukRegistration = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [location, setLocation] = useState({ coordinates: [0, 0] });
    const [responseMessage, setResponseMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    // Access auth context for userId and token
    const { auth } = useAuth();
    const { user, token } = auth;

    useEffect(() => {
        const fetchLocation = async () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        setLocation({
                            type: 'Point',
                            coordinates: [longitude, latitude] // MongoDB expects [longitude, latitude]
                        });
                        await fetchAddress(latitude, longitude);
                    },
                    (error) => {
                        setErrorMessage('Could not get your location: ' + error.message);
                    },
                    { enableHighAccuracy: true }
                );
            } else {
                setErrorMessage('Geolocation is not supported by this browser.');
            }
        };

        fetchLocation();
    }, []);

    const fetchAddress = async (latitude, longitude) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            if (data && data.address) {
                const fullAddress = `${data.address.road || ''}, ${data.address.city || ''}, ${data.address.state || ''}, ${data.address.country || ''}`.trim();
                setAddress(fullAddress);
            } else {
                setErrorMessage('Could not fetch address for the location.');
            }
        } catch (error) {
            setErrorMessage('Failed to fetch address: ' + error.message);
        }
    };

    const handleRegisterChauk = async (e) => {
        e.preventDefault();

        if (!user || !user._id) {
            setErrorMessage('User not authenticated');
            return;
        }

        try {
            const response = await axiosInstance.post(
                '/police-chauks',
                {
                    userId: user._id,
                    name,
                    address,
                    contactNumber,
                    location,
                    description: '' // Optional field
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setResponseMessage('Police Chauk registered successfully!');
            setErrorMessage('');
            // Reset form
            setName('');
            setAddress('');
            setContactNumber('');
        } catch (error) {
            setErrorMessage(
                error.response?.data?.message || 
                'Failed to register Police Chauk. Please try again.'
            );
            setResponseMessage('');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[90vh] py-8">
            <h2 className="text-2xl font-semibold mb-4">Register Police Chauk</h2>
            <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
                <form onSubmit={handleRegisterChauk} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Chauk Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Address:
                        </label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
                            Contact Number:
                        </label>
                        <input
                            type="tel"
                            id="contactNumber"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Register Chauk
                    </button>
                </form>
                {responseMessage && (
                    <p className="mt-2 text-green-500">{responseMessage}</p>
                )}
                {errorMessage && (
                    <p className="mt-2 text-red-500">{errorMessage}</p>
                )}
            </div>
        </div>
    );
};

export default PoliceChaukRegistration;
