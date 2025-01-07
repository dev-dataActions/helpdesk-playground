import { getLiveBoardsByUserId, IBoard } from "@/modules/insights/services/boards.svc";
import { useEffect, useState } from "react";

export function useLiveBoards(workspaceId?: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [liveBoards, setLiveBoards] = useState<IBoard[]>([]);

  useEffect(() => {
    if (!workspaceId) return;
    setLoading(true);
    getLiveBoardsByUserId(workspaceId)
      .then((data) => setLiveBoards(data))
      .finally(() => setLoading(false));
  }, [workspaceId]);

  return { liveBoards, loading };
}
