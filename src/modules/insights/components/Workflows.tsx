import { DashboardLayout, ValidDashboardColumns } from "da-insight-kit";
import { useRouter } from "next/router";
import { IWorkflow } from "../hooks/useWorkflows";
import { GoWorkflow } from "react-icons/go";

export interface IWorkflowProps {
  workflows: IWorkflow[];
}
export const Workflows: React.FC<IWorkflowProps> = ({ workflows }) => {
  const router = useRouter();

  if (!workflows) return <div>No workflow found</div>;

  return (
    <DashboardLayout
      cols={ValidDashboardColumns.TWELVE}
      title="Workflows"
      description="You can browse your workflows to review and keep track of progress."
    >
      {workflows?.map((workflow) => {
        return (
          <button
            key={workflow.id}
            className="px-5 py-4 bg-white flex justify-start items-start gap-x-2 rounded-xl border border-gray-200 hover:cursor-pointer col-span-4 hover:shadow-md"
            onClick={() => router.push(`/workflows/${workflow.workflow_id}`)}
          >
            <div className="flex gap-2 items-start justify-between w-full">
              <div className="flex flex-col text-left h-full w-[85%]">
                <p className="mb-1">{workflow.workflow_name}</p>
                <p className="text-xs text-gray-500">
                  {workflow.data.description}
                </p>
              </div>
              <GoWorkflow size={36} />
            </div>
          </button>
        );
      })}
    </DashboardLayout>
  );
};
