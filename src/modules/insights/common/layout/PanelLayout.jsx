import { Button } from "../base/Button";
import { Breadcrumbs } from "../functional/Breadcrumbs";
import { FiChevronLeft } from "react-icons/fi";

export const PanelLayout = ({
  children,
  title,
  description,
  breadcrumbs,
  onEdit,
  editBtnLabel = "Edit",
  customButton,
  className,
  showBackButton,
}) => {
  return (
    <div className={`w-full ${className} p-5`}>
      {breadcrumbs?.length > 0 && (
        <div className="mb-3">
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
      )}
      {(title || onEdit || customButton) && (
        <>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-lg lg:text-xl text-left text-gray-800 mb-1 flex items-center gap-1">
                {showBackButton && (
                  <div
                    className="cursor-pointer hover:bg-gray-100 rounded-md p-1"
                    onClick={() => window?.history?.back?.()}
                  >
                    <FiChevronLeft size={20} />
                  </div>
                )}
                {title}
              </p>
              <p className={`${showBackButton ? "pl-8" : ""} font-light text-gray-600 text-sm`}>
                {description}
              </p>
            </div>
            <div>
              {onEdit && (
                <Button
                  label={editBtnLabel}
                  onClick={onEdit}
                  className={
                    "border border-gray-300 bg-gray-50 hover:bg-gray-100 !w-auto !leading-none !text-sm"
                  }
                />
              )}
              {customButton}
            </div>
          </div>
        </>
      )}
      {children}
    </div>
  );
};
