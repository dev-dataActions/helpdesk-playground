import { ReactNode, useMemo } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoGameControllerOutline, IoHomeOutline } from "react-icons/io5";
import { CiMoneyBill } from "react-icons/ci";
import { usePathname } from "next/navigation";
import { GoPeople } from "react-icons/go";
import { PiBrainThin } from "react-icons/pi";
import { List } from "./List";

interface ISidebarLayoutProps {
  children: ReactNode;
}

export const SidebarLayout: React.FC<ISidebarLayoutProps> = ({ children }) => {
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
        label: "Players",
      },
      {
        id: 3,
        icon: <IoGameControllerOutline size={16} />,
        label: "Tournaments",
      },
      {
        id: 5,
        icon: <CiMoneyBill size={16} />,
        label: "Sponsers",
      },
      {
        id: 6,
        icon: <PiBrainThin size={16} />,
        label: "Insights",
        href: "/insights",
        current: pathname.includes("/insights"),
      },
    ],
    [pathname]
  );

  return (
    <div className="bg-gray-100">
      <div className="fixed top-0 left-0 z-30 w-64 h-screen bg-white border-r">
        <div className="flex items-center border-b h-12 px-3 gap-2">
          <p className="text-sm">Organiser</p>
          <IoIosArrowDown size={12} />
        </div>
        <nav className="flex flex-col justify-between flex-grow p-4">
          <List items={navItems} />
        </nav>
      </div>
      <div className="min-h-screen md:pl-64">{children}</div>
    </div>
  );
};
