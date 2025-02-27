import { useEffect, useState } from "react";
import { getBoardsByFeatureIdAndWorkspaceId } from "../services/features.svc";

export const useFeatureBoards = (featureId, workspaceId) => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (!workspaceId || !workspaceId) return;
    setLoading(true);
    getBoardsByFeatureIdAndWorkspaceId(featureId, workspaceId)
      .then((res) => setBoards(res))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [featureId, workspaceId, counter]);

  const refresh = () => setCounter((prevCounter) => prevCounter + 1);

  return { boards, loading, refresh };
};
