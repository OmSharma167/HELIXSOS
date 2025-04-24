


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
// import Layout from '../Layout/Layout';

// const DoctorForm = ({ doctorId, onSave }) => {
//   const [doctor, setDoctor] = useState({
//     name: '',
//     specialization: '',
//     qualifications: [],
//     imageUrl: ''
//   });
//   const navigate = useNavigate(); // Initialize useNavigate

//   // Fetch doctor data if editing
//   useEffect(() => {
//     if (doctorId) {
//       axios.get(`http://localhost:3000/api/doctors/${doctorId}`)
//         .then(response => setDoctor(response.data))
//         .catch(error => {
//           console.error('Error fetching doctor:', error);
//           alert('Error fetching doctor data.');
//         });
//     }
//   }, [doctorId]);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setDoctor(prevState => ({ ...prevState, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Submitting:', doctor); // Log data being submitted

//     const authData = localStorage.getItem('auth');
//     const token = authData ? JSON.parse(authData).token : "";

//     if (!token) {
//       alert('You are not authorized. Please log in.');
//       return;
//     }

//     const config = {
//       headers: { Authorization: `Bearer ${token}` }
//     };

//     const request = doctorId
//       ? axios.put(`http://localhost:3000/api/doctors/${doctorId}`, doctor, config)
//       : axios.post('http://localhost:3000/api/doctors', doctor, config);

//     request
//       .then(response => {
//         console.log('Doctor data saved:', response.data); // Log the response
//         alert('Doctor data saved successfully!');
//         navigate('/admin-dashboard'); // Redirect to admin dashboard
//         if (typeof onSave === 'function') {
//           onSave(); // Ensure onSave is a function before calling it
//         }
//       })
//       .catch(error => {
//         console.error('Error saving doctor data:', error.response ? error.response.data : error.message);
//         alert('Error saving doctor data: ' + error.message); // Add an alert for errors
//       });
//   };

//   return (
//     <Layout>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="name"
//           value={doctor.name}
//           onChange={handleChange}
//           placeholder="Name"
//           className="w-full border rounded px-3 py-2"
//         />
//         <input
//           type="text"
//           name="specialization"
//           value={doctor.specialization}
//           onChange={handleChange}
//           placeholder="Specialization"
//           className="w-full border rounded px-3 py-2"
//         />
//         <textarea
//           name="qualifications"
//           value={doctor.qualifications.join('\n')}
//           onChange={(e) => setDoctor(prevState => ({ ...prevState, qualifications: e.target.value.split('\n') }))}
//           placeholder="Qualifications (one per line)"
//           className="w-full border rounded px-3 py-2"
//         />
//         <input
//           type="text"
//           name="imageUrl"
//           value={doctor.imageUrl}
//           onChange={handleChange}
//           placeholder="Image URL"
//           className="w-full border rounded px-3 py-2"
//         />
//         <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
//           {doctorId ? 'Update Doctor' : 'Add Doctor'}
//         </button>
//       </form>
//     </Layout>
//   );
// };

// export default DoctorForm;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';

const DoctorForm = ({ doctorId, onSave }) => {
  const [doctor, setDoctor] = useState({
    name: '',
    specialization: '',
    qualifications: [],
    imageUrl: '',
    location: '',
    experience: '', // Store as a number
    price: '',      // Store as a number
    timing: '',
    bio: '',
  });
  const navigate = useNavigate();

  // Fetch doctor data if editing
  useEffect(() => {
    if (doctorId) {
      axios.get(`http://localhost:5000/api/doctors/${doctorId}`)
        .then(response => setDoctor(response.data))
        .catch(error => {
          console.error('Error fetching doctor:', error);
          alert('Error fetching doctor data.');
        });
    }
  }, [doctorId]);

  // Handle input changes and convert experience and price to numbers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prevState) => ({
      ...prevState,
      [name]: name === "experience" || name === "price" ? parseFloat(value) || "" : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const authData = localStorage.getItem('auth');
    const token = authData ? JSON.parse(authData).token : "";

    if (!token) {
      alert('You are not authorized. Please log in.');
      return;
    }

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    const request = doctorId
      ? axios.put(`http://localhost:5000/api/doctors/${doctorId}`, doctor, config)
      : axios.post('http://localhost:5000/api/doctors', doctor, config);

    request
      .then(response => {
        alert('Doctor data saved successfully!');
        navigate('/admin-dashboard');
        if (typeof onSave === 'function') {
          onSave();
        }
      })
      .catch(error => {
        console.error('Error saving doctor data:', error.response ? error.response.data : error.message);
        alert('Error saving doctor data: ' + error.message);
      });
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={doctor.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="text"
          name="specialization"
          value={doctor.specialization}
          onChange={handleChange}
          placeholder="Specialization"
          className="w-full border rounded px-3 py-2"
        />
        <textarea
          name="qualifications"
          value={doctor.qualifications.join('\n')}
          onChange={(e) => setDoctor(prevState => ({ ...prevState, qualifications: e.target.value.split('\n') }))}
          placeholder="Qualifications (one per line)"
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="text"
          name="imageUrl"
          value={doctor.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="text"
          name="location"
          value={doctor.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="number"
          name="experience"
          value={doctor.experience}
          onChange={handleChange}
          placeholder="Experience (in years)"
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="number"
          name="price"
          value={doctor.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="text"
          name="timing"
          value={doctor.timing}
          onChange={handleChange}
          placeholder="Timing (e.g., 9am - 5pm)"
          className="w-full border rounded px-3 py-2"
        />
        <textarea
          name="bio"
          value={doctor.bio}
          onChange={handleChange}
          placeholder="Bio"
          className="w-full border rounded px-3 py-2"
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          {doctorId ? 'Update Doctor' : 'Add Doctor'}
        </button>
      </form>
    </Layout>
  );
};

export default DoctorForm;
