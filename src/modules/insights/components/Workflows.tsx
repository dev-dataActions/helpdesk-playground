import { DashboardLayout, ValidDashboardColumns } from "da-insight-kit";
import { useRouter } from "next/router";
import { IWorkflow } from "../hooks/useWorkflows";

export interface IWorkflowProps {
  workflows: IWorkflow[];
}
export const Workflows: React.FC<IWorkflowProps> = ({ workflows }) => {
  const router = useRouter();

  if (!workflows) return <div>No workflow found</div>;

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
              onClick={() => router.push(`/workflows/${workflow.id}`)}
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
