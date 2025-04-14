// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css'; // Ensure Tailwind CSS is set up correctly here

// // HospitalDetails Component with Tailwind CSS
// const HospitalDetails = () => {
//   // Example hospital data
//   const hospital = {
//     name: "City Hospital",
//     photoUrl: "https://via.placeholder.com/800x400.png?text=Hospital+Photo",
//     address: "123 Health St, Wellness City",
//     contact: "+123 456 7890",
//     services: ["Emergency Care", "Surgery", "General Medicine"]
//   };

//   return (
//     <div className="max-w-4xl mx-auto my-8 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
//       <h1 className="text-3xl font-bold mb-4">{hospital.name}</h1>
//       <img 
//         src={hospital.photoUrl} 
//         alt={hospital.name} 
//         className="w-full h-64 object-cover rounded-lg mb-4" 
//       />
//       <p className="text-lg mb-2"><strong>Address:</strong> {hospital.address}</p>
//       <p className="text-lg mb-2"><strong>Contact:</strong> {hospital.contact}</p>
//       <p className="text-lg"><strong>Services:</strong> {hospital.services.join(', ')}</p>
//     </div>
//   );
// };

// // Render the HospitalDetails component
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <HospitalDetails />
//   </React.StrictMode>
// );

// // Export HospitalDetails component
// export default HospitalDetails;
