import { cn } from "@/common/util/general.util";

export const Label = ({ icon, text, className, labelFirst }) => {
  return (
    <span className={cn("w-full flex items-center gap-2 text-xs text-gray-800", className)}>
      {labelFirst ? (
        <>
          {text}
          {icon}
        </>
      ) : (
        <>
          {icon}
          {text}
        </>
      )}
    </span>
  );
};
