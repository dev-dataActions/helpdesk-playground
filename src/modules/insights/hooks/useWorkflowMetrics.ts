import { useEffect, useState } from "react";
import { getMetricsByWorkflowId } from "../services/workflows.svc";

export default function useWorkflowMetrics(workflowId: string) {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const transformData = (data) => {
    return data.map((item) => ({
      id: item.metric_id,
      metricLabel: item.metric_name,
      metricKey: item.data.metricKey,
      description: item.data.description,
      labels: item.data.labels,
    }));
  };

  useEffect(() => {
    setLoading(true);
    getMetricsByWorkflowId(workflowId)
      .then((data) => setMetrics(transformData(data)))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [workflowId]);

  return { metrics, loading, error };
}
