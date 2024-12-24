import { Insight } from "@/da-insight-kit";
import { ValidSpanColumns } from "@/da-insight-kit/components/Insight";
import { ChartTypes } from "@/da-insight-kit/constants/charts.contant";
import useTemplates from "@/hooks/useTemplates";
import { InsightType } from "@/services/templates.svc";
import { fi } from "date-fns/locale";
import { useRouter } from "next/router";
import { title } from "process";

export default function WorkflowsTemplatePage() {
  const router = useRouter();
  const { query, asPath } = router;
  const WORKSPACE_ID = "42eed85d-b1d7-4b8e-8621-1dfa79e72cf1";
  const { templates } = useTemplates(WORKSPACE_ID);
  return (
    <div className="flex flex-col mt-10 gap-y-4 p-4 px-48">
      {templates?.map((template) => (
        <>
          <h1 className="text-xl">{template.title}</h1>
          <div className="flex gap-x-4">
            {template.insights.map((insight: InsightType) => (
              <Insight
                key={1}
                workspaceId={WORKSPACE_ID}
                title={insight.title}
                type={insight.chartType}
                metrics={insight.metrics}
                filters={insight?.filters}
                spanCols={ValidSpanColumns.THREE}
                className="h-60"
                onClick={() => router.push(`${asPath}/${insight.id}`)}
              />
            ))}
          </div>
        </>
      ))}
    </div>
  );
}
