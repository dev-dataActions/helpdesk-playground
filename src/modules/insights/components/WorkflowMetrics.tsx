import { PanelLayout } from "@/modules/layouts/PanelLayout";
import useWorkflowMetrics from "../hooks/useWorkflowMetrics";
import { MetricsTable } from "./MetricsTable";

export const WorkflowMetrics = ({ workflowId }) => {
  const { metrics, loading } = useWorkflowMetrics(workflowId);
  return (
    <PanelLayout
      title="Metrics"
      description="You can browse your metrics to review and keep track of progress."
      className="pt-6"
    >
      <MetricsTable metrics={metrics} loading={loading} />
    </PanelLayout>
  );
};
