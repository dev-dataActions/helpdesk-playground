import { ChartTypes } from "../constants/charts.contant";

export interface Metric {
  metricKey: string;
  metricLabel: string;
  chartType?: ChartTypes;
  yAxisId?: string;
}

export interface IInsight {
  id?: string | number;
  title?: string;
  description?: string;
  chartType: ChartTypes;
  metrics: Metric[];
  filters?: {
    [key: string]: {
      showDimensionSplitIn?: string;
      compareWith?: string[];
    };
  };
}

export const getInsightConfig = (
  insightId: string,
  workspaceId: string
): InsightConfig => {
  return {
    title: "New users",
    description: "The contribution of new users in total revenue.",
    chartType: ChartTypes.BIGNUMBER,
    metrics: [
      {
        metricKey: "active_users",
        metricLabel: "Active Users",
      },
    ],
  };
};
