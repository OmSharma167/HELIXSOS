import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ children, onClick, className = '', type = 'button', ...props }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      aria-label={children} // Optional: You can pass an aria-label for accessibility if the button text is unclear
      {...props} // Spread any additional props (e.g., disabled, aria attributes)
    >
      {children}
    </button>
  );
};

// Optional: Adding PropTypes for better debugging and code documentation
Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired, // Ensure onClick is a function
  className: PropTypes.string,
  type: PropTypes.string
};
