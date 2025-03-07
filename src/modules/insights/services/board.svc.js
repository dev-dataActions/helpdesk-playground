const APP_BACKEND_URL = "https://backend.dataactions.ai";

export const getAppBoards = async (workspaceId, appId, featureId) => {
  try {
    const res = await fetch(
      `${APP_BACKEND_URL}/v3/app-feature-board?app_id=${appId}&feature_id=${featureId}&workspace_id=${workspaceId}`
    );
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

export const getAppBoard = async (workspaceId, appId, featureId, boardId) => {
  try {
    const res = await fetch(
      `${APP_BACKEND_URL}/v3/app-feature-board?app_id=${appId}&feature_id=${featureId}&workspace_id=${workspaceId}&board_id=${boardId}`
    );
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};
