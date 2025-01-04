import {
  getLiveBoardsByWorkspaceIdAndUserId,
  IReview,
} from "@/services/reviews.svc";
import { useEffect, useState } from "react";

export function useLiveBoards(workspaceId?: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [liveBoards, setLiveBoards] = useState<IReview[]>([]);

  useEffect(() => {
    if (!workspaceId) return;
    setLoading(true);
    getLiveBoardsByWorkspaceIdAndUserId(workspaceId)
      .then((data) => setLiveBoards(data))
      .finally(() => setLoading(false));
  }, [workspaceId]);

  return { liveBoards, loading };
}
