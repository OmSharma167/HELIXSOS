import React, { useState } from 'react';
import { Bell, MapPin, User,  Settings, LogOut, BarChart, Menu, X ,Shield, 
  Users, 
  AlertCircle, 
  Calendar, 
  FileText,
  Clock,
  Car,
  UserCheck,
  Phone} from 'lucide-react';

const EmergencyDashboard = () => {
  const [activeEmergencies, setActiveEmergencies] = useState([
    {
      id: 1,
      type: 'Car Accident',
      location: '123 Main St',
      timestamp: '10:30 AM',
      status: 'Active',
      distance: '0.5 miles',
      severity: 'High'
    },
    {
      id: 2,
      type: 'Medical Emergency',
      location: '456 Oak Ave',
      timestamp: '10:45 AM',
      status: 'Pending',
      distance: '1.2 miles',
      severity: 'Medium'
    }
  ]);

  const [profile] = useState({
    name: 'Pari Chouck',
    PinCode: '201310',
    department: 'Police Station',
    status: 'On Duty',
    responseTime: '4 min avg'
  });


  const activeStats = {
    officersOnDuty: 45,
    patrolVehicles: 12,
    activeInvestigations: 28,
    pendingCases: 15,
    emergencyCalls: 8
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen   bg-gray-100">
      {/* Navigation Bar */}
      <nav className="fixed  left-0 right-0 bg-blue-600 text-white z-50 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8" />
              <span className="text-xl font-bold hidden md:block">Police Emergency Response System</span>
              <span className="text-xl font-bold md:hidden">ERS</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Bell className="w-6 h-6 cursor-pointer hover:text-blue-200 transition-colors" />
              <Settings className="w-6 h-6 cursor-pointer hover:text-blue-200 transition-colors" />
              <LogOut className="w-6 h-6 cursor-pointer hover:text-blue-200 transition-colors" />
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-4">
                <button className="flex items-center space-x-2 text-white hover:bg-blue-700 px-4 py-2 rounded">
                  <Bell className="w-5 h-5" />
                  <span>Notifications</span>
                </button>
                <button className="flex items-center space-x-2 text-white hover:bg-blue-700 px-4 py-2 rounded">
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </button>
                <button className="flex items-center space-x-2 text-white hover:bg-blue-700 px-4 py-2 rounded">
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-20 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-blue-100 p-3 rounded-full">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{profile.name}</h2>
                  <p className="text-gray-600">PinCode #{profile.PinCode}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="border-t pt-4">
                  <p className="text-gray-600 text-sm">Department</p>
                  <p className="font-medium">{profile.department}</p>
                </div>
                <div className="border-t pt-4">
                  <p className="text-gray-600 text-sm">Status</p>
                  <div className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                    <p className="font-medium text-green-600">{profile.status}</p>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <p className="text-gray-600 text-sm">Average Response Time</p>
                  <p className="font-medium">{profile.responseTime}</p>
                </div>
              </div>
            </div>

            {/* Quick Stats - Mobile Only */}
            <div className="grid grid-cols-2 gap-4 mt-6 lg:hidden">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <p className="text-sm text-gray-600">Active Cases</p>
                <p className="text-2xl font-bold text-blue-600">12</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <p className="text-sm text-gray-600">Response Rate</p>
                <p className="text-2xl font-bold text-green-600">96%</p>
              </div>
            </div>
          </div>

          {/* Emergency Alerts Section */}
          <div className="lg:col-span-2">
            {/* Alert Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                  <span className="text-sm font-medium text-gray-600">Active</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">8</h3>
                <p className="text-sm text-gray-600">Emergency Alerts</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  <span className="text-sm font-medium text-gray-600">In Range</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">3</h3>
                <p className="text-sm text-gray-600">Nearby Incidents</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <BarChart className="w-6 h-6 text-green-600" />
                  <span className="text-sm font-medium text-gray-600">Today</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">15</h3>
                <p className="text-sm text-gray-600">Total Responses</p>
              </div>
            </div>

            {/* Active Emergencies */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Active Emergencies</h2>
              {activeEmergencies.map((emergency) => (
                <div key={emergency.id} 
                     className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 border-l-4 border-red-500">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold">{emergency.type}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          emergency.severity === 'High' ? 'bg-red-100 text-red-600' :
                          emergency.severity === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          {emergency.severity}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600 mt-2">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="text-sm">{emergency.location}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Reported at {emergency.timestamp}</p>
                    </div>
                    <div className="flex flex-col md:items-end gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        emergency.status === 'Active' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {emergency.status}
                      </span>
                      <p className="text-sm text-gray-600">{emergency.distance}</p>
                      <button className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 
                                     transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Respond
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Current Status Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 p-14 gap-4 mb-6">
               <div className="bg-blue-50 p-4 rounded-lg shadow-md">
                  <div className="text-center">
                   <UserCheck className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <p className="text-2xl font-bold text-blue-900">{activeStats.officersOnDuty}</p>
                   <p className="text-sm text-blue-700">Officers on Duty</p>
                   </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg shadow-md">
                   <div className="text-center">
                    <Car className="h-8 w-8 mx-auto text-green-600 mb-2" />
                    <p className="text-2xl font-bold text-green-900">{activeStats.patrolVehicles}</p>
                    <p className="text-sm text-green-700">Patrol Vehicles</p>
                    </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg shadow-md">
                    <div className="text-center">
                    <FileText className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                    <p className="text-2xl font-bold text-purple-900">{activeStats.activeInvestigations}</p>
                    <p className="text-sm text-purple-700">Active Cases</p>
                     </div>
                </div>

  <div className="bg-orange-50 p-4 rounded-lg shadow-md">
    <div className="text-center">
      <Clock className="h-8 w-8 mx-auto text-orange-600 mb-2" />
      <p className="text-2xl font-bold text-orange-900">{activeStats.pendingCases}</p>
      <p className="text-sm text-orange-700">Pending Cases</p>
    </div>
  </div>

  <div className="bg-red-50 p-4 rounded-lg shadow-md">
    <div className="text-center">
      <Phone className="h-8 w-8 mx-auto text-red-600 mb-2" />
      <p className="text-2xl font-bold text-red-900">{activeStats.emergencyCalls}</p>
      <p className="text-sm text-red-700">Emergency Calls</p>
    </div>
  </div>
</div>



          
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyDashboard;