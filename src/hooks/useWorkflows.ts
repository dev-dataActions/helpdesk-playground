import { getWorkflowsByWorkspaceIdAndUserId, IWorkflow } from "@/services/workflows.svc";
import { useEffect, useState } from "react";

export function useWorkflows(workspaceId?: string | undefined) {
  const [loading, setLoading] = useState<boolean>(false);
  const [workflows, setWorkflows] = useState<IWorkflow[]>([]);

  useEffect(() => {
    if (!workspaceId) return;
    setLoading(true);
    getWorkflowsByWorkspaceIdAndUserId(workspaceId)
      .then((data) => setWorkflows(data))
      .finally(() => setLoading(false));
  }, [workspaceId]);

  return { workflows, loading };
}
