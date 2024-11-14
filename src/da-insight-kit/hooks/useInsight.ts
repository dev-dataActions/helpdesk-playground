import { useEffect, useState } from "react";
import { getInsightByWorkspaceIdAndInsightId } from "../services/insight.svc";

export function useInsight(workspaceId: string, insightId: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [insight, setInsight] = useState<{ canvas: object; formatter: object } | null>(null);

  useEffect(() => {
    if (!insightId || !workspaceId) return;
    setLoading(true);
    getInsightByWorkspaceIdAndInsightId(workspaceId, insightId)
      .then((data) => setInsight(data[0].data))
      .finally(() => setLoading(false));
  }, [insightId, workspaceId]);

  return { insight, isFetching: loading };
}
