import { IoIosArrowBack } from "react-icons/io";

function solve(str: string) {
  if (!str) return "";
  str = str.trim();
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const Breadcrumbs: React.FC<{
  breadcrumbs: { label: string }[];
  onBack: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}> = ({ breadcrumbs = [], onBack }) => {
  return (
    <div className="flex text-xxs font-medium text-gray-800 gap-x-1 items-center">
      {breadcrumbs.length > 1 && (
        <div
          onClick={onBack}
          className=" rounded-md hover:bg-gray-100 cursor-pointer"
        >
          <IoIosArrowBack size={16} />
        </div>
      )}
      {breadcrumbs.map((bc, index) => (
        <div key={index} className="flex flex-row items-center gap-x-1">
          <p className="mt-0 text-gray-400">{index > 0 ? "/" : ""}</p>
          <p>{solve(bc.label)}</p>
        </div>
      ))}
    </div>
  );
};
