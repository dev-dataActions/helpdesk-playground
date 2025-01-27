import { useRouter } from "next/router";
import { useSidebarContext } from "../contexts/SidebarContext";
import { Breadcrumbs } from "../functional/Breadcrumbs";
export const ScreenLayout = ({ breadcrumbs, children, actions }) => {
  const router = useRouter();
  const { isSideBarOpen } = useSidebarContext();
  return (
    <div className="relative">
      <div
        className={`h-12 w-full bg-white border-b ${
          isSideBarOpen ? "pl-8 pr-3 md:pl-60" : "pl-3 pr-4 py-4"
        } fixed top-0 left-0 z-10 transition-all`}
      >
        <div className="h-full flex justify-between items-center">
          <Breadcrumbs breadcrumbs={breadcrumbs} onBack={() => router.back()} />
          {actions}
        </div>
      </div>
      <div className="min-h-screen px-4 pt-16">{children}</div>
    </div>
  );
};
