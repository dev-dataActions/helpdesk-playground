const APP_BACKEND_URL = "https://backend.dataactions.ai";

export const getBoardByWorkspaceIdAndBoardId = async (workspaceId, boardId) => {
  try {
    // const res = await fetch(
    //   `${APP_BACKEND_URL}/v3/board?workspace_id=${workspaceId}&board_id=${boardId}`
    // );
    // return await res.json();
    return {
      insights: [
        {
          chartType: "BIGNUMBER",
          id: "insight_b9fbc2fb-a967-4ade-8644-542aef29bc1d",
          metrics: [
            {
              chartType: "BAR",
              metricKey: "joined_players",
              metricLabel: "Total Joins",
            },
          ],
          metric_id: "metric_302338c0-8cee-4697-99d6-f08e5ffeecda",
          title: "Total Joins",
        },
        {
          chartType: "BIGNUMBER",
          id: "insight_56e8125f-a6e4-4ef0-82ba-510c1b8e8ef7",
          metrics: [
            {
              chartType: "BAR",
              metricKey: "dropped_players",
              metricLabel: "Total Drop Offs",
            },
          ],
          metric_id: "metric_dee120fc-556b-42bc-acb6-d70f595735e4",
          title: "Drop offs",
        },
        {
          chartType: "MIXED",
          filters: {
            dropped_players: {
              showDimensionSplitIn: "age_group",
            },
          },
          id: "insight_d6e79122-8e1f-47b8-9b85-8da26ddd77dd",
          metrics: [
            {
              chartType: "BAR",
              filters: {
                showDimensionSplitIn: "age_group",
                timeGrain: "MONTHLY",
                timeRange: 180,
              },
              metricKey: "dropped_players",
              metricLabel: "Total Drop Offs",
            },
          ],
          metric_id: "metric_dee120fc-556b-42bc-acb6-d70f595735e4",
          title: "Drop off by age group",
        },
        {
          chartType: "MIXED",
          filters: {
            dropped_players: {
              showDimensionSplitIn: "platform",
            },
          },
          id: "insight_e4258306-276b-4346-af5a-82bf55699fa5",
          metrics: [
            {
              chartType: "BAR",
              filters: {
                showDimensionSplitIn: "platform",
                timeGrain: "MONTHLY",
                timeRange: 180,
              },
              metricKey: "dropped_players",
              metricLabel: "Total Drop Offs",
            },
          ],
          metric_id: "metric_dee120fc-556b-42bc-acb6-d70f595735e4",
          title: "Drop off by platform",
        },
        {
          chartType: "MIXED",
          filters: {
            dropped_players: {
              showDimensionSplitIn: "event_type",
            },
          },
          id: "insight_d7b1cb3e-a8f2-492b-9ff4-7f9d9fda78e4",
          metrics: [
            {
              chartType: "BAR",
              filters: {
                showDimensionSplitIn: "event_type",
                timeGrain: "MONTHLY",
                timeRange: 180,
              },
              metricKey: "dropped_players",
              metricLabel: "Total Drop Offs",
            },
          ],
          metric_id: "metric_dee120fc-556b-42bc-acb6-d70f595735e4",
          title: "Drop off by tournament type",
        },
        {
          chartType: "MIXED",
          filters: {
            dropped_players: {
              showDimensionSplitIn: "location",
            },
          },
          id: "insight_f79e1d8d-549a-4043-87af-1f6432e5a08e",
          metrics: [
            {
              chartType: "BAR",
              filters: {
                showDimensionSplitIn: "location",
                timeGrain: "MONTHLY",
                timeRange: 180,
              },
              metricKey: "dropped_players",
              metricLabel: "Total Drop Offs",
            },
          ],
          metric_id: "metric_dee120fc-556b-42bc-acb6-d70f595735e4",
          title: "Drop off by location",
        },
      ],
      title: "Tournaments review",
    };
  } catch (error) {
    console.error(error);
  }
};
