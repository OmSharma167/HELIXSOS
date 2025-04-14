import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, Phone, Clock, Ambulance, MapPin, User, Crosshair, 
  Loader2, Check, X, Navigation, AlertCircle 
} from 'lucide-react';

const AmbulanceRequestSystem = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);
  const [requestStatus, setRequestStatus] = useState('idle'); // idle, pending, accepted, rejected
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [nearbyAmbulances, setNearbyAmbulances] = useState([
    {
      id: 'A-123',
      driverName: 'Mike Johnson',
      location: { lat: 23.8103, lng: 90.4125 },
      distance: '2.5 km',
      estimatedTime: '8 mins',
      rating: 4.8,
      status: 'Available'
    },
    {
      id: 'A-124',
      driverName: 'Sarah Wilson',
      location: { lat: 23.8203, lng: 90.4225 },
      distance: '3.2 km',
      estimatedTime: '12 mins',
      rating: 4.6,
      status: 'Available'
    }
  ]);

  const getCurrentLocation = () => {
    setLocationLoading(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        };
        setCurrentLocation(location);
        setLocationLoading(false);
        findNearbyAmbulances(location);
      },
      (error) => {
        setLocationError(getLocationErrorMessage(error));
        setLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  const findNearbyAmbulances = (location) => {
    console.log('Finding ambulances near:', location);
  };

  const getLocationErrorMessage = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return 'Location permission denied. Please enable location services.';
      case error.POSITION_UNAVAILABLE:
        return 'Location information is unavailable.';
      case error.TIMEOUT:
        return 'Location request timed out.';
      default:
        return 'An unknown error occurred.';
    }
  };

  const handleAmbulanceSelect = (ambulance) => {
    setSelectedAmbulance(ambulance);
    setRequestStatus('pending');
    simulateAmbulanceRequest(ambulance);
  };

  const simulateAmbulanceRequest = (ambulance) => {
    setTimeout(() => {
      const isAccepted = Math.random() > 0.3;
      setRequestStatus(isAccepted ? 'accepted' : 'rejected');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5 text-red-600" />
              Your Location
            </h2>
            <button
              onClick={getCurrentLocation}
              disabled={locationLoading}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
            >
              {locationLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Crosshair className="h-4 w-4" />
              )}
              {locationLoading ? 'Getting Location...' : 'Update Location'}
            </button>
          </div>

          {locationError && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                <p>{locationError}</p>
              </div>
            </div>
          )}

          {currentLocation && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <p className="text-sm text-gray-500">Latitude</p>
                <p className="font-medium">{currentLocation.latitude.toFixed(6)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Longitude</p>
                <p className="font-medium">{currentLocation.longitude.toFixed(6)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Accuracy</p>
                <p className="font-medium">{currentLocation.accuracy.toFixed(1)} meters</p>
              </div>
            </div>
          )}
        </div>

        {requestStatus !== 'idle' && (
          <div className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${
            requestStatus === 'pending' ? 'border-yellow-500' :
            requestStatus === 'accepted' ? 'border-green-500' : 'border-red-500'
          }`}>
            <div className="flex items-center gap-4">
              {requestStatus === 'pending' && (
                <>
                  <Loader2 className="h-6 w-6 text-yellow-500 animate-spin" />
                  <div>
                    <h3 className="font-medium">Requesting Ambulance</h3>
                    <p className="text-sm text-gray-500">Waiting for confirmation from {selectedAmbulance?.driverName}...</p>
                  </div>
                </>
              )}
              {requestStatus === 'accepted' && (
                <>
                  <Check className="h-6 w-6 text-green-500" />
                  <div>
                    <h3 className="font-medium">Request Accepted!</h3>
                    <p className="text-sm text-gray-500">
                      Ambulance #{selectedAmbulance?.id} is on the way. ETA: {selectedAmbulance?.estimatedTime}
                    </p>
                  </div>
                </>
              )}
              {requestStatus === 'rejected' && (
                <>
                  <X className="h-6 w-6 text-red-500" />
                  <div>
                    <h3 className="font-medium">Request Rejected</h3>
                    <p className="text-sm text-gray-500">Please try another ambulance</p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {currentLocation && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Ambulance className="h-5 w-5 text-red-600" />
              Nearby Ambulances
            </h2>
            <div className="space-y-4">
              {nearbyAmbulances.map((ambulance) => (
                <div
                  key={ambulance.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">Ambulance #{ambulance.id}</h3>
                      <p className="text-sm text-gray-500">{ambulance.driverName}</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {ambulance.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-gray-500">Distance</p>
                      <p className="font-medium">{ambulance.distance}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Est. Time</p>
                      <p className="font-medium">{ambulance.estimatedTime}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAmbulanceSelect(ambulance)}
                    disabled={requestStatus === 'pending'}
                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-300 transition-colors"
                  >
                    Request Ambulance
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AmbulanceRequestSystem;
