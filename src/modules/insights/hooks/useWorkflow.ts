import { useEffect, useState } from "react";
import { getWorkflowByWorkflowId } from "../services/workflows.svc";

export function useWorkflow(workflowId: string) {
  const [loading, setLoading] = useState(true);
  const [workflow, setWorkflow] = useState([]);

  const transformData = (data) => {
    return data.map((entry) => ({
      id: entry.workflow_id,
      name: entry.workflow_name,
      ...entry.data,
    }))[0];
  };

  useEffect(() => {
    if (!workflowId) return;
    setLoading(true);
    getWorkflowByWorkflowId(workflowId)
      .then((data) => setWorkflow(transformData(data)))
      .finally(() => setLoading(false));
  }, [workflowId]);

  return { workflow, loading };
}
