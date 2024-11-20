import { InsightFilters, InsightMetricFilters } from "../components/Insight";
import { TimeGrain, TimeGrainAPIKey, TimeGrainOffset } from "../constants/date.constant";
import { getAllChartDataV1 } from "../services/query.svc";
import { formatDate, generateDatePairs, shortenDate } from "../utils/date.util";
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
        // dimensionFilters = null,
        showDimensionContributionIn,
        showDimensionSplitIn,
        // compareWith,
      } = insightMetricFilters;

      // const pageSize =
      //   (timeRange / TimeGrainOffset[timeGrain as keyof typeof TimeGrainOffset]) *
      //   (compareWith ? 2 : 1);

      // const d = generateDatePairs(pageSize, timeGrain);
      // const fromtime = formatDate(d[d.length - 1].start, "yyyy-MM-dd");
      // const totime = formatDate(d[0].end, "yyyy-MM-dd");

      if (showDimensionContributionIn) {
        apiCalls.push(
          getAllChartDataV1({
            workspaceId,
            payload: {
              fromtime: "2024-01-01",
              totime: "2024-01-31",
              metric_name: metric.metricKey,
              timegrain: TimeGrainAPIKey[timeGrain],
              dimensions: showDimensionContributionIn,
            },
            insightType: "contributor",
          })
        );
      } else if (showDimensionSplitIn) {
        apiCalls.push(
          getAllChartDataV1({
            workspaceId,
            payload: {
              fromtime: "2024-01-01",
              totime: "2024-06-30",
              metric_name: metric.metricKey,
              timegrain: TimeGrainAPIKey[timeGrain],
              dimensions: showDimensionSplitIn,
            },
            insightType: "contributor",
          })
        );
      } else {
        apiCalls.push(
          getAllChartDataV1({
            workspaceId,
            payload: {
              fromtime: "2024-01-01",
              totime: "2024-06-30",
              metric_name: metric.metricKey,
              timegrain: TimeGrainAPIKey[timeGrain],
            },
            insightType: "trend",
            // ...(dimensionFilters ? { filters: dimensionFilters } : {}),
          })
        );
      }
    }
  });

  return apiCalls;
};

const transformData = (
  data: Entry[] = [],
  metrics: Metric[] = [],
  filters: InsightFilters | null = {}
) => {
  let transformedData = [...data];

  metrics.forEach((metric) => {
    if (filters[metric.metricKey]?.compareWith) {
      const numericValues = data
        .map((item) => item[metric.metricKey])
        .filter((value) => typeof value === "number" && !isNaN(value));
      let value = null;
      filters[metric.metricKey]?.compareWith?.forEach((cw) => {
        switch (cw) {
          case "Prev. period": {
            const res = [];
            const offset = Math.floor(filters?.timeRange / TimeGrainOffset[filters?.timeGrain]);
            for (let i = data.length - 1; i - offset >= 0; i--) {
              const curr = data[i];
              const prev = data[i - offset];
              res.push({
                ...curr,
                prevDateLabel: prev.date,
                [`Prev. period ${metric.metricLabel}`]: prev[metric.metricKey],
              });
            }
            transformedData = res.reverse();
            break;
          }
          case "Max": {
            value = Math.max(...numericValues);
            transformedData = transformedData.map((item) => ({
              ...item,
              [`Max ${metric.metricLabel}`]: value,
            }));
            break;
          }
          case "Min": {
            value = Math.min(...numericValues);
            transformedData = transformedData.map((item) => ({
              ...item,
              [`Min ${metric.metricLabel}`]: value,
            }));
            break;
          }
          case "Median": {
            const sortedValues = numericValues.sort((a, b) => a - b);
            const middleIndex = Math.floor(sortedValues.length / 2);

            if (sortedValues.length % 2 === 0) {
              value = (sortedValues[middleIndex - 1] + sortedValues[middleIndex]) / 2;
            } else {
              value = sortedValues[middleIndex];
            }
            transformedData = transformedData.map((item) => ({
              ...item,
              [`Median ${metric.metricLabel}`]: value,
            }));
            break;
          }
          case "Average": {
            const avg = numericValues.reduce((acc, curr) => acc + curr) / numericValues.length;
            value = avg;
            transformedData = transformedData.map((item) => ({
              ...item,
              [`Average ${metric.metricLabel}`]: value,
            }));
            break;
          }
          default:
            transformedData = [...data];
        }
      });
    }
  });
  return transformedData;
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
  return transformData(
    Object.values(data).sort((a: Entry, b: Entry) => {
      if (new Date(a[sortKey]) < new Date(b[sortKey])) return -1;
      if (new Date(a[sortKey]) > new Date(b[sortKey])) return 1;
      return 0;
    }),
    metrics,
    filters
  );
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
