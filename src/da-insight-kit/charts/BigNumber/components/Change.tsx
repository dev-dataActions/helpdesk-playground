import { IoMdArrowDown, IoMdArrowUp } from "react-icons/io";

interface ChangeProps {
  change: number;
  changeType: string;
}

export const Change: React.FC<ChangeProps> = ({ change, changeType }) => {
  return (
    <span
      className={`${
        changeType === "negative" ? "text-rose-600" : "text-green-700"
      } text-sm flex items-center gap-0.5`}
    >
      {changeType === "positive" ? (
        <IoMdArrowUp color="green" size={12} />
      ) : (
        <IoMdArrowDown color="red" size={12} />
      )}
      {`${change}%`}
    </span>
  );
};
