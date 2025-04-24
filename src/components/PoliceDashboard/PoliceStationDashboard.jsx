import React, { useState, useEffect } from "react";
import {
  Bell,
  Users,
  Calendar,
  MapPin,
  PhoneCall,
  Clock,
  AlertTriangle,
  CheckCircle,
  Shield,
  X,
  User,
  FileText,
  Filter,
  Search,
  MoreVertical,
  ChevronRight
} from "lucide-react";

const PoliceStationDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [notifications, setNotifications] = useState([]);
  const [pendingSOSCount, setPendingSOSCount] = useState(0);
  const [showSOSModal, setShowSOSModal] = useState(false);
  const [currentSOS, setCurrentSOS] = useState(null);
  const [policeStationDetails, setPoliceStationDetails] = useState({
    name: "Central Police Station",
    address: "123 Main Street, Downtown",
    district: "Central District",
    officers: 45,
    vehicles: 12,
    jurisdictionArea: "32 sq km",
    phoneNumber: "100",
    email: "central.station@police.gov",
    inCharge: "Inspector Rajesh Singh"
  });

  // Mock data for emergencies
  const [emergencies, setEmergencies] = useState([
    {
      id: "SOS-001",
      type: "medical",
      services: ["police", "ambulance"],
      location: {
        latitude: 28.6139,
        longitude: 77.2090,
        details: {
          street: "Connaught Place",
          city: "New Delhi",
          state: "Delhi",
          pincode: "110001"
        }
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      status: "active",
      additionalInfo: "Person appears to be having chest pain",
      user: "Amit Shah",
      userPhone: "9876543210"
    },
    {
      id: "SOS-002",
      type: "accident",
      services: ["police", "ambulance", "fire"],
      location: {
        latitude: 28.6129,
        longitude: 77.2295,
        details: {
          street: "India Gate Circle",
          city: "New Delhi",
          state: "Delhi",
          pincode: "110001"
        }
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
      status: "dispatched",
      additionalInfo: "Car accident, at least two vehicles involved",
      user: "Priya Verma",
      userPhone: "9876543211"
    }
  ]);

  // Simulate receiving an SOS notification
  useEffect(() => {
    // Simulating an incoming SOS alert after 5 seconds
    const timer = setTimeout(() => {
      const newSOS = {
        id: `SOS-00${emergencies.length + 1}`,
        type: "police",
        services: ["police"],
        location: {
          latitude: 28.6271,
          longitude: 77.2219,
          details: {
            street: "Karol Bagh Market",
            city: "New Delhi",
            state: "Delhi",
            pincode: "110005"
          }
        },
        timestamp: new Date().toISOString(),
        status: "new",
        additionalInfo: "Suspicious person loitering around the bank",
        user: "Rahul Kumar",
        userPhone: "9876543212"
      };
      
      // Add to emergencies
      setEmergencies(prev => [newSOS, ...prev]);
      
      // Show notification
      setNotifications(prev => [
        {
          id: Date.now(),
          message: "New SOS alert received!",
          type: "sos",
          data: newSOS,
          read: false
        },
        ...prev
      ]);
      
      // Increment pending SOS count
      setPendingSOSCount(prev => prev + 1);
      
      // Show SOS modal
      setCurrentSOS(newSOS);
      setShowSOSModal(true);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  // Update pending SOS count whenever emergencies change
  useEffect(() => {
    const pending = emergencies.filter(e => e.status === "new").length;
    setPendingSOSCount(pending);
  }, [emergencies]);

  const handleSOSResponse = (sosId, action) => {
    // Update the emergency status based on action
    setEmergencies(prev =>
      prev.map(emergency =>
        emergency.id === sosId
          ? { ...emergency, status: action === "accept" ? "dispatched" : "rejected" }
          : emergency
      )
    );
    
    // Close the modal
    setShowSOSModal(false);
    
    // Add a notification
    setNotifications(prev => [
      {
        id: Date.now(),
        message: `Emergency ${sosId} ${
          action === "accept" ? "accepted and units dispatched" : "rejected"
        }`,
        type: action === "accept" ? "success" : "info",
        read: false
      },
      ...prev
    ]);
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "new":
        return "bg-red-100 text-red-800 border-red-300";
      case "active":
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "dispatched":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "resolved":
        return "bg-green-100 text-green-800 border-green-300";
      case "rejected":
        return "bg-gray-100 text-gray-800 border-gray-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getEmergencyTypeIcon = (type) => {
    switch (type) {
      case "medical":
        return "🚑";
      case "fire":
        return "🚒";
      case "police":
        return "🚓";
      case "accident":
        return "⚠️";
      default:
        return "🆘";
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const calculateTimeAgo = (timestamp) => {
    const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);
    
    if (seconds < 60) return `${seconds} seconds ago`;
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    
    const days = Math.floor(hours / 24);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  };

  return (
    <div className="flex mt-16 h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white p-6">
        <div className="flex items-center mb-10">
          <Shield className="mr-2" size={30} />
          <h1 className="text-xl font-bold">Police Dashboard</h1>
        </div>
        
        <nav>
          <ul className="space-y-2">
            <li>
              <button
                className={`flex items-center w-full p-3 rounded-lg transition ${
                  activeTab === "overview" 
                    ? "bg-blue-700" 
                    : "hover:bg-blue-700/50"
                }`}
                onClick={() => setActiveTab("overview")}
              >
                <Shield className="mr-3" size={18} />
                <span>Station Overview</span>
              </button>
            </li>
            <li>
              <button
                className={`flex items-center w-full p-3 rounded-lg transition ${
                  activeTab === "emergencies" 
                    ? "bg-blue-700" 
                    : "hover:bg-blue-700/50"
                }`}
                onClick={() => setActiveTab("emergencies")}
              >
                <AlertTriangle className="mr-3" size={18} />
                <span>Emergencies</span>
                {pendingSOSCount > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {pendingSOSCount}
                  </span>
                )}
              </button>
            </li>
            <li>
              <button
                className={`flex items-center w-full p-3 rounded-lg transition ${
                  activeTab === "officers" 
                    ? "bg-blue-700" 
                    : "hover:bg-blue-700/50"
                }`}
                onClick={() => setActiveTab("officers")}
              >
                <Users className="mr-3" size={18} />
                <span>Officers</span>
              </button>
            </li>
            <li>
              <button
                className={`flex items-center w-full p-3 rounded-lg transition ${
                  activeTab === "reports" 
                    ? "bg-blue-700" 
                    : "hover:bg-blue-700/50"
                }`}
                onClick={() => setActiveTab("reports")}
              >
                <FileText className="mr-3" size={18} />
                <span>Reports</span>
              </button>
            </li>
          </ul>
        </nav>
        
        <div className="mt-auto">
          <div className="border-t border-blue-700 pt-4 mt-8">
            <div className="flex items-center">
              <div className="bg-blue-500 p-2 rounded-full">
                <User size={18} />
              </div>
              <div className="ml-3">
                <p className="font-medium">{policeStationDetails.inCharge}</p>
                <p className="text-xs text-blue-300">Station In-charge</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-6 py-3">
            <h2 className="text-xl font-semibold text-gray-800">
              {policeStationDetails.name}
            </h2>
            
            <div className="flex items-center">
              <div className="relative mr-6">
                <Bell 
                  className="text-gray-500 cursor-pointer hover:text-blue-500" 
                  size={22} 
                />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </div>
              
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                  PS
                </div>
                <span className="ml-2 text-sm font-medium">Police Admin</span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Content Area */}
        <main className="flex-1 overflow-auto bg-gray-100 p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-gray-500 text-sm font-medium">Active Emergencies</h3>
                    <AlertTriangle className="text-red-500" size={20} />
                  </div>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    {emergencies.filter(e => ["new", "active", "dispatched"].includes(e.status)).length}
                  </p>
                  <div className="text-xs text-gray-500 mt-2 flex items-center">
                    <Clock size={14} className="mr-1" />
                    Last updated just now
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-gray-500 text-sm font-medium">Available Officers</h3>
                    <Users className="text-blue-500" size={20} />
                  </div>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    {policeStationDetails.officers}
                  </p>
                  <div className="text-xs text-gray-500 mt-2 flex items-center">
                    <span className="text-green-500 font-medium">25 on duty</span>
                    <span className="mx-1">•</span>
                    <span>20 off duty</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-gray-500 text-sm font-medium">Patrol Vehicles</h3>
                    <span className="text-xl">🚓</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    {policeStationDetails.vehicles}
                  </p>
                  <div className="text-xs text-gray-500 mt-2 flex items-center">
                    <span className="text-green-500 font-medium">8 active</span>
                    <span className="mx-1">•</span>
                    <span>4 at station</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Station Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-start mb-4">
                        <MapPin className="text-gray-400 mr-3 mt-1" size={18} />
                        <div>
                          <p className="text-sm text-gray-500">Address</p>
                          <p className="font-medium">{policeStationDetails.address}</p>
                          <p className="text-sm">{policeStationDetails.district}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start mb-4">
                        <Users className="text-gray-400 mr-3 mt-1" size={18} />
                        <div>
                          <p className="text-sm text-gray-500">Personnel</p>
                          <p className="font-medium">{policeStationDetails.officers} Officers</p>
                          <p className="text-sm">Jurisdiction: {policeStationDetails.jurisdictionArea}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-start mb-4">
                        <PhoneCall className="text-gray-400 mr-3 mt-1" size={18} />
                        <div>
                          <p className="text-sm text-gray-500">Contact</p>
                          <p className="font-medium">{policeStationDetails.phoneNumber} (Emergency)</p>
                          <p className="text-sm">{policeStationDetails.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start mb-4">
                        <User className="text-gray-400 mr-3 mt-1" size={18} />
                        <div>
                          <p className="text-sm text-gray-500">Station In-charge</p>
                          <p className="font-medium">{policeStationDetails.inCharge}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Recent Emergencies
                    </h3>
                    <button 
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      onClick={() => setActiveTab("emergencies")}
                    >
                      View All
                    </button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Location
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Time
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {emergencies.slice(0, 3).map((emergency) => (
                          <tr key={emergency.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center">
                                <span className="text-lg mr-2">
                                  {getEmergencyTypeIcon(emergency.type)}
                                </span>
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {emergency.id}
                                  </div>
                                  <div className="text-xs text-gray-500 capitalize">
                                    {emergency.type}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {emergency.location.details.street}
                              </div>
                              <div className="text-xs text-gray-500">
                                {emergency.location.details.city}
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {calculateTimeAgo(emergency.timestamp)}
                              </div>
                              <div className="text-xs text-gray-500">
                                {new Date(emergency.timestamp).toLocaleTimeString()}
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusBadgeColor(emergency.status)}`}>
                                {emergency.status.charAt(0).toUpperCase() + emergency.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                              <button className="text-blue-600 hover:text-blue-900 flex items-center justify-end w-full">
                                Details
                                <ChevronRight size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "emergencies" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 md:mb-0">
                    All Emergencies
                  </h3>
                  
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Search emergencies..." 
                        className="border rounded-lg pl-8 py-2 text-sm w-full"
                      />
                      <Search size={16} className="absolute left-2 top-2.5 text-gray-400" />
                    </div>
                    
                    <button className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-sm font-medium flex items-center">
                      <Filter size={16} className="mr-1" />
                      Filter
                    </button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Emergency ID
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Reporter
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Time
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {emergencies.map((emergency) => (
                        <tr key={emergency.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {emergency.id}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="text-lg mr-2">
                                {getEmergencyTypeIcon(emergency.type)}
                              </span>
                              <div className="text-sm capitalize">
                                {emergency.type}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {emergency.location.details.street}
                            </div>
                            <div className="text-xs text-gray-500">
                              {emergency.location.details.city}, {emergency.location.details.pincode}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {emergency.user}
                            </div>
                            <div className="text-xs text-gray-500">
                              {emergency.userPhone}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {calculateTimeAgo(emergency.timestamp)}
                            </div>
                            <div className="text-xs text-gray-500">
                              {formatTimestamp(emergency.timestamp)}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusBadgeColor(emergency.status)}`}>
                              {emergency.status.charAt(0).toUpperCase() + emergency.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                            <button 
                              className="text-blue-600 hover:text-blue-900 mr-3"
                              onClick={() => {
                                setCurrentSOS(emergency);
                                setShowSOSModal(true);
                              }}
                            >
                              View
                            </button>
                            <button className="text-gray-500 hover:text-gray-700">
                              <MoreVertical size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "officers" && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Officer Management
              </h3>
              <p className="text-gray-600">
                This section displays information about all officers, their duties, shifts, and current assignments.
              </p>
            </div>
          )}
          
          {activeTab === "reports" && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Reports & Analytics
              </h3>
              <p className="text-gray-600">
                This section contains crime reports, statistics, and analytics for the jurisdiction area.
              </p>
            </div>
          )}
        </main>
      </div>
    
      {showSOSModal && currentSOS && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 overflow-hidden">
            <div className="flex items-center justify-between bg-red-500 text-white px-6 py-4">
              <div className="flex items-center">
                <AlertTriangle className="mr-2" size={24} />
                <h3 className="text-xl font-bold">
                  Emergency SOS Alert
                </h3>
              </div>
              <button 
                className="text-white hover:text-red-100"
                onClick={() => setShowSOSModal(false)}
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-gray-500 text-sm mb-1">Emergency Type</h4>
                  <div className="flex items-center">
                    <span className="text-xl mr-2">
                      {getEmergencyTypeIcon(currentSOS.type)}
                    </span>
                    <p className="text-lg font-medium capitalize">{currentSOS.type}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-gray-500 text-sm mb-1">Services Requested</h4>
                  <div className="flex flex-wrap">
                    {currentSOS.services.map(service => (
                      <span 
                        key={service}
                        className="mr-2 mb-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm capitalize"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-gray-500 text-sm mb-1">Location</h4>
                  <p className="font-medium">{currentSOS.location.details.street}</p>
                  <p className="text-sm">
                    {currentSOS.location.details.city}, {currentSOS.location.details.state}, {currentSOS.location.details.pincode}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    GPS: {currentSOS.location.latitude.toFixed(6)}, {currentSOS.location.longitude.toFixed(6)}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-gray-500 text-sm mb-1">Reporter</h4>
                  <p className="font-medium">{currentSOS.user}</p>
                  <p className="text-sm">{currentSOS.userPhone}</p>
                                 
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-gray-500 text-sm mb-2">Additional Information</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-800">{currentSOS.additionalInfo}</p>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => handleSOSResponse(currentSOS.id, "reject")}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Reject Alert
                </button>
                <button
                  onClick={() => handleSOSResponse(currentSOS.id, "accept")}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <CheckCircle className="mr-2" size={18} />
                  Accept & Dispatch Units
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PoliceStationDashboard;