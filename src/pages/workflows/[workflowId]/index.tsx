import { useRouter } from "next/router";
import { useReviews } from "../../../hooks/useReviews";
import { Table } from "../../../da-insight-kit/components/Table";
import { DashboardLayout } from "@/da-insight-kit";
import { IReview } from "@/services/reviews.svc";
import { useLiveBoards } from "@/hooks/useLiveBoards";

export default function WorkflowsPage() {
  const WORKSPACE_ID = process.env.NEXT_PUBLIC_WORKSPACE_ID;
  const { reviews } = useReviews(WORKSPACE_ID);
  const { liveBoards } = useLiveBoards(WORKSPACE_ID);
  const router = useRouter();

  return (
    <div className="flex flex-col gap-y-6 p-12">
      <DashboardLayout
        title="Live Boards"
        description="You can review what is happening within your organization, or within teams and projects."
      >
        <Table
          colNames={["Name", "Created On", "Updated On"]}
          data={liveBoards}
          renderRow={(liveBoard: IReview) => (
            <>
              <td
                onClick={() =>
                  router.push(
                    `/workflows/${router.query.workflowId}/${liveBoard.id}`
                  )
                }
                className="px-4 py-2 cursor-pointer hover:underline"
              >
                {liveBoard.name}
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
          data={reviews}
          renderRow={(review: IReview) => (
            <>
              <td
                onClick={() =>
                  router.push(
                    `/workflows/${router.query.workflowId}/${review.id}`
                  )
                }
                className="px-4 py-2 cursor-pointer hover:underline"
              >
                {review.name}
              </td>
              <td className="px-4 py-2">{review.createdOn}</td>
              <td className="px-4 py-2">{review.updatedOn}</td>
            </>
          )}
        />
      </DashboardLayout>
    </div>
  );
}
