import React from "react";
import { PopupWrapper } from "./PopupWrapper";
import { Button } from "../base/Button";
import { cn } from "../util/general.util";

const Menu = ({ menuItems = [], close }) => {
  return (
    <div className="min-w-48 rounded-md max-h-96 overflow-auto bg-white border border-gray-300 z-40 flex flex-col">
      {menuItems.map((item, index) =>
        item.component ? (
          <React.Fragment key={index}>{item.component}</React.Fragment>
        ) : (
          <Button
            key={index}
            label={item.name}
            onClick={() => {
              item.onClick?.();
              close?.();
            }}
            disabled={item.disabled}
            className={cn(
              "px-4 py-2 text-xxs text-left rounded-none",
              index < menuItems.length - 1 ? "border-b" : "",
              item.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-gray-100 hover:text-gray-800"
            )}
          />
        )
      )}
    </div>
  );
};

export const PopUpMenu = ({
  menuItems = [],
  label,
  fullWidth,
  align = "left",
  top = 0,
  right = 0,
  left = 0,
  bottom = 0,
}) => {
  return (
    <PopupWrapper
      trigger={<Button className={`${fullWidth ? "w-full" : "w-auto"} px-0 py-0`} label={label} />}
      align={align}
      top={top}
      right={right}
      left={left}
      bottom={bottom}
    >
      <Menu menuItems={menuItems} />
    </PopupWrapper>
  );
};
