import React, { useState, useMemo, useEffect, useRef } from "react";
import { getDecisionPath, transformToBreadcrumbs } from "../utils/decisionTree.util";
import { SearchResultsPanel } from "./SearchResultsPanel";
import { HiOutlineSearch } from "react-icons/hi";
import { HiOutlineArrowLeft } from "react-icons/hi";

/**
 * DecisionTreeBreadcrumbs component transformed to Chrome URL search bar style
 * @param {Object} props - Component props
 * @param {Object} props.decisionTree - Decision tree data
 * @param {string} props.currentDecisionId - Current decision ID
 * @param {Function} props.onNavigate - Navigation handler function
 * @param {string} props.className - Additional CSS classes
 */
export const DecisionTreeBreadcrumbs = ({ decisionTree, currentDecisionId, onNavigate, className = "" }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);

  // Transform decision tree to breadcrumb format
  const breadcrumbs = useMemo(() => {
    if (!decisionTree || !currentDecisionId) return [];

    const path = getDecisionPath(decisionTree, currentDecisionId);
    return transformToBreadcrumbs(path, decisionTree);
  }, [decisionTree, currentDecisionId]);

  // Generate current path string for display
  const currentPathString = useMemo(() => {
    if (!breadcrumbs || breadcrumbs.length === 0) return "Home";

    const pathParts = ["Home", ...breadcrumbs.map((b) => b.name)];
    return pathParts.join(" / ");
  }, [breadcrumbs]);

  // Get back navigation target (second last decision in path)
  const backTarget = useMemo(() => {
    if (!breadcrumbs || breadcrumbs.length < 2) return null;
    return breadcrumbs[breadcrumbs.length - 2];
  }, [breadcrumbs]);

  // Update search value when breadcrumbs change
  useEffect(() => {
    if (!isSearchActive) {
      setSearchTerm(currentPathString);
    }
  }, [currentPathString, isSearchActive]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedInsideSearch = event.target.closest(".search-results-panel");
      const clickedInsideInput = inputRef.current && inputRef.current.contains(event.target);

      if (!clickedInsideSearch && !clickedInsideInput) {
        setIsSearchActive(false);
        setSearchTerm(currentPathString);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [currentPathString]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsSearchActive(true);
  };

  // Handle search close
  const handleSearchClose = () => {
    setIsSearchActive(false);
    setSearchTerm(currentPathString);
  };

  // Handle back navigation
  const handleBackClick = () => {
    if (backTarget && onNavigate) {
      onNavigate(backTarget.path);
    }
  };

  if (!breadcrumbs || breadcrumbs.length === 0) {
    return (
      <button
        className="flex items-center gap-x-1.5 text-xxs text-gray-900 hover:underline"
        onClick={() => onNavigate?.("/insights")}
      >
        Home
      </button>
    );
  }

  return (
    <div className={className}>
      {/* Chrome URL search bar style input with back button */}
      <div className="relative w-full flex items-center gap-2">
        {/* Back Button */}
        <button
          onClick={handleBackClick}
          disabled={!backTarget}
          className={`p-2 rounded-lg transition-all duration-200 ${
            backTarget
              ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100 cursor-pointer"
              : "text-gray-300 cursor-not-allowed"
          }`}
          title={backTarget ? `Go back to ${backTarget.name}` : "No previous decision"}
        >
          <HiOutlineArrowLeft size={16} />
        </button>

        {/* Search Input */}
        <div className="relative flex-1">
          <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
          <input
            ref={inputRef}
            id="decision-search-input"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setIsSearchActive(true)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg font-mono text-gray-600"
            placeholder="Search decisions..."
          />

          {/* Search Results Panel */}
          {isSearchActive && (
            <SearchResultsPanel
              searchTerm={searchTerm}
              onClose={handleSearchClose}
              decisionTree={decisionTree}
              onNavigate={onNavigate}
            />
          )}
        </div>
      </div>
    </div>
  );
};
