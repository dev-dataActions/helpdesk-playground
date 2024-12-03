import { Insight } from "@/da-insight-kit";
import { Loader } from "@/da-insight-kit/common/Loader";
import {
  DashboardLayout,
  ValidDashboardColumns,
} from "@/da-insight-kit/components/DashboardLayout";
import { ValidSpanColumns } from "@/da-insight-kit/components/Insight";
import { ChartTypes } from "@/da-insight-kit/constants/charts.contant";
import { usePins } from "@/hooks/usePins";
import { deletePin } from "@/services/pins.svc";
import { useState } from "react";
import { GoHistory } from "react-icons/go";
import { SlBulb } from "react-icons/sl";

const WORKSPACE_ID = "42eed85d-b1d7-4b8e-8621-1dfa79e72cf1";

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
        analysis: [
          {
            id: "ria_1",
            title: "Revenue",
            chartType: ChartTypes.SIMPLE_CHART,
            metrics: [
              {
                metricKey: "revenue",
                metricLabel: "Revenue",
                chartType: ChartTypes.AREA,
              },
            ],
          },
          {
            id: "ria_2",
            title: "Revenue vs Registrations",
            chartType: ChartTypes.SIMPLE_CHART,
            metrics: [
              {
                metricKey: "registrations",
                metricLabel: "Registrations",
                chartType: ChartTypes.LINE,
                yAxisId: "right",
              },
              {
                metricKey: "revenue",
                metricLabel: "Revenue",
                chartType: ChartTypes.LINE,
              },
            ],
          },
        ],
      },
      {
        id: "ri_2",
        title: "Participation rate",
        chartType: ChartTypes.BIGNUMBERWITHTREND,
        metrics: [
          {
            metricKey: "participation_rate",
            metricLabel: "Participation rate",
          },
        ],
      },
      {
        id: "ri_3",
        title: "Registrations",
        chartType: ChartTypes.BIGNUMBERWITHTREND,
        metrics: [
          {
            metricKey: "registrations",
            metricLabel: "Registrations",
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
    id: 0,
    children: [
      {
        id: 1,
        children: [],
      },
      {
        id: 2,
        children: [
          {
            id: 3,
            children: [],
          },
        ],
      },
    ],
  },
];

export default function InsightPage() {
  const { pins, loading } = usePins(WORKSPACE_ID);
  const [workflowName, setWorkflowName] = useState("");
  if (loading) return <Loader />;
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
        {workflowsTree[0].children.map((workflowNode) => {
          const workflow = workflows.find((w) => w.id === workflowNode.id);
          return (
            <div
              key={workflow.id}
              className="bg-white p-3 rounded-lg border border-gray-300 text-xs text-gray-800 hover:underline hover:cursor-pointer"
            >
              <a
                href={`/workflows/${workflow.id}`}
                className="flex justify-around items-center gap-x-2"
              >
                {workflow.icon}
                {workflow.name}
              </a>
            </div>
          );
        })}
      </div>
      <div className="w-full">
        {pins && (
          <DashboardLayout
            cols={ValidDashboardColumns.TWELVE}
            title={`My pins`}
          >
            {pins?.map((insight) => {
              return (
                <Insight
                  key={insight?.data?.id}
                  workspaceId={WORKSPACE_ID}
                  title={insight?.data?.title}
                  type={insight?.data?.chartType}
                  metrics={insight?.data?.metrics}
                  spanCols={ValidSpanColumns.THREE}
                  className="h-60"
                  actions={[
                    {
                      name: "Remove from pins",
                      onClick: () => deletePin(WORKSPACE_ID, insight?.pin_id),
                    },
                  ]}
                  onClick={() => router.push(`${asPath}/${insight.id}`)}
                />
              );
            })}
          </DashboardLayout>
        )}
      </div>
    </div>
  );
}
