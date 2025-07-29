import { Breadcrumbs } from "../functional/Breadcrumbs";
import { cn } from "../util/general.util";
import { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { HiPencil } from "react-icons/hi2";

export const PanelLayout = ({
  title,
  onEditTitle,
  description,
  onEditDescription,
  onSave,
  breadcrumbs,
  customButton,
  className,
  children,
  showBackButton,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  return (
    <div className={cn("w-full md:px-4 md:py-4 flex flex-col", className)}>
      {breadcrumbs?.length > 0 && (
        <div className="mb-3">
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
      )}
      {(title !== undefined || description !== undefined || customButton !== undefined) && (
        <div className="flex justify-between items-center mb-2 gap-3">
          <div className="grow">
            <div className="text-xl md:text-2xl font-bold text-left text-gray-800 mb-1 w-full">
              {!isEditingTitle ? (
                <div
                  onClick={() => setIsEditingTitle(!!onEditTitle && true)}
                  className="flex items-center gap-2 relative group"
                >
                  {showBackButton && (
                    <div
                      className="cursor-pointer hover:bg-gray-100 rounded-md p-1 absolute -left-9 top-0.5"
                      onClick={() => window?.history?.back?.()}
                    >
                      <FiChevronLeft size={20} />
                    </div>
                  )}
                  {title || (!!onEditTitle ? "Untitled" : null)}
                  {!!onEditTitle && (
                    <HiPencil size={16} className="mt-1 text-gray-400 invisible group-hover:visible cursor-pointer" />
                  )}
                </div>
              ) : (
                <input
                  value={title}
                  onChange={(e) => onEditTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setIsEditingTitle(false);
                      onSave?.(title, description);
                    }
                  }}
                  onBlur={() => {
                    setIsEditingTitle(false);
                    onSave?.(title, description);
                  }}
                  className="focus:outline-none w-full"
                  autoFocus
                />
              )}
            </div>

            <div className="text-gray-600 text-sm w-full font-light">
              {!isEditingDescription ? (
                <p
                  onClick={() => setIsEditingDescription(!!onEditDescription && true)}
                  className="flex items-center gap-2 relative group"
                >
                  {description || (!!onEditDescription ? "Click to add description" : null)}
                  {!!onEditDescription && (
                    <HiPencil size={12} className="text-gray-400 invisible group-hover:visible cursor-pointer" />
                  )}
                </p>
              ) : (
                <input
                  value={description}
                  onChange={(e) => onEditDescription(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setIsEditingDescription(false);
                      onSave?.(title, description);
                    }
                  }}
                  onBlur={() => {
                    setIsEditingDescription(false);
                    onSave?.(title, description);
                  }}
                  className="focus:outline-none block w-full"
                  autoFocus
                />
              )}
            </div>
          </div>
          <div>{customButton}</div>
        </div>
      )}
      <div className="flex-grow min-h-0">{children}</div>
    </div>
  );
};
