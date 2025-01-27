import { useRouter } from "next/router";
import { useWorkflow } from "../hooks/useWorkflow";
import useWorkflowMetrics from "../hooks/useWorkflowMetrics";
import { useMemo } from "react";
import { WorkflowMetrics } from "../components/WorkflowMetrics";
import { ScreenLayout } from "@/common/layout/ScreenLayout";
import { PanelLayout } from "@/modules/layouts/PanelLayout";
import { WorkflowBoards } from "../components/WorkflowBoards";
import { Tabs } from "@/common/functional/Tabs";
import { Loading } from "@/common/functional/Loading";

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
