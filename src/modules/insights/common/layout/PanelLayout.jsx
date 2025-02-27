import { Button } from "../base/Button";
import { Breadcrumbs } from "../functional/Breadcrumbs";

export const PanelLayout = ({
  children,
  title,
  description,
  breadcrumbs,
  onEdit,
  editBtnLabel = "Edit",
  customButton,
  className,
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
              <p className="text-lg lg:text-xl text-left text-gray-800 mb-1">{title}</p>
              <p className="font-light text-gray-600 text-sm">{description}</p>
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
          <div className="border-gray-300 border-b mb-4"></div>
        </>
      )}
      {children}
    </div>
  );
};
