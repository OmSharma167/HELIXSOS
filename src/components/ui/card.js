import React from 'react';
import PropTypes from 'prop-types';

// Card Component
export const Card = ({ children, className = '', ...props }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg p-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

// CardHeader Component
export const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <header className={`border-b pb-2 mb-4 ${className}`} {...props}>
      {children}
    </header>
  );
};

// CardTitle Component
export const CardTitle = ({ children, className = '', ...props }) => {
  return (
    <h2 className={`text-lg font-bold ${className}`} {...props}>
      {children}
    </h2>
  );
};

// CardContent Component
export const CardContent = ({ children, className = '', ...props }) => {
  return (
    <section className={className} {...props}>
      {children}
    </section>
  );
};

// Optional: Adding PropTypes for better debugging and code documentation
Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
