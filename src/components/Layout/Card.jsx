const Card = ({ children, className }) => (
  <div className={`border rounded-lg shadow-md p-4 ${className}`}>
    {children}
  </div>
);

export default Card;
