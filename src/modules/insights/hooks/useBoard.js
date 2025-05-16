import { useEffect, useState } from "react";
import { getAppBoard } from "../services/board.svc";

export const useBoard = (workspaceId, appId, decisionId, boardId) => {
  const [board, setBoard] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const transformData = (data) => {
    return data.map((entry) => ({
      board_id: entry.board_id,
      workspace_id: entry.workspace_id,
      decision_id: entry.decision_id,
      app_id: entry.app_id,
      title: entry.name,
      description: entry.description,
      blocks: entry.data.blocks,
    }))[0];
  };

  useEffect(() => {
    if (!workspaceId || !appId || !decisionId || !boardId) return;
    setLoading(true);
    getAppBoard(workspaceId, appId, decisionId, boardId)
      .then((data) => setBoard(transformData(data)))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [workspaceId, appId, decisionId, boardId]);

  return { board, loading, error };
};
