import { useEffect, useState } from "react";
import { formatDate } from "../common/utils/date.util";
import { getBoardsByWorkflowId } from "../services/workflows.svc";

export default function useWorkflowBoards(workflowId) {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [error, setError] = useState(null);

  const transformData = (data) => {
    return data.map((entry) => ({
      id: entry.board_id,
      workflowId: entry.workflow_id,
      title: entry.data.title,
      insights: entry.data.insights,
      deployed: true,
      type: entry.data.type,
      lastUpdated: formatDate(entry.lastUpdated ?? new Date(), "MMMM d, yyyy h:mm a"),
    }));
  };

  useEffect(() => {
    setLoading(true);
    getBoardsByWorkflowId(workflowId)
      .then((data) => setBoards(transformData(data)))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [workflowId, counter]);

  const refetch = () => setCounter((prev) => prev + 1);

  return { boards, loading, error, refetch };
}
