import { useState, useEffect } from "react";

const TENANT_ID_KEY = "selectedTenantId";

/**
 * Custom hook to manage tenantId with localStorage persistence
 * @returns {Object} Object containing tenantId and setTenantId function
 */
export const useTenantId = () => {
  const [tenantId, setTenantIdState] = useState(null);

  // Load tenantId from localStorage on mount
  useEffect(() => {
    const loadTenantId = () => {
      try {
        const storedTenantId = localStorage.getItem(TENANT_ID_KEY);
        setTenantIdState(storedTenantId);
      } catch (error) {
        console.error("Error loading tenantId from localStorage:", error);
        setTenantIdState(null);
      }
    };

    // Load initial value
    loadTenantId();

    // Listen for storage changes (when tenantId is changed from other components)
    const handleStorageChange = (e) => {
      if (e.key === TENANT_ID_KEY) {
        setTenantIdState(e.newValue);
      }
    };

    // Listen for custom events (for same-tab updates)
    const handleCustomChange = () => {
      loadTenantId();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("tenantIdChanged", handleCustomChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("tenantIdChanged", handleCustomChange);
    };
  }, []);

  // Function to update tenantId and save to localStorage
  const setTenantId = (newTenantId) => {
    try {
      setTenantIdState(newTenantId);
      if (newTenantId) {
        localStorage.setItem(TENANT_ID_KEY, newTenantId);
      } else {
        localStorage.removeItem(TENANT_ID_KEY);
      }
      // Dispatch custom event for same-tab updates
      window.dispatchEvent(new CustomEvent("tenantIdChanged"));
    } catch (error) {
      console.error("Error saving tenantId to localStorage:", error);
      // Still update the state even if localStorage fails
      setTenantIdState(newTenantId);
    }
  };

  return {
    tenantId,
    setTenantId,
  };
};
