import React, { ReactElement } from "react";

export enum ValidDashboardColumns {
  ONE = "grid-cols-1",
  TWO = "grid-cols-2",
  FOUR = "grid-cols-4",
  SIX = "grid-cols-6",
  TWELVE = "grid-cols-12",
}

interface DashboardLayoutProps {
  title: string | ReactElement;
  description?: string;
  children: ReactElement | ReactElement[];
  cols?: ValidDashboardColumns;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title = "Dashboard",
  description = "",
  cols,
}) => {
  return (
    <div className="w-full">
      <div className="text-lg lg:text-2xl text-left text-gray-800">{title}</div>
      <p className="mb-3 font-light text-gray-600 text-sm">{description}</p>
      <div className={`grid ${cols} gap-4`}>{children}</div>
    </div>
  );
};
