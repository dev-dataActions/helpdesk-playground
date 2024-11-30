import {
  DashboardLayout,
  ValidDashboardColumns,
} from "@/da-insight-kit/components/DashboardLayout";
import { workflows, workflowsTree } from "@/pages/workflows";
import { useRouter } from "next/router";
import { findNode } from "../..";
import { Insight } from "@/da-insight-kit";
import { ValidSpanColumns } from "@/da-insight-kit/components/Insight";
import { IoIosArrowForward } from "react-icons/io";
import { useMemo } from "react";

const WORKSPACE_ID = "42eed85d-b1d7-4b8e-8621-1dfa79e72cf1";

export default function InsightPage() {
  const router = useRouter();
  const { query, asPath } = router;
  const workflowIds = query?.workflowIds?.split("-");

  const workflowId = workflowIds?.[workflowIds?.length - 1];
  const insightId = query?.insightId;

  const workflow = workflows?.find((w) => w.id === parseInt(workflowId));
  const insight = useMemo(
    () => workflow?.reportingInsights?.find((i) => i.id == insightId),
    [workflow, insightId]
  );

  const workflowNode = findNode(workflowsTree[0], workflowId);

  console.log(insight, insight?.analysis);

  return (
    <div className="pt-12">
      {insight?.analysis && (
        <DashboardLayout cols={ValidDashboardColumns.SIX} title={`${insight?.title} analysis`}>
          {insight?.analysis?.map((insight) => {
            return (
              <Insight
                key={insight.id}
                workspaceId={WORKSPACE_ID}
                title={insight.title}
                type={insight.chartType}
                metrics={insight.metrics}
                spanCols={ValidSpanColumns.TWO}
                className="h-60"
                onClick={() => router.push(`${asPath}/${insight.id}`)}
              />
            );
          })}
        </DashboardLayout>
      )}
      {workflowNode?.children?.length > 0 && (
        <div className="flex flex-col gap-y-4 items-start w-[60%]">
          <p className="text-sm font-semibold">Related workflows</p>
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
