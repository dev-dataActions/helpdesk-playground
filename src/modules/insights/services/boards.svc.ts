import { ChartTypes, IInsight } from "da-insight-kit";

interface Section {
  title?: string;
  insights: IInsight[];
}

export interface IBoard {
  id: string;
  title: string;
  sections?: Section[];
  createdOn?: string;
  updatedOn?: string;
}

export const getReviewsBoardsByUserId = async (userId: string): Promise<IBoard[]> => {
  return [
    {
      id: "1",
      title: "Tournament health and performance review",
      createdOn: "October 30, 2024 11:09 AM",
      updatedOn: "October 30, 2024 11:09 AM",
    },
  ];
};

export const getLiveBoardsByUserId = async (userId: string): Promise<IBoard[]> => {
  return [
    {
      id: "2",
      title: "Tournament Health Check Dashboard",
      createdOn: "October 30, 2024 11:09 AM",
      updatedOn: "October 30, 2024 11:09 AM",
    },
  ];
};

export const getBoardByBoardId = async (boardId: string): Promise<IBoard | null> => {
  if (boardId === "1")
    return {
      id: "1",
      title: "Monthly Tournament Health & Performance Review",
      sections: [
        {
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
          title: "What happened this year across weeks and months?",
          insights: [
            {
              id: 1,
              title: "Tournament Organized",
              chartType: ChartTypes.MIXED,
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
              chartType: ChartTypes.MIXED,
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
          insights: [
            {
              id: 1,
              title: "Total Registered Players",
              chartType: ChartTypes.MIXED,
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
              chartType: ChartTypes.MIXED,
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
          insights: [
            {
              id: 1,
              title: "Total Player Joined",
              chartType: ChartTypes.MIXED,
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
              chartType: ChartTypes.MIXED,
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
          insights: [
            {
              id: 1,
              title: "Join Rate",
              chartType: ChartTypes.MIXED,
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
              chartType: ChartTypes.MIXED,
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
          insights: [
            {
              id: 1,
              title: "Registrations vs Participated Players vs Participation Rate",
              chartType: ChartTypes.MIXED,
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
          title: "Comparision over a time period",
          insights: [
            {
              id: 1,
              title: "Tournaments Organised by Tournament Type",
              chartType: ChartTypes.MIXED,
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
              chartType: ChartTypes.MIXED,
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
          insights: [
            {
              id: 1,
              title: "Participated Players by Game Type",
              chartType: ChartTypes.MIXED,
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
          title: "How many registered users have joined and dropped off live tournaments ?",
          insights: [
            {
              id: 1,
              title: "Registrations vs Joined Players",
              chartType: ChartTypes.MIXED,
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
              chartType: ChartTypes.MIXED,
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
          title:
            "Key Performance Drivers change - Tournament Participation & Key Performance Drivers change - Total Dropoff",
          insights: [
            {
              id: 1,
              title:
                "5 of tournament had significant change, out of which Victory Vanguard has the most positive change and June Jam the most negative",
              chartType: ChartTypes.MIXED,
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
              chartType: ChartTypes.MIXED,
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
      ],
    };
  else if (boardId === "2")
    return {
      id: "2",
      title: "Live Tournament Health - Across all Tournaments",
      sections: [
        {
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
          insights: [
            {
              id: 1,
              title: "Registrations",
              chartType: ChartTypes.MIXED,
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
              chartType: ChartTypes.MIXED,
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
      ],
    };
  return null;
};
