import { useRouter } from "next/router";
import { useReviews } from "../../../hooks/useReviews";
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
        <div className="border border-gray-200 rounded-lg bg-white">
          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Name</th>
                <th className="px-4 py-2 text-left font-semibold">
                  Created On
                </th>
                <th className="px-4 py-2 text-left font-semibold">
                  Updated On
                </th>
              </tr>
            </thead>
            <tbody>
              {reviews?.map((board, idx) => (
                <tr
                  key={board.id}
                  className={`cursor-pointer text-sm text-gray-600 ${
                    idx != reviews.length - 1 ? "border-b border-gray-200" : ""
                  }`}
                  onClick={() => router.push(`/workflows/1/${board.id}`)}
                >
                  <td className="px-4 py-2">
                    <a href={"#"}>{board.name}</a>
                  </td>
                  <td className="px-4 py-2">{board.createdOn}</td>
                  <td className="px-4 py-2">{board.updatedOn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <p className="text-xl font-semibold">Review Boards</p>
        <p className="text-gray-600">
          You can review workflows within this organization, or within teams and
          projects.
        </p>
        <div className="border border-gray-200 rounded-lg bg-white ">
          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Name</th>
                <th className="px-4 py-2 text-left font-semibold">
                  Created On
                </th>
                <th className="px-4 py-2 text-left font-semibold">
                  Last Edited By
                </th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-600">
              <tr>
                <td className="px-4 py-2">No Review Boards</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
