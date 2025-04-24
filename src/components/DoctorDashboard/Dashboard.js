


import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { useAuth } from '../../context/authContext';
import { 
  Calendar, 
  User, 
  Clock, 
  PieChart, 
  FileText, 
  Bell,
  CheckCircle, 
  XCircle, 
  MessageCircle,
  Settings,
  Plus,
  AlertCircle
} from 'lucide-react';

const DoctorDashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalAppointments: 0,
    pendingAppointments: 0,
    todayAppointments: 0,
    completedAppointments: 0,
    cancelledAppointments: 0,
    revenue: 0
  });
  const [bookings, setBookings] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [notes, setNotes] = useState([]);
  const [availabilitySlots, setAvailabilitySlots] = useState([]);
  const [isAddingSlot, setIsAddingSlot] = useState(false);
  const [newSlot, setNewSlot] = useState({
    day: 'Monday',
    startTime: '09:00',
    endTime: '17:00'
  });
  const [messages, setMessages] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [messageInput, setMessageInput] = useState('');

  

  const { auth } = useAuth();
  const navigate = useNavigate();

  const fetchDoctorData = useCallback(async () => {
    try {
      const doctorId = auth.user?.doctorId;
      if (!doctorId) throw new Error('Doctor ID not found');
      
      // Fetch bookings
      const bookingsResponse = await axios.get(`http://localhost:5000/api/v1/bookings/${doctorId}`);
      const allBookings = bookingsResponse.data;
      setBookings(allBookings);
      
      // Calculate today's date in local timezone
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // Filter for upcoming bookings (today and future, confirmed status)
      const upcoming = allBookings.filter(booking => {
        const bookingDate = new Date(booking.date);
        return bookingDate >= today && booking.status === 'confirmed';
      }).sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 5);
      
      setUpcomingBookings(upcoming);
      
      // Calculate stats
      const totalPatients = new Set(allBookings.map(booking => booking.patientId)).size;
      const pendingCount = allBookings.filter(booking => booking.status === 'pending').length;
      const todayCount = allBookings.filter(booking => {
        const bookingDate = new Date(booking.date);
        const todayDate = new Date();
        return bookingDate.getDate() === todayDate.getDate() && 
               bookingDate.getMonth() === todayDate.getMonth() && 
               bookingDate.getFullYear() === todayDate.getFullYear();
      }).length;
      const completedCount = allBookings.filter(booking => booking.status === 'completed').length;
      const cancelledCount = allBookings.filter(booking => booking.status === 'cancelled').length;
      
      // Get revenue - assuming price is stored in each booking
      const totalRevenue = allBookings
        .filter(booking => booking.status === 'completed')
        .reduce((sum, booking) => sum + (booking.price || 0), 0);
      
      // Set stats
      setStats({
        totalPatients,
        totalAppointments: allBookings.length,
        pendingAppointments: pendingCount,
        todayAppointments: todayCount,
        completedAppointments: completedCount,
        cancelledAppointments: cancelledCount,
        revenue: totalRevenue
      });
      
      // Mock notifications data
      const mockNotifications = [
        { id: 1, text: 'New appointment request from John Doe', time: '10 minutes ago', isRead: false },
        { id: 2, text: 'Appointment with Mary Smith has been confirmed', time: '1 hour ago', isRead: false },
        { id: 3, text: 'Patient feedback received from James Brown', time: '3 hours ago', isRead: true },
      ];
      setNotifications(mockNotifications);
      
      // Mock clinical notes
      const mockNotes = [
        { id: 1, patientName: 'John Doe', content: 'Patient reported headaches. Prescribed painkillers.', date: '2025-04-20' },
        { id: 2, patientName: 'Mary Smith', content: 'Follow-up visit. Symptoms improving.', date: '2025-04-22' }
      ];
      setNotes(mockNotes);
      
      // Mock availability slots
      const mockSlots = [
        { id: 1, day: 'Monday', startTime: '09:00', endTime: '17:00' },
        { id: 2, day: 'Tuesday', startTime: '09:00', endTime: '17:00' },
        { id: 3, day: 'Wednesday', startTime: '09:00', endTime: '17:00' },
        { id: 4, day: 'Thursday', startTime: '09:00', endTime: '13:00' },
        { id: 5, day: 'Friday', startTime: '09:00', endTime: '17:00' }
      ];
      setAvailabilitySlots(mockSlots);

      // Mock messages data
      const mockMessages = [
        { 
          patientId: '1',
          patientName: 'John Doe',
          messages: [
            { id: 1, sender: 'patient', content: 'Hello doctor, I have a question about my medication.', time: '2025-04-23 14:30:00' },
            { id: 2, sender: 'doctor', content: 'Hi John, what would you like to know?', time: '2025-04-23 14:35:00' }
          ]
        },
        { 
          patientId: '2',
          patientName: 'Mary Smith',
          messages: [
            { id: 1, sender: 'patient', content: 'Doctor, my symptoms have gotten worse.', time: '2025-04-23 10:15:00' },
            { id: 2, sender: 'doctor', content: 'hiiiiiiiiii', time: '2025-04-23 10:20:00' },
            { id: 3, sender: 'patient', content: 'I have more severe headaches and some dizziness now.', time: '2025-04-23 10:25:00' }
          ]
        }
      ];
      setMessages(mockMessages);
      
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [auth.user]);

  useEffect(() => {
    if (!auth.token) {
      navigate('/login');
      return;
    }
    fetchDoctorData();
  }, [auth.token, navigate, fetchDoctorData]);

  const handleStatusChange = async (bookingId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/v1/bookings/${bookingId}/status`, { status });
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId ? { ...booking, status } : booking
        )
      );
      // Refresh data after status change
      fetchDoctorData();
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  const addNote = () => {
    if (noteContent.trim()) {
      const newNote = {
        id: notes.length + 1,
        patientName: 'Current Patient',
        content: noteContent,
        date: new Date().toISOString().split('T')[0]
      };
      setNotes([newNote, ...notes]);
      setNoteContent('');
      setIsAddingNote(false);
    }
  };

  const addAvailabilitySlot = () => {
    if (newSlot.startTime && newSlot.endTime && newSlot.day) {
      const slot = {
        id: availabilitySlots.length + 1,
        ...newSlot
      };
      setAvailabilitySlots([...availabilitySlots, slot]);
      setIsAddingSlot(false);
      setNewSlot({
        day: 'Monday',
        startTime: '09:00',
        endTime: '17:00'
      });
    }
  };

  const removeAvailabilitySlot = (id) => {
    setAvailabilitySlots(availabilitySlots.filter(slot => slot.id !== id));
  };

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? {...notification, isRead: true} : notification
    ));
  };

  const sendMessage = () => {
    if (messageInput.trim() && selectedPatient) {
      const newMessage = {
        id: Date.now(),
        sender: 'doctor',
        content: messageInput,
        time: new Date().toISOString().replace('T', ' ').substring(0, 19)
      };
      
      setMessages(messages.map(thread => 
        thread.patientId === selectedPatient.patientId 
          ? {...thread, messages: [...thread.messages, newMessage]} 
          : thread
      ));
      
      setMessageInput('');
    }
  };

  if (loading) return (
    <Layout>
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    </Layout>
  );
  
  if (error) return (
    <Layout>
      <div className="bg-red-50 text-red-500 p-4 rounded-lg max-w-2xl mx-auto">
        <p className="text-center">Error: {error}</p>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="mx-auto p-4">
        <div className="flex flex-wrap items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Doctor Dashboard</h1>
          <div className="relative">
            <button
              className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              onClick={() => {
                const unreadCount = notifications.filter(
                  (n) => !n.isRead
                ).length;
                if (unreadCount > 0) {
                  setActiveTab("notifications");
                }
              }}
            >
              <Bell size={18} />
              <span>Notifications</span>
              {notifications.filter((n) => !n.isRead).length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {notifications.filter((n) => !n.isRead).length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center px-4 py-2 rounded-md ${
              activeTab === "dashboard"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <PieChart size={18} className="mr-2" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("appointments")}
            className={`flex items-center px-4 py-2 rounded-md ${
              activeTab === "appointments"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Calendar size={18} className="mr-2" />
            Appointments
          </button>
          <button
            onClick={() => setActiveTab("notes")}
            className={`flex items-center px-4 py-2 rounded-md ${
              activeTab === "notes"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <FileText size={18} className="mr-2" />
            Clinical Notes
          </button>
          <button
            onClick={() => setActiveTab("availability")}
            className={`flex items-center px-4 py-2 rounded-md ${
              activeTab === "availability"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Clock size={18} className="mr-2" />
            Manage Availability
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`flex items-center px-4 py-2 rounded-md ${
              activeTab === "messages"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <MessageCircle size={18} className="mr-2" />
            Messages
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={`flex items-center px-4 py-2 rounded-md ${
              activeTab === "notifications"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Bell size={18} className="mr-2" />
            Notifications
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center px-4 py-2 rounded-md ${
              activeTab === "settings"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Settings size={18} className="mr-2" />
            Settings
          </button>
        </div>
        


        {/* Dashboard Content */}
        {activeTab === "dashboard" && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-500 text-sm font-medium">
                    Total Patients
                  </h3>
                  <User className="text-blue-500" size={24} />
                </div>
                <p className="text-2xl font-bold">{stats.totalPatients}</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-500 text-sm font-medium">
                    Today's Appointments
                  </h3>
                  <Calendar className="text-green-500" size={24} />
                </div>
                <p className="text-2xl font-bold">{stats.todayAppointments}</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-500 text-sm font-medium">
                    Pending Appointments
                  </h3>
                  <Clock className="text-yellow-500" size={24} />
                </div>
                <p className="text-2xl font-bold">
                  {stats.pendingAppointments}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-500 text-sm font-medium">
                    Total Revenue
                  </h3>
                  <PieChart className="text-purple-500" size={24} />
                </div>
                <p className="text-2xl font-bold">${stats.revenue}</p>
              </div>
            </div>

            {/* Upcoming Appointments and Notifications */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Appointments Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Calendar size={20} className="mr-2 text-blue-500" />
                  Upcoming Appointments
                </h2>

                {upcomingBookings.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingBookings.map((booking) => (
                      <div
                        key={booking._id}
                        className="p-4 border rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">
                              {booking.patientName}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {new Date(booking.date).toLocaleDateString()} at{" "}
                              {new Date(booking.date).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() =>
                                handleStatusChange(booking._id, "completed")
                              }
                              className="p-1 text-green-500 hover:bg-green-100 rounded"
                              title="Mark as Completed"
                            >
                              <CheckCircle size={16} />
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(booking._id, "cancelled")
                              }
                              className="p-1 text-red-500 hover:bg-red-100 rounded"
                              title="Cancel Appointment"
                            >
                              <XCircle size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No upcoming appointments
                  </p>
                )}

                <div className="mt-4 text-center">
                  <button
                    onClick={() => setActiveTab("appointments")}
                    className="text-blue-500 hover:underline text-sm"
                  >
                    View all appointments
                  </button>
                </div>
              </div>

              {/* Recent Notifications Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Bell size={20} className="mr-2 text-blue-500" />
                  Recent Notifications
                </h2>

                <div className="space-y-4">
                  {notifications.slice(0, 3).map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border rounded-lg hover:bg-blue-50 transition-colors ${
                        !notification.isRead ? "border-blue-200 bg-blue-50" : ""
                      }`}
                      onClick={() => markNotificationAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        {!notification.isRead && (
                          <span className="mt-1 flex-shrink-0">
                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                          </span>
                        )}
                        <div className="flex-grow">
                          <p
                            className={`${
                              !notification.isRead ? "font-medium" : ""
                            }`}
                          >
                            {notification.text}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-center">
                  <button
                    onClick={() => setActiveTab("notifications")}
                    className="text-blue-500 hover:underline text-sm"
                  >
                    View all notifications
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Appointments Tab */}
        {activeTab === "appointments" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">Manage Appointments</h2>

            {/* Appointment Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg text-center">
                <p className="text-sm text-gray-500 mb-1">Total</p>
                <p className="text-xl font-bold">{stats.totalAppointments}</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg text-center">
                <p className="text-sm text-gray-500 mb-1">Pending</p>
                <p className="text-xl font-bold">{stats.pendingAppointments}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <p className="text-sm text-gray-500 mb-1">Completed</p>
                <p className="text-xl font-bold">
                  {stats.completedAppointments}
                </p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg text-center">
                <p className="text-sm text-gray-500 mb-1">Cancelled</p>
                <p className="text-xl font-bold">{stats.cancelledCount}</p>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                All
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                Today
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                Pending
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                Confirmed
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                Completed
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                Cancelled
              </button>
            </div>

            {/* Appointments List */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-3 px-4 text-left">Patient</th>
                    <th className="py-3 px-4 text-left">Date & Time</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {bookings.length > 0 ? (
                    bookings.map((booking) => (
                      <tr key={booking._id} className="hover:bg-gray-50">
                        <td className="py-3 px-4">{booking.patientName}</td>
                        <td className="py-3 px-4">
                          {new Date(booking.date).toLocaleDateString()} at{" "}
                          {new Date(booking.date).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              booking.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : booking.status === "confirmed"
                                ? "bg-blue-100 text-blue-800"
                                : booking.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {booking.status.charAt(0).toUpperCase() +
                              booking.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            {booking.status === "pending" && (
                              <>
                                <button
                                  onClick={() =>
                                    handleStatusChange(booking._id, "confirmed")
                                  }
                                  className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200"
                                  title="Confirm"
                                >
                                  <CheckCircle size={16} />
                                </button>
                                <button
                                  onClick={() =>
                                    handleStatusChange(booking._id, "cancelled")
                                  }
                                  className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                                  title="Cancel"
                                >
                                  <XCircle size={16} />
                                </button>
                              </>
                            )}
                            {booking.status === "confirmed" && (
                              <button
                                onClick={() =>
                                  handleStatusChange(booking._id, "completed")
                                }
                                className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200"
                                title="Mark as Completed"
                              >
                                <CheckCircle size={16} />
                              </button>
                            )}
                            <button
                              className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                              title="View Details"
                            >
                              <FileText size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="py-4 text-center text-gray-500"
                      >
                        No appointments found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Clinical Notes Tab */}
        {activeTab === "notes" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Clinical Notes</h2>
              <button
                onClick={() => setIsAddingNote(true)}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                <Plus size={18} className="mr-1" />
                Add Note
              </button>
            </div>

            {isAddingNote && (
              <div className="mb-6 p-4 border rounded-lg">
                <textarea
                  className="w-full border rounded-md p-3 mb-3"
                  rows="4"
                  placeholder="Enter clinical note..."
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                ></textarea>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setIsAddingNote(false)}
                    className="px-4 py-2 border rounded-md hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addNote}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Save Note
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {notes.length > 0 ? (
                notes.map((note) => (
                  <div
                    key={note.id}
                    className="p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex justify-between">
                      <h3 className="font-medium text-lg">
                        {note.patientName}
                      </h3>
                      <span className="text-sm text-gray-500">{note.date}</span>
                    </div>
                    <p className="mt-2 text-gray-700">{note.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">
                  No clinical notes found
                </p>
              )}
            </div>
          </div>
        )}

        {/* Availability Tab */}
        {activeTab === "availability" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Manage Availability</h2>
              <button
                onClick={() => setIsAddingSlot(true)}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                <Plus size={18} className="mr-1" />
                Add Slot
              </button>
            </div>

            {isAddingSlot && (
              <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Day
                    </label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={newSlot.day}
                      onChange={(e) =>
                        setNewSlot({ ...newSlot, day: e.target.value })
                      }
                    >
                      {[
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday",
                      ].map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Time
                    </label>
                    <input
                      type="time"
                      className="w-full p-2 border rounded-md"
                      value={newSlot.startTime}
                      onChange={(e) =>
                        setNewSlot({ ...newSlot, startTime: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Time
                    </label>
                    <input
                      type="time"
                      className="w-full p-2 border rounded-md"
                      value={newSlot.endTime}
                      onChange={(e) =>
                        setNewSlot({ ...newSlot, endTime: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setIsAddingSlot(false)}
                    className="px-4 py-2 border rounded-md hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addAvailabilitySlot}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Save Slot
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {availabilitySlots.length > 0 ? (
                availabilitySlots.map((slot) => (
                  <div
                    key={slot.id}
                    className="flex items-center justify-between p-4 border rounded-lg bg-white hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="font-medium w-24">{slot.day}</span>
                      <Clock size={16} className="text-gray-400" />
                      <span>
                        {slot.startTime} - {slot.endTime}
                      </span>
                    </div>
                    <button
                      onClick={() => removeAvailabilitySlot(slot.id)}
                      className="p-1 text-red-500 hover:bg-red-100 rounded-full"
                    >
                      <XCircle size={18} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <AlertCircle className="mx-auto mb-2" />
                  No availability slots configured
                </div>
              )}
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Messages</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {messages.map((thread) => (
                <div
                  key={thread.patientId}
                  className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedPatient(thread)}
                >
                  <h3 className="font-medium">{thread.patientName}</h3>
                  <p className="text-sm text-gray-500">
                    {thread.messages[thread.messages.length - 1].content}
                  </p>
                </div>
              ))}
            </div>

            {selectedPatient && (
              <div className="border-t pt-4">
                <h3 className="text-lg font-bold mb-4">
                  {selectedPatient.patientName}
                </h3>
                <div className="max-h-60 overflow-y-auto mb-4">
                  {selectedPatient.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`mb-2 ${
                        msg.sender === "doctor" ? "text-right" : ""
                      }`}
                    >
                      <p
                        className={`inline-block px-4 py-2 rounded-lg ${
                          msg.sender === "doctor"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {msg.content}
                      </p>
                      <span className="block text-xs text-gray-500 mt-1">
                        {new Date(msg.time).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-grow p-2 border rounded-md"
                  />
                  <button
                    onClick={sendMessage}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Notifications</h2>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border rounded-lg mb-4 ${
                    !notification.isRead ? "bg-blue-50" : ""
                  }`}
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  <p className={`${!notification.isRead ? "font-medium" : ""}`}>
                    {notification.text}
                  </p>
                  <span className="text-sm text-gray-500">
                    {notification.time}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">No notifications</p>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Settings</h2>
            <p className="text-gray-500">Settings content goes here...</p>
          </div>
        )}

        {/* Chat Tab */}
        {activeTab === "chat" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Chat</h2>
            <p className="text-gray-500">Chat content goes here...</p>
          </div>
        )}

        {/* Doctror Profile where a doctor can see everything about youse */}
        {activeTab === "doctorProfile" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Doctor Profile</h2>
            <p className="text-gray-500">Doctor profile content goes here...</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DoctorDashboard;