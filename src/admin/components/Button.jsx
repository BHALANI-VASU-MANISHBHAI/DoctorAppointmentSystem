/**
 * Simple Button Component
 */
function Button({ children, className = "", type = "button", ...props }) {
  const baseClass = "px-4 py-2 rounded-lg font-medium transition-all duration-200";
  
  return (
    <button type={type} className={`${baseClass} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;