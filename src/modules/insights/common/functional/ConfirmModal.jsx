import React from "react";
import { Button } from "@/common/base/Button";

/**
 * Generic confirmation modal component for reusable confirmation dialogs
 *
 * @param {Object} props - Component props
 * @param {string} props.title - The title of the confirmation dialog
 * @param {string|React.ReactNode} props.message - The confirmation message (supports HTML/JSX)
 * @param {string} props.confirmText - Text for the confirm button (default: "Confirm")
 * @param {string} props.cancelText - Text for the cancel button (default: "Cancel")
 * @param {string} props.confirmButtonVariant - Styling variant for confirm button ("danger" | "primary" | "secondary")
 * @param {string} props.cancelButtonVariant - Styling variant for cancel button ("primary" | "secondary")
 * @param {Function} props.onConfirm - Callback function when user confirms
 * @param {Function} props.onCancel - Callback function when user cancels
 * @param {boolean} props.isLoading - Whether the confirm action is in progress
 * @param {string} props.loadingText - Text to show on confirm button when loading
 * @param {boolean} props.disableConfirm - Whether to disable the confirm button
 * @param {string} props.size - Modal size class (default: "w-96")
 */
export const ConfirmModal = ({
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmButtonVariant = "primary",
  cancelButtonVariant = "secondary",
  onConfirm,
  onCancel,
  isLoading = false,
  loadingText = "Processing...",
  disableConfirm = false,
  size = "w-96",
}) => {
  const getButtonStyles = (variant, isConfirm = false) => {
    const baseStyles = "px-4 py-2 border transition-colors";

    switch (variant) {
      case "danger":
        return `${baseStyles} border-red-500 bg-red-500 hover:bg-red-600 text-white`;
      case "primary":
        return `${baseStyles} border-blue-500 bg-blue-500 hover:bg-blue-600 text-white`;
      case "secondary":
        return `${baseStyles} border-gray-300 bg-white hover:bg-gray-50 text-gray-700`;
      default:
        return isConfirm
          ? `${baseStyles} border-blue-500 bg-blue-500 hover:bg-blue-600 text-white`
          : `${baseStyles} border-gray-300 bg-white hover:bg-gray-50 text-gray-700`;
    }
  };

  const handleConfirm = async () => {
    if (onConfirm && !isLoading && !disableConfirm) {
      await onConfirm();
    }
  };

  const handleCancel = () => {
    if (onCancel && !isLoading) {
      onCancel();
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-gray-700 text-sm">{typeof message === "string" ? message : message}</p>
      <div className="flex gap-3 justify-end">
        <Button
          label={cancelText}
          onClick={handleCancel}
          disabled={isLoading}
          className={getButtonStyles(cancelButtonVariant)}
        />
        <Button
          label={isLoading ? loadingText : confirmText}
          onClick={handleConfirm}
          disabled={isLoading || disableConfirm}
          className={getButtonStyles(confirmButtonVariant, true)}
        />
      </div>
    </div>
  );
};
