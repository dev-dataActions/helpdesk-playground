import { useEffect, useState } from "react";
import { getWorkflows } from "../services/workflows.svc";

export function useWorkflows() {
  const [loading, setLoading] = useState(false);
  const [workflows, setWorkflows] = useState([]);

  useEffect(() => {
    setLoading(true);
    getWorkflows()
      .then((data) => setWorkflows(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return { workflows, loading };
}
