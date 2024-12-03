import { useRouter } from "next/router";
import { workflows, workflowsTree } from "../..";
import { findNode } from "..";
import { Insight } from "@/da-insight-kit";
import { ValidSpanColumns } from "@/da-insight-kit/components/Insight";
import {
  DashboardLayout,
  ValidDashboardColumns,
} from "@/da-insight-kit/components/DashboardLayout";
import { IoIosArrowForward } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";

export default function ReportingPage() {
  const router = useRouter();
  const { query, asPath } = router;
  const workflowIds = query?.workflowIds?.split("-");
  const workflowId = workflowIds?.[workflowIds?.length - 1];
  const workflow = workflows?.find((w) => w.id === parseInt(workflowId));
  const workflowNode = findNode(workflowsTree[0], workflowId);
  const WORKSPACE_ID = "42eed85d-b1d7-4b8e-8621-1dfa79e72cf1";
  const handleAction=(insight:Object)=>{
    async function postData(url = '', data = {}) {
      try {
          const response = await fetch(url, {
              method: 'POST', 
              headers: {
                  'Content-Type': 'application/json', 
              },
              body: JSON.stringify(data), 
          });
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          const result = await response.json(); 
          return result;
      } catch (error) {
          console.error('Error:', error);
          throw error;
      }
  }
  postData(`${process.env.NEXT_PUBLIC_BACKEND_URL}/pin`, {
      workspace_id: WORKSPACE_ID,
      user_id: "arihant",
      data_type: "pin",
      data: insight,
})
    .then((data) => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  }

  return (
    <div className="pt-20 px-32">
            <ToastContainer />
      {workflow?.reportingInsights && (
        <DashboardLayout cols={ValidDashboardColumns.SIX} title={`${workflow?.name} reporting`}>
          {workflow?.reportingInsights?.map((insight) => {
            return (
              <Insight
                key={insight.id}
                workspaceId={WORKSPACE_ID}
                title={insight.title}
                type={insight.chartType}
                metrics={insight.metrics}
                spanCols={ValidSpanColumns.TWO}
                className="h-60"
                actions={[{name:"Add to pins",onClick: () => {handleAction(insight);
                  toast("Added to pins");
                }}]}
                onClick={() => router.push(`${asPath}/${insight.id}`)}
              />
            );
          })}
        </DashboardLayout>
      )}
      {workflowNode?.children?.length > 0 && (
        <div className="p-5 flex flex-col items-start w-[60%]">
          <p className="text-sm font-light mb-2">Related workflows</p>
          {workflowNode?.children?.map((wn) => {
            const cworkflow = workflows?.find((w) => w.id === wn.id);
            return (
              <div key={cworkflow.id}>
                <a
                  href={`/workflows/${workflowIds}-${cworkflow.id}`}
                  className="flex items-center bg-white p-3 gap-x-2 rounded-lg w-auto text-xs border border-gray-300 justify-between"
                >
                  <p>{cworkflow.name}</p>
                  <IoIosArrowForward />
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
