import React, { ReactElement } from "react";

export enum ValidDashboardColumns {
  ONE = "grid-cols-1",
  TWO = "grid-cols-2",
  FOUR = "grid-cols-4",
  SIX = "grid-cols-6",
  TWELVE = "grid-cols-12",
}

interface DashboardLayoutProps {
  title: string;
  children: ReactElement;
  cols: ValidDashboardColumns;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title = "Dashboard",
  cols = ValidDashboardColumns.SIX,
}) => {
  return (
    <div className="p-5">
      <div className="text-lg lg:text-2xl text-left font-semibold text-gray-800 mb-2">{title}</div>
      <div className={`grid ${cols} gap-4`}>{children}</div>
    </div>
  );
};
