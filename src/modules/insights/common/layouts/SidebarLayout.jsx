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

  return (
    <div>
      <div
        className={`h-screen w-64 fixed top-0 left-0 bg-[#25649A] border-r z-20 transition-transform duration-300 ease-in-out ${
          isCollapsed ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <UserDetails workspaceId={workspaceId} />
        <List items={navItems} className="px-4 py-2" />
        <button
          onClick={toggleSidebar}
          className="absolute bottom-4 left-4 p-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors duration-200 z-40"
        >
          <IoChevronBackOutline
            size={16}
            className={`text-white transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`}
          />
        </button>
      </div>
      <div className={`min-h-screen transition-all duration-300 ease-in-out ${isCollapsed ? "" : "md:pl-64"}`}>
        {children}
        {isCollapsed && (
          <button
            onClick={toggleSidebar}
            className="fixed bottom-4 left-4 p-3 bg-[#25649A] hover:bg-[#1e4f7a] rounded-md transition-colors duration-200 z-50 shadow-lg"
          >
            <IoChevronBackOutline size={20} className="text-white rotate-180" />
          </button>
        )}
      </div>
    </div>
  );
};
