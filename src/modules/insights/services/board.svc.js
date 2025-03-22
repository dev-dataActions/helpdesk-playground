export const getAppBoards = async (workspaceId, appId, featureId) => {
  const apiMode = process.env.NEXT_PUBLIC_PRODUCT_MODE === "LITE" ? "lite" : "v3";
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${apiMode}/app-feature-board?app_id=${appId}&feature_id=${featureId}&workspace_id=${workspaceId}`
    );
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

export const getAppBoard = async (workspaceId, appId, featureId, boardId) => {
  const apiMode = process.env.NEXT_PUBLIC_PRODUCT_MODE === "LITE" ? "lite" : "v3";
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${apiMode}/app-feature-board?app_id=${appId}&feature_id=${featureId}&workspace_id=${workspaceId}&board_id=${boardId}`
    );
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};
