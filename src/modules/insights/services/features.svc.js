const APP_BACKEND_URL = "https://backend.dataactions.ai";

export const getFeatureMapByWorkspaceId = async (workspaceId) => {
  try {
    const res = await fetch(`${APP_BACKEND_URL}/v3/featuremap?workspace_id=${workspaceId}`);
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};
