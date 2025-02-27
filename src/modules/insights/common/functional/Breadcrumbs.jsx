import React from "react";
import { MdChevronRight } from "react-icons/md";

export const Breadcrumbs = ({ breadcrumbs = [], onClick = () => {} }) => {
  return (
    <div className="flex items-center gap-x-2">
      {breadcrumbs.map((bc) => (
        <React.Fragment key={bc}>
          <p
            className="text-xxs text-gray-600 hover:text-gray-700 hover:underline cursor-pointer"
            onClick={() => onClick(bc)}
          >
            {bc.name}
          </p>
          <MdChevronRight size={16} />
        </React.Fragment>
      ))}
    </div>
  );
};
