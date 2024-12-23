import { Insight } from "@/da-insight-kit";
import { Loader } from "@/da-insight-kit/common/Loader";
import { ValidSpanColumns } from "@/da-insight-kit/components/Insight";
import { usePins } from "@/hooks/usePins";
import { deletePin } from "@/services/pins.svc";
import { useState } from "react";
import { GoHistory } from "react-icons/go";
import { SlBulb } from "react-icons/sl";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const WORKSPACE_ID = "42eed85d-b1d7-4b8e-8621-1dfa79e72cf1";

const workflows = [
  {
    id: "1",
    name: "Tournament Planning",
    desc: "View tournaments workflows",
    icon: <GoHistory size={30} />,
  },
  {
    id: "2",
    name: "Tournament Execution",
    desc: "View tournament workflows insights",
    icon: <SlBulb size={30} />,
  },
];

export default function InsightPage() {
  const { pins, loading } = usePins(WORKSPACE_ID);
  const [workflowName, setWorkflowName] = useState("");
  if (loading) return <Loader />;
  return (
    <div className="flex flex-col mt-10 items-start p-5 gap-y-4 h-screen">
      <ToastContainer />
      <div className="w-auto flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-1">
          <p className="text-2xl font-semibold">Pinned Insights</p>
          <p>
            You can browse your workflow live-boards and pin insights to quickly
            access and monitor
          </p>
        </div>
        <div className="w-1/2">
          {pins &&
            pins?.map((insight) => {
              return (
                <Insight
                  key={insight?.data?.id}
                  workspaceId={WORKSPACE_ID}
                  title={insight?.data?.title}
                  type={insight?.data?.chartType}
                  metrics={insight?.data?.metrics}
                  spanCols={ValidSpanColumns.THREE}
                  className="h-60"
                  actions={[
                    {
                      name: "Remove from pins",
                      onClick: () => {
                        deletePin(WORKSPACE_ID, insight?.pin_id);
                        toast("Removed from pins");
                      },
                    },
                  ]}
                  onClick={() => router.push(`${asPath}/${insight.id}`)}
                />
              );
            })}
        </div>
      </div>
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-1">
          <p className="text-2xl font-sans font-semibold">Workflows</p>
          <p>
            You can browse your workflows to review and keep track of progress.
          </p>
        </div>
        <div className="flex items-center gap-x-2">
          {workflows.map((workflow) => (
            <div
              key={workflow.id}
              className="flex bg-white p-3 h-28 justify-center rounded-lg border border-gray-300 text-xs text-gray-800 hover:cursor-pointer"
            >
              <a
                href={`/workflows/${workflow.id}`}
                className="flex items-center gap-x-6"
              >
                <div className="flex flex-col w-auto">
                  <p className="text-lg">{workflow.name}</p>
                  <p className="text-sm text-gray-600">{workflow.desc}</p>
                </div>
                <div className="text-lg">{workflow.icon}</div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
