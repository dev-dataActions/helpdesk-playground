const apiMode = process.env.NEXT_PUBLIC_PRODUCT_MODE === "LITE" ? "lite" : "v3";

export const getInsightsByMetricIdAndWorkspaceId = async (workspaceId, metricId) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${apiMode}/get-metric-insight`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": process.env.NEXT_PUBLIC_APP_BACKEND_API_KEY,
      },
      body: JSON.stringify({ workspace_id: workspaceId, metric_names: [metricId] }),
    });
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

/**
 * Fetch metric drilldown data from API
 * @param {string} workspaceId - Workspace ID
 * @param {string} metricName - Metric name/key
 * @returns {Promise<Object|null>} Drilldown data or null on error
 */
export const getMetricDrilldown = async (workspaceId, metricName) => {
  try {
    // Validate required parameters
    if (!workspaceId || !metricName) {
      console.error("Missing required parameters for drilldown:", { workspaceId, metricName });
      return null;
    }

    // Validate environment variable
    const appId = process.env.NEXT_PUBLIC_CFA_APP_ID;
    if (!appId) {
      console.error("Missing NEXT_PUBLIC_CFA_APP_ID environment variable");
      return null;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/v3/app-metric-drilldown?workspace_id=${workspaceId}&app_id=${appId}&metric_name=${metricName}`,
      {
        method: "GET",
        headers: {
          "X-API-Key": process.env.NEXT_PUBLIC_APP_BACKEND_API_KEY,
        },
      }
    );

    if (!res.ok) {
      console.error(`Drilldown API error: ${res.status} ${res.statusText}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching metric drilldown:", error);
    return null;
  }
};
