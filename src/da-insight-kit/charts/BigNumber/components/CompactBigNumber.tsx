import { ReactNode } from "react";

interface CompactBigNumberProps {
  number: string | ReactNode;
  label: string;
  hideLabel?: boolean;
}

export const CompactBigNumber: React.FC<CompactBigNumberProps> = ({ number, label, hideLabel }) => {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="text-xl lg:text-lg w-full text-center text-gray-900">{number}</div>
      {!hideLabel && label && <div className="text-xs text-gray-600 text-center">{label}</div>}
    </div>
  );
};
