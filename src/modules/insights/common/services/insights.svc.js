const api = "https://dametrics.dataactions.ai";
const apiMode = process.env.NEXT_PUBLIC_PRODUCT_MODE;

export const fetchData = async (payload, workspaceId) => {
  const url = `${api}/${apiMode === "LITE" ? "InsightPreviewLite" : "InsightPreview"}`;
  const data = await fetch(`${url}?get_query=false`, {
    method: "POST",
    body: JSON.stringify({ ...payload, workspace_id: workspaceId }),
    headers: {
      "content-type": "application/json",
      "X-API-Key": process.env.NEXT_PUBLIC_APP_BACKEND_API_KEY,
    },
  });
  return await data.json();
};

export const fetchDimensionValues = async (dimension, workspaceId) => {
  const url = `${api}/${
    apiMode === "LITE" ? "data-dimensions-values-lite" : "data-dimensions-values"
  }`;
  const data = await fetch(`${url}?workspace_id=${workspaceId}&dimension=${dimension}`, {
    headers: { "X-API-Key": process.env.NEXT_PUBLIC_APP_BACKEND_API_KEY },
  });
  return await data.json();
};
