import { IoIosArrowBack } from "react-icons/io";

export const Breadcrumbs = ({ breadcrumbs = [], onBack }) => {
  return (
    <div className="flex text-xxs font-medium text-gray-800 gap-x-1 items-center px-2">
      {breadcrumbs.length > 1 && (
        <div onClick={onBack} className="p-1 rounded-md hover:bg-gray-100 cursor-pointer">
          <IoIosArrowBack size={16} />
        </div>
      )}
      {breadcrumbs.map((bc, index) => (
        <>
          <p>{index > 0 ? "/" : ""}</p>
          <p>{bc}</p>
        </>
      ))}
    </div>
  );
};
