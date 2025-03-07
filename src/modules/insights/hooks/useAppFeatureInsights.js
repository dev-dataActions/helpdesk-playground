import { useEffect, useState } from "react";
import { getAppInsightsByFeatureIdAndWorkspaceId } from "../services/features.svc";

export const useAppFeatureInsights = (workspaceId, appId, featureId) => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  const transformResponse = (res) => {
    return res.map((x) => ({
      insight_id: x.insight_id,
      afi_id: x.afi_id,
      metric_name: x.metric_name,
      ...x.data,
    }));
  };

  useEffect(() => {
    if (!appId || !workspaceId || !featureId) return;
    setLoading(true);
    getAppInsightsByFeatureIdAndWorkspaceId(appId, featureId, workspaceId)
      .then((res) => setInsights(transformResponse(res)))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [appId, workspaceId, featureId, counter]);

  const refresh = () => setCounter((prevCounter) => prevCounter + 1);

  return { insights, loading, refresh };
};
