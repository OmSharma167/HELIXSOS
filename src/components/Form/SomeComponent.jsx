import React from 'react';
import { useAuth } from "../../context/authContext";
const SomeComponent = () => {
  const { auth, logout } = useAuth();

  return (
    <div>
      {auth?.user ? (
        <div>
          <p>Welcome, {auth.user.name}!</p>
          {auth.user.role === 1 && <p>You are an admin.</p>} {/* Admin-specific message */}
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
};

export default SomeComponent;