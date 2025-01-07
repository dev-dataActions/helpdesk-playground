import { useRouter } from "next/router";
import { useLiveBoards } from "../hooks/useLiveBoards";
import { useReviewsBoards } from "../hooks/useReviewsBoards";
import { IBoard } from "../services/boards.svc";
import { DashboardLayout, Table } from "da-insight-kit";

export default function WorkflowDetailPage() {
  const router = useRouter();

  const { liveBoards } = useLiveBoards("userId");
  const { reviewBoards } = useReviewsBoards("userId");

  return (
    <div className="flex flex-col gap-y-6 p-12">
      <DashboardLayout
        title="Live Boards"
        description="You can review what is happening within your organization, or within teams and projects."
      >
        <Table
          colNames={["Name", "Created On", "Updated On"]}
          data={liveBoards}
          renderRow={(liveBoard: IBoard) => (
            <>
              <td
                onClick={() => router.push(`/workflows/${router.query.workflowId}/${liveBoard.id}`)}
                className="px-4 py-2 cursor-pointer hover:underline"
              >
                {liveBoard.title}
              </td>
              <td className="px-4 py-2">{liveBoard.createdOn}</td>
              <td className="px-4 py-2">{liveBoard.updatedOn}</td>
            </>
          )}
        />
      </DashboardLayout>

      <DashboardLayout
        title="Review Boards"
        description="You can review workflows within this organization, or within teams and projects."
      >
        <Table
          colNames={["Name", "Created On", "Last Edited By"]}
          data={reviewBoards}
          renderRow={(reviewBoard: IBoard) => (
            <>
              <td
                onClick={() =>
                  router.push(`/workflows/${router.query.workflowId}/${reviewBoard.id}`)
                }
                className="px-4 py-2 cursor-pointer hover:underline"
              >
                {reviewBoard.title}
              </td>
              <td className="px-4 py-2">{reviewBoard.createdOn}</td>
              <td className="px-4 py-2">{reviewBoard.updatedOn}</td>
            </>
          )}
        />
      </DashboardLayout>
    </div>
  );
}
