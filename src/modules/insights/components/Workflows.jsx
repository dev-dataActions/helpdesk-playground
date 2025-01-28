import { useRouter } from "next/router";
import { GoWorkflow } from "react-icons/go";

export const Workflows = ({ workflows }) => {
  const router = useRouter();

  if (!workflows || workflows.length == 0)
    return <div className="text-gray-500 text-sm mt-5">No workflows found</div>;

  return (
    <div className="grid grid-cols-12 gap-4">
      {workflows?.map((workflow) => {
        return (
          <button
            key={workflow.id}
            className="px-5 py-4 bg-white flex justify-start items-start gap-x-2 rounded-xl border border-gray-200 hover:cursor-pointer col-span-4 hover:shadow-md"
            onClick={() => router.push(`/workflows/${workflow.id}`)}
          >
            <div className="flex gap-2 items-start justify-between w-full">
              <div className="flex flex-col text-left h-full w-[85%]">
                <p className="mb-1">{workflow.name}</p>
                <p className="text-xs text-gray-500">{workflow.description}</p>
              </div>
              <GoWorkflow size={36} />
            </div>
          </button>
        );
      })}
    </div>
  );
};
