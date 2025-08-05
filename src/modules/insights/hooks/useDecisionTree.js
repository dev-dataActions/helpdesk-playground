import { useEffect, useState } from "react";
import { getAppDTree } from "../services/decision.svc";

export const useDecisionTree = (workspaceId, appId) => {
  const [decisionTree, setDecisionTree] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (!workspaceId || !appId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    getAppDTree(workspaceId, appId)
      .then((res) => {
        if (res && Array.isArray(res) && res.length > 0) {
          setDecisionTree(res[0]);
        } else {
          console.warn("No decision tree data received");
          setDecisionTree(null);
        }
      })
      .catch((err) => {
        console.error("Error fetching decision tree:", err);
        setError(err?.message || "Failed to fetch decision tree");
        setDecisionTree(null);
      })
      .finally(() => setLoading(false));
  }, [workspaceId, appId, counter]);

  const refresh = () => setCounter((prevCounter) => prevCounter + 1);

  return { decisionTree, loading, error, refresh };
};
