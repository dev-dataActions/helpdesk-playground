import { Transition } from "@headlessui/react";
import { useMemo, useState } from "react";
import { GoSidebarExpand, GoWorkflow } from "react-icons/go";
import { useRouter } from "next/router";
import { BsWindowSidebar } from "react-icons/bs";
import { Label } from "../base/Label";
import { PopUpMenu } from "../functional/PopUpMenu";
import { Button } from "../base/Button";
import { List } from "../functional/List";
import { SidebarContextProvider } from "../contexts/SidebarContext";
import { IoBarChartOutline } from "react-icons/io5";
import { TiGroupOutline } from "react-icons/ti";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const router = useRouter();
  const { pathname } = router;

  const navItems = useMemo(
    () => [
      {
        id: 1,
        label: <Label text="Workflows" icon={<GoWorkflow size={16} />} />,
        href: `/workflows`,
        current: pathname?.includes?.("/workflows"),
      },
      {
        id: 2,
        label: <Label text="Metrics" icon={<IoBarChartOutline size={16} />} />,
        href: `/metrics`,
        current: pathname?.includes?.("/metrics"),
      },
      {
        id: 3,
        label: <Label text="Tenants" icon={<TiGroupOutline size={18} />} />,
        href: `/tenants`,
        current: pathname?.includes?.("/tenants"),
      },
    ],
    [pathname]
  );

  return (
    <Transition.Root show={isOpen}>
      <div className="fixed top-0 left-0 z-30 w-60">
        <Transition.Child
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="flex flex-col h-screen bg-white border-r">
            <div className="flex justify-between items-center border-b h-12 px-3">
              <PopUpMenu
                label={
                  <div className="text-sm justify-around text-gray-800 flex items-center">
                    DataActions
                  </div>
                }
                menuItems={[]}
                menuAlign="left"
              />
              <Button
                label={<GoSidebarExpand size={14} />}
                onClick={() => setIsOpen(false)}
                className="!w-auto !p-0 cursor-pointer !shadow-none"
              />
            </div>
            <nav className="flex flex-col justify-between flex-grow p-4">
              <List items={navItems} />
            </nav>
          </div>
        </Transition.Child>
      </div>
    </Transition.Root>
  );
};

const BurgerMenu = ({ onBurgerMenuClick }) => {
  return (
    <div className="fixed top-3.5 mt-[2px] left-3.5 flex items-center justify-between z-30">
      <Button
        className="!p-0 !shadow-none"
        onClick={onBurgerMenuClick}
        label={<BsWindowSidebar size={16} />}
      />
    </div>
  );
};

export const SidebarLayout = ({ children }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  return (
    <div className="font-body bg-white min-h-screen">
      <BurgerMenu onBurgerMenuClick={() => setIsSideBarOpen(!isSideBarOpen)} />
      <Sidebar isOpen={isSideBarOpen} setIsOpen={setIsSideBarOpen} />
      <main
        className={`transition-all bg-gray-100 duration-500 min-h-screen ${
          isSideBarOpen ? "md:pl-60 md:pr-0" : "md:px-0"
        }`}
      >
        <SidebarContextProvider isSideBarOpen={isSideBarOpen}>
          {children}
        </SidebarContextProvider>
      </main>
    </div>
  );
};
