import { Breadcrumbs } from "../functional/Breadcrumbs";

export const ScreenLayout = ({ breadcrumbs, children, actions, noPadding }) => {
  return (
    <div className="relative h-screen">
      <div
        className={`h-12 w-full border-b border-gray-300 pl-8 md:pl-64 fixed top-0 left-0 z-10 transition-all bg-gray-800 text-white`}
      >
        <div className="h-full flex justify-between items-center pl-4 pr-2">
          <Breadcrumbs breadcrumbs={breadcrumbs} className="text-white" />
          {actions}
        </div>
      </div>
      <div className={`h-full ${noPadding ? "pt-12" : "px-5 py-16"}`}>{children}</div>
    </div>
  );
};
