import { useEffect, useState } from "react";
import { getAppDTree } from "../services/decision.svc";

export const useDecisionTree = (workspaceId, appId) => {
  const [decisionTree, setDecisionTree] = useState();
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (!workspaceId || !appId) return;
    setLoading(true);
    getAppDTree(workspaceId, appId)
      .then((res) => setDecisionTree(res[0]))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [workspaceId, appId, counter]);

  const refresh = () => setCounter((prevCounter) => prevCounter + 1);

  return { decisionTree, loading, refresh };
};
