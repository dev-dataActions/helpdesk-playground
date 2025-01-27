import { useWorkflows } from "@/modules/insights/hooks/useWorkflows";
import { Workflows } from "@/modules/insights/components/Workflows";
import { Loading } from "@/modules/insights/common/functional/Loading";
import { PanelLayout } from "../common/layout/PanelLayout";

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
