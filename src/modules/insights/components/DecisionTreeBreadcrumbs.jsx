import React, { useState, useMemo, useEffect, useRef } from "react";
import { FiChevronRight } from "react-icons/fi";
import { getDecisionPath, transformToBreadcrumbs } from "../utils/decisionTree.util";
import { RxSlash } from "react-icons/rx";

/**
 * DecisionTreeBreadcrumbs component for decision tree navigation
 * @param {Object} props - Component props
 * @param {Object} props.decisionTree - Decision tree data
 * @param {string} props.currentDecisionId - Current decision ID
 * @param {Function} props.onNavigate - Navigation handler function
 * @param {string} props.className - Additional CSS classes
 */
export const DecisionTreeBreadcrumbs = ({ decisionTree, currentDecisionId, onNavigate, className = "" }) => {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const dropdownRefs = useRef({});

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const hasOpenDropdown = Object.values(openDropdowns).some((isOpen) => isOpen);
      if (hasOpenDropdown) {
        const clickedInsideDropdown = Object.values(dropdownRefs.current).some(
          (ref) => ref && ref.contains(event.target)
        );

        if (!clickedInsideDropdown) {
          setOpenDropdowns({});
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdowns]);

  // Transform decision tree to breadcrumb format
  const breadcrumbs = useMemo(() => {
    if (!decisionTree || !currentDecisionId) return [];

    const path = getDecisionPath(decisionTree, currentDecisionId);
    return transformToBreadcrumbs(path, decisionTree);
  }, [decisionTree, currentDecisionId]);

  // Handle dropdown toggle
  const toggleDropdown = (breadcrumbId) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [breadcrumbId]: !prev[breadcrumbId],
    }));
  };

  // Handle sibling selection
  const handleSiblingSelect = (sibling) => {
    if (onNavigate && typeof onNavigate === "function") {
      onNavigate(sibling.path);
    }
    // Close all dropdowns
    setOpenDropdowns({});
  };

  // Handle breadcrumb click
  const handleBreadcrumbClick = (breadcrumb) => {
    if (onNavigate && typeof onNavigate === "function") {
      onNavigate(breadcrumb.path);
    }
  };

  if (!breadcrumbs || breadcrumbs.length === 0) {
    return (
      <button
        className="flex items-center gap-x-1.5 text-xxs text-gray-900 hover:underline"
        onClick={() => onNavigate?.("/insights")}
      >
        Home
        <RxSlash size={16} className="text-gray-400" />
      </button>
    );
  }

  return (
    <div className={`flex items-center gap-x-1.5 ${className}`}>
      {/* Home breadcrumb */}
      <button onClick={() => onNavigate?.("/insights")} className="text-xxs text-gray-900 hover:underline">
        Home
      </button>
      <RxSlash size={16} className="text-gray-400" />

      {/* Decision tree breadcrumbs */}
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.id}>
          {breadcrumb.siblings.length > 1 ? (
            // Dropdown breadcrumb
            <div className="relative flex items-center gap-x-1">
              <button onClick={() => toggleDropdown(breadcrumb.id)} className="truncate text-xxs text-gray-900">
                {breadcrumb.name}
              </button>
              <FiChevronRight
                size={16}
                onClick={() => toggleDropdown(breadcrumb.id)}
                className={`text-gray-600 cursor-pointer transition-transform ${
                  openDropdowns[breadcrumb.id] ? "rotate-90" : ""
                }`}
              />

              {/* Dropdown menu */}
              {openDropdowns[breadcrumb.id] && (
                <div
                  ref={(el) => (dropdownRefs.current[breadcrumb.id] = el)}
                  className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-300 rounded-md shadow-lg z-50 overflow-hidden"
                >
                  {breadcrumb.siblings.map((sibling) => (
                    <button
                      key={sibling.id}
                      onClick={() => handleSiblingSelect(sibling)}
                      className={`text-left w-full px-4 py-2 text-xxs hover:bg-gray-100 text-gray-800 truncate border-b border-gray-200`}
                    >
                      {sibling.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => handleBreadcrumbClick(breadcrumb)}
              className={`text-xxs text-gray-900 hover:underline truncate`}
            >
              {breadcrumb.name}
            </button>
          )}

          {/* Separator */}
          {index < breadcrumbs.length - 1 && <RxSlash size={16} className="text-gray-400" />}
        </React.Fragment>
      ))}
    </div>
  );
};
