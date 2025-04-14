import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart, Phone, Pill, } from "lucide-react";
import { useAuth } from '../../context/authContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  // this is admin dashboard 

  const handleDashboardRedirect = () => {
    // navigate('/admin/dashboard/:doctorId');

    if (auth.user.role === 1) {
      // If the user is an admin
      navigate(`/admin/dashboard/:doctorId`);
    }
    else if(auth.user.role === 2){
      navigate(`Ambulance`);
    } 
    else if(auth.user.role === 3){
      navigate(`PoliceChaukRegistration`);
    }
    
    else {
      // If the user is a regular user
      navigate(`/user/dashboard`);
    }

  };

  // this is user dashboard
  // /user/dashboard

  const menuItems = [
    { to: "/video-consultation", label: "Telemedicine", icon: Phone },
    { to: "/pharmacy-locator", label: "Pharmacy", icon: Pill },
    { to: "/sos", label: "Emergency", icon: Heart },
   
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed w-full top-0 left-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-gradient-to-br from-blue-400 to-purple-500 shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl sm:text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            HelixSOS
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex space-x-4 xl:space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center space-x-1 ${
                  scrolled ? "text-gray-700" : "text-black"
                } hover:text-blue-500 transition-colors text-sm xl:text-base`}
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </Link>
            ))}
            {/* Conditional rendering based on authentication */}
            {auth.user ? (
              <>
                <button
                  onClick={handleDashboardRedirect}
                   className={`flex items-center space-x-1 text-gray-700 hover:text-blue-500 transition-colors ${
                    scrolled ? "text-gray-700" : "text-black"
                      } text-sm xl:text-base cursor-pointer`}
                    >
                    <span>{auth.user.name}</span>
                    <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                    {auth.user.role === 0
                      ? 'User'
                    : auth.user.role === 1
                    ? 'Doctor'
                    : auth.user.role === 2
                    ? 'Ambulance'
                    : auth.user.role === 3
                    ? 'Police'
                    : 'Unknown Role'}
                  </span>
                </button>

                <button
                  onClick={logout}
                  className={`text-gray-700 hover:text-blue-500 transition-colors ${
                    scrolled ? "text-gray-700" : "text-black"
                  } text-sm xl:text-base`}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`text-gray-700 hover:text-blue-500 transition-colors ${
                    scrolled ? "text-gray-700" : "text-black"
                  } text-sm xl:text-base`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`text-gray-700 hover:text-blue-500 transition-colors ${
                    scrolled ? "text-gray-700" : "text-black"
                  } text-sm xl:text-base`}
                >
                  Signup
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className={scrolled ? "text-gray-700" : "text-black"} size={24} />
            ) : (
              <Menu className={scrolled ? "text-gray-700" : "text-black"} size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white shadow-lg"
          >
            <nav className="flex flex-col space-y-2 p-4">
              {menuItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </Link>
              ))}
              {/* Conditional rendering based on authentication */}
              {auth.user ? (
                <>
                  <button
                    onClick={() => {
                      handleDashboardRedirect();
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-between w-full text-gray-700 hover:text-blue-500 transition-colors py-2 text-left"
                  >
                    <span>{auth.user.name}</span>
                    <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                      {auth.user.role === 0
                      ? 'User'
                    : auth.user.role === 1
                    ? 'Doctor'
                    : auth.user.role === 2
                    ? 'Ambulance'
                    : auth.user.role === 3
                    ? 'Police'
                    : 'Unknown Role'}
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="text-gray-700 hover:text-blue-500 transition-colors py-2 text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-blue-500 transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-gray-700 hover:text-blue-500 transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Signup
                  </Link>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;