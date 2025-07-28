import { Breadcrumbs } from "../functional/Breadcrumbs";
import { useSidebarContext } from "../contexts/SidebarContext";

export const ScreenLayout = ({ breadcrumbs, children, actions, noPadding }) => {
  const { isCollapsed } = useSidebarContext() ?? {};
  return (
    <div className="relative h-screen">
      <div
        className={`${
          isCollapsed ? "pl-0" : "md:pl-64"
        } h-12 w-full border-b border-gray-300 fixed top-0 left-0 z-10 transition-all bg-[#25649A] text-white`}
      >
        <div className="h-full flex justify-between items-center pl-4 pr-1">
          <Breadcrumbs breadcrumbs={breadcrumbs} className="text-white" />
          {actions}
        </div>
      </div>
      <div className={`h-full ${noPadding ? "pt-12" : "px-5 py-16"}`}>{children}</div>
    </div>
  );
};
