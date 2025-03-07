import { useEffect, useState } from "react";
import { getAppBoards } from "../services/board.svc";

export const useFeatureBoards = (workspaceId, appId, featureId) => {
  const [boards, setBoards] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const transformData = (data) => {
    return data.map((entry) => ({
      board_id: entry.board_id,
      workspace_id: entry.workspace_id,
      feature_id: entry.feature_id,
      app_id: entry.app_id,
      name: entry.name,
      description: entry.description,
    }));
  };

  useEffect(() => {
    if (!workspaceId || !appId || !featureId) return;
    setLoading(true);
    getAppBoards(workspaceId, appId, featureId)
      .then((data) => setBoards(transformData(data)))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [workspaceId, appId, featureId]);

  return { boards, loading, error };
};
