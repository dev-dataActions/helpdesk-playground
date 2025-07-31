import { request } from "../../container/util/api.util";

/**
 * Get all tenants
 * @param {string} workspaceId - ID of the workspace to get tenants for
 * @returns {Promise<Array>} Array of tenants or empty array on error
 */
export const getTenants = async (workspaceId) => {
  if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
    console.error("Backend URL not configured");
    return [];
  }

  const data = await request(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v3/tenant?workspace_id=${workspaceId}`);
  return data || [];
};
