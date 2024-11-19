import { FiBook } from "react-icons/fi";
import { List } from "./List";
import { ReactNode } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { CiGlobe } from "react-icons/ci";
import { FaRegMessage } from "react-icons/fa6";
import { BiMessageRounded } from "react-icons/bi";
import { GiMoneyStack } from "react-icons/gi";
import { TbDatabaseExport } from "react-icons/tb";
import { CgInsights } from "react-icons/cg";

export const SidebarLayout = ({ children }: { children: ReactNode }) => {
  const navItems = [
    {
      id: 1,
      icon: <IoHomeOutline size={16} />,
      label: "Home",
    },
    {
      id: 2,
      icon: <CiGlobe size={16} />,
      label: "Geography",
    },
    {
      id: 3,
      icon: <BiMessageRounded size={16} />,
      label: "Tournament",
    },
    {
      id: 4,
      icon: <GiMoneyStack size={16} />,
      label: "Sponsers",
    },
    {
      id: 5,
      icon: <TbDatabaseExport size={16} />,
      label: "Export",
    },
    {
      id: 6,
      icon: <CgInsights size={16} />,
      href: "/",
      label: "Insights",
      current: true,
    },
  ];
  return (
    <div className="relative bg-gray-100">
      <div className="fixed top-0 left-0 z-30 w-64">
        <div className="flex flex-col h-screen bg-white border-r">
          <div className="flex items-center border-b h-12 px-3 gap-2">
            <p className="text-sm">Organiser</p>
            <IoIosArrowDown size={12} />
          </div>

          <nav className="flex flex-col justify-between flex-grow p-4">
            <List items={navItems} />
          </nav>
        </div>
      </div>

      <div
        className={`transition-all h-12 w-full md:pl-64 px-4 fixed top-0 left-0 z-10 bg-white border border-b`}
      >
        <div className="px-5 h-full flex items-center text-sm">
          <p>Insights</p>
        </div>
      </div>
      <div className="min-h-screen md:pl-64 pt-12">{children}</div>
    </div>
  );
};
