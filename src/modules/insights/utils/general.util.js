/**
 * Get breadcrumbs for navigation
 * @param {string} workspaceId - Workspace ID
 * @param {string} appId - App ID
 * @param {Object} decisionTree - Decision tree data
 * @param {string} decisionId - Decision ID
 * @returns {Array} Array of breadcrumb objects
 */
export const getBreadcrumbs = (decisionTree = {}, decisionId = "") => {
  try {
    const breadcrumbs = [];

    function dfs(node) {
      if (!node) return false;

      breadcrumbs.push({
        name: node.name || "Unknown",
        description: node.description || "",
        id: node.id || "",
      });

      if (node.id === decisionId) return true;

      if (Array.isArray(node.children)) {
        for (const child of node.children) {
          if (dfs(child)) return true;
        }
      }

      breadcrumbs.pop();
      return false;
    }

    if (dfs(decisionTree.data)) {
      if (breadcrumbs.length > 0) breadcrumbs.pop();
      return breadcrumbs.map((bc) => ({
        ...bc,
        href: `/insights?decisionId=${bc.id}`,
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error generating breadcrumbs:", error);
    return [];
  }
};

/**
 * Get decision by ID from decision tree
 * @param {Object} decisionTree - Decision tree data
 * @param {string} decisionId - Decision ID
 * @returns {Object|null} Decision object or null if not found
 */
export const getDecision = (decisionTree = {}, decisionId = "") => {
  try {
    function dfs(node) {
      if (!node) return null;

      if (node.id === decisionId) return node;

      if (Array.isArray(node.children)) {
        for (const child of node.children) {
          const result = dfs(child);
          if (result) return result;
        }
      }

      return null;
    }

    return dfs(decisionTree?.data) || decisionTree?.data || null;
  } catch (error) {
    console.error("Error finding decision:", error);
    return null;
  }
};

/**
 * Safe string truncation utility
 * @param {string} str - String to truncate
 * @param {number} length - Maximum length
 * @param {string} suffix - Suffix to add if truncated
 * @returns {string} Truncated string
 */
export const truncateString = (str, length = 50, suffix = "...") => {
  try {
    if (!str || typeof str !== "string") return "";
    if (str.length <= length) return str;
    return str.substring(0, length) + suffix;
  } catch (error) {
    console.error("Error truncating string:", error);
    return str || "";
  }
};

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 */
export const formatNumber = (num) => {
  try {
    if (typeof num !== "number" || isNaN(num)) return "0";
    return num.toLocaleString();
  } catch (error) {
    console.error("Error formatting number:", error);
    return "0";
  }
};

/**
 * Generate random ID
 * @param {number} length - Length of ID
 * @returns {string} Random ID string
 */
export const generateId = (length = 8) => {
  try {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  } catch (error) {
    console.error("Error generating ID:", error);
    return Date.now().toString();
  }
};

/**
 * Get sub-decisions for a given decision ID
 * @param {Object} decisionTree - Decision tree data
 * @param {string} decisionId - Decision ID
 * @returns {Array} Array of sub-decision objects
 */
export const getSubDecisions = (decisionTree = {}, decisionId = "") => {
  try {
    const decision = getDecision(decisionTree, decisionId);
    if (!decision || !Array.isArray(decision.children)) {
      return [];
    }
    return decision.children.map((child) => ({
      id: child.id || "",
      name: child.name || "Unnamed Decision",
      description: child.description || "",
      children: child.children || [],
    }));
  } catch (error) {
    console.error("Error getting sub-decisions:", error);
    return [];
  }
};
