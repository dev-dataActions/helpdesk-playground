import { Metric } from "@/da-insight-kit/utils/insight.util";
import { InsightFilters } from "./pivotDataResolver";
import { Entry } from "./simple";

type SegmentEntry = [string, number | string];

const getApiCall = async (
  metric: Metric,
  filters: InsightFilters | null,
  workspaceId: string
): Promise<Entry[]> => {
  console.log("API Call Parameters:", metric, filters, workspaceId);
  
  // Uncomment and replace this with actual API call if needed.
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

  // Mock data for testing
  return [
    {
      fromtime: "2024-01-01",
      totime: "2024-06-01",
      India: 1023,
      Canada: 654,
      RU: 769,
    },
  ];
};

const transformData = (data: Entry[]): SegmentEntry[] => {
  if (!data.length) return [];

  const entries: SegmentEntry[] = [];
  const firstEntry = data[0];
  entries.push(["Country", "Popularity"])
  for (const key in firstEntry) {
    if (key !== "fromtime" && key !== "totime") {
      const value = firstEntry[key];
      if (typeof value === "number") {
        entries.push([key, value]);
      }
    }
  }
  return entries;
};

export const geoDataResolver = async (
  [metric]: Metric[],
  filters: InsightFilters | null,
  workspaceId: string
): Promise<SegmentEntry[]> => {
  try {
    const apiData = await getApiCall(metric, filters, workspaceId);
    return transformData(apiData);
  } catch (error) {
    console.error("Error resolving geo data:", error);
    return [];
  }
};
