

// import React, { useEffect, useState, useCallback } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Layout from '../components/Layout/Layout';

// const decodeJWT = (token) => {
//   try {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     return JSON.parse(window.atob(base64));
//   } catch (error) {
//     console.error('Error decoding token:', error);
//     return null;
//   }
// };

// const DoctorBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedBooking, setSelectedBooking] = useState(null); // State for individual booking details
//   const [statusBookings, setStatusBookings] = useState([]); // State for status-specific bookings
//   const token = localStorage.getItem('token');
//   const navigate = useNavigate();

//   const fetchDoctorBookings = useCallback(async (doctorId) => {
//     try {
//       const response = await axios.get(`http://localhost:3000/api/v1/bookings/${doctorId}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setBookings(response.data);
//     } catch (error) {
//       setError(error.response ? error.response.data.message : 'Failed to fetch bookings');
//     } finally {
//       setLoading(false);
//     }
//   }, [token]);

//   useEffect(() => {
//     if (!token) {
//       console.error('No token found');
//       navigate('/login');
//       return;
//     }

//     const decodedToken = decodeJWT(token);
//     if (!decodedToken || !decodedToken.doctorId) {
//       setError('Invalid or expired token.');
//       setLoading(false);
//       return;
//     }

//     const doctorId = decodedToken.doctorId;
//     fetchDoctorBookings(doctorId);
//   }, [token, navigate, fetchDoctorBookings]);

//   const handleStatusChange = async (bookingId, status) => {
//     try {
//       await axios.put(`http://localhost:3000/api/v1/bookings/${bookingId}/status`, { status }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setBookings((prevBookings) =>
//         prevBookings.map((booking) =>
//           booking._id === bookingId ? { ...booking, status } : booking
//         )
//       );
//     } catch (error) {
//       console.error('Error updating booking status:', error);
//     }
//   };

//   // Calculate counts for bookings
//   const totalBookings = bookings.length;
//   const pendingCount = bookings.filter((booking) => booking.status === 'pending').length;
//   const confirmedCount = bookings.filter((booking) => booking.status === 'confirmed').length;
//   const completedCount = bookings.filter((booking) => booking.status === 'completed').length;
//   const cancelledCount = bookings.filter((booking) => booking.status === 'cancelled').length;

//   const handleBookingClick = (booking) => {
//     setSelectedBooking(booking); // Set the selected booking
//   };

//   const handleStatusBookingsClick = (status) => {
//     const filteredBookings = bookings.filter((booking) => booking.status === status);
//     setStatusBookings(filteredBookings); // Set bookings for the selected status
//   };

//   const closeModal = () => {
//     setSelectedBooking(null); // Close the modal for individual booking details
//     setStatusBookings([]); // Close the modal for status bookings
//   };

//   if (loading) return <p className="text-center text-xl">Loading...</p>;
//   if (error) return <p className="text-center text-red-500">Error: {error}</p>;

//   return (
//     <Layout>
//       <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
//         <h1 className="text-2xl font-bold mb-6">Doctor's Appointments</h1>

//         {/* Booking Summary */}
//         <div className="mb-4">
//           <p onClick={() => handleStatusBookingsClick('')} className="cursor-pointer"><strong>Total Bookings:</strong> {totalBookings}</p>
//           <p onClick={() => handleStatusBookingsClick('pending')} className="cursor-pointer"><strong>Pending:</strong> {pendingCount}</p>
//           <p onClick={() => handleStatusBookingsClick('confirmed')} className="cursor-pointer"><strong>Confirmed:</strong> {confirmedCount}</p>
//           <p onClick={() => handleStatusBookingsClick('completed')} className="cursor-pointer"><strong>Completed:</strong> {completedCount}</p>
//           <p onClick={() => handleStatusBookingsClick('cancelled')} className="cursor-pointer"><strong>Cancelled:</strong> {cancelledCount}</p>
//         </div>

//         {bookings.length > 0 ? (
//           bookings.map((booking) => (
//             <div key={booking._id} className="mb-6 border-b pb-4">
//               <p className="mb-2" onClick={() => handleBookingClick(booking)} style={{ cursor: 'pointer' }}>
//                 <strong>Patient Name:</strong> {booking.patientName} (Click for details)
//               </p>
//               <p className="mb-2"><strong>Date:</strong> {new Date(booking.date).toLocaleString()}</p>
//               <p className="mb-2"><strong>Time:</strong> {booking.time}</p>
//               <p className="mb-2"><strong>Status:</strong> {booking.status || 'Pending'}</p>
//               {booking.status === 'pending' && (
//                 <div>
//                   <button
//                     onClick={() => handleStatusChange(booking._id, 'confirmed')}
//                     className="mr-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
//                   >
//                     Accept
//                   </button>
//                   <button
//                     onClick={() => handleStatusChange(booking._id, 'cancelled')}
//                     className="mr-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//                   >
//                     Reject
//                   </button>
//                 </div>
//               )}
//               {booking.status === 'confirmed' && (
//                 <button
//                   onClick={() => handleStatusChange(booking._id, 'completed')}
//                   className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                 >
//                   Complete
//                 </button>
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No bookings found.</p>
//         )}

//         {/* Modal for booking details */}
//         {selectedBooking && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//             <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
//               <h2 className="text-xl font-bold mb-4">Booking Details</h2>
//               <p><strong>Patient Name:</strong> {selectedBooking.patientName}</p>
//               <p><strong>Date:</strong> {new Date(selectedBooking.date).toLocaleString()}</p>
//               <p><strong>Time:</strong> {selectedBooking.time}</p>
//               <p><strong>Status:</strong> {selectedBooking.status || 'Pending'}</p>
//               <p><strong>Notes:</strong> {selectedBooking.notes || 'No additional notes'}</p>
//               <div className="mt-4">
//                 <button onClick={closeModal} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Modal for status-specific bookings */}
//         {statusBookings.length > 0 && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//             <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
//               <h2 className="text-xl font-bold mb-4">Bookings with Status: {statusBookings[0].status}</h2>
//               <ul>
//                 {statusBookings.map((booking) => (
//                   <li key={booking._id} className="mb-4">
//                     <p><strong>Patient Name:</strong> {booking.patientName}</p>
//                     <p><strong>Date:</strong> {new Date(booking.date).toLocaleString()}</p>
//                     <p><strong>Time:</strong> {booking.time}</p>
//                     <p><strong>Status:</strong> {booking.status}</p>
//                   </li>
//                 ))}
//               </ul>
//               <div className="mt-4">
//                 <button onClick={closeModal} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default DoctorBookings;




import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/authContext';

const DoctorBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [filter, setFilter] = useState('all');

  const { auth } = useAuth();
  const navigate = useNavigate();

  const fetchDoctorBookings = useCallback(async () => {
    try {
      const doctorId = auth.user?.doctorId;
      if (!doctorId) throw new Error('Doctor ID not found');
      
      const response = await axios.get(`http://localhost:5000/api/v1/bookings/${doctorId}`);
      setBookings(response.data);
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  }, [auth.user]);

  useEffect(() => {
    if (!auth.token) {
      navigate('/login');
      return;
    }
    fetchDoctorBookings();
  }, [auth.token, navigate, fetchDoctorBookings]);

  const handleStatusChange = async (bookingId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/v1/bookings/${bookingId}/status`, { status });
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId ? { ...booking, status } : booking
        )
      );
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  // Calculate counts for bookings
  const totalBookings = bookings.length;
  const pendingCount = bookings.filter((booking) => booking.status === 'pending').length;
  const confirmedCount = bookings.filter((booking) => booking.status === 'confirmed').length;
  const completedCount = bookings.filter((booking) => booking.status === 'completed').length;
  const cancelledCount = bookings.filter((booking) => booking.status === 'cancelled').length;

  const filteredBookings = filter === 'all' ? bookings : bookings.filter((booking) => booking.status === filter);

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Appointments</h1>
        <div className="flex justify-center mb-6 space-x-4">
          <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
            All: {totalBookings}
          </button>
          <button onClick={() => setFilter('pending')} className={`px-4 py-2 rounded-md ${filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
            Pending: {pendingCount}
          </button>
          <button onClick={() => setFilter('confirmed')} className={`px-4 py-2 rounded-md ${filter === 'confirmed' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
            Confirmed: {confirmedCount}
          </button>
          <button onClick={() => setFilter('completed')} className={`px-4 py-2 rounded-md ${filter === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
            Completed: {completedCount}
          </button>
          <button onClick={() => setFilter('cancelled')} className={`px-4 py-2 rounded-md ${filter === 'cancelled' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
            Cancelled: {cancelledCount}
          </button>
        </div>
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <div key={booking._id} className="mb-6 border-b pb-4">
              <p className="mb-2"><strong>Patient Name:</strong> {booking.patientName}</p>
              <p className="mb-2"><strong>Date:</strong> {new Date(booking.date).toLocaleString()}</p>
              <p className="mb-2"><strong>Status:</strong> {booking.status}</p>
              {booking.status === 'pending' && (
                <div>
                  <button onClick={() => handleStatusChange(booking._id, 'confirmed')} className="mr-4 px-4 py-2 bg-green-500 text-white rounded-md">
                    Accept
                  </button>
                  <button onClick={() => handleStatusChange(booking._id, 'cancelled')} className="mr-4 px-4 py-2 bg-red-500 text-white rounded-md">
                    Reject
                  </button>
                  
                {booking.status === 'confirmed' && (
                <button
                  onClick={() => handleStatusChange(booking._id, 'completed')}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Complete
                </button>
              )}
            
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </Layout>
  );
};

export default DoctorBookings;
