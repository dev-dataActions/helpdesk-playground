import { Button } from "@/common/base/Button";

import { ReactNode } from "react";

interface PanelLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  onEdit?: () => void;
  editBtnLabel?: string;
  customButton?: ReactNode;
  className?: string;
}

export const PanelLayout = ({
  children,
  title,
  description,
  onEdit,
  editBtnLabel = "Edit",
  customButton,
  className,
}: PanelLayoutProps) => {
  return (
    <div className={`w-full ${className} px-6 py-4`}>
      {(title || onEdit || customButton) && (
        <div className="flex justify-between items-center mb-3">
          <div>
            <div className="text-lg lg:text-2xl text-left text-gray-800 mb-1">
              {title}
            </div>
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
      )}
      {children}
    </div>
  );
};
