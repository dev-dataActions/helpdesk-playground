import { useEffect, useState } from "react";
import { getBoardByWorkflowIdAndBoardId } from "../services/workflows.svc";
import { formatDate } from "../common/utils/date.util";

export default function useBoard(workflowId, boardId) {
  const [board, setBoard] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const transformData = (data) => {
    return data.map((entry) => ({
      id: entry.board_id,
      workflowId: entry.workflow_id,
      title: entry.data.title,
      insights: entry.data.insights,
      deployed: entry.deployed,
      type: entry.data.type,
      lastUpdated: formatDate(entry.lastUpdated ?? new Date(), "MMMM d, yyyy h:mm a"),
    }))[0];
  };

  useEffect(() => {
    if (!workflowId || !boardId) return;
    setLoading(true);
    getBoardByWorkflowIdAndBoardId(workflowId, boardId)
      .then((data) => setBoard(transformData(data)))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [workflowId, boardId]);

  return { board, loading, error };
}
