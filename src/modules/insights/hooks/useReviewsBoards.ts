import { getReviewsBoardsByUserId, IBoard } from "@/modules/insights/services/boards.svc";
import { useEffect, useState } from "react";

export function useReviewsBoards(userId?: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [reviewBoards, setReviewBoards] = useState<IBoard[]>([]);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    getReviewsBoardsByUserId(userId)
      .then((data) => setReviewBoards(data))
      .finally(() => setLoading(false));
  }, [userId]);

  return { reviewBoards, loading };
}
