const Button = ({ children, className, ...props }) => (
  <button
    className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
