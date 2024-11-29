import { useRouter } from "next/router";
import { workflows, workflowsTree } from "..";
import { findNode } from ".";
import { Insight } from "@/da-insight-kit";
import { ValidSpanColumns } from "@/da-insight-kit/components/Insight";
import {
  DashboardLayout,
  ValidDashboardColumns,
} from "@/da-insight-kit/components/DashboardLayout";

const WORKSPACE_ID = "42eed85d-b1d7-4b8e-8621-1dfa79e72cf1";

export default function ReportingPage() {
  const router = useRouter();
  const { query } = router;
  const workflowIds = query?.workflowIds?.split("-");
  const workflowId = workflowIds?.[workflowIds?.length - 1];
  const workflow = workflows?.find((w) => w.id === parseInt(workflowId));
  const workflowNode = findNode(workflowsTree[0], workflowId);

  console.log(workflow, workflowNode);

  return (
    <div className="pt-12">
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
              />
            );
          })}
        </DashboardLayout>
      )}
    </div>
  );
}
