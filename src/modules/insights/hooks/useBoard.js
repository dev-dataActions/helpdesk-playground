import { useEffect, useState } from "react";
import { getBoardByWorkspaceIdAndBoardId } from "../services/board.svc";

export const useBoard = (workspaceId, boardId) => {
  const [board, setBoard] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!workspaceId || !boardId) return;
    setLoading(true);
    getBoardByWorkspaceIdAndBoardId(workspaceId, boardId)
      .then((data) => setBoard(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [workspaceId, boardId]);

  return { board, loading, error };
};
