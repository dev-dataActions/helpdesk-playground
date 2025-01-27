import React from "react";
import { useRouter } from "next/router";
import useWorkflowBoards from "../hooks/useWorkflowBoards";
import { PanelLayout } from "@/modules/layouts/PanelLayout";
import { Loader } from "@/modules/insights/common/base/Loader";
import { BoardTypes } from "@/modules/insights/constants/board.constants";
import Table from "@/modules/insights/common/functional/Table";

export const WorkflowBoards = ({ workflowId }) => {
  const { boards, loading } = useWorkflowBoards(workflowId);
  const { query, push } = useRouter();

  const columns = [
    {
      key: "title",
      title: "Title",
      render: (value) => <span className="text-sm text-gray-700">{value}</span>,
    },
    {
      key: "deployed",
      title: "stage",
      render: (value) => (
        <span className="text-gray-700 text-sm">{value ? "Deployed" : "Draft"}</span>
      ),
    },
    {
      key: "lastUpdated",
      title: "Last updated",
      render: (value) => <span className="text-gray-700 text-sm">{value}</span>,
    },
  ];

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col gap-3">
      <PanelLayout
        title="Live Boards"
        description="  You can create dashboards within this organization, or within teams
          and projects."
        className="pt-6"
      >
        <Table
          columns={columns}
          data={boards?.filter((board) => board.type === BoardTypes.LIVE_BOARD)}
          onClick={(metric) => push(`/workflows/${query?.workflowId}/${metric.id}`)}
        />
      </PanelLayout>

      <PanelLayout
        title="Review Boards"
        description="  You can create dashboards within this organization, or within teams
          and projects."
      >
        <Table
          columns={columns}
          data={boards?.filter((board) => board.type === BoardTypes.REVIEW_BOARD)}
          onClick={(board) => push(`/workflows/${query?.workflowId}/${board.id}`)}
        />
      </PanelLayout>
    </div>
  );
};
