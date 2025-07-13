import { Breadcrumbs } from "@/common/functional/Breadcrumbs";
import { useSidebarContext } from "@/modules/container/contexts/SidebarContext";

export const ScreenLayout = ({ breadcrumbs, children, actions, noPadding }) => {
  const { isSideBarOpen } = useSidebarContext();
  return (
    <div className="relative h-screen">
      <div
        className={`h-12 w-full border-b border-gray-300 bg-white ${
          isSideBarOpen ? "pl-8 md:pl-64" : "pl-7 pr-2 py-4"
        } fixed top-0 left-0 z-10 transition-all`}
      >
        <div className="h-full flex justify-between items-center pl-4 pr-2">
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          {actions}
        </div>
      </div>
      <div className={`h-full ${noPadding ? "pt-12" : "px-5 py-16"}`}>{children}</div>
    </div>
  );
};
