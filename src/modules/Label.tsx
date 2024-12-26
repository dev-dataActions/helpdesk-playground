export const Label = ({ icon, text, className }) => {
  return (
    <span className={`flex items-center gap-x-3 text-sm ${className}`}>
      {icon}
      {text}
    </span>
  );
};
