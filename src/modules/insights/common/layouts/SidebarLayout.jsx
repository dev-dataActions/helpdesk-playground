import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { List } from "../functional/List";
import { IoHomeOutline } from "react-icons/io5";
import { PiBrainThin, PiTestTubeLight } from "react-icons/pi";
import { TenantDropdown } from "../../components/TenantDropdown";
import { useTenantId } from "../../hooks/useTenantId";
import { SiTemporal } from "react-icons/si";
import { IoChevronBackOutline } from "react-icons/io5";
import { useSidebarContext } from "../contexts/SidebarContext";
import { useAuth } from "../../../container/contexts/AuthContext";
import { IoLogOutOutline } from "react-icons/io5";

const UserDetails = ({ workspaceId }) => {
  const { tenantId, setTenantId } = useTenantId();

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="bg-white w-full rounded-md flex items-center justify-center">
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
        label: "Trialing Insights",
        href: "/insights",
        current: pathname?.includes("/insights"),
      },
    ],
    [pathname]
  );

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <div
        className={`h-screen w-64 fixed top-0 left-0 bg-[#25649A] border-r z-20 transition-transform duration-300 ease-in-out ${
          isCollapsed ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <UserDetails workspaceId={workspaceId} />
        <List items={navItems} className="px-4 py-2" />

        {/* Bottom controls */}
        <div className="absolute bottom-4 left-0 right-0 px-4 flex justify-between items-center">
          {/* Collapse button */}
          <button
            onClick={toggleSidebar}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-md transition-all duration-200 z-40 backdrop-blur-sm"
          >
            <IoChevronBackOutline
              size={16}
              className={`text-white transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`}
            />
          </button>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-all duration-200 backdrop-blur-sm group"
          >
            <IoLogOutOutline size={16} className="text-white group-hover:scale-110 transition-transform duration-200" />
            <span className="text-white text-xs group-hover:text-white/90 transition-colors duration-200">Logout</span>
          </button>
        </div>
      </div>

      <div className={`min-h-screen transition-all duration-300 ease-in-out ${isCollapsed ? "" : "md:pl-64"}`}>
        {children}
        {isCollapsed && (
          <button
            onClick={toggleSidebar}
            className="fixed bottom-4 left-4 p-1.5 bg-[#25649A] hover:bg-[#1e4f7a] rounded-md transition-colors duration-200 z-50 shadow-lg"
          >
            <IoChevronBackOutline size={16} className="text-white rotate-180" />
          </button>
        )}
      </div>
    </div>
  );
};
