import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { List } from "../functional/List";
import { IoIosArrowDown } from "react-icons/io";
import { IoGameControllerOutline, IoHomeOutline } from "react-icons/io5";
import { CiMoneyBill } from "react-icons/ci";
import { GoPeople } from "react-icons/go";
import { PiBrainThin } from "react-icons/pi";

const UserDetails = ({ username }) => {
  return (
    <div className="flex items-center border-b border-gray-400 h-12 px-3 gap-2">
      <p className="text-sm text-white font-semibold">{username}</p>
      <IoIosArrowDown size={12} className="text-white" />
    </div>
  );
};

export const SidebarLayout = ({ children }) => {
  const pathname = usePathname();

  const navItems = useMemo(
    () => [
      {
        id: 1,
        icon: <IoHomeOutline size={16} />,
        label: "Home",
        href: "/",
        current: pathname === "/",
      },
      {
        id: 2,
        icon: <GoPeople size={16} />,
        label: "Your inbox",
      },
      {
        id: 3,
        icon: <IoGameControllerOutline size={16} />,
        label: "Unassigned",
      },
      {
        id: 5,
        icon: <CiMoneyBill size={16} />,
        label: "Mentions",
      },
      {
        id: 6,
        icon: <PiBrainThin size={16} />,
        label: "Insights",
        href: "/insights",
        current: pathname?.includes("/insights"),
      },
    ],
    [pathname]
  );

  return (
    <div>
      <div className="h-screen w-64 fixed top-0 left-0 bg-gray-800 border-r">
        <UserDetails username="Organiser" />
        <List items={navItems} className="p-4" />
      </div>
      <div className="min-h-screen md:pl-64 bg-gray-50">{children}</div>
    </div>
  );
};
