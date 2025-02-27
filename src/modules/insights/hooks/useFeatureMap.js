import { useEffect, useState } from "react";
import { getFeatureMapByWorkspaceId } from "../services/features.svc";

export const useFeatureMap = (workspaceId) => {
  const [featureMap, setFeatureMap] = useState();
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (!workspaceId) return;
    setLoading(true);
    getFeatureMapByWorkspaceId(workspaceId)
      .then((res) => setFeatureMap(res[0]))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [workspaceId, counter]);

  const refresh = () => setCounter((prevCounter) => prevCounter + 1);

  return { featureMap, loading, refresh };
};
