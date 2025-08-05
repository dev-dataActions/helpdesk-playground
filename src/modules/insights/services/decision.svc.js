/**
 * Fetch decision tree data for a workspace and app
 * @param {string} workspaceId - Workspace ID
 * @param {string} appId - App ID
 * @returns {Array|null} Decision tree data array or null on error
 */
export const getAppDTree = async (workspaceId, appId) => {
  // Validate environment variables
  if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
    console.error("NEXT_PUBLIC_BACKEND_URL is not defined");
    return null;
  }

  if (!process.env.NEXT_PUBLIC_APP_BACKEND_API_KEY) {
    console.error("NEXT_PUBLIC_APP_BACKEND_API_KEY is not defined");
    return null;
  }

  // Validate input parameters
  if (!workspaceId || !appId) {
    console.error("Missing required parameters: workspaceId and appId are required");
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/v3/app-dtree?workspace_id=${workspaceId}&app_id=${appId}`,
      { headers: { "X-API-Key": process.env.NEXT_PUBLIC_APP_BACKEND_API_KEY } }
    );

    if (!response.ok) {
      console.error(`API request failed with status: ${response.status}`);
      return null;
    }

    const data = await response.json();
    return Array.isArray(data) ? data : null;
  } catch (error) {
    console.error("Error fetching decision tree:", error);
    return null;
  }
};

/**
 * Fetch insights for a specific decision
 * @param {string} appId - App ID
 * @param {string} decisionId - Decision ID
 * @param {string} workspaceId - Workspace ID
 * @returns {Object|null} Decision insights or null on error
 */
export const getAppInsightsByDecisionIdAndWorkspaceId = async (appId, decisionId, workspaceId) => {
  // Validate environment variables
  if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
    console.error("NEXT_PUBLIC_BACKEND_URL is not defined");
    return null;
  }

  if (!process.env.NEXT_PUBLIC_APP_BACKEND_API_KEY) {
    console.error("NEXT_PUBLIC_APP_BACKEND_API_KEY is not defined");
    return null;
  }

  // Validate input parameters
  if (!appId || !decisionId || !workspaceId) {
    console.error("Missing required parameters: appId, decisionId, and workspaceId are required");
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/v3/app-decision-insight?app_id=${appId}&decision_id=${decisionId}&workspace_id=${workspaceId}`,
      { headers: { "X-API-Key": process.env.NEXT_PUBLIC_APP_BACKEND_API_KEY } }
    );

    if (!response.ok) {
      console.error(`API request failed with status: ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching decision insights:", error);
    return null;
  }
};
