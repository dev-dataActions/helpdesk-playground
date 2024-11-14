import { Metric } from "../utils/insight.util";

export const bigNumberChartConfigResolver = async (metrics: Metric[]) => {
  const chartsConfig = {
    stats: [
      {
        name: metrics[0]?.metricLabel,
      },
    ],
  };
  return chartsConfig;
};
