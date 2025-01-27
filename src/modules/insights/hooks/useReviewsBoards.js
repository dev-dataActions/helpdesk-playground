import { getReviewsBoardsByUserId } from "@/modules/insights/services/boards.svc";
import { useEffect, useState } from "react";

export function useReviewsBoards(userId) {
  const [loading, setLoading] = useState(false);
  const [reviewBoards, setReviewBoards] = useState([]);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    getReviewsBoardsByUserId(userId)
      .then((data) => setReviewBoards(data))
      .finally(() => setLoading(false));
  }, [userId]);

  return { reviewBoards, loading };
}
