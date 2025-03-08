export const Label = ({ icon, text, children, className }) => {
  return (
    <span className={`flex items-center gap-x-2 text-xs ${className}`}>
      {icon}
      {text}
      {children}
    </span>
  );
};
