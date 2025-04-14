

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AlertCircle, Mail, Phone, Home, Lock, User } from 'lucide-react';
// import Layout from '../Layout/Layout';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// export default function Register() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     phone: '',
//     address: '',
//     answer: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//     setError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
    
//     try {
//       const res = await axios.post('http://localhost:5000/api/v1/auth/register', formData);
//       if (res && res.data.success) {
//         toast.success(res.data.message);
//         navigate('/Login');
//       } else {
//         setError(res.data.message);
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       setError('Registration failed. Please try again.');
//       toast.error('Something went wrong');
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const inputFields = [
//     { id: 'name', type: 'text', placeholder: 'Enter Your Name', icon: <User className="w-5 h-5 text-gray-500" /> },
//     { id: 'email', type: 'email', placeholder: 'Enter Your Email', icon: <Mail className="w-5 h-5 text-gray-500" /> },
//     { id: 'password', type: 'password', placeholder: 'Enter Your Password', icon: <Lock className="w-5 h-5 text-gray-500" /> },
//     { id: 'phone', type: 'tel', placeholder: 'Enter Your Phone', icon: <Phone className="w-5 h-5 text-gray-500" /> },
//     { id: 'address', type: 'text', placeholder: 'Enter Your Address', icon: <Home className="w-5 h-5 text-gray-500" /> },
//     { id: 'answer', type: 'text', placeholder: 'What is Your Favorite Sport?', icon: <AlertCircle className="w-5 h-5 text-gray-500" /> }
//   ];

//   return (
//     <Layout>
//       <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
//         <div className="w-full max-w-md space-y-8 bg-white p-6 sm:p-8 rounded-xl shadow-lg">
//           <div>
//             <h2 className="text-center text-3xl font-extrabold text-gray-900">
//               Create your account
//             </h2>
//             <p className="mt-2 text-center text-sm text-gray-600">
//               Join us today and get started
//             </p>
//           </div>

//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
//               <span className="block sm:inline">{error}</span>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//             <div className="space-y-4">
//               {inputFields.map((field) => (
//                 <div key={field.id} className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     {field.icon}
//                   </div>
//                   <input
//                     id={field.id}
//                     type={field.type}
//                     value={formData[field.id]}
//                     onChange={handleChange}
//                     className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg
//                              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
//                              text-gray-900 placeholder-gray-500
//                              transition duration-200 ease-in-out
//                              sm:text-sm"
//                     placeholder={field.placeholder}
//                     required
//                   />
//                 </div>
//               ))}
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent
//                          text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700
//                          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
//                          disabled:opacity-50 disabled:cursor-not-allowed
//                          transition duration-200"
//               >
//                 {loading ? (
//                   <span className="flex items-center">
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Processing...
//                   </span>
//                 ) : (
//                   'Create Account'
//                 )}
//               </button>
//             </div>

//             <div className="text-sm text-center">
//               <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
//                 Already have an account? Sign in
//               </a>
//             </div>
//           </form>
//         </div>
//       </div>
//     </Layout>
//   );
// }


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Mail, Phone, Home, Lock, User } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    answer: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await axios.post('http://localhost:5000/api/v1/auth/register', formData);
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate('/Login');
      } else {
        setError(res.data.message);
        toast.error(res.data.message);
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
      toast.error('Something went wrong');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const inputFields = [
    { id: 'name', type: 'text', placeholder: 'Enter Your Name', icon: <User className="w-5 h-5 text-gray-500" /> },
    { id: 'email', type: 'email', placeholder: 'Enter Your Email', icon: <Mail className="w-5 h-5 text-gray-500" /> },
    { id: 'password', type: 'password', placeholder: 'Enter Your Password', icon: <Lock className="w-5 h-5 text-gray-500" /> },
    { id: 'phone', type: 'tel', placeholder: 'Enter Your Phone', icon: <Phone className="w-5 h-5 text-gray-500" /> },
    { id: 'address', type: 'text', placeholder: 'Enter Your Address', icon: <Home className="w-5 h-5 text-gray-500" /> },
    { id: 'answer', type: 'text', placeholder: 'What is Your Favorite Sport?', icon: <AlertCircle className="w-5 h-5 text-gray-500" /> }
  ];

  return (
    <div className="flex items-center  justify-center  bg-cyan-300 transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full  mx-4 md:mx-0 transition-all duration-500 ease-in-out">
        <div className="bg-blue-600 text-white p-8 rounded-xl md:rounded-r-none flex flex-col justify-center items-center transition-transform duration-500 ease-in-out transform md:-translate-x-8"> <h2 className="text-4xl font-bold mb-4 transition-transform duration-500 ease-in-out transform hover:scale-110">Welcome to HelixSOS</h2> <p className="text-lg transition-transform duration-500 ease-in-out transform hover:scale-110">Become part of a community dedicated to safety, wellness, and support. Join us to access reliable emergency services, healthcare guidance, and the resources you need in critical moments.</p> </div>
        <div className="bg-white rounded-xl shadow-lg md:p-8 transition-all duration-500 ease-in-out transform md:translate-x-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">Create your account</h2>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 transition-all duration-300 ease-in-out">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {inputFields.map((field) => (
              <div key={field.id} className="relative transition-all duration-500 ease-in-out transform hover:scale-105">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {field.icon}
                </div>
                <input
                  id={field.id}
                  type={field.type}
                  value={formData[field.id]}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           text-gray-900 placeholder-gray-500
                           transition duration-200 ease-in-out
                           sm:text-sm"
                  placeholder={field.placeholder}
                  required
                />
              </div>
            ))}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 text-sm font-medium text-white bg-blue-600 rounded-lg
                         hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                         focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed
                         transition duration-200 ease-in-out transform hover:scale-105"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
          <div className="text-sm text-center transition-all duration-500 ease-in-out transform hover:scale-105">
            <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Already have an account? Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
