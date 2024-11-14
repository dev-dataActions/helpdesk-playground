import { InsightFilters, InsightMetricFilters } from "../components/Insight";
import { TimeGrain, TimeGrainAPIKey, TimeGrainOffset } from "../constants/date.constant";
import { getAllChartDataV1 } from "../services/query.svc";
import { shortenDate } from "../utils/date.util";
import { Metric } from "../utils/insight.util";

export interface Entry {
  date: string;
  fromtime: string;
  totime: string;
  [key: string]: string | number;
}

const getApiCalls = (metrics: Metric[], filters: InsightFilters | null, workspaceId: string) => {
  const { timeRange = 90, timeGrain = TimeGrain.MONTHLY } = filters ?? {};
  const apiCalls: Promise<{ data: Entry[]; query: string }>[] = [];
  metrics.forEach((metric) => {
    const insightMetricFilters: InsightMetricFilters | string | number =
      filters?.[metric.metricKey] ?? {};

    if (typeof insightMetricFilters === "object") {
      const {
        dimensionFilters = null,
        showDimensionContributionIn,
        showDimensionSplitIn,
        compareWith,
      } = insightMetricFilters;

      apiCalls.push(
        getAllChartDataV1({
          workspaceId,
          pageSize:
            (timeRange / TimeGrainOffset[timeGrain as keyof typeof TimeGrainOffset]) *
            (compareWith ? 2 : 1),
          timeGrain: TimeGrainAPIKey[timeGrain],
          metric: metric.metricKey,
          insightType: "summary",
          ...(dimensionFilters ? { filters: dimensionFilters } : {}),
          ...(showDimensionContributionIn ? { dimensions: [showDimensionContributionIn] } : {}),
          ...(showDimensionSplitIn
            ? { dimensions: [showDimensionSplitIn], dimension_expand: true }
            : {}),
        })
      );
    }
  });

  return apiCalls;
};

const transformResponses = (
  responses: { data: Entry[]; query: string }[],
  metrics: Metric[],
  filters: InsightFilters | null,
  sortKey: string = "fromtime"
) => {
  const { timeGrain, index = "date" } = filters ?? {};
  const data: { [date: string | number]: Entry } = {};
  responses.forEach(({ data: response }) => {
    response.forEach((e: Entry) => (e.date = shortenDate(e.fromtime, e.totime, timeGrain)));
    response.forEach((e: Entry) => {
      const key: string | number = e[index] ?? "";
      metrics.forEach((metric: Metric) => {
        const metricLabel: string = metric.metricLabel;
        if (!data?.[key]?.[metricLabel])
          data[key] = {
            ...e,
            ...(data[key] ?? {}),
            [metric.metricLabel]: e[metric.metricKey] ?? 0,
          };
      });
    });
  });
  return Object.values(data).sort((a: Entry, b: Entry) => {
    if (new Date(a[sortKey]) < new Date(b[sortKey])) return -1;
    if (new Date(a[sortKey]) > new Date(b[sortKey])) return 1;
    return 0;
  });
};

export const simpleDataResolver = async (
  metrics: Metric[],
  filters: InsightFilters | null,
  workspaceId: string
): Promise<Entry[]> => {
  const apiCalls = getApiCalls(metrics, filters, workspaceId);
  return Promise.all(apiCalls)
    .then((responses) => transformResponses(responses, metrics, filters))
    .catch(() => []);
};
