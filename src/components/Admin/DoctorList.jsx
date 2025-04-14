
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import DoctorForm from './DoctorForm'; // Import the form component

// const DoctorList = () => {
//   const [doctors, setDoctors] = useState([]);

//   // Fetch doctors when component mounts
//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   const fetchDoctors = () => {
//     axios.get('/api/doctors')
//       .then(response => {
//         setDoctors(response.data); // Set the list of doctors
//       })
//       .catch(error => {
//         console.error('Error fetching doctors:', error);
//       });
//   };

//   const handleSave = () => {
//     fetchDoctors(); // Re-fetch the doctors after adding/updating
//   };

//   return (
//     <div>
//       <h2>Doctor List</h2>
//       <DoctorForm onSave={handleSave} />
//       <table className="min-w-full table-auto">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Specialization</th>
//             <th>Qualifications</th>
//             <th>Image</th>
//           </tr>
//         </thead>
//         <tbody>
//           {doctors.map((doctor) => (
//             <tr key={doctor._id}>
//               <td>{doctor.name}</td>
//               <td>{doctor.specialization}</td>
//               <td>
//                 <ul>
//                   {doctor.qualifications.map((qual, index) => (
//                     <li key={index}>{qual}</li>
//                   ))}
//                 </ul>
//               </td>
//               <td>
//                 <img src={doctor.imageUrl} alt={doctor.name} className="h-16 w-16 rounded" />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DoctorList;







// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom'; // To create links to individual doctor profiles
// import Layout from '../Layout/Layout';

// // Button component for reusability
// const Button = ({ children, className, ...props }) => (
//   <button
//     className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ${className}`}
//     {...props}
//   >
//     {children}
//   </button>
// );

// // Card component for displaying doctors' profiles
// const Card = ({ children, className }) => (
//   <div className={`border rounded-lg shadow-md p-4 ${className}`}>
//     {children}
//   </div>
// );

// // DoctorList Component
// const DoctorList = () => {
//   const [doctors, setDoctors] = useState([]); // State to hold the list of doctors
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state for handling API errors

//   useEffect(() => {
//   const fetchDoctors = async () => {
//     setLoading(true);
//     const token = localStorage.getItem('token');
//     console.log('Retrieved Token:', token); // Debugging line
//     if (!token) {
//       setError('No authentication token found. Please log in.');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.get('http://localhost:3000/api/doctors', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setDoctors(response.data);
//     } catch (err) {
//       console.error('Error fetching doctors:', err);
//       setError('Failed to fetch doctors. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchDoctors();
// }, []);


//   // Display loading state
//   if (loading) return <p>Loading...</p>;

//   // Display error state if any
//   if (error) return <p>{error}</p>;

//   return (
//     <Layout>
//       <div className="container mx-auto p-4">
//         <h1 className="text-2xl font-bold mb-4">Doctor List</h1>
//         {doctors.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {doctors.map((doctor) => (
//               <Card key={doctor._id} className="w-full max-w-xs mx-auto">
//                 <div className="flex items-center">
//                   <img
//                     src={doctor.imageUrl || '/placeholder.png'} // Display placeholder if imageUrl is missing
//                     alt={doctor.name}
//                     className="w-24 h-24 rounded-full mr-4"
//                   />
//                   <div>
//                     <h2 className="text-xl font-semibold">{doctor.name}</h2>
//                     <p className="text-gray-600">{doctor.specialization}</p>
//                     <Link to={`/doctors/${doctor._id}`}>
//                       <Button className="mt-2">View Profile</Button>
//                     </Link>
//                   </div>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         ) : (
//           <p>No doctors found.</p> // Display message if no doctors exist
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default DoctorList;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Layout from '../Layout/Layout';

// Reusable Button component
const Button = ({ children, className, ...props }) => (
  <button
    className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ${className}`}
    {...props}
  >
    {children}
  </button>
);

// Reusable Card component
const Card = ({ children, className }) => (
  <div className={`border rounded-lg shadow-md p-4 ${className}`}>
    {children}
  </div>
);

// DoctorList Component
const DoctorList = () => {
  const [doctors, setDoctors] = useState([]); // State to hold the list of doctors
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      console.log('Retrieved Token:', token); // Debugging token retrieval
      if (!token) {
        setError('No authentication token found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/doctors', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDoctors(response.data);
      } catch (err) {
        console.error('Error fetching doctors:', err);
        setError('Failed to fetch doctors. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Display loading state
  if (loading) return <p>Loading...</p>;

  // Display error state if any
  if (error) return <p>{error}</p>;

  return (
    <Layout>
      <div className=" mt-16 mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Doctor List</h1>
        {doctors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {doctors.map((doctor) => (
              <Card key={doctor._id} className="w-full max-w-xs mx-auto">
                <div className="flex items-center">
                  <img
                    src={doctor.imageUrl || '/placeholder.png'} // Display placeholder if imageUrl is missing
                    alt={doctor.name}
                    className="w-24 h-24 rounded-full mr-4"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">{doctor.name}</h2>
                    <p className="text-gray-600">{doctor.specialization}</p>
                    <Link to={`/doctors/${doctor._id}`}>
                      <Button className="mt-2">View Profile</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p>No doctors found.</p>
        )}
      </div>
    </Layout>
  );
};

export default DoctorList;
