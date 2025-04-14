import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

const UserDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // State for filtering appointments

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      console.error('No token found');
      navigate('/login');
      return;
    }

    const fetchUserAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/bookings/user/${token}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(response.data);
      } catch (error) {
        setError(error.response ? error.response.data.message : 'Failed to fetch appointments');
      } finally {
        setLoading(false);
      }
    };

    fetchUserAppointments();
  }, [token, navigate]);

  // Function to filter appointments based on status
  const filteredAppointments = appointments.filter((appointment) => 
    filter === 'all' || appointment.status === filter
  );

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">My  Appointments</h1>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-md ${filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('confirmed')}
            className={`px-4 py-2 rounded-md ${filter === 'confirmed' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Accepted
          </button>
          <button
            onClick={() => setFilter('cancelled')}
            className={`px-4 py-2 rounded-md ${filter === 'cancelled' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Rejected
          </button>
        </div>

        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <div key={appointment._id} className="mb-6 border-b pb-4">
              <p className="mb-2"><strong>Doctor:</strong> {appointment.doctorId.name}</p>
              <p className="mb-2"><strong>Patient Name:</strong> {appointment.patientName}</p>
              <p className="mb-2"><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
              <p className="mb-2"><strong>Time:</strong> {appointment.time}</p>
              <p className="mb-2"><strong>Status:</strong> {appointment.status}</p>
            </div>
          ))
        ) : (
          <p className="text-center">No appointments found.</p>
        )}
      </div>
    </Layout>
  );
};

export default UserDashboard;
