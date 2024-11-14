import { TimeGrainAPIKey } from "../constants/date.constant";
import { Entry } from "../dataResolvers/simple";
// import { formatDate, generateDatePairs } from "../utils/date.util";

const NEXT_PUBLIC_BACKEND_URL = "https://backend.dataactions.ai";

export interface GetAllChartDataV1Props {
  workspaceId: string;
  pageSize: number;
  timeGrain: TimeGrainAPIKey;
  metric: string;
  insightType: string;
  filters?: {
    dimension: string;
    value: string;
  }[];
  dimensions?: string[];
  dimension_expand?: boolean;
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
  // pageSize,
  timeGrain,
  metric,
  insightType,
}: GetAllChartDataV1Props): Promise<{ data: Entry[]; query: string }> => {
  const params = {
    workspace_id: workspaceId,
    payload: {
      timegrain: timeGrain,
      metric_name: metric,
      startperiod: {
        fromtime: "2024-01-01",
        totime: "2024-03-31",
      },
    },
    insight_type: insightType,
  };

  // const d = generateDatePairs(pageSize, timeGrain);
  // params.payload.startperiod.fromtime = formatDate(d[d.length - 1].start, "yyyy-MM-dd");
  // params.payload.startperiod.totime = formatDate(d[0].end, "yyyy-MM-dd");

  return fetchData(params);
};
