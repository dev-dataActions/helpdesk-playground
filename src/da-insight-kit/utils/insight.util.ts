import { ChartTypes } from "../constants/charts.contant";

export interface Metric {
  metricKey: string;
  metricLabel: string;
  chartType?: ChartTypes;
}

export interface InsightConfig {
  title: string;
  description: string;
  chartType: ChartTypes;
  metrics: Metric[];
}

export const getInsightConfig = (id: string, workspaceId: string): InsightConfig => {
  console.log(id, workspaceId);
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
