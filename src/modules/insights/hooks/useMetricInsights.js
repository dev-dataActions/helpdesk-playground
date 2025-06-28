import { useEffect, useState } from "react";
import { ChartTypes } from "da-insight-sdk";
import { formatDate } from "date-fns";
import { getInsightsByMetricIdAndWorkspaceId } from "../services/metrics.svc";

export const useMetricInsights = (workspaceId, metricId) => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const transformData = (res) => {
    return res
      .map((x) => ({
        insight_id: x.insight_id,
        metric_name: x.metric_name,
        insightType: x?.data?.insightType === "why" ? "why" : "what",
        lastUpdated: formatDate(x?.data?.lastUpdated ?? new Date(), "MMMM d, yyyy h:mm a"),
        ...x.data,
      }))
      .filter((x) => x.type !== ChartTypes.BIGNUMBER);
  };

  const fetchInsights = () => {
    if (!workspaceId || !metricId) return;

    setLoading(true);
    getInsightsByMetricIdAndWorkspaceId(workspaceId, metricId)
      .then((data) => setInsights(transformData(data)))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchInsights();
  }, [workspaceId, metricId]);

  return { insights, loading, error, refresh: fetchInsights };
};
