// src/components/ui/input.js
import React from 'react';
import PropTypes from 'prop-types';

export const Input = ({
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  className = '',
  ariaLabel,
  ariaLabelledby,
  ...props
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      className={`border p-2 rounded w-full ${className}`}
      {...props}
    />
  );
};

// PropTypes for better type-checking and documentation
Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
  ariaLabelledby: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  placeholder: '',
  className: '',
};
