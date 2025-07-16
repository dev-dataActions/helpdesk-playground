const TENANT_ID_KEY = "selectedTenantId";

/**
 * Get the currently selected tenantId from localStorage
 * @returns {string|null} The selected tenantId or null if not set
 */
export const getCurrentTenantId = () => {
  try {
    return localStorage.getItem(TENANT_ID_KEY);
  } catch (error) {
    console.error("Error reading tenantId from localStorage:", error);
    return null;
  }
};

/**
 * Set the tenantId in localStorage
 * @param {string} tenantId - The tenantId to set
 */
export const setCurrentTenantId = (tenantId) => {
  try {
    if (tenantId) {
      localStorage.setItem(TENANT_ID_KEY, tenantId);
    } else {
      localStorage.removeItem(TENANT_ID_KEY);
    }
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new CustomEvent("tenantIdChanged"));
  } catch (error) {
    console.error("Error saving tenantId to localStorage:", error);
  }
};

/**
 * Clear the tenantId from localStorage
 */
export const clearCurrentTenantId = () => {
  try {
    localStorage.removeItem(TENANT_ID_KEY);
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new CustomEvent("tenantIdChanged"));
  } catch (error) {
    console.error("Error clearing tenantId from localStorage:", error);
  }
};
