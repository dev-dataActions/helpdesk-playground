import { useEffect, useState } from "react";
import { getAppInsightsByDecisionIdAndWorkspaceId } from "../services/decision.svc";

export const useAppDecisionInsights = (workspaceId, appId, decisionId) => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  const transformResponse = (res) => {
    return res.map((x) => ({
      insight_id: x.insight_id,
      adi_id: x.adi_id,
      metric_name: x.metric_name,
      ...x.data,
    }));
  };

  useEffect(() => {
    if (!appId || !workspaceId || !decisionId) return;
    setLoading(true);
    getAppInsightsByDecisionIdAndWorkspaceId(appId, decisionId, workspaceId)
      .then((res) => setInsights(transformResponse(res)))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [appId, workspaceId, decisionId, counter]);

  const refresh = () => setCounter((prevCounter) => prevCounter + 1);

  return { insights, loading, refresh };
};
