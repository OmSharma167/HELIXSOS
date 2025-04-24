import React, { useState, useEffect } from "react";
import {
  Bell,
  AlertTriangle,
  Clock,
  MapPin,
  PhoneCall,
  Users,
  X,
  User,
  Activity,
  Truck,
  Heart,
  Calendar,
  FileText,
  Clipboard,
  Filter,
  Search,
  ChevronRight,
  CheckCircle,
  XCircle,
  Info,
  MoreVertical,
  UserCheck,
  AlignLeft,
  Thermometer,
  RefreshCw,
  Coffee,
  ShieldAlert
} from "lucide-react";

const AmbulanceDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [notifications, setNotifications] = useState([]);
  const [pendingSOSCount, setPendingSOSCount] = useState(0);
  const [showSOSModal, setShowSOSModal] = useState(false);
  const [currentSOS, setCurrentSOS] = useState(null);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showDispatchModal, setShowDispatchModal] = useState(false);

  // Ambulance hospital details
  const [hospitalDetails, setHospitalDetails] = useState({
    name: "City General Hospital",
    address: "456 Healthcare Avenue, Medical District",
    city: "New Delhi",
    state: "Delhi",
    phone: "102",
    email: "dispatch@citygeneralhospital.org",
    director: "Dr. Priya Sharma",
    bedCapacity: 350,
    icuBeds: 45,
    emergencyRooms: 12,
  });

  // Ambulance fleet data
  const [ambulanceFleet, setAmbulanceFleet] = useState([
    {
      id: "AMB-001",
      type: "Advanced Life Support",
      status: "available",
      location: {
        latitude: 28.6139,
        longitude: 77.209,
        area: "Connaught Place",
      },
      staff: ["Dr. Amit Kumar", "Nurse Rahul Singh", "Driver Vijay"],
      lastUpdate: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    },
    {
      id: "AMB-002",
      type: "Basic Life Support",
      status: "on-call",
      location: {
        latitude: 28.6271,
        longitude: 77.2219,
        area: "Karol Bagh",
      },
      staff: ["Nurse Arjun Reddy", "Driver Sunil"],
      lastUpdate: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    },
    {
      id: "AMB-003",
      type: "Advanced Life Support",
      status: "on-call",
      location: {
        latitude: 28.6129,
        longitude: 77.2295,
        area: "India Gate",
      },
      staff: ["Dr. Meera Patel", "Nurse Deepak", "Driver Rajan"],
      lastUpdate: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    },
    {
      id: "AMB-004",
      type: "Emergency Response",
      status: "available",
      location: {
        latitude: 28.5355,
        longitude: 77.241,
        area: "Saket",
      },
      staff: ["Dr. Sanjay Gupta", "Nurse Anjali", "Driver Mohammed"],
      lastUpdate: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    },
  ]);

  // Emergency data
  const [emergencies, setEmergencies] = useState([
    {
      id: "SOS-001",
      type: "medical",
      services: ["ambulance"],
      priority: "high",
      location: {
        latitude: 28.6139,
        longitude: 77.209,
        details: {
          street: "Connaught Place",
          city: "New Delhi",
          state: "Delhi",
          pincode: "110001",
        },
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      status: "dispatched",
      additionalInfo: "Patient experiencing severe chest pain",
      vitalInfo: {
        condition: "Cardiac emergency",
        consciousness: "Conscious",
        breathing: "Labored",
      },
      user: "Amit Shah",
      userPhone: "9876543210",
      assignedTo: "AMB-002",
    },
    {
      id: "SOS-002",
      type: "accident",
      services: ["ambulance", "police", "fire"],
      priority: "critical",
      location: {
        latitude: 28.6129,
        longitude: 77.2295,
        details: {
          street: "India Gate Circle",
          city: "New Delhi",
          state: "Delhi",
          pincode: "110001",
        },
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
      status: "dispatched",
      additionalInfo: "Multi-vehicle accident, several injured",
      vitalInfo: {
        condition: "Trauma, possible head injuries",
        consciousness: "Varies by victim",
        breathing: "Stable for most victims",
      },
      user: "Priya Verma",
      userPhone: "9876543211",
      assignedTo: "AMB-003",
    },
  ]);

  // Simulate receiving an SOS notification
  useEffect(() => {
    // Simulating an incoming SOS alert after 5 seconds
    const timer = setTimeout(() => {
      const newSOS = {
        id: `SOS-00${emergencies.length + 1}`,
        type: "medical",
        services: ["ambulance"],
        priority: "medium",
        location: {
          latitude: 28.5633,
          longitude: 77.2433,
          details: {
            street: "Green Park Market",
            city: "New Delhi",
            state: "Delhi",
            pincode: "110016",
          },
        },
        timestamp: new Date().toISOString(),
        status: "new",
        additionalInfo: "Elderly person fallen, possible fracture",
        vitalInfo: {
          condition: "Possible hip fracture",
          consciousness: "Conscious",
          breathing: "Normal",
        },
        user: "Sanjay Kumar",
        userPhone: "9876543213",
      };

      // Add to emergencies
      setEmergencies((prev) => [newSOS, ...prev]);

      // Show notification
      setNotifications((prev) => [
        {
          id: Date.now(),
          message: "New medical emergency alert received!",
          type: "sos",
          data: newSOS,
          read: false,
        },
        ...prev,
      ]);

      // Increment pending SOS count
      setPendingSOSCount((prev) => prev + 1);

      // Show SOS modal
      setCurrentSOS(newSOS);
      setShowSOSModal(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Update pending SOS count whenever emergencies change
  useEffect(() => {
    const pending = emergencies.filter((e) => e.status === "new").length;
    setPendingSOSCount(pending);
  }, [emergencies]);

  const handleSOSResponse = (sosId, action) => {
    if (action === "accept") {
      // Show dispatch modal to select ambulance
      setShowDispatchModal(true);
    } else {
      // Reject the emergency
      setEmergencies((prev) =>
        prev.map((emergency) =>
          emergency.id === sosId
            ? { ...emergency, status: "rejected" }
            : emergency
        )
      );

      // Close the modal
      setShowSOSModal(false);

      // Add a notification
      setNotifications((prev) => [
        {
          id: Date.now(),
          message: `Emergency ${sosId} rejected - no resources available`,
          type: "warning",
          read: false,
        },
        ...prev,
      ]);
    }
  };

  const handleDispatchAmbulance = (ambulanceId) => {
    if (currentSOS) {
      // Update emergency with assigned ambulance
      setEmergencies((prev) =>
        prev.map((emergency) =>
          emergency.id === currentSOS.id
            ? { ...emergency, status: "dispatched", assignedTo: ambulanceId }
            : emergency
        )
      );

      // Update ambulance status
      setAmbulanceFleet((prev) =>
        prev.map((ambulance) =>
          ambulance.id === ambulanceId
            ? { ...ambulance, status: "on-call" }
            : ambulance
        )
      );

      // Close modals
      setShowDispatchModal(false);
      setShowSOSModal(false);

      // Show success notification
      setShowSuccessNotification(true);
      setTimeout(() => setShowSuccessNotification(false), 3000);

      // Add a notification
      setNotifications((prev) => [
        {
          id: Date.now(),
          message: `Ambulance ${ambulanceId} dispatched to ${currentSOS.id}`,
          type: "success",
          read: false,
        },
        ...prev,
      ]);
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "new":
        return "bg-red-100 text-red-800 border-red-300";
      case "dispatched":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "completed":
        return "bg-green-100 text-green-800 border-green-300";
      case "rejected":
        return "bg-gray-100 text-gray-800 border-gray-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getAmbulanceStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border-green-300";
      case "on-call":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "out-of-service":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-500";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-500";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-500";
      case "low":
        return "bg-green-100 text-green-800 border-green-500";
      default:
        return "bg-blue-100 text-blue-800 border-blue-500";
    }
  };

  const getEmergencyTypeIcon = (type) => {
    switch (type) {
      case "medical":
        return "🏥";
      case "accident":
        return "🚗";
      case "fire":
        return "🔥";
      case "cardiac":
        return "❤️";
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
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;

    const days = Math.floor(hours / 24);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  };

  const getAvailableAmbulances = () => {
    return ambulanceFleet.filter(
      (ambulance) => ambulance.status === "available"
    );
  };

  return (
    <div className="flex mt-16 h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-red-800 text-white p-6">
        <div className="flex items-center mb-10">
          <Heart className="mr-2" size={30} />
          <h1 className="text-xl font-bold">Ambulance Dashboard</h1>
        </div>

        <nav>
          <ul className="space-y-2">
            <li>
              <button
                className={`flex items-center w-full p-3 rounded-lg transition ${
                  activeTab === "overview"
                    ? "bg-red-700"
                    : "hover:bg-red-700/50"
                }`}
                onClick={() => setActiveTab("overview")}
              >
                <Activity className="mr-3" size={18} />
                <span>Dashboard Overview</span>
              </button>
            </li>
            <li>
              <button
                className={`flex items-center w-full p-3 rounded-lg transition ${
                  activeTab === "emergencies"
                    ? "bg-red-700"
                    : "hover:bg-red-700/50"
                }`}
                onClick={() => setActiveTab("emergencies")}
              >
                <AlertTriangle className="mr-3" size={18} />
                <span>Emergency Calls</span>
                {pendingSOSCount > 0 && (
                  <span className="ml-auto bg-white text-red-600 text-xs font-bold px-2 py-1 rounded-full">
                    {pendingSOSCount}
                  </span>
                )}
              </button>
            </li>
            <li>
              <button
                className={`flex items-center w-full p-3 rounded-lg transition ${
                  activeTab === "fleet" ? "bg-red-700" : "hover:bg-red-700/50"
                }`}
                onClick={() => setActiveTab("fleet")}
              >
                <Truck className="mr-3" size={18} />
                <span>Ambulance Fleet</span>
              </button>
            </li>
            <li>
              <button
                className={`flex items-center w-full p-3 rounded-lg transition ${
                  activeTab === "staff" ? "bg-red-700" : "hover:bg-red-700/50"
                }`}
                onClick={() => setActiveTab("staff")}
              >
                <Users className="mr-3" size={18} />
                <span>Medical Staff</span>
              </button>
            </li>
            <li>
              <button
                className={`flex items-center w-full p-3 rounded-lg transition ${
                  activeTab === "patients"
                    ? "bg-red-700"
                    : "hover:bg-red-700/50"
                }`}
                onClick={() => setActiveTab("patients")}
              >
                <UserCheck className="mr-3" size={18} />
                <span>Patient Records</span>
              </button>
            </li>
            <li>
              <button
                className={`flex items-center w-full p-3 rounded-lg transition ${
                  activeTab === "reports" ? "bg-red-700" : "hover:bg-red-700/50"
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
          <div className="border-t border-red-700 pt-4 mt-8">
            <div className="flex items-center">
              <div className="bg-red-600 p-2 rounded-full">
                <User size={18} />
              </div>
              <div className="ml-3">
                <p className="font-medium">Dispatch Officer</p>
                <p className="text-xs text-red-300">Emergency Control</p>
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
              {hospitalDetails.name} - Ambulance Services
            </h2>

            <div className="flex items-center">
              <div className="relative mr-6">
                <Bell
                  className="text-gray-500 cursor-pointer hover:text-red-500"
                  size={22}
                />
                {notifications.filter((n) => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {notifications.filter((n) => !n.read).length}
                  </span>
                )}
              </div>

              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center text-white font-semibold">
                  DO
                </div>
                <span className="ml-2 text-sm font-medium">
                  Dispatch Officer
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto bg-gray-100 p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Key Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-gray-500 text-sm font-medium">
                      Active Emergencies
                    </h3>
                    <AlertTriangle className="text-red-500" size={20} />
                  </div>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    {
                      emergencies.filter((e) =>
                        ["new", "dispatched", "in-progress"].includes(e.status)
                      ).length
                    }
                  </p>
                  <div className="text-xs text-gray-500 mt-2 flex items-center">
                    <Clock size={14} className="mr-1" />
                    Last updated just now
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-gray-500 text-sm font-medium">
                      Available Ambulances
                    </h3>
                    <Truck className="text-green-500" size={20} />
                  </div>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    {
                      ambulanceFleet.filter((a) => a.status === "available")
                        .length
                    }
                  </p>
                  <div className="text-xs text-gray-500 mt-2">
                    <span className="text-green-500 font-medium">
                      Ready for dispatch
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-gray-500 text-sm font-medium">
                      On-Call Units
                    </h3>
                    <PhoneCall className="text-blue-500" size={20} />
                  </div>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    {
                      ambulanceFleet.filter((a) => a.status === "on-call")
                        .length
                    }
                  </p>
                  <div className="text-xs text-gray-500 mt-2">
                    <span className="text-blue-500 font-medium">
                      Currently responding
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-gray-500 text-sm font-medium">
                      Available ICU Beds
                    </h3>
                    <Heart className="text-red-500" size={20} />
                  </div>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    {hospitalDetails.icuBeds - 12}
                  </p>
                  <div className="text-xs text-gray-500 mt-2">
                    <span className="text-orange-500 font-medium">
                      73% Occupancy
                    </span>
                  </div>
                </div>
              </div>

              {/* Hospital Info */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Hospital Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-start mb-4">
                        <MapPin className="text-gray-400 mr-3 mt-1" size={18} />
                        <div>
                          <p className="text-sm text-gray-500">Address</p>
                          <p className="font-medium">
                            {hospitalDetails.address}
                          </p>
                          <p className="text-sm">
                            {hospitalDetails.city}, {hospitalDetails.state}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start mb-4">
                        <PhoneCall
                          className="text-gray-400 mr-3 mt-1"
                          size={18}
                        />
                        <div>
                          <p className="text-sm text-gray-500">Contact</p>
                          <p className="font-medium">
                            {hospitalDetails.phone} (Emergency)
                          </p>
                          <p className="text-sm">{hospitalDetails.email}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-start mb-4">
                        <User className="text-gray-400 mr-3 mt-1" size={18} />
                        <div>
                          <p className="text-sm text-gray-500">
                            Medical Director
                          </p>
                          <p className="font-medium">
                            {hospitalDetails.director}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start mb-4">
                        <Activity
                          className="text-gray-400 mr-3 mt-1"
                          size={18}
                        />
                        <div>
                          <p className="text-sm text-gray-500">Capacity</p>
                          <p className="font-medium">
                            {hospitalDetails.bedCapacity} Beds
                          </p>
                          <p className="text-sm">
                            {hospitalDetails.emergencyRooms} Emergency Rooms
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Latest Emergencies */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Latest Emergencies
                    </h3>
                    <button
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
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
                            Priority
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Time
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Assigned To
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
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${getPriorityBadgeColor(
                                  emergency.priority
                                )}`}
                              >
                                {emergency.priority.charAt(0).toUpperCase() +
                                  emergency.priority.slice(1)}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {calculateTimeAgo(emergency.timestamp)}
                              </div>
                              <div className="text-xs text-gray-500">
                                {new Date(
                                  emergency.timestamp
                                ).toLocaleTimeString()}
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusBadgeColor(
                                  emergency.status
                                )}`}
                              >
                                {emergency.status.charAt(0).toUpperCase() +
                                  emergency.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                              {emergency.assignedTo ? (
                                <span className="text-blue-600">
                                  {emergency.assignedTo}
                                </span>
                              ) : (
                                <span className="text-gray-500">
                                  Unassigned
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Ambulance Fleet Overview */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Fleet Status
                    </h3>
                    <button
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                      onClick={() => setActiveTab("fleet")}
                    >
                      View All
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {ambulanceFleet.map((ambulance) => (
                      <div
                        key={ambulance.id}
                        className="border rounded-lg p-4 hover:shadow-md transition"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{ambulance.id}</span>
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full border ${getAmbulanceStatusColor(
                              ambulance.status
                            )}`}
                          >
                            {ambulance.status.charAt(0).toUpperCase() +
                              ambulance.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {ambulance.type}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          <MapPin size={14} className="inline mr-1" />
                          {ambulance.location.area}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          <Clock size={12} className="inline mr-1" />
                          Updated {calculateTimeAgo(ambulance.lastUpdate)}
                        </p>
                        <div className="mt-2">
                          <p className="text-xs font-medium text-gray-700">
                            Medical Team:
                          </p>
                          <ul className="text-xs text-gray-600">
                            {ambulance.staff
                              .slice(0, 2)
                              .map((member, index) => (
                                <li key={index} className="truncate">
                                  {member}
                                </li>
                              ))}
                            {ambulance.staff.length > 2 && (
                              <li className="text-blue-600 cursor-pointer hover:underline">
                                + {ambulance.staff.length - 2} more
                              </li>
                            )}
                          </ul>
                        </div>
                        <button className="mt-3 w-full text-xs bg-red-100 text-red-700 py-1 rounded-md hover:bg-red-200 transition">
                          View Details
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "emergencies" && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 md:mb-0">
                  All Emergency Calls
                </h3>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search emergencies..."
                      className="border rounded-lg pl-8 py-2 text-sm w-full"
                    />
                    <Search
                      size={16}
                      className="absolute left-2 top-2.5 text-gray-400"
                    />
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
                        Priority
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
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
                            <span className="text-sm capitalize">
                              {emergency.type}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${getPriorityBadgeColor(
                              emergency.priority
                            )}`}
                          >
                            {emergency.priority.toUpperCase()}
                          </span>
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
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusBadgeColor(
                              emergency.status
                            )}`}
                          >
                            {emergency.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            className="text-red-600 hover:text-red-900 mr-3"
                            onClick={() => {
                              setCurrentSOS(emergency);
                              setShowSOSModal(true);
                            }}
                          >
                            Details
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
          )}

          {activeTab === "fleet" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Ambulance Fleet Management
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ambulanceFleet.map((ambulance) => (
                  <div
                    key={ambulance.id}
                    className="border rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">
                          {ambulance.id}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {ambulance.type}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full border ${getAmbulanceStatusColor(
                          ambulance.status
                        )}`}
                      >
                        {ambulance.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin size={14} className="mr-2" />
                        {ambulance.location.area}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock size={14} className="mr-2" />
                        Last updated: {calculateTimeAgo(ambulance.lastUpdate)}
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Medical Team:</span>
                        <ul className="list-disc list-inside mt-1">
                          {ambulance.staff.map((member, index) => (
                            <li key={index} className="truncate">
                              {member}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button className="flex-1 bg-blue-100 text-blue-800 py-2 rounded-md text-sm hover:bg-blue-200">
                        Track Location
                      </button>
                      <button className="flex-1 bg-gray-100 text-gray-800 py-2 rounded-md text-sm hover:bg-gray-200">
                        Maintenance
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SOS Modal */}
          {showSOSModal && currentSOS && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 overflow-hidden">
                <div className="flex items-center justify-between bg-red-500 text-white px-6 py-4">
                  <div className="flex items-center">
                    <AlertTriangle className="mr-2" size={24} />
                    <h3 className="text-xl font-bold">
                      Emergency Alert - {currentSOS.id}
                    </h3>
                  </div>
                  <button
                    className="text-white hover:text-red-100"
                    onClick={() => setShowSOSModal(false)}
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm text-gray-500 mb-1">
                        Emergency Type
                      </h4>
                      <p className="font-medium flex items-center">
                        {getEmergencyTypeIcon(currentSOS.type)}
                        <span className="ml-2 capitalize">
                          {currentSOS.type}
                        </span>
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-500 mb-1">
                        Priority Level
                      </h4>
                      <span
                        className={`px-2 py-1 text-sm rounded-full ${getPriorityBadgeColor(
                          currentSOS.priority
                        )}`}
                      >
                        {currentSOS.priority.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-500 mb-1">
                        Reporter Information
                      </h4>
                      <p className="font-medium">{currentSOS.user}</p>
                      <p className="text-sm text-gray-600">
                        {currentSOS.userPhone}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-500 mb-1">
                        Vital Signs
                      </h4>
                      <p className="text-sm">
                        {currentSOS.vitalInfo.consciousness},{" "}
                        {currentSOS.vitalInfo.breathing}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm text-gray-500 mb-2">
                      Location Details
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium">
                        {currentSOS.location.details.street}
                      </p>
                      <p className="text-sm">
                        {currentSOS.location.details.city},{" "}
                        {currentSOS.location.details.state} -
                        {currentSOS.location.details.pincode}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        GPS: {currentSOS.location.latitude.toFixed(6)},
                        {currentSOS.location.longitude.toFixed(6)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm text-gray-500 mb-2">
                      Additional Information
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-800">
                        {currentSOS.additionalInfo}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => handleSOSResponse(currentSOS.id, "reject")}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      Reject Alert
                    </button>
                    <button
                      onClick={() => handleSOSResponse(currentSOS.id, "accept")}
                      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center"
                    >
                      <CheckCircle className="mr-2" size={18} />
                      Accept Emergency
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dispatch Modal */}
          {showDispatchModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-xl mx-4 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Dispatch Ambulance</h3>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => setShowDispatchModal(false)}
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-600">
                    Select an available ambulance to dispatch to emergency{" "}
                    {currentSOS?.id}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getAvailableAmbulances().map((ambulance) => (
                      <div
                        key={ambulance.id}
                        className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleDispatchAmbulance(ambulance.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">{ambulance.id}</h4>
                            <p className="text-sm text-gray-600">
                              {ambulance.type}
                            </p>
                          </div>
                          <span className="text-green-600 text-sm">
                            Available
                          </span>
                        </div>
                        <p className="text-sm mt-2 text-gray-600">
                          <MapPin size={14} className="inline mr-1" />
                          {ambulance.location.area}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Updated {calculateTimeAgo(ambulance.lastUpdate)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {getAvailableAmbulances().length === 0 && (
                    <div className="text-center py-6 text-gray-500">
                      <ShieldAlert className="mx-auto mb-2" size={32} />
                      <p>No available ambulances. Please try again later.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Success Notification */}
          {showSuccessNotification && (
            <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center animate-slide-up">
              <CheckCircle className="mr-2" size={20} />
              Ambulance dispatched successfully!
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AmbulanceDashboard;