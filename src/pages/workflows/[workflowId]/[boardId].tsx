import useTemplates from "@/hooks/useTemplates";
import { useRouter } from "next/router";
import {
  Insight,
  DashboardLayout,
  ValidDashboardColumns,
  IInsight,
} from "@/da-insight-kit";
import useLiveBoardTemplates from "@/hooks/useLiveBoardTemplates";

const WORKSPACE_ID = "42eed85d-b1d7-4b8e-8621-1dfa79e72cf1";

export default function WorkflowsTemplatePage() {
  const router = useRouter();
  const { templates } = useTemplates(WORKSPACE_ID);
  const { liveBoardTemplates } = useLiveBoardTemplates(WORKSPACE_ID);
  const workspaceId = process.env.NEXT_PUBLIC_WORKSPACE_ID;

  if (!workspaceId) return <p className="mt-10">Workspace ID not found</p>;

  return (
    <DashboardLayout title="Workflows" cols={ValidDashboardColumns.ONE}>
      <div className="flex flex-col gap-y-4 p-4 px-44">
        {liveBoardTemplates?.map((template) => (
          <>
            <h1 className="text-xl">{template.title}</h1>
            <div className="flex gap-x-4">
              {template.insights.map((insight: IInsight) => (
                <Insight
                  key={insight.id}
                  workspaceId={workspaceId}
                  title={insight.title}
                  type={insight.chartType}
                  metrics={insight.metrics}
                  filters={insight?.filters}
                  className="h-60"
                  onClick={() => router.push(`${router.asPath}/${insight.id}`)}
                />
              ))}
            </div>
          </>
        ))}
      </div>
    </DashboardLayout>
  );
}
