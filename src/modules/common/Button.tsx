import { ReactElement } from "react";

interface ButtonProps {
  onClick: (...args: never) => void;
  label: string | ReactElement;
  className?: string;
  type?: never;
}

export const Button: React.FC<ButtonProps> = ({ onClick, label, className, type }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex w-full justify-center items-center rounded-md px-3 py-1.5 text-sm leading-6 shadow-sm ${className}`}
    >
      {label}
    </button>
  );
};
