

// import React, { useState } from "react";
// import Layout from "../Layout/Layout";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { useAuth } from "../../context/authContext";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:3000/api/v1/auth/login", {
//         email,
//         password,
//       });
//       console.log("Login response data:", res.data);

//       if (res.data && res.data.success) {
//         const { user, token } = res.data;

//         console.log("User data after login:", user);

//         login({ user, token });
//         localStorage.setItem("token", token);

//         toast.success(res.data.message);
//         navigate('/'); 
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       console.error("Doctor ID is missing in user data.");
//         toast.error("Doctor ID is missing. Please check your account.");
//     }
//   };

//   return (
//     <Layout title="Login - Ecommer App">
//       <div className="flex justify-center items-center min-h-[90vh]">
//         <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
//           <h4 className="text-xl font-semibold mb-6 text-center">LOGIN FORM</h4>

//           <div className="mb-4">
//             <input
//               type="email"
//               autoFocus
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg"
//               placeholder="Enter Your Email"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg"
//               placeholder="Enter Your Password"
//               required
//             />
//           </div>
//           <div className="mb-4 text-right">
//             <button
//               type="button"
//               className="text-blue-500 hover:underline"
//               onClick={() => navigate("/forgot-password")}
//             >
//               Forgot Password?
//             </button>
//           </div>

//           <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600">
//             LOGIN
//           </button>
//         </form>
//       </div>
//     </Layout>
//   );
// };

// export default Login;





// import React, { useState } from "react";
// import Layout from "../Layout/Layout";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { useAuth } from "../../context/authContext";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/v1/auth/login", {
//         email,
//         password,
//       });
      
//       console.log("Login response data:", res.data);

//       if (res.data && res.data.success) {
//         const { user, token } = res.data;

//         // Log user data for debugging
//         console.log("User data after login:", user);

//         // Store user data in context and local storage
//         login({ user, token });
//         localStorage.setItem("token", token);

//         // Optional: Store additional user profile data if available
//         if (user && user._id) {
//           localStorage.setItem("userId", user._id);
//           localStorage.setItem("patientName", user.name || ""); // Store name if available
//         }

//         toast.success(res.data.message);
//         navigate('/'); // Redirect after successful login
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       console.error("Error during login:", error); // Log the error for debugging
//       toast.error("Login failed. Please check your credentials.");
//     }
//   };

//   return (
//     <Layout title="Login - Ecommer App">
//       <div className="flex justify-center items-center min-h-[90vh]">
//         <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
//           <h4 className="text-xl font-semibold mb-6 text-center">LOGIN FORM</h4>

//           <div className="mb-4">
//             <input
//               type="email"
//               autoFocus
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg"
//               placeholder="Enter Your Email"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg"
//               placeholder="Enter Your Password"
//               required
//             />
//           </div>
//           <div className="mb-4 text-right">
//             <button
//               type="button"
//               className="text-blue-500 hover:underline"
//               onClick={() => navigate("/forgot-password")}
//             >
//               Forgot Password?
//             </button>
//           </div>

//           <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600">
//             LOGIN
//           </button>
//         </form>
//       </div>
//     </Layout>
//   );
// };

// export default Login;



import React, { useState } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/authContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/login", {
        email,
        password,
      });

      if (res.data && res.data.success) {
        const { user, token } = res.data;
        login({ user, token });
        localStorage.setItem("token", token);

        if (user && user._id) {
          localStorage.setItem("userId", user._id);
          localStorage.setItem("patientName", user.name || "");
        }

        toast.success(res.data.message);
        navigate('/'); // Redirect after successful login
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <Layout title="Login - HelixSOS">
      <div className="flex min-h-screen mt-[-60px] bg-gradient-to-br from-blue-300 to-purple-300">
        
        {/* Left Side - Appreciation Message */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 p-12 bg-gradient-to-br from-purple-700 to-blue-800 text-white">
          <h2 className="text-4xl font-bold mb-4 transform transition duration-300 hover:scale-105">
            Welcome Back!
          </h2>
          <p className="text-lg max-w-md text-center mb-6 transform transition duration-300 hover:scale-105">
            We're grateful to have you as part of our community. Your dedication to health and wellness makes a difference, and we're here to support you every step of the way.
          </p>
          <p className="text-md italic max-w-xs text-center">
            "Empowering lives through better health."
          </p>
        </div>
        
        {/* Right Side - Login Form */}
        <div className="flex justify-center items-center w-full md:w-1/2 p-8">
          <div className="bg-white p-8 shadow-2xl rounded-lg w-full max-w-md transform transition duration-500 hover:scale-105">
            <h4 className="text-2xl font-semibold mb-6 text-center text-gray-700">Login to HelixSOS</h4>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="text-right">
                <button
                  type="button"
                  className="text-blue-500 hover:underline focus:outline-none"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium text-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none"
              >
                Login
              </button>
            </form>

            <div className="mt-6 text-center text-gray-500">
              Don’t have an account?{" "}
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
