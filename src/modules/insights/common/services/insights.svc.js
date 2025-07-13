import { request } from "@/common/util/api.util";

const API_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const API_MODE = process.env.NEXT_PUBLIC_PRODUCT_MODE;

export const fetchData = async (payload, workspaceId, tenantId) => {
  if (!payload || !workspaceId) {
    console.warn("fetchData: payload and workspaceId are required");
    return null;
  }

  const endpoint = API_MODE === "LITE" ? "InsightPreviewLite" : "InsightPreview";
  const url = `${API_BACKEND_URL}/${endpoint}?get_query=false`;

  return request(url, "POST", {
    body: { ...payload, workspace_id: workspaceId, tenant_id: tenantId },
  });
};

export const fetchDimensionValues = async (dimension, workspaceId, tenantId) => {
  if (!dimension || !workspaceId) {
    console.warn("fetchDimensionValues: dimension and workspaceId are required");
    return null;
  }

  const endpoint = API_MODE === "LITE" ? "data-dimensions-values-lite" : "data-dimensions-values";
  const url = `${API_BACKEND_URL}/${endpoint}?workspace_id=${workspaceId}&dimension=${dimension}&tenant_id=${tenantId}`;

  return request(url, "GET");
};
