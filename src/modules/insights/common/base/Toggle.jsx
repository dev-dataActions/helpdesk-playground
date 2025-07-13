import { cn } from "@/common/util/general.util";
import Switch from "@mui/material/Switch";
import { useEffect, useState } from "react";

export const Toggle = ({ defaultChecked = false, handleClick, className }) => {
  const [checked, setChecked] = useState(defaultChecked);

  useEffect(() => {
    setChecked(defaultChecked);
  }, [defaultChecked]);

  return (
    <Switch
      size="small"
      className={cn("-mr-2", className)}
      checked={checked}
      onClick={() => {
        handleClick(!checked);
        setChecked(!checked);
      }}
    />
  );
};
