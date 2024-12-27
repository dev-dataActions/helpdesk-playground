import { ChartTypes } from "@/da-insight-kit/constants/charts.contant";
import { IInsight } from "@/da-insight-kit/utils/insight.util";

export interface Template {
  id: number;
  title: string;
  insights: IInsight[];
}

export const getTemplatesByWorkspaceIdAndUserId = async (
  workspaceId: string
): Promise<Template[]> => {
  return [
    {
      id: 1,
      title: "Reporting",
      insights: [
        {
          id: 1,
          title: "New Tourney Registrations",
          chartType: ChartTypes.BIGNUMBERWITHTREND,
          metrics: [
            {
              metricKey: "new_users",
              metricLabel: "New Tourney Registrations",
            },
          ],
        },
        {
          id: 2,
          title: "New Users",
          chartType: ChartTypes.BIGNUMBERWITHTREND,
          metrics: [
            {
              metricKey: "new_users",
              metricLabel: "New Users",
            },
          ],
        },
        {
          id: 3,
          chartType: ChartTypes.BIGNUMBERWITHTREND,
          title: "D7 Retention Rate",
          metrics: [
            {
              metricKey: "retention_rate",
              metricLabel: "D7 Retention Rate",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Analysis",
      insights: [
        {
          id: 1,
          title: "Compare with Reference Line",
          chartType: ChartTypes.SIMPLE_CHART,
          metrics: [
            {
              metricKey: "revenue",
              metricLabel: "Revenue",
              chartType: ChartTypes.AREA,
              yAxisId: "right",
            },
          ],
          filters: {
            revenue: {
              compareWith: ["Prev. period", "Max", "Min", "Median"],
            },
          },
        },
        {
          id: 2,
          title: "New Users vs New Tourney Participation Rate",
          chartType: ChartTypes.SIMPLE_CHART,
          metrics: [
            {
              metricKey: "new_users",
              metricLabel: "New Users",
              chartType: ChartTypes.AREA,
              yAxisId: "right",
            },
            {
              metricKey: "participation_rate",
              metricLabel: "Participation Rate",
              chartType: ChartTypes.AREA,
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Drill Down",
      insights: [
        {
          id: 1,
          title: "New Tourney Registrations",
          chartType: ChartTypes.SIMPLE_CHART,
          metrics: [
            {
              metricKey: "revenue",
              metricLabel: "Revenue",
              chartType: ChartTypes.BAR,
            },
          ],
          filters: {
            revenue: {
              showDimensionSplitIn: "user__platform",
            },
          },
        },
        {
          id: 2,
          title: "New Users",
          chartType: ChartTypes.SIMPLE_CHART,
          metrics: [
            {
              metricKey: "participation_rate",
              metricLabel: "Revenue",
              yAxisId: "right",
              chartType: ChartTypes.BAR,
            },
          ],
          filters: {
            participation_rate: {
              showDimensionSplitIn: "user__platform",
            },
          },
        },
      ],
    },
  ];
};
