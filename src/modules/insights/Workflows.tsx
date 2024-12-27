import { DashboardLayout, ValidDashboardColumns } from "@/da-insight-kit";
import { IWorkflow } from "@/services/workflows.svc";
import { useRouter } from "next/router";

export interface IWorkflowProps {
  workflows: IWorkflow[];
}
export const Workflows: React.FC<IWorkflowProps> = ({ workflows }) => {
  const router = useRouter();
  const WORKSPACE_ID = process.env.NEXT_PUBLIC_WORKSPACE_ID;

  if (!workflows || !WORKSPACE_ID) return <div>No pins found</div>;

  return (
    <div>
      <DashboardLayout
        cols={ValidDashboardColumns.TWELVE}
        title="Workflows"
        description="You can browse your workflows to review and keep track of progress."
      >
        {workflows?.map((workflow) => {
          return (
            <button
              key={workflow.id}
              className="px-5 py-4 bg-white flex justify-center items-center gap-x-2 rounded-xl border border-gray-200 hover:cursor-pointer col-span-4 hover:shadow-md"
              onClick={() => router.push(`/insights/${workflow.id}`)}
            >
              <div className="flex flex-col text-left h-full">
                <p className="mb-1">{workflow.name}</p>
                <p className="text-sm text-gray-500">{workflow.desc}</p>
              </div>
            </button>
          );
        })}
      </DashboardLayout>
    </div>
  );
};
