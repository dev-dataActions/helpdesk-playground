import { cn } from "../util/general.util";

export const Button = ({ onClick, label, className, disabled, ...rest }) => {
  return (
    <button
      type="button"
      onClick={(e) => !disabled && onClick && onClick(e)}
      className={cn(
        "text-center rounded-md px-3 py-1.5 text-xs",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className
      )}
      {...rest}
    >
      {label}
    </button>
  );
};
