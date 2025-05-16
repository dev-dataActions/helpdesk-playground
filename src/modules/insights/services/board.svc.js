export const getAppBoards = async (workspaceId, appId, decisionId, staging = true) => {
  const apiMode = process.env.NEXT_PUBLIC_PRODUCT_MODE === "LITE" ? "lite" : "v3";
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${apiMode}/app-decision-board?app_id=${appId}&decision_id=${decisionId}&workspace_id=${workspaceId}&staging=${staging}`
    );
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

export const getAppBoard = async (workspaceId, appId, decisionId, boardId, staging = true) => {
  const apiMode = process.env.NEXT_PUBLIC_PRODUCT_MODE === "LITE" ? "lite" : "v3";
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${apiMode}/app-decision-board?app_id=${appId}&decision_id=${decisionId}&workspace_id=${workspaceId}&board_id=${boardId}&staging=${staging}`
    );
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};
