import { FiBook } from "react-icons/fi";
import { List } from "./List";
import { ReactNode } from "react";

export const SidebarLayout = ({ children }: { children: ReactNode }) => {
  const navItems = [
    {
      id: 1,
      icon: <FiBook size={16} />,
      label: "Analytics",
      current: true,
    },
    {
      id: 2,
      icon: <FiBook size={16} />,
      label: "Orders",
    },
    {
      id: 3,
      icon: <FiBook size={16} />,
      label: "Bookings",
    },
    {
      id: 4,
      icon: <FiBook size={16} />,
      label: "Reviews",
    },
  ];
  return (
    <div className="relative bg-gray-100">
      <div className="fixed top-0 left-0 z-30 w-56">
        <div className="flex flex-col h-screen bg-gray-800 border-r">
          <div className="flex justify-between items-center border-b h-12 px-3">
            <p className="text-white">UberEats</p>
          </div>

          <nav className="flex flex-col justify-between flex-grow p-4">
            <List items={navItems} />
          </nav>
        </div>
      </div>

      <div
        className={`transition-all h-12 w-full md:pl-56 px-4 fixed top-0 left-0 z-10 border-b border-gray-400`}
      >
        <div className="px-5 h-full flex items-center">
          <p>Analytics</p>
        </div>
      </div>
      <div className="min-h-screen md:pl-56 pt-12">{children}</div>
    </div>
  );
};
