import { useEffect, useState } from "react";
import { getWorkflows } from "../services/workflows.svc";

export interface IWorkflow {
  id: string;
  data: {
    icon: string;
    description: string;
  };
  workflow_name: string;
}

export function useWorkflows(userId: string | undefined) {
  const [loading, setLoading] = useState<boolean>(false);
  const [workflows, setWorkflows] = useState<IWorkflow[]>([]);

  useEffect(() => {
    setLoading(true);
    getWorkflows()
      .then((data) => setWorkflows(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return { workflows, loading };
}
