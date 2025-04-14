// import React from "react";
// import Header from "./Header";

// const Layout = ({ children }) => {
//   return (
//     <div className="flex flex-col ">
//       <Header />
//       <main className="flex-grow pt-16"> {/* Adjust padding to match header height */}
//         {children}
//       </main>
//     </div>
//   );
// };

// export default Layout;


import React from "react";
import Header from "./Header";
import { motion } from "framer-motion";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
     
      <motion.main 
        className="flex-grow pt-16 pb-8" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>
      
      
    </div>
  );
};

export default Layout;