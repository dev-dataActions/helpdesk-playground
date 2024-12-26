interface ILabelProps {
  icon: React.ReactNode;
  text: string | undefined;
  className?: string;
}
export const Label: React.FC<ILabelProps> = ({ icon, text, className }) => {
  return (
    <span className={`flex items-center gap-x-3 text-sm ${className}`}>
      {icon}
      {text}
    </span>
  );
};
