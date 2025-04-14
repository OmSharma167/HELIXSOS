import React, { useState } from 'react';
import { 
  AlertTriangle, Phone, Clock, Ambulance, MapPin, User, 
  Check, X, Navigation, Bell
} from 'lucide-react';

const AmbulanceOwnerRequests = () => {
  const [incomingRequests, setIncomingRequests] = useState([
    {
      id: 'REQ-001',
      patientLocation: { lat: 23.8103, lng: 90.4125 },
      timestamp: new Date().toISOString(),
      status: 'pending',
      distance: '2.5 km',
      estimatedTime: '8 mins',
      userDetails: {
        name: 'John Doe',
        phone: '+1234567890'
      }
    }
  ]);

  const handleAccept = (requestId) => {
    setIncomingRequests(requests =>
      requests.map(req =>
        req.id === requestId
          ? { ...req, status: 'accepted' }
          : req
      )
    );
    // In a real app, this would notify the user and start tracking
  };

  const handleReject = (requestId) => {
    setIncomingRequests(requests =>
      requests.map(req =>
        req.id === requestId
          ? { ...req, status: 'rejected' }
          : req
      )
    );
    // In a real app, this would notify the user
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ambulance className="h-8 w-8 text-red-600" />
            <h1 className="text-xl font-bold">Ambulance Request Manager</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative">
              <Bell className="h-6 w-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {incomingRequests.filter(req => req.status === 'pending').length}
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {incomingRequests.length === 0 ? (
          <div className="flex items-center gap-3 p-4 mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg">
            <AlertTriangle className="h-5 w-5" />
            <div>
              <p className="font-semibold">No Incoming Requests</p>
              <p className="text-sm">There are currently no pending ambulance requests.</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Incoming Requests</h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {incomingRequests.map((request) => (
                <div key={request.id} className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Request #{request.id}</span>
                      <h3 className="font-medium">{request.userDetails.name}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      {request.status === 'pending' ? (
                        <>
                          <button
                            onClick={() => handleAccept(request.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                          >
                            <Check className="h-4 w-4" />
                            Accept
                          </button>
                          <button
                            onClick={() => handleReject(request.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                          >
                            <X className="h-4 w-4" />
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          request.status === 'accepted' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Distance</p>
                        <p className="font-medium">{request.distance}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Estimated Time</p>
                        <p className="font-medium">{request.estimatedTime}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Contact</p>
                        <p className="font-medium">{request.userDetails.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-gray-50 rounded-lg flex items-center gap-2">
                    <Navigation className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Patient Location</p>
                      <p className="font-medium">
                        {request.patientLocation.lat.toFixed(4)}, {request.patientLocation.lng.toFixed(4)}
                      </p>
                    </div>
                    <button className="ml-auto px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md">
                      Open in Maps
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AmbulanceOwnerRequests;
