import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { List } from "da-apps-sdk";
import { IoHomeOutline } from "react-icons/io5";
import { PiBrainThin, PiTestTubeLight } from "react-icons/pi";
import { TenantDropdown } from "../../insights/components/TenantDropdown";
import { useTenantId } from "../../insights/hooks/useTenantId";
import { SiTemporal } from "react-icons/si";
import { IoChevronBackOutline } from "react-icons/io5";
import { useSidebarContext } from "../contexts/SidebarContext";
import { useAuth } from "../contexts/AuthContext";

const UserDetails = ({ workspaceId }) => {
  const { tenantId, setTenantId } = useTenantId();

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="bg-white border border-gray-300 w-full rounded-md flex items-center justify-center">
        <img src="/Piatrika-logo.png" alt="logo" className="w-[60%] py-2" />
      </div>
      <div className="w-full">
        <TenantDropdown workspaceId={workspaceId} tenantId={tenantId} setTenantId={setTenantId} />
      </div>
    </div>
  );
};

export const SidebarLayout = ({ children }) => {
  const workspaceId = process.env.NEXT_PUBLIC_WORKSPACE_ID;
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebarContext();
  const { logout } = useAuth();

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
        icon: <PiTestTubeLight size={16} />,
        label: "Trail Genie",
      },
      {
        id: 3,
        icon: <SiTemporal size={16} />,
        label: "Product Genie",
      },
      {
        id: 6,
        icon: <PiBrainThin size={16} />,
        label: "Trialing & Ops Insights",
        href: "/insights",
        current: pathname?.includes("/insights"),
      },
    ],
    [pathname]
  );

  // const handleLogout = () => {
  //   logout();
  // };

  return (
    <div>
      <div
        className={`h-screen w-64 fixed top-0 left-0 bg-[#ffffff] border-r z-20 transition-transform duration-500 ease-in-out ${
          isCollapsed ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <UserDetails workspaceId={workspaceId} />
        <List items={navItems} className="px-4 py-2" />

        {/* Bottom controls */}
        <div className="absolute bottom-4 left-0 right-0 px-4 flex justify-between items-center z-50">
          {/* Collapse button */}
          <button
            onClick={toggleSidebar}
            className="p-1.5 border border-gray-200 hover:bg-gray-50 rounded-md transition-all duration-200 z-40 backdrop-blur-sm"
          >
            <IoChevronBackOutline
              size={16}
              className={`text-gray-600 transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`}
            />
          </button>

          {/* Logout button */}
          {/* <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 border border-gray-200 hover:bg-gray-50 rounded-md transition-all duration-200 backdrop-blur-sm group z-50"
          >
            <IoLogOutOutline size={16} className="text-black transition-transform duration-200" />
            <span className="text-gray-600 text-xs group-hover:text-gray-800 transition-colors duration-200">
              Logout
            </span>
          </button> */}
        </div>
      </div>

      <div
        className={`min-h-screen transition-all bg-[#fdfcfc] duration-500 ease-in-out ${isCollapsed ? "" : "md:pl-64"}`}
      >
        {children}
        {isCollapsed && (
          <button
            onClick={toggleSidebar}
            className="bg-white fixed bottom-5 left-4 p-1.5 border border-gray-300 hover:bg-gray-50 rounded-md transition-colors duration-300 z-50 shadow-lg"
          >
            <IoChevronBackOutline size={16} className="text-gray-600 rotate-180" />
          </button>
        )}
      </div>
    </div>
  );
};
