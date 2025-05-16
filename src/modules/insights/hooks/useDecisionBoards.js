import { useEffect, useState } from "react";
import { getAppBoards } from "../services/board.svc";

export const useDecisionBoards = (workspaceId, appId, decisionId) => {
  const [boards, setBoards] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const transformData = (data) => {
    return data.map((entry) => ({
      board_id: entry.board_id,
      workspace_id: entry.workspace_id,
      decision_id: entry.decision_id,
      app_id: entry.app_id,
      name: entry.name,
      description: entry.description,
    }));
  };

  useEffect(() => {
    if (!workspaceId || !appId || !decisionId) return;
    setLoading(true);
    getAppBoards(workspaceId, appId, decisionId)
      .then((data) => setBoards(transformData(data)))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [workspaceId, appId, decisionId]);

  return { boards, loading, error };
};
