import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { List } from "../functional/List";
import { IoGameControllerOutline, IoHomeOutline } from "react-icons/io5";
import { CiMoneyBill } from "react-icons/ci";
import { GoPeople } from "react-icons/go";
import { PiBrainThin } from "react-icons/pi";
import { TenantDropdown } from "../../components/TenantDropdown";
import { useTenantId } from "../../hooks/useTenantId";

const UserDetails = ({ workspaceId }) => {
  const { tenantId, setTenantId } = useTenantId();
  return (
    <div className="flex items-center border-b h-12 px-1.5">
      <TenantDropdown workspaceId={workspaceId} tenantId={tenantId} setTenantId={setTenantId} />
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
      <div className="h-screen w-64 fixed top-0 left-0 bg-gray-800 border-r z-20">
        <UserDetails workspaceId={workspaceId} />
        <List items={navItems} className="p-4" />
      </div>
      <div className="min-h-screen md:pl-64">{children}</div>
    </div>
  );
};
