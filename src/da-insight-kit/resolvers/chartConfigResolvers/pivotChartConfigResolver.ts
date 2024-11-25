import { Metric } from "@/da-insight-kit/utils/insight.util";

export const pivotChartConfigResolver = async ([metric]: Metric[], filters) => {
  const chartsConfig = {
    pivot: {
      dataKey: metric?.metricKey,
      row: filters?.[metric?.metricKey]?.showPivotIn?.row,
      column: filters?.[metric?.metricKey]?.showPivotIn?.column,
    },
  };
  return chartsConfig;
};
