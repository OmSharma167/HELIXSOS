// import React, { useState } from 'react';
// import Layout from '../Layout/Layout';

// const AppointmentBooking = () => {
//   const [appointment, setAppointment] = useState({
//     name: '',
//     date: '',
//     time: ''
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // API call to backend for booking
//     console.log('Appointment Booked:', appointment);
//   };

//   return (
//       <Layout>
//         <h1>Book Appointment</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Name"
//           value={appointment.name}
//           onChange={(e) => setAppointment({ ...appointment, name: e.target.value })}
//         />
//         <input
//           type="date"
//           value={appointment.date}
//           onChange={(e) => setAppointment({ ...appointment, date: e.target.value })}
//         />
//         <input
//           type="time"
//           value={appointment.time}
//           onChange={(e) => setAppointment({ ...appointment, time: e.target.value })}
//         />
//         <button type="submit">Book</button>
//       </form>
  
//        </Layout>
//   );
// };

// export default AppointmentBooking;


import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import Layout from '../Layout/Layout';

const AppointmentBooking = () => {
  const [appointment, setAppointment] = useState({
    name: '',
    date: '',
    time: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call to backend for booking
    console.log('Appointment Booked:', appointment);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto border rounded-lg shadow-md">
        <div className="bg-gray-100 p-4">
          <h2 className="text-2xl font-bold text-center">Book Appointment</h2>
        </div>
        <div className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Name"
                value={appointment.name}
                onChange={(e) => setAppointment({ ...appointment, name: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="relative">
              <input
                type="date"
                value={appointment.date}
                onChange={(e) => setAppointment({ ...appointment, date: e.target.value })}
                className="w-full border rounded px-3 py-2 pl-10"
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <div className="relative">
              <input
                type="time"
                value={appointment.time}
                onChange={(e) => setAppointment({ ...appointment, time: e.target.value })}
                className="w-full border rounded px-3 py-2 pl-10"
              />
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Book Appointment</button>
          </form>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default AppointmentBooking;
