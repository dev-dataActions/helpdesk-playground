import { ChartTypes } from "@/da-insight-kit/constants/charts.contant";
import { useState } from "react";
import { GoHistory } from "react-icons/go";
import { SlBulb } from "react-icons/sl";

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
    icon: <SlBulb />,
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
    icon: <GoHistory />,
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
  const [workflowName, setWorkflowName] = useState("");
  return (
    <div className="flex flex-col justify-center items-center p-5 gap-y-4 h-screen">
      <p className="text-3xl font-sans">Which workflow you want to analyse?</p>
      <input
        placeholder="Search Workflows"
        name="workflows"
        value={workflowName}
        className="p-3 bg-transparent border border-gray-400 rounded-lg w-[60%] mt-2 "
        onChange={(e) => setWorkflowName(e.target.value)}
      />
      <div className="flex items-center gap-x-2">
        {workflowsTree.map((workflowNode) => {
          const workflow = workflows.find((w) => w.id === workflowNode.id);
          return (
            <div
              key={workflowNode.id}
              className="bg-white p-3 rounded-lg border border-gray-300 text-xs text-gray-800"
            >
              <a
                href={`/workflows/${workflowNode.id}`}
                className="flex justify-around items-center gap-x-2"
              >
                {workflow.icon}
                {workflow.name}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
