const apiMode = process.env.NEXT_PUBLIC_PRODUCT_MODE === "LITE" ? "lite" : "v3";

export const getFeatureMapByWorkspaceId = async (workspaceId) => {
  console.log(process.env.NEXT_PUBLIC_PRODUCT_MODE, apiMode);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${apiMode}/featuremap?workspace_id=${workspaceId}`
    );
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

export const getAppInsightsByFeatureIdAndWorkspaceId = async (appId, featureId, workspaceId) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${apiMode}/app-feature-insight?app_id=${appId}&feature_id=${featureId}&workspace_id=${workspaceId}`
    );
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};
