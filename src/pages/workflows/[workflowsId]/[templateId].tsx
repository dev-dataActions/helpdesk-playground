import { Insight } from "@/da-insight-kit";
import { ValidSpanColumns } from "@/da-insight-kit/components/Insight";
import useTemplates from "@/hooks/useTemplates";
import { InsightType } from "@/services/templates.svc";
import { useRouter } from "next/router";

const WORKSPACE_ID = "42eed85d-b1d7-4b8e-8621-1dfa79e72cf1";

export default function WorkflowsTemplatePage() {
  const router = useRouter();
  const { templates } = useTemplates(WORKSPACE_ID);
  const workspaceId = process.env.NEXT_PUBLIC_WORKSPACE_ID;

  if (!workspaceId) return <p>Workspace ID not found</p>;

  return (
    <div className="flex flex-col mt-10 gap-y-4 p-4 px-48">
      {templates?.map((template) => (
        <>
          <h1 className="text-xl">{template.title}</h1>
          <div className="flex gap-x-4">
            {template.insights.map((insight: InsightType) => (
              <Insight
                key={1}
                workspaceId={workspaceId}
                title={insight.title}
                type={insight.chartType}
                metrics={insight.metrics}
                filters={insight?.filters}
                spanCols={ValidSpanColumns.THREE}
                className="h-60"
                onClick={() => router.push(`${router.asPath}/${insight.id}`)}
              />
            ))}
          </div>
        </>
      ))}
    </div>
  );
}
