export const Label = ({ icon, text, children, className }) => {
  return (
    <span className={`flex items-center gap-x-3 text-sm ${className}`}>
      {icon}
      {text}
      {children}
    </span>
  );
};
