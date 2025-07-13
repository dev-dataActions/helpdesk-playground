import Link from "next/link";
import React from "react";
import { MdChevronRight } from "react-icons/md";
import { cn } from "../util/general.util";

export const Breadcrumbs = ({ breadcrumbs = [], className = "text-gray-600 hover:text-gray-800" }) => {
  return (
    <div className={cn("flex items-center gap-x-2", className)}>
      {breadcrumbs.map((bc) => (
        <React.Fragment key={bc?.name}>
          <Link
            className={`text-xxs ${!!bc?.href ? "hover:underline cursor-pointer" : "cursor-not-allowed"} truncate`}
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
