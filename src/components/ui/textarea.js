// src/components/ui/textarea.js

import React from 'react';

export const Textarea = ({ name, value, onChange, rows = 3, className = '' }) => {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      className={`border p-2 rounded w-full ${className}`}
    />
  );
};
