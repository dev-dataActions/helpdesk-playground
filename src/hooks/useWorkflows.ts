import { getWorkflowsByWorkspaceIdAndUserId } from "@/services/workflows.svc";
import { useEffect, useState } from "react";

export function useWorkflows(workspaceId: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [workflows, setWorkflows] = useState<{ id: number; name: string; desc: string; icon: string; }[] | null>(null);

  useEffect(() => {
    if (!workspaceId) return;
    setLoading(true);
    getWorkflowsByWorkspaceIdAndUserId(workspaceId)
      .then((data) => setWorkflows(data))
      .finally(() => setLoading(false));
  }, [workspaceId]);

  return { workflows,loading };
}