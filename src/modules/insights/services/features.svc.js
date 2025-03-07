const APP_BACKEND_URL = "https://backend.dataactions.ai";

export const getFeatureMapByWorkspaceId = async (workspaceId) => {
  try {
    const res = await fetch(`${APP_BACKEND_URL}/v3/featuremap?workspace_id=${workspaceId}`);
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

export const getBoardsByFeatureIdAndWorkspaceId = async (featureId, workspaceId) => {
  try {
    // const res = await fetch(
    //   `${APP_BACKEND_URL}/v3/boards?feature_id=${featureId}&workspace_id=${workspaceId}`
    // );
    // return await res.json();
    return [
      {
        id: "1",
        name: "Profits and margins expense",
        description: "Identifying cost attributes and profitability trends",
        lastUpdated: "2021-09-01T00:00:00.000Z",
      },
      {
        id: "2",
        name: "Monthly revenue report",
        description: "Track monthly revenue and growth",
        lastUpdated: "2021-09-01T00:00:00.000Z",
      },
    ];
  } catch (error) {
    console.error(error);
  }
};

export const getAppInsightsByFeatureIdAndWorkspaceId = async (appId, featureId, workspaceId) => {
  try {
    const res = await fetch(
      `${APP_BACKEND_URL}/v3/app-feature-insight?app_id=${appId}&feature_id=${featureId}&workspace_id=${workspaceId}`
    );
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};
