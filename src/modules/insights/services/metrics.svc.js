const apiMode = process.env.NEXT_PUBLIC_PRODUCT_MODE === "LITE" ? "lite" : "v3";

export const getInsightsByMetricIdAndWorkspaceId = async (workspaceId, metricId) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${apiMode}/get-metric-insight`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": process.env.NEXT_PUBLIC_APP_BACKEND_API_KEY,
        },
        body: JSON.stringify({ workspace_id: workspaceId, metric_names: [metricId] }),
      }
    );
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};
