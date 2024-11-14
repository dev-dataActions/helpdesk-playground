export const Label = ({ icon, text, children, className }) => {
  return (
    <span className={`flex items-center gap-x-2 text-xxs text-gray-800 ${className}`}>
      {icon}
      {text}
      {children}
    </span>
  );
};
