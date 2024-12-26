import { useRouter } from "next/router";
import { useReviews } from "../../../hooks/useReviews";
import { Table } from "../../../da-insight-kit/components/Table";
const WORKSPACE_ID = "42eed85d-b1d7-4b8e-8621-1dfa79e72cf1";

export default function WorkflowsPage() {
  const { reviews } = useReviews(WORKSPACE_ID);
  const router = useRouter();

  return (
    <div className="flex flex-col gap-y-4 p-4 mt-12 px-24">
      <div className="mb-6 flex flex-col gap-y-2">
        <p className="text-xl font-semibold">Live Boards</p>
        <p className="text-gray-600">
          You can review what is happening within your organization, or within
          teams and projects.
        </p>
        <Table
          colNames={["Name", "Created On", "Updated On"]}
          data={reviews || []}
          renderRow={(board, idx) => (
            <>
              <div
                onClick={() => router.push(`/workflows/1/${board.id}`)}
                className="cursor-pointer"
              >
                <td className="px-4 py-2">{board.name}</td>
              </div>
              <td className="px-4 py-2">{board.createdOn}</td>
              <td className="px-4 py-2">{board.updatedOn}</td>
            </>
          )}
          emptyMessage="No Live Boards"
        />
      </div>

      <div className="flex flex-col gap-y-2">
        <p className="text-xl font-semibold">Review Boards</p>
        <p className="text-gray-600">
          You can review workflows within this organization, or within teams and
          projects.
        </p>
        <Table
          colNames={["Name", "Created On", "Last Edited By"]}
          data={[]}
          renderRow={() => <></>}
        />
      </div>
    </div>
  );
}
