// src/components/UserDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/authContext';

const UserDashboard = () => {
  const { auth } = useAuth();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    if (auth.isAuthenticated()) {
      axios.get('http://localhost:5000/api/doctors/profile')
        .then(response => setDoctor(response.data))
        .catch(error => console.error('Error fetching doctor profile:', error));
    }
  }, [auth]);

  if (!doctor) return <p>Loading...</p>;

  return (
    <div>
      <h1>Your Doctor Profile</h1>
      <div>
        <p>Name: {doctor.name}</p>
        <p>Specialization: {doctor.specialization}</p>
        <p>Qualifications: {doctor.qualifications.join(', ')}</p>
        {doctor.imageUrl && <img src={doctor.imageUrl} alt={doctor.name} />}
      </div>
    </div>
  );
};

export default UserDashboard;
