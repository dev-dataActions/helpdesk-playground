import Link from "next/link";
import React from "react";
import { MdChevronRight } from "react-icons/md";

export const Breadcrumbs = ({ breadcrumbs = [] }) => {
  return (
    <div className="flex items-center gap-x-2">
      {breadcrumbs.map((bc) => (
        <React.Fragment key={bc?.name}>
          <Link
            className={`text-xxs text-gray-600 hover:text-gray-700 ${
              !!bc?.href ? "hover:underline cursor-pointer" : "cursor-not-allowed"
            } truncate`}
            href={bc?.href ?? "#"}
          >
            {bc?.name}
          </Link>
          <MdChevronRight size={16} />
        </React.Fragment>
      ))}
    </div>
  );
};
