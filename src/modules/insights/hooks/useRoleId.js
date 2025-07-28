import { useState, useEffect } from "react";

const ROLE_ID_KEY = "selectedRoleId";

/**
 * Custom hook to manage roleId with localStorage persistence
 * @returns {Object} Object containing roleId and setRoleId function
 */
export const useRoleId = () => {
  const [roleId, setRoleIdState] = useState(null);

  // Load roleId from localStorage on mount
  useEffect(() => {
    const loadRoleId = () => {
      try {
        const storedRoleId = localStorage.getItem(ROLE_ID_KEY);
        setRoleIdState(storedRoleId);
      } catch (error) {
        console.error("Error loading roleId from localStorage:", error);
        setRoleIdState(null);
      }
    };

    // Load initial value
    loadRoleId();

    // Listen for storage changes (when roleId is changed from other components)
    const handleStorageChange = (e) => {
      if (e.key === ROLE_ID_KEY) {
        setRoleIdState(e.newValue);
      }
    };

    // Listen for custom events (for same-tab updates)
    const handleCustomChange = () => {
      loadRoleId();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("roleIdChanged", handleCustomChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("roleIdChanged", handleCustomChange);
    };
  }, []);

  // Function to update roleId and save to localStorage
  const setRoleId = (newRoleId) => {
    try {
      setRoleIdState(newRoleId);
      if (newRoleId) {
        localStorage.setItem(ROLE_ID_KEY, newRoleId);
      } else {
        localStorage.removeItem(ROLE_ID_KEY);
      }
      // Dispatch custom event for same-tab updates
      window.dispatchEvent(new CustomEvent("roleIdChanged"));
    } catch (error) {
      console.error("Error saving roleId to localStorage:", error);
      // Still update the state even if localStorage fails
      setRoleIdState(newRoleId);
    }
  };

  return {
    roleId,
    setRoleId,
  };
};
