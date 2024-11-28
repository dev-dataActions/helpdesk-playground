import { IoIosArrowBack } from "react-icons/io";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

export const Breadcrumbs = ({ breadcrumbs = [], onBack }) => {
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
        <div className="flex flex-row items-center gap-x-1">
          <p className="mt-1">
            {index > 0 ? <MdKeyboardDoubleArrowRight size={15} /> : ""}
          </p>
          <p>{bc.label}</p>
        </div>
      ))}
    </div>
  );
};
