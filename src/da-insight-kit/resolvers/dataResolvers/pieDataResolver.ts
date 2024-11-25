import { Metric } from "@/da-insight-kit/utils/insight.util";
import { InsightFilters } from "./pivotDataResolver";
import { Entry } from "./simple";

const getApiCall = async (
  metric: Metric,
  filters: InsightFilters | null,
  workspaceId: string
): Promise<Entry[]> => {
  console.log(metric, filters, workspaceId);
  // return getAllChartDataV1({
  //   workspaceId,
  //   payload: {
  //     fromtime: "2024-01-01",
  //     totime: "2024-06-30",
  //     metric_name: metric.metricKey,
  //     dimensions: "user__platform",
  //   },
  //   insightType: "contributor",
  // });
  return [
    {
      fromtime: "2024-01-01",
      totime: "2024-06-01",
      LOL: 234,
      Dota: 436,
      Pubg: 769,
    },
  ];
};

export type SegmentEntry = {
  segment: string;
  value: string | number;
};

const transformData = (data: Entry[]): SegmentEntry[] => {
  const arr = [];
  for (const key in data[0]) {
    const obj: SegmentEntry = {
      segment: "",
      value: "",
    };
    if (key !== "fromtime" && key !== "totime") {
      obj.segment = key;
      obj.value = data[0][key];
      arr.push(obj);
    }
  }
  return arr;
};

export const pieDataResolver = async (
  [metric]: Metric[],
  filters: InsightFilters | null,
  workspaceId: string
): Promise<SegmentEntry[]> => {
  return getApiCall(metric, filters, workspaceId)
    .then((res) => transformData(res))
    .catch(() => []);
};
