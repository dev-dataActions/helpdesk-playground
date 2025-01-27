import { Loading } from "../common/functional/Loading";
import { PanelLayout } from "../common/layout/PanelLayout";
import { Workflows } from "../components/Workflows";
import { useWorkflows } from "../hooks/useWorkflows";

export default function WorkflowsPage() {
  const { workflows, loading } = useWorkflows();

  if (loading) return <Loading loaderText="Loading workflows..." />;

  return (
    <PanelLayout
      title="Workflows"
      description="You can browse your workflows to review and keep track of progress."
    >
      <Workflows workflows={workflows} />
    </PanelLayout>
  );
}
