import { Metric } from "@/da-insight-kit/utils/insight.util";
import { Entry } from "./simple";
import { TimeGrain, TimeGrainAPIKey } from "@/da-insight-kit/constants/date.constant";
import { getAllChartDataV1 } from "@/da-insight-kit/services/query.svc";

export interface InsightMetricFilters {
  dimensionFilters?: {
    dimension: string;
    value: string;
  }[];
  showDimensionContributionIn?: string;
  showDimensionSplitIn?: string;
  compareWith?: string[];
  showPivotIn?: {
    row: string;
    column: string;
  };
}

export interface InsightFilters {
  index?: string;
  timeRange?: number;
  cadence?: TimeGrain;
  timeGrain?: TimeGrain;
  [key: string]: InsightMetricFilters | string | number | TimeGrain | undefined;
}

const getApiCall = (metric: Metric, filters: InsightFilters | null, workspaceId: string) => {
  const { timeGrain = TimeGrain.MONTHLY } = filters ?? {};
  const metricFilters = filters?.[metric.metricKey] as InsightMetricFilters | undefined;

  return getAllChartDataV1({
    workspaceId,
    payload: {
      fromtime: "2024-01-01",
      totime: "2024-06-31",
      timegrain: TimeGrainAPIKey[timeGrain],
      metric_name: metric.metricKey,
      dimensions: [metricFilters?.showPivotIn?.row, metricFilters?.showPivotIn?.column],
    },
    insightType: "pivot",
  });
};

export const pivotDataResolver = async (
  [metric]: Metric[],
  filters: InsightFilters | null,
  workspaceId: string
): Promise<Entry[]> => {
  return getApiCall(metric, filters, workspaceId)
    .then((res) => res.data)
    .catch(() => []);
};
