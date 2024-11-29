import { ChartTypes } from "@/da-insight-kit/constants/charts.contant";

export const workflows = [
  {
    id: 1,
    name: "Players & teams registered",
    reportingInsights: [
      {
        id: "ri_1",
        title: "Active players",
        chartType: ChartTypes.BIGNUMBERWITHTREND,
        metrics: [
          {
            metricKey: "active_users",
            metricLabel: "Active players",
          },
        ],
      },
      {
        id: "ri_2",
        title: "Active players",
        chartType: ChartTypes.BIGNUMBERWITHTREND,
        metrics: [
          {
            metricKey: "active_users",
            metricLabel: "Active players",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Tournaments created",
    reportingInsights: [
      {
        id: "ri_1",
        title: "Revenue",
        chartType: ChartTypes.BIGNUMBERWITHTREND,
        metrics: [
          {
            metricKey: "revenue",
            metricLabel: "Revenue",
          },
        ],
      },
      {
        id: "ri_2",
        title: "Revenue",
        chartType: ChartTypes.BIGNUMBERWITHTREND,
        metrics: [
          {
            metricKey: "revenue",
            metricLabel: "Revenue",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Rewards distribution",
    reportingInsights: [
      {
        id: "ri_1",
        title: "Participation",
        chartType: ChartTypes.BIGNUMBERWITHTREND,
        metrics: [
          {
            metricKey: "participation_rate",
            metricLabel: "Participation rate",
          },
        ],
      },
      {
        id: "ri_2",
        title: "Participation",
        chartType: ChartTypes.BIGNUMBERWITHTREND,
        metrics: [
          {
            metricKey: "participation_rate",
            metricLabel: "Participation rate",
          },
        ],
      },
    ],
  },
];

export const workflowsTree = [
  {
    id: 1,
    children: [],
  },
  {
    id: 2,
    children: [3],
  },
];

export default function InsightPage() {
  return (
    <div>
      {workflowsTree.map((workflowNode) => {
        const workflow = workflows.find((w) => w.id === workflowNode.id);
        return (
          <div key={workflowNode.id}>
            <a href={`/workflows/${workflowNode.id}`}>{workflow.name}</a>
          </div>
        );
      })}
    </div>
  );
}
