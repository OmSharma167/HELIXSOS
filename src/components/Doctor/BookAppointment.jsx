// import React, { useState } from 'react';
// import Layout from '../Layout/Layout';

// // Simple function to decode JWT token
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

// const BookAppointment = ({ doctorId, onBookingSuccess }) => {
//   const [appointment, setAppointment] = useState({
//     patientName: '',
//     date: '',
//     time: '',
//   });
//   const [error, setError] = useState(null);

//   const handleBookingSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');

//     if (!token) {
//       alert('No authentication token found. Please log in.');
//       return;
//     }

//     // Decode the token
//     const decodedToken = decodeJWT(token);
//     console.log('Decoded Token:', decodedToken);

//     // Prepare the booking data
//     const bookingData = {
//       patientName: appointment.patientName,
//       date: appointment.date,
//       time: appointment.time,
//     };

//     console.log('Booking Data:', bookingData);

//     try {
//       const response = await fetch(`http://localhost:5000/api/v1/bookings/${doctorId}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify(bookingData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to book appointment');
//       }

//       const data = await response.json();
//       console.log('Booking response:', data);
//       alert('Appointment booked successfully!');
//       onBookingSuccess();
//     } catch (error) {
//       console.error('Error booking appointment:', error.message);
//       setError('Failed to book appointment. Please try again.');
//     }
//   };

//   return (
//     <Layout>
//       <div className="w-full max-w-lg mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Book an Appointment</h2>
//       {error && <div className="text-red-500">{error}</div>}
//       <form onSubmit={handleBookingSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="patientName" className="block text-sm font-medium">Your Name</label>
//           <input
//             type="text"
//             id="patientName"
//             value={appointment.patientName}
//             onChange={(e) => setAppointment({ ...appointment, patientName: e.target.value })}
//             className="mt-1 block w-full border rounded p-2"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="date" className="block text-sm font-medium">Date</label>
//           <input
//             type="date"
//             id="date"
//             value={appointment.date}
//             onChange={(e) => setAppointment({ ...appointment, date: e.target.value })}
//             className="mt-1 block w-full border rounded p-2"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="time" className="block text-sm font-medium">Time</label>
//           <input
//             type="time"
//             id="time"
//             value={appointment.time}
//             onChange={(e) => setAppointment({ ...appointment, time: e.target.value })}
//             className="mt-1 block w-full border rounded p-2"
//             required
//           />
//         </div>
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Book Appointment</button>
//       </form>
//     </div>
//     </Layout>
//   );
// };

// export default BookAppointment;




import React, { useState } from 'react';
import { Calendar, Clock, User, AlertCircle } from 'lucide-react';
import Layout from '../Layout/Layout';

const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

const BookAppointment = ({ doctorId, onBookingSuccess }) => {
  const [appointment, setAppointment] = useState({
    patientName: '',
    date: '',
    time: '',
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    setSuccessMessage('');

    const token = localStorage.getItem('token');

    if (!token) {
      setError('Please log in to book an appointment.');
      setIsLoading(false);
      return;
    }

    try {
      const decodedToken = decodeJWT(token);
      console.log('Decoded Token:', decodedToken);

      const bookingData = {
        patientName: appointment.patientName,
        date: appointment.date,
        time: appointment.time,
      };

      const response = await fetch(`http://localhost:5000/api/v1/bookings/${doctorId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error('Failed to book appointment');
      }

      const data = await response.json();
      console.log('Booking response:', data);
      setSuccessMessage('Appointment booked successfully! We\'ll send you a confirmation email shortly.');
      onBookingSuccess?.();
      setAppointment({ patientName: '', date: '', time: '' });
    } catch (error) {
      console.error('Error booking appointment:', error.message);
      setError('Unable to book appointment. Please try again or contact support.');
    } finally {
      setIsLoading(false);
    }
  };

  // Get today's date in YYYY-MM-DD format for min date attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {/* Form Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Book an Appointment</h2>
              <p className="mt-2 text-sm text-gray-600">Fill in the details below to schedule your appointment</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 rounded-lg flex items-center gap-2 text-red-700">
                <AlertCircle size={20} />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="mb-6 p-4 bg-green-50 rounded-lg text-green-700">
                <p className="text-sm">{successMessage}</p>
              </div>
            )}

            <form onSubmit={handleBookingSubmit} className="space-y-6">
              {/* Patient Name Field */}
              <div>
                <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-1">
                  Patient Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="patientName"
                    value={appointment.patientName}
                    onChange={(e) => setAppointment({ ...appointment, patientName: e.target.value })}
                    className="pl-10 w-full rounded-lg border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              {/* Date Field */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="date"
                    min={today}
                    value={appointment.date}
                    onChange={(e) => setAppointment({ ...appointment, date: e.target.value })}
                    className="pl-10 w-full rounded-lg border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Time Field */}
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Time
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="time"
                    id="time"
                    value={appointment.time}
                    onChange={(e) => setAppointment({ ...appointment, time: e.target.value })}
                    className="pl-10 w-full rounded-lg border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 rounded-lg text-white text-sm font-semibold transition-colors
                  ${isLoading 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  }`}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  'Book Appointment'
                )}
              </button>
            </form>
          </div>

          {/* Help Text */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Need help? Contact our support at support@example.com
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default BookAppointment;