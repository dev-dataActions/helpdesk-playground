import { getWorkflowsByUserId } from "@/modules/insights/services/workflows.svc";
import { useEffect, useState } from "react";

export interface IWorkflow {
  id: number;
  name: string;
  desc: string;
  icon: string;
}

export function useWorkflows(userId: string | undefined) {
  const [loading, setLoading] = useState<boolean>(false);
  const [workflows, setWorkflows] = useState<IWorkflow[]>([]);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    getWorkflowsByUserId(userId)
      .then((data) => setWorkflows(data))
      .finally(() => setLoading(false));
  }, [userId]);

  return { workflows, loading };
}
