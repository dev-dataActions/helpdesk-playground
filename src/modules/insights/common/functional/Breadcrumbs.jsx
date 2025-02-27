import React from "react";
import { MdChevronRight } from "react-icons/md";

export const Breadcrumbs = ({ breadcrumbs = [] }) => {
  return (
    <div className="flex items-center gap-x-2">
      {breadcrumbs.map((bc) => (
        <React.Fragment key={bc}>
          <a
            className="text-xxs text-gray-600 hover:text-gray-700 hover:underline cursor-pointer"
            href={bc?.href ?? "#"}
          >
            {bc?.name}
          </a>
          <MdChevronRight size={16} />
        </React.Fragment>
      ))}
    </div>
  );
};
