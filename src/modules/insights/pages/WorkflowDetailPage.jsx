import { useRouter } from "next/router";
import { Loading } from "../common/functional/Loading";
import { PanelLayout } from "../common/layout/PanelLayout";
import { WorkflowBoards } from "../components/WorkflowBoards";
import { useWorkflow } from "../hooks/useWorkflow";

export const WorkflowDetailPage = () => {
  const { query } = useRouter();
  const { workflowId } = query;
  const { workflow, loading } = useWorkflow(workflowId);

  if (loading) return <Loading loaderText="loading workflow..." />;

  return (
    <PanelLayout title={workflow?.name} description={workflow?.description}>
      <WorkflowBoards workflowId={workflowId} />
    </PanelLayout>
  );
};
