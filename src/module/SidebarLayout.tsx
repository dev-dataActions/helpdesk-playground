import { FiBook } from "react-icons/fi";
import { List } from "./List";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { CiGlobe } from "react-icons/ci";
import { BiMessageRounded } from "react-icons/bi";
import { GiMoneyStack } from "react-icons/gi";
import { TbDatabaseExport } from "react-icons/tb";
import { LuUsers } from "react-icons/lu";
import { MdDragIndicator } from "react-icons/md";
import { CgInsights } from "react-icons/cg";
import { Breadcrumbs } from "../da-insight-kit/common/Breadcrumbs";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

export const SidebarLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [showSubItems, setShowSubItems] = useState(false);

  const createPathArray = () => {
    if (!pathname) return [];
    return pathname
      .split("/")
      .filter(Boolean)
      .map((segment, index) => ({
        label: segment,
        id: index + 1,
      }));
  };

  const subNavItems = [
    {
      id: 7,
      icon: <LuUsers size={16} />,
      href: "/insights/organisers",
      label: "Organisers",
      current: pathname.includes("/organisers"),
    },
    {
      id: 8,
      icon: <MdDragIndicator size={16} />,
      href: "/insights/sponsers",
      label: "Sponsers",
      current: pathname.includes("/sponsers"),
    },
  ];

  const Insight = () => {
    return (
      <div
        className="flex justify-around text-sm w-[60%] items-center cursor-pointer"
        onClick={() => setShowSubItems((prev) => !prev)}
      >
        <CgInsights size={16} />
        <p>Insights</p>
        <IoIosArrowDown
          size={15}
          className={`transition-transform duration-300 ease-in-out ${
            showSubItems ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
    );
  };

  const navItems = useMemo(
    () => [
      {
        id: 1,
        icon: <IoHomeOutline size={16} />,
        href: "/",
        label: "Home",
        current: pathname.length === 1,
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
        id: 5,
        icon: <TbDatabaseExport size={16} />,
        label: "Export",
      },
      {
        id: 6,
        component: <Insight />,
      },
    ],
    [pathname, showSubItems]
  );

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
            {showSubItems && (
              <nav className="flex flex-col justify-between flex-grow p-4">
                <List items={subNavItems} />
              </nav>
            )}
          </nav>
        </div>
      </div>

      <div
        className={`transition-all h-12 w-full md:pl-64 px-4 fixed top-0 left-0 z-10 bg-white border border-b`}
      >
        <div className="px-5 h-full flex items-center text-sm">
          <Breadcrumbs
            onBack={() => router.back()}
            breadcrumbs={createPathArray()}
          />
        </div>
      </div>
      <div className="min-h-screen md:pl-64 pt-12">{children}</div>
    </div>
  );
};



