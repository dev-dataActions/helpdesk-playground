import { useEffect, useState } from "react";
import { getWorkflows } from "../services/workflows.svc";

export function useWorkflows() {
  const [loading, setLoading] = useState(false);
  const [workflows, setWorkflows] = useState([]);

  const transformData = (data) => {
    return data.map((entry) => ({
      id: entry.workflow_id,
      name: entry.workflow_name,
      ...entry.data,
    }));
  };

  useEffect(() => {
    setLoading(true);
    getWorkflows()
      .then((data) => setWorkflows(transformData(data)))
      .finally(() => setLoading(false));
  }, []);

  return { workflows, loading };
}
