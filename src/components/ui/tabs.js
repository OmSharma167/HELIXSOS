import React, { useState } from 'react';

// Main Tabs component that manages the active tab state
export const Tabs = ({ defaultValue, children }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const handleTabChange = (newValue) => {
    setActiveTab(newValue);
  };

  // Clone each child and pass activeTab and onTabChange props
  return (
    <div>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            activeTab,
            onTabChange: handleTabChange, // Make sure this is correctly passed
          });
        }
        return child;
      })}
    </div>
  );
};

// TabsList for rendering the list of tab triggers
export const TabsList = ({ children, className = '' }) => {
  return <div className={`flex space-x-2 ${className}`}>{children}</div>;
};

// Tab trigger that allows the user to switch tabs
export const TabsTrigger = ({ value, activeTab, onTabChange, children }) => {
  const isActive = activeTab === value;
  return (
    <button
      onClick={() => onTabChange(value)} // Calls the passed function
      className={`p-2 border-b-2 ${isActive ? 'border-blue-500 font-bold' : 'border-transparent'}`}
    >
      {children}
    </button>
  );
};

// TabsContent for rendering the content of the active tab
export const TabsContent = ({ value, activeTab, children }) => {
  return activeTab === value ? <div>{children}</div> : null;
};
