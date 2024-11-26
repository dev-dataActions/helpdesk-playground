import { Metric } from "@/da-insight-kit/utils/insight.util";
import { InsightFilters } from "./pivotDataResolver";
import { Entry } from "./simple";
import { SegmentEntry } from "./pieDataResolver";

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
      Canada: 234,
      RU: 436,
      India: 769,
    },
  ];
};



const transformData = (data: Entry[]): SegmentEntry[] => {
  const arr = [];
  let sum = 0
  for(let key in data[0]) if(key != 'fromtime' && key != 'totime') sum += parseInt(data[0][key] + "")
  for (const key in data[0]) {
    const obj: SegmentEntry = {
      segment: "",
      value: 0,
      percentage:0
    };
    if (key !== "fromtime" && key !== "totime") {
      obj.segment = key;
      obj.value = parseInt(data[0][key] + "");
      obj.percentage = (obj.value/sum) * 100;
      arr.push(obj);
    }
  }
  return arr;
};

export const rankingDataResolver = async (
  [metric]: Metric[],
  filters: InsightFilters | null,
  workspaceId: string
): Promise<SegmentEntry[]> => {
  return getApiCall(metric, filters, workspaceId)
    .then((res) => transformData(res))
    .catch(() => []);
};
