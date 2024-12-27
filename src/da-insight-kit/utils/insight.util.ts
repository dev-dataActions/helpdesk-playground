import { ChartTypes } from "../constants/charts.contant";

export interface Metric {
  metricKey: string;
  metricLabel: string;
  chartType?: ChartTypes;
  yAxisId?: string;
}

export interface IInsight {
  title: string;
  description?: string;
  chartType: ChartTypes;
  metrics: Metric[];
}

export const getInsightConfig = (insightId: string, workspaceId: string): IInsight => {
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
