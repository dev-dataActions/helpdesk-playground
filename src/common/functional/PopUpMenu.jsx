import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { classNames } from "../utils/general.util";

export const PopUpMenu = ({ menuItems = [], label, menuAlign = "right", className = "" }) => {
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center">{label}</Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={`absolute ${
              menuAlign === "right" ? "right-0" : "left-0"
            } mt-1 min-w-36 origin-top-right rounded-md overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 border border-gray-300 focus:outline-none z-40`}
          >
            {menuItems.map((item, index) => (
              <Menu.Item key={index}>
                {({ active }) =>
                  item.component ?? (
                    <button
                      onClick={item.onClick}
                      className={`${classNames(
                        active ? "bg-gray-100" : "",
                        `w-full px-3 py-2 text-xxs ${
                          index < menuItems.length - 1 ? "border-b" : ""
                        } hover:bg-gray-100`
                      )} ${className}`}
                    >
                      {item.name}
                    </button>
                  )
                }
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
