import { InsightFilters } from "../components/Insight";
import { Metric } from "../utils/insight.util";

export const bigNumberChartConfigResolver = async (
  metrics: Metric[],
  filters?: InsightFilters | null
) => {
  const chartsConfig = {
    stats: [
      {
        name: metrics[0]?.metricLabel,
      },
    ],
  };
  return chartsConfig;
};
