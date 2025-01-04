import { ChartTypes } from "@/da-insight-kit/constants/charts.contant";
import { IInsight } from "@/da-insight-kit/utils/insight.util";

export interface Template {
  id: number;
  title?: string;
  insights: IInsight[];
}

export const getTemplatesByWorkspaceIdAndUserId = async (
  workspaceId: string
): Promise<Template[]> => {
  return [
    {
      id: 1,
      insights: [
        {
          id: 1,
          title: "Total Tournaments Organized",
          chartType: ChartTypes.BIGNUMBERWITHTREND,
          metrics: [
            {
              metricKey: "new_users",
              metricLabel: "Total Tournaments Organized",
            },
          ],
        },
        {
          id: 2,
          title: "Total Registered Players",
          chartType: ChartTypes.BIGNUMBERWITHTREND,
          metrics: [
            {
              metricKey: "registrations",
              metricLabel: "Total Registered Players",
            },
          ],
        },
        {
          id: 3,
          chartType: ChartTypes.BIGNUMBERWITHTREND,
          title: "Total Players Participated",
          metrics: [
            {
              metricKey: "new_users",
              metricLabel: "Total Players Participated",
            },
          ],
        },
      ],
    },
    {
      id: 1,
      insights: [
        {
          id: 4,
          chartType: ChartTypes.BIGNUMBERWITHTREND,
          title: "Participation Rate Per Tourney",
          metrics: [
            {
              metricKey: "participation_rate",
              metricLabel: "Participation Rate Per Tourney",
            },
          ],
        },
        {
          id: 5,
          chartType: ChartTypes.BIGNUMBERWITHTREND,
          title: "Total Dropped off Players",
          metrics: [
            {
              metricKey: "participation_rate",
              metricLabel: "Total Dropped off Players",
            },
          ],
        },
        {
          id: 6,
          chartType: ChartTypes.BIGNUMBERWITHTREND,
          title: "Avg Drop off Rate Per Tourney",
          metrics: [
            {
              metricKey: "new_users",
              metricLabel: "Avg Drop off Rate Per Tourney",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "What happened this year across weeks and months?",
      insights: [
        {
          id: 1,
          title: "Tournament Organized",
          chartType: ChartTypes.SIMPLE_CHART,
          metrics: [
            {
              metricKey: "revenue",
              metricLabel: "Revenue",
              chartType: ChartTypes.LINE,
              yAxisId: "right",
            },
          ],
          filters: {
            revenue: {
              compareWith: ["Prev. period"],
            },
          },
        },
        {
          id: 2,
          title: "Tournament Organized",
          chartType: ChartTypes.SIMPLE_CHART,
          metrics: [
            {
              metricKey: "new_users",
              metricLabel: "New Users",
              chartType: ChartTypes.AREA,
              yAxisId: "right",
            },
          ],
          filters: {
            new_users: {
              compareWith: ["Prev. period"],
            },
          },
        },
      ],
    },
    {
      id: 3,
      insights: [
        {
          id: 1,
          title: "Total Registered Players",
          chartType: ChartTypes.SIMPLE_CHART,
          metrics: [
            {
              metricKey: "revenue",
              metricLabel: "Revenue",
              chartType: ChartTypes.LINE,
              yAxisId: "right",
            },
          ],
          filters: {
            revenue: {
              compareWith: ["Prev. period"],
            },
          },
        },
        {
          id: 2,
          title: "Total Registered Players",
          chartType: ChartTypes.SIMPLE_CHART,
          metrics: [
            {
              metricKey: "participation_rate",
              metricLabel: "Total Registered Players",
              chartType: ChartTypes.BAR,
            },
          ],
        },
      ],
    },
    {
      id: 4,
      insights: [
        {
          id: 1,
          title: "Total Player Joined",
          chartType: ChartTypes.SIMPLE_CHART,
          metrics: [
            {
              metricKey: "revenue",
              metricLabel: "Total Player Joined",
              chartType: ChartTypes.LINE,
              yAxisId: "right",
            },
          ],
          filters: {
            revenue: {
              compareWith: ["Prev. period"],
            },
          },
        },
        {
          id: 2,
          title: "Total Participated Players",
          chartType: ChartTypes.SIMPLE_CHART,
          metrics: [
            {
              metricKey: "new_users",
              metricLabel: "Total Participated Players",
              chartType: ChartTypes.BAR,
              yAxisId: "right",
            },
          ],
        },
      ],
    },
    {
      id: 5,
      insights: [
        {
          id: 1,
          title: "Join Rate",
          chartType: ChartTypes.SIMPLE_CHART,
          metrics: [
            {
              metricKey: "revenue",
              metricLabel: "Join Rate",
              chartType: ChartTypes.LINE,
              yAxisId: "right",
            },
          ],
          filters: {
            revenue: {
              compareWith: ["Prev. period"],
            },
          },
        },
        {
          id: 2,
          title: "Participation Rate",
          chartType: ChartTypes.SIMPLE_CHART,
          metrics: [
            {
              metricKey: "participation_rate",
              metricLabel: "Participation Rate",
              chartType: ChartTypes.BAR,
              yAxisId: "right",
            },
          ],
        },
      ],
    },
    {
      id: 6,
      insights: [
        {
          id: 1,
          title: "Registrations vs Participated Players vs Participation Rate",
          chartType: ChartTypes.SIMPLE_CHART,
          metrics: [
            {
              metricKey: "registrations",
              metricLabel: "Registrations",
              chartType: ChartTypes.LINE,
            },
            {
              metricKey: "registrations",
              metricLabel: "Participated Players",
              chartType: ChartTypes.BAR,
            },
            {
              metricKey: "registrations",
              metricLabel: "Participation Rate",
              chartType: ChartTypes.BAR,
            },
          ],
        },
      ],
    },
    {
      id: 7,
      title: "Comparision over a time period",
      insights: [
        {
          id: 1,
          title: "Tournaments Organised by Tournament Type",
          chartType: ChartTypes.SIMPLE_CHART,
          metrics: [
            {
              metricKey: "registrations",
              metricLabel: "Round Robin",
              chartType: ChartTypes.BAR,
              yAxisId: "right",
            },
            {
              metricKey: "new_users",
              metricLabel: "Single Elimination",
              chartType: ChartTypes.BAR,
            },
            {
              metricKey: "new_users",
              metricLabel: "Double Elimination",
              chartType: ChartTypes.BAR,
            },
          ],
        },
        {
          id: 2,
          title: "Tournaments Organised by Game Type",
          chartType: ChartTypes.SIMPLE_CHART,
          metrics: [
            {
              metricKey: "registrations",
              metricLabel: "Round Robin",
              chartType: ChartTypes.BAR,
              yAxisId: "right",
            },
          ],
          filters: {
            registrations: { showDimensionSplitIn: "user__age_group" },
          },
        },
      ],
    },
    {
      id: 8,
      insights: [
        {
          id: 1,
          title: "Participated Players by Game Type",
          chartType: ChartTypes.SIMPLE_CHART,
          metrics: [
            {
              metricKey: "revenue",
              metricLabel: "Revenue",
              chartType: ChartTypes.BAR,
              yAxisId: "right",
            },
          ],
          filters: {
            revenue: { showDimensionSplitIn: "user__device_type" },
          },
        },
      ],
    },
    {
      id: 9,
      title:
        "How many registered users have joined and dropped off live tournaments ?",
      insights: [
        {
          id: 1,
          title: "Registrations vs Joined Players",
          chartType: ChartTypes.SIMPLE_CHART,
          metrics: [
            {
              metricKey: "revenue",
              metricLabel: "Joined Players",
              chartType: ChartTypes.BAR,
              yAxisId: "right",
            },
            {
              metricKey: "revenue",
              metricLabel: "Registrations",
              chartType: ChartTypes.BAR,
              yAxisId: "right",
            },
          ],
        },
        {
          id: 2,
          title: "Joined Player vs Dropoffs",
          chartType: ChartTypes.SIMPLE_CHART,
          metrics: [
            {
              metricKey: "new_users",
              metricLabel: "New Users",
              chartType: ChartTypes.BAR,
              yAxisId: "right",
            },
            {
              metricKey: "registrations",
              metricLabel: "Participation Rate",
              chartType: ChartTypes.BAR,
            },
          ],
        },
      ],
    },
    {
      id: 10,
      title:
        "Key Performance Drivers change - Tournament Participation & Key Performance Drivers change - Total Dropoff",
      insights: [
        {
          id: 1,
          title:
            "5 of tournament had significant change, out of which Victory Vanguard has the most positive change and June Jam the most negative",
          chartType: ChartTypes.SIMPLE_CHART,
          metrics: [
            {
              metricKey: "revenue",
              metricLabel: "Non Significant Change",
              chartType: ChartTypes.BAR,
              yAxisId: "right",
            },
          ],
          filters: {
            revenue: { showDimensionSplitIn: "user__device_type" },
          },
        },
        {
          id: 2,
          title:
            "5 tournaments had significant change, out of which Glory Gauntlet has the most positive change and June Jam the most negative",
          chartType: ChartTypes.SIMPLE_CHART,
          metrics: [
            {
              metricKey: "new_users",
              metricLabel: "Significant Change",
              chartType: ChartTypes.BAR,
              yAxisId: "right",
            },
          ],
          filters: {
            new_users: { showDimensionSplitIn: "user__device_type" },
          },
        },
      ],
    },
  ];
};

export const getLiveBoardTemplatesByWorkspaceIdAndUserId = async (
  workspaceId: string
): Promise<Template[]> => {
  return [
    {
      id: 1,
      insights: [
        {
          id: 1,
          title: "Registrations",
          chartType: ChartTypes.BIGNUMBERWITHTREND,
          metrics: [
            {
              metricKey: "new_users",
              metricLabel: "Total Tournaments Organized",
            },
          ],
        },
        {
          id: 2,
          title: "Joined Players",
          chartType: ChartTypes.BIGNUMBERWITHTREND,
          metrics: [
            {
              metricKey: "registrations",
              metricLabel: "Total Registered Players",
            },
          ],
        },
        {
          id: 3,
          chartType: ChartTypes.BIGNUMBERWITHTREND,
          title: "Current Round",
          metrics: [
            {
              metricKey: "new_users",
              metricLabel: "Total Players Participated",
            },
          ],
        },
      ],
    },
    {
      id: 1,
      insights: [
        {
          id: 4,
          chartType: ChartTypes.BIGNUMBERWITHTREND,
          title: "Matches Played",
          metrics: [
            {
              metricKey: "participation_rate",
              metricLabel: "Participation Rate Per Tourney",
            },
          ],
        },
        {
          id: 5,
          chartType: ChartTypes.BIGNUMBERWITHTREND,
          title: "Players Remaining in Tournament",
          metrics: [
            {
              metricKey: "participation_rate",
              metricLabel: "Total Dropped off Players",
            },
          ],
        },
        {
          id: 6,
          chartType: ChartTypes.BIGNUMBERWITHTREND,
          title: "Current Matches",
          metrics: [
            {
              metricKey: "new_users",
              metricLabel: "Avg Drop off Rate Per Tourney",
            },
          ],
        },
        {
          id: 4,
          chartType: ChartTypes.BIGNUMBERWITHTREND,
          title: "Current Active Players",
          metrics: [
            {
              metricKey: "new_users",
              metricLabel: "Total Players Participated",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      insights: [
        {
          id: 1,
          title: "Registrations",
          chartType: ChartTypes.SIMPLE_CHART,
          metrics: [
            {
              metricKey: "registrations",
              metricLabel: "Registrations",
              chartType: ChartTypes.LINE,
              yAxisId: "right",
            },
          ],
        },
        {
          id: 2,
          title: "Active Players vs Players Remaining in Tournament",
          chartType: ChartTypes.SIMPLE_CHART,
          metrics: [
            {
              metricKey: "active_users",
              metricLabel: "Active Players",
              chartType: ChartTypes.BAR,
              yAxisId: "right",
            },
            {
              metricKey: "registrations",
              metricLabel: "Remaining Players",
              chartType: ChartTypes.BAR,
              yAxisId: "right",
            },
          ],
        },
      ],
    },
  ];
};
