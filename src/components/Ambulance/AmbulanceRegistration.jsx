import React, { useState, useEffect } from 'react';
import { AlertTriangle, Loader2, MapPin, Phone, User, Mail, Ambulance } from 'lucide-react';

const AmbulanceRegistration = () => {
  const [formData, setFormData] = useState({
    driverName: '',
    phoneNumber: '',
    email: '',
    vehicleNumber: '',
    vehicleType: 'basic', // basic, icu, cardiac
    licenseNumber: '',
    currentLocation: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          currentLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        }));
      },
      (error) => {
        setLocationError('Unable to retrieve your location');
        console.error(error);
      }
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:5000/api/ambulance/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setSuccess(true);
      setFormData({
        driverName: '',
        phoneNumber: '',
        email: '',
        vehicleNumber: '',
        vehicleType: 'basic',
        licenseNumber: '',
        currentLocation: formData.currentLocation,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <Ambulance className="h-8 w-8 text-red-600" />
          <h2 className="text-2xl font-semibold">Ambulance Registration</h2>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-200 text-red-700 rounded">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-200 text-green-700 rounded">
            <h3 className="font-semibold">Success</h3>
            <p>Ambulance registered successfully! You can now access the dashboard.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="driverName" className="block font-medium text-gray-700">
              Driver Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                id="driverName"
                name="driverName"
                value={formData.driverName}
                onChange={handleChange}
                required
                className="w-full pl-10 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block font-medium text-gray-700">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="w-full pl-10 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="vehicleNumber" className="block font-medium text-gray-700">
              Vehicle Number
            </label>
            <input
              type="text"
              id="vehicleNumber"
              name="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleChange}
              required
              className="w-full py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="vehicleType" className="block font-medium text-gray-700">
              Vehicle Type
            </label>
            <select
              id="vehicleType"
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              required
              className="w-full py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="basic">Basic Ambulance</option>
              <option value="icu">ICU Ambulance</option>
              <option value="cardiac">Cardiac Ambulance</option>
            </select>
          </div>

          <div>
            <label htmlFor="licenseNumber" className="block font-medium text-gray-700">
              License Number
            </label>
            <input
              type="text"
              id="licenseNumber"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              required
              className="w-full py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Current Location</label>
            <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-md">
              <MapPin className="h-4 w-4 text-gray-400" />
              {formData.currentLocation ? (
                <span className="text-sm">
                  Lat: {formData.currentLocation.latitude.toFixed(6)}, Long: {formData.currentLocation.longitude.toFixed(6)}
                </span>
              ) : (
                <span className="text-sm text-red-500">{locationError || 'Fetching location...'}</span>
              )}
              <button
                type="button"
                onClick={getCurrentLocation}
                className="ml-auto text-blue-600 hover:bg-blue-50 rounded-md py-1 px-3"
              >
                Refresh Location
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !formData.currentLocation}
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Registering...
              </>
            ) : (
              'Register Ambulance'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AmbulanceRegistration;
