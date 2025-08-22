import { useState, useEffect, useCallback } from "react";
import { getAppDecisionOverview } from "../services/decision.svc";

export const useOverviewInsights = (workspaceId, appId, decisionId) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!workspaceId || !appId || !decisionId) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await getAppDecisionOverview(workspaceId, appId, decisionId);
      setData(result);
    } catch (err) {
      setError(err);
      console.error("Error fetching overview insights:", err);
    } finally {
      setIsLoading(false);
    }
  }, [workspaceId, appId, decisionId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const insights = data?.[0]?.data?.insights || [];
  const goalInsights = insights.filter((insight) => insight.overviewCategory === "goal-metrics");
  const causalInsights = insights.filter((insight) => insight.overviewCategory === "causal-insights");

  return { goalInsights, causalInsights, isLoading, error, refetch: fetchData };
};
