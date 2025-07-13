export const getAppDTree = async (workspaceId, appId) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/v3/app-dtree?workspace_id=${workspaceId}&app_id=${appId}`,
      { headers: { "X-API-Key": process.env.NEXT_PUBLIC_APP_BACKEND_API_KEY } }
    );
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getAppInsightsByDecisionIdAndWorkspaceId = async (appId, decisionId, workspaceId) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/v3/app-decision-insight?app_id=${appId}&decision_id=${decisionId}&workspace_id=${workspaceId}`,
      { headers: { "X-API-Key": process.env.NEXT_PUBLIC_APP_BACKEND_API_KEY } }
    );
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};
