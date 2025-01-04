import { ReactNode, useMemo } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoGameControllerOutline, IoHomeOutline } from "react-icons/io5";
import { CiMoneyBill } from "react-icons/ci";
import { usePathname } from "next/navigation";
import { GoPeople } from "react-icons/go";
import { PiBrainThin } from "react-icons/pi";
import { List } from "../common/List";

interface ISidebarLayoutProps {
  children: ReactNode;
}

const UserDetails: React.FC<{ username: string }> = ({ username }) => {
  return (
    <div className="flex items-center border-b h-12 px-3 gap-2">
      <p className="text-sm">{username}</p>
      <IoIosArrowDown size={12} />
    </div>
  );
};

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
        label: "Workflows",
        href: "/workflows",
        current: pathname?.includes("/workflows"),
      },
    ],
    [pathname]
  );

  return (
    <div className="bg-gray-100">
      <div className="h-screen w-64 fixed top-0 left-0 bg-white border-r">
        <UserDetails username="Organiser" />
        <List items={navItems} className="p-4" />
      </div>
      <div className="min-h-screen md:pl-64">{children}</div>
    </div>
  );
};
