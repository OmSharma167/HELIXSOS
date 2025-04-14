import React, { useState } from 'react';
import { Search, MapPin, Clock, Phone, Star } from 'lucide-react';

const PharmacyLocator = () => {
  const [location, setLocation] = useState("");
  const [radius, setRadius] = useState("5");
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");

  // Simulated pharmacy data
  const mockPharmacies = [
    {
      id: 1,
      name: "Central Pharmacy",
      address: "123 Main St, City",
      distance: "0.5",
      rating: 4.5,
      openNow: true,
      hours: "8:00 AM - 10:00 PM",
      phone: "(555) 123-4567",
      services: ["Prescription", "Vaccination", "Health Screening"]
    },
    {
      id: 2,
      name: "MediCare Plus",
      address: "456 Oak Ave, City",
      distance: "1.2",
      rating: 4.8,
      openNow: true,
      hours: "24 Hours",
      phone: "(555) 234-5678",
      services: ["Prescription", "Drive-thru", "Compounding"]
    },
    {
      id: 3,
      name: "HealthPlus Pharmacy",
      address: "789 Pine St, City",
      distance: "2.1",
      rating: 4.2,
      openNow: false,
      hours: "9:00 AM - 9:00 PM",
      phone: "(555) 345-6789",
      services: ["Prescription", "Home Delivery"]
    }
  ];

  const findPharmacies = () => {
    setLoading(true);
    setTimeout(() => {
      setPharmacies(mockPharmacies);
      setLoading(false);
    }, 1000);
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className=" mx-auto mt-16 p-4 bg-gray-50 ">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 p-6 shadow-lg rounded-lg border border-gray-300">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Find a Pharmacy Near You
          </h1>
          <p className="text-gray-600 mb-4">
            Search for pharmacies in your area and view their services, hours, and contact information
          </p>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter your location or zip code"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                className="w-[180px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="5">Within 5 miles</option>
                <option value="10">Within 10 miles</option>
                <option value="20">Within 20 miles</option>
                <option value="50">Within 50 miles</option>
              </select>
              <button
                onClick={findPharmacies}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-blue-400"
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
            <div className="flex gap-4">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-[200px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Services</option>
                <option value="24h">24-Hour Service</option>
                <option value="drive-thru">Drive-thru</option>
                <option value="delivery">Home Delivery</option>
              </select>
            </div>
          </div>
        </div>

        {pharmacies.length > 0 && (
          <div className="space-y-4">
            {pharmacies.map((pharmacy) => (
              <div
                key={pharmacy.id}
                className="p-6 shadow-lg rounded-lg border border-gray-300 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col sm:flex-row justify-between">
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {pharmacy.name}
                      </h3>
                      <span className="flex">
                        {renderStars(pharmacy.rating)}
                      </span>
                    </div>
                    <div className="flex items-start gap-2 text-gray-600 mb-2">
                      <MapPin className="w-5 h-5 mt-1" />
                      <div>
                        <p>{pharmacy.address}</p>
                        <p className="text-sm">{pharmacy.distance} miles away</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <Clock className="w-5 h-5" />
                      <div>
                        <span className={pharmacy.openNow ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                          {pharmacy.openNow ? "Open Now" : "Closed"}
                        </span>
                        <span className="mx-2">•</span>
                        <span>{pharmacy.hours}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <Phone className="w-5 h-5" />
                      <span>{pharmacy.phone}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {pharmacy.services.map((service, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-4">
                    <button className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                      Get Directions
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {pharmacies.length === 0 && !loading && location && (
          <div className="p-6 shadow-lg rounded-lg border border-gray-300 text-center text-gray-600">
            No pharmacies found in your area. Try expanding your search radius.
          </div>
        )}
      </div>
    </div>
  );
};

export default PharmacyLocator;
