import { Entry } from "../resolvers/dataResolvers/simple";

const NEXT_PUBLIC_BACKEND_URL = "https://backend.dataactions.ai";

export interface GetAllChartDataV1Props {
  workspaceId: string;
  payload: object;
  insightType: string;
}

const fetchData = async (params: unknown) => {
  const data = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/insight`, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "content-type": "application/json",
    },
  });
  return await data.json();
};

export const getAllChartDataV1 = async ({
  workspaceId,
  payload,
  insightType,
}: GetAllChartDataV1Props): Promise<{ data: Entry[]; query: string }> => {
  return fetchData({
    workspace_id: workspaceId,
    payload,
    insight_type: insightType,
  });
};
