import React from "react";
import { useRouter } from "next/router";
import useWorkflowBoards from "../hooks/useWorkflowBoards";
import { Loading } from "../common/functional/Loading";
import Table from "../common/functional/Table";
import { PanelLayout } from "../common/layout/PanelLayout";
import { BoardTypes } from "../constants/board.constants";

export const WorkflowBoards = ({ workflowId }) => {
  const { query, push } = useRouter();
  const { boards, loading } = useWorkflowBoards(workflowId);

  const columns = [
    {
      key: "title",
      title: "Title",
      render: (value) => <span className="text-sm text-gray-700">{value}</span>,
    },
    {
      key: "lastUpdated",
      title: "Last updated",
      render: (value) => <span className="text-gray-700 text-sm">{value}</span>,
    },
  ];

  if (loading) return <Loading />;

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
