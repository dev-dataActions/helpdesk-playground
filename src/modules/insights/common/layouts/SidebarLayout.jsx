import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { List } from "../functional/List";
import { IoHomeOutline } from "react-icons/io5";
import { PiBrainThin, PiTestTubeLight } from "react-icons/pi";
import { TenantDropdown } from "../../components/TenantDropdown";
import { useTenantId } from "../../hooks/useTenantId";
import { SiTemporal } from "react-icons/si";

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
      <div className="h-screen w-64 fixed top-0 left-0 bg-[#25649A] border-r z-20">
        <UserDetails workspaceId={workspaceId} />
        <List items={navItems} className="px-4 py-2" />
      </div>
      <div className="min-h-screen md:pl-64">{children}</div>
    </div>
  );
};
