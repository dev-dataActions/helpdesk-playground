import React from "react";
import { useRouter } from "next/router";
import useWorkflowBoards from "../hooks/useWorkflowBoards";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { PopUpMenu } from "da-insight-kit/dist/common/PopUpMenu";
import { PanelLayout } from "@/modules/layouts/PanelLayout";
import { Loader } from "@/common/base/Loader";
import { Button } from "@/common/base/Button";
import { BoardTypes } from "@/constants/board.constants";
import Table from "@/common/functional/Table";

interface WorkflowBoardsProps {
  workflowId: string;
}

export const WorkflowBoards: React.FC<WorkflowBoardsProps> = ({
  workflowId,
}) => {
  const { boards, loading } = useWorkflowBoards(workflowId);
  const { query, push } = useRouter();

  const columns = [
    {
      key: "title",
      title: "Title",
      render: (value: string) => (
        <span className="text-sm text-gray-700">{value}</span>
      ),
    },
    {
      key: "deployed",
      title: "stage",
      render: (value: boolean) => (
        <span className="text-gray-700 text-sm">
          {value ? "Deployed" : "Draft"}
        </span>
      ),
    },
    {
      key: "lastUpdated",
      title: "Last updated",
      render: (value: string) => (
        <span className="text-gray-700 text-sm">{value}</span>
      ),
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
          onClick={(metric: any) =>
            push(`/workflows/${query?.workflowId}/${metric.id}`)
          }
        />
      </PanelLayout>

      <PanelLayout
        title="Review Boards"
        description="  You can create dashboards within this organization, or within teams
          and projects."
      >
        <Table
          columns={columns}
          data={boards?.filter(
            (board) => board.type === BoardTypes.REVIEW_BOARD
          )}
          onClick={(board: any) =>
            push(`/workflows/${query?.workflowId}/${board.id}`)
          }
        />
      </PanelLayout>
    </div>
  );
};
