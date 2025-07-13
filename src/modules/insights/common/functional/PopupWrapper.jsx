import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

let activePopupId = null;

export const PopupWrapper = ({
  trigger,
  align = "left",
  top = 0,
  right = 0,
  left = 0,
  bottom = 0,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef(null);
  const popupRef = useRef(null);
  const popupId = useRef(Math.random().toString(36).substr(2, 9));

  useEffect(() => {
    setMounted(true);

    const handleClickOutside = (e) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
        activePopupId = null;
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      activePopupId = popupId.current;
      requestAnimationFrame(updatePosition);
    }
  }, [isOpen]);

  const updatePosition = () => {
    const button = buttonRef.current;
    const popup = popupRef.current;
    if (!button || !popup) return;

    const spacing = 1.5;
    const buttonRect = button.getBoundingClientRect();

    // Temporarily show popup to measure dimensions
    popup.style.visibility = "hidden";
    popup.style.display = "block";
    const popupRect = popup.getBoundingClientRect();
    popup.style.visibility = "";
    popup.style.display = "";

    // Vertical positioning
    const fitsBottom = window.innerHeight - buttonRect.bottom >= popupRect.height + spacing;
    const fitsTop = buttonRect.top >= popupRect.height + spacing;

    const _top = fitsBottom
      ? buttonRect.bottom + spacing
      : fitsTop
      ? buttonRect.top - popupRect.height - spacing
      : Math.max(spacing, window.innerHeight - popupRect.height - spacing);

    popup.style.top = `${_top + window.scrollY + top - bottom}px`;

    // Horizontal positioning
    const buttonLeft = buttonRect.left;
    const buttonRight = buttonRect.right;
    const popupWidth = popupRect.width;

    const canBeLeftAligned = buttonLeft + popupWidth <= window.innerWidth;

    if (canBeLeftAligned && align === "left") {
      popup.style.left = `${buttonLeft + window.scrollX + left}px`;
    } else {
      popup.style.right = `${window.innerWidth - buttonRight + window.scrollX + right}px`;
    }
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    const newState = !isOpen;
    setIsOpen(newState);
    activePopupId = newState ? popupId.current : null;
  };

  return (
    <>
      <div ref={buttonRef} onClick={handleToggle}>
        {trigger}
      </div>
      {mounted &&
        isOpen &&
        createPortal(
          <div
            ref={popupRef}
            style={{
              position: "absolute",
              zIndex: 50,
              opacity: 0,
              transition: "opacity 150ms ease, transform 150ms ease",
            }}
            className="animate-popup"
            onAnimationEnd={() => {
              if (popupRef.current) {
                popupRef.current.style.opacity = "1";
              }
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-md shadow-md bg-white">
              {React.Children.map(children, (child) =>
                React.isValidElement(child)
                  ? React.cloneElement(child, { close: () => setIsOpen(false) })
                  : child
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
