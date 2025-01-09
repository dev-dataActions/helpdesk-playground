import { ChartTypes, IInsight, ValidSpanColumns } from "da-insight-kit";

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
              chartType: ChartTypes.BIGNUMBER,
              metrics: [
                {
                  metricKey: "event_registrations",
                  metricLabel: "Total Tournaments Organized",
                },
              ],
              options: { className: "h-52", spanCols: ValidSpanColumns.FOUR },
            },
            {
              id: 2,
              title: "Total Registered Players",
              chartType: ChartTypes.BIGNUMBER,
              metrics: [
                {
                  metricKey: "event_registrations",
                  metricLabel: "Total Registered Players",
                },
              ],
              options: { className: "h-52", spanCols: ValidSpanColumns.FOUR },
            },
            {
              id: 3,
              title: "Total Players Participated",
              chartType: ChartTypes.BIGNUMBER,
              metrics: [
                {
                  metricKey: "joined_players",
                  metricLabel: "Total Players Participated",
                },
              ],
              options: { className: "h-52", spanCols: ValidSpanColumns.FOUR },
            },
          ],
        },
        {
          insights: [
            {
              id: 4,
              chartType: ChartTypes.BIGNUMBER,
              title: "Participation Rate Per Tourney",
              metrics: [
                {
                  metricKey: "participation_rate",
                  metricLabel: "Participation Rate Per Tourney",
                },
              ],
              options: { className: "h-52", spanCols: ValidSpanColumns.FOUR },
            },
            {
              id: 5,
              chartType: ChartTypes.BIGNUMBER,
              title: "Total Dropped off Players",
              metrics: [
                {
                  metricKey: "dropped_players",
                  metricLabel: "Total Dropped off Players",
                },
              ],
              options: { className: "h-52", spanCols: ValidSpanColumns.FOUR },
            },
            {
              id: 6,
              chartType: ChartTypes.BIGNUMBER,
              title: "Avg Drop off Rate Per Tourney",
              metrics: [
                {
                  metricKey: "participation_rate",
                  metricLabel: "Avg Drop off Rate Per Tourney",
                },
              ],
              options: { className: "h-52", spanCols: ValidSpanColumns.FOUR },
            },
          ],
        },
        // {
        //   title: "What happened this year across weeks and months?",
        //   insights: [
        //     {
        //       id: 1,
        //       title: "Tournament Organized",
        //       chartType: ChartTypes.MIXED,
        //       metrics: [
        //         {
        //           metricKey: "revenue",
        //           metricLabel: "Revenue",
        //           chartType: ChartTypes.LINE,
        //           yAxisId: "right",
        //         },
        //       ],
        //       filters: {
        //         revenue: {
        //           compareWith: ["Prev. period"],
        //         },
        //       },
        //     },
        //     {
        //       id: 2,
        //       title: "Tournament Organized",
        //       chartType: ChartTypes.MIXED,
        //       metrics: [
        //         {
        //           metricKey: "new_users",
        //           metricLabel: "New Users",
        //           chartType: ChartTypes.AREA,
        //           yAxisId: "right",
        //         },
        //       ],
        //       filters: {
        //         new_users: {
        //           compareWith: ["Prev. period"],
        //         },
        //       },
        //     },
        //   ],
        // },
        {
          insights: [
            {
              id: 1,
              title: "Total Registered Players",
              chartType: ChartTypes.MIXED,
              metrics: [
                {
                  metricKey: "joined_players",
                  metricLabel: "Total Registered Players",
                  chartType: ChartTypes.LINE,
                },
              ],
              options: { className: "h-60", spanCols: ValidSpanColumns.SIX },
            },
            {
              id: 2,
              title: "Total Registered Players",
              chartType: ChartTypes.MIXED,
              metrics: [
                {
                  metricKey: "joined_players",
                  metricLabel: "Total Registered Players",
                  chartType: ChartTypes.BAR,
                },
              ],
              filters: {
                joined_players: {
                  showDimensionSplitIn: "event_type",
                },
              },
              options: { className: "h-60", spanCols: ValidSpanColumns.SIX },
            },
          ],
        },
        {
          insights: [
            {
              id: 1,
              title: "Total Joined Players",
              chartType: ChartTypes.MIXED,
              metrics: [
                {
                  metricKey: "joined_players",
                  metricLabel: "Total Joined Players",
                  chartType: ChartTypes.LINE,
                },
              ],
              options: { className: "h-60", spanCols: ValidSpanColumns.SIX },
            },
            {
              id: 2,
              title: "Total Joined Players",
              chartType: ChartTypes.MIXED,
              metrics: [
                {
                  metricKey: "joined_players",
                  metricLabel: "Total Joined Players",
                  chartType: ChartTypes.BAR,
                },
              ],
              filters: {
                joined_players: {
                  showDimensionSplitIn: "event_type",
                },
              },
              options: { className: "h-60", spanCols: ValidSpanColumns.SIX },
            },
          ],
        },
        // {
        //   insights: [
        //     {
        //       id: 1,
        //       title: "Join Rate",
        //       chartType: ChartTypes.MIXED,
        //       metrics: [
        //         {
        //           metricKey: "revenue",
        //           metricLabel: "Join Rate",
        //           chartType: ChartTypes.LINE,
        //           yAxisId: "right",
        //         },
        //       ],
        //       filters: {
        //         revenue: {
        //           compareWith: ["Prev. period"],
        //         },
        //       },
        //     },
        //     {
        //       id: 2,
        //       title: "Participation Rate",
        //       chartType: ChartTypes.MIXED,
        //       metrics: [
        //         {
        //           metricKey: "participation_rate",
        //           metricLabel: "Participation Rate",
        //           chartType: ChartTypes.BAR,
        //           yAxisId: "right",
        //         },
        //       ],
        //     },
        //   ],
        // },
        // {
        //   insights: [
        //     {
        //       id: 1,
        //       title: "Registrations vs Participated Players vs Participation Rate",
        //       chartType: ChartTypes.MIXED,
        //       metrics: [
        //         {
        //           metricKey: "registrations",
        //           metricLabel: "Registrations",
        //           chartType: ChartTypes.LINE,
        //         },
        //         {
        //           metricKey: "registrations",
        //           metricLabel: "Participated Players",
        //           chartType: ChartTypes.BAR,
        //         },
        //         {
        //           metricKey: "registrations",
        //           metricLabel: "Participation Rate",
        //           chartType: ChartTypes.BAR,
        //         },
        //       ],
        //     },
        //   ],
        // },
        // {
        //   title: "Comparision over a time period",
        //   insights: [
        //     {
        //       id: 1,
        //       title: "Tournaments Organised by Tournament Type",
        //       chartType: ChartTypes.MIXED,
        //       metrics: [
        //         {
        //           metricKey: "registrations",
        //           metricLabel: "Round Robin",
        //           chartType: ChartTypes.BAR,
        //           yAxisId: "right",
        //         },
        //         {
        //           metricKey: "new_users",
        //           metricLabel: "Single Elimination",
        //           chartType: ChartTypes.BAR,
        //         },
        //         {
        //           metricKey: "new_users",
        //           metricLabel: "Double Elimination",
        //           chartType: ChartTypes.BAR,
        //         },
        //       ],
        //     },
        //     {
        //       id: 2,
        //       title: "Tournaments Organised by Game Type",
        //       chartType: ChartTypes.MIXED,
        //       metrics: [
        //         {
        //           metricKey: "registrations",
        //           metricLabel: "Round Robin",
        //           chartType: ChartTypes.BAR,
        //           yAxisId: "right",
        //         },
        //       ],
        //       filters: {
        //         registrations: { showDimensionSplitIn: "user__age_group" },
        //       },
        //     },
        //   ],
        // },
        // {
        //   insights: [
        //     {
        //       id: 1,
        //       title: "Participated Players by Game Type",
        //       chartType: ChartTypes.MIXED,
        //       metrics: [
        //         {
        //           metricKey: "revenue",
        //           metricLabel: "Revenue",
        //           chartType: ChartTypes.BAR,
        //           yAxisId: "right",
        //         },
        //       ],
        //       filters: {
        //         revenue: { showDimensionSplitIn: "user__device_type" },
        //       },
        //     },
        //   ],
        // },
        // {
        //   title: "How many registered users have joined and dropped off live tournaments ?",
        //   insights: [
        //     {
        //       id: 1,
        //       title: "Registrations vs Joined Players",
        //       chartType: ChartTypes.MIXED,
        //       metrics: [
        //         {
        //           metricKey: "revenue",
        //           metricLabel: "Joined Players",
        //           chartType: ChartTypes.BAR,
        //           yAxisId: "right",
        //         },
        //         {
        //           metricKey: "revenue",
        //           metricLabel: "Registrations",
        //           chartType: ChartTypes.BAR,
        //           yAxisId: "right",
        //         },
        //       ],
        //     },
        //     {
        //       id: 2,
        //       title: "Joined Player vs Dropoffs",
        //       chartType: ChartTypes.MIXED,
        //       metrics: [
        //         {
        //           metricKey: "new_users",
        //           metricLabel: "New Users",
        //           chartType: ChartTypes.BAR,
        //           yAxisId: "right",
        //         },
        //         {
        //           metricKey: "registrations",
        //           metricLabel: "Participation Rate",
        //           chartType: ChartTypes.BAR,
        //         },
        //       ],
        //     },
        //   ],
        // },
        // {
        //   title:
        //     "Key Performance Drivers change - Tournament Participation & Key Performance Drivers change - Total Dropoff",
        //   insights: [
        //     {
        //       id: 1,
        //       title:
        //         "5 of tournament had significant change, out of which Victory Vanguard has the most positive change and June Jam the most negative",
        //       chartType: ChartTypes.MIXED,
        //       metrics: [
        //         {
        //           metricKey: "revenue",
        //           metricLabel: "Non Significant Change",
        //           chartType: ChartTypes.BAR,
        //           yAxisId: "right",
        //         },
        //       ],
        //       filters: {
        //         revenue: { showDimensionSplitIn: "user__device_type" },
        //       },
        //     },
        //     {
        //       id: 2,
        //       title:
        //         "5 tournaments had significant change, out of which Glory Gauntlet has the most positive change and June Jam the most negative",
        //       chartType: ChartTypes.MIXED,
        //       metrics: [
        //         {
        //           metricKey: "new_users",
        //           metricLabel: "Significant Change",
        //           chartType: ChartTypes.BAR,
        //           yAxisId: "right",
        //         },
        //       ],
        //       filters: {
        //         new_users: { showDimensionSplitIn: "user__device_type" },
        //       },
        //     },
        //   ],
        // },
      ],
    };
  else if (boardId === "2")
    return {
      id: "2",
      title: "Tournament Health Check Dashboard",
      sections: [
        {
          insights: [
            {
              id: 1,
              title: "Registrations",
              chartType: ChartTypes.BIGNUMBER,
              metrics: [
                {
                  metricKey: "event_registrations",
                  metricLabel: "Registrations",
                },
              ],
              options: { className: "h-52", spanCols: ValidSpanColumns.FOUR },
            },
            {
              id: 2,
              title: "Joined Players",
              chartType: ChartTypes.BIGNUMBER,
              metrics: [
                {
                  metricKey: "joined_players",
                  metricLabel: "Joined Players",
                },
              ],
              options: { className: "h-52", spanCols: ValidSpanColumns.FOUR },
            },
            {
              id: 3,
              chartType: ChartTypes.BIGNUMBER,
              title: "Dropped Players",
              metrics: [
                {
                  metricKey: "dropped_players",
                  metricLabel: "Dropped Players",
                },
              ],
              options: { className: "h-52", spanCols: ValidSpanColumns.FOUR },
            },
          ],
        },
        {
          insights: [
            {
              id: 4,
              chartType: ChartTypes.MIXED,
              title: "Joined Players",
              metrics: [
                {
                  metricKey: "joined_players",
                  metricLabel: "Participation Rate Per Tourney",
                  chartType: ChartTypes.LINE,
                },
              ],
              filters: {
                joined_players: { showDimensionSplitIn: "event_type" },
              },
              options: { className: "h-60", spanCols: ValidSpanColumns.SIX },
            },
            {
              id: 5,
              chartType: ChartTypes.MIXED,
              title: "Dropped Players",
              metrics: [
                {
                  metricKey: "dropped_players",
                  metricLabel: "Dropped Players",
                  chartType: ChartTypes.LINE,
                },
              ],
              filters: {
                dropped_players: { showDimensionSplitIn: "event_type" },
              },
              options: { className: "h-60", spanCols: ValidSpanColumns.SIX },
            },
            {
              id: 6,
              chartType: ChartTypes.MIXED,
              title: "Registrations vs Joined Players",
              metrics: [
                {
                  metricKey: "event_registrations",
                  metricLabel: "Registrations",
                  chartType: ChartTypes.BAR,
                },
                {
                  metricKey: "joined_players",
                  metricLabel: "Joined Players",
                  chartType: ChartTypes.BAR,
                },
              ],
              options: { className: "h-60", spanCols: ValidSpanColumns.SIX },
            },
            {
              id: 4,
              chartType: ChartTypes.MIXED,
              title: "Joined Players vs Dropped Players",
              metrics: [
                {
                  metricKey: "joined_players",
                  metricLabel: "Joined Players",
                  chartType: ChartTypes.BAR,
                },
                {
                  metricKey: "dropped_players",
                  metricLabel: "Dropped Players",
                  chartType: ChartTypes.BAR,
                },
              ],
              options: { className: "h-60", spanCols: ValidSpanColumns.SIX },
            },
          ],
        },
      ],
    };
  return null;
};
