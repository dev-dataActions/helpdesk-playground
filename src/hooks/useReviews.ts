import { getReviewsByWorkspaceIdAndUserId } from "@/services/reviews.svc";
import { useEffect, useState } from "react";

export function useReviews(workspaceId: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [reviews, setReviews] = useState<{id:number,name:string,createdOn:string,updatedOn:string}[] | null>(null);

  useEffect(() => {
    if (!workspaceId) return;
    setLoading(true);
    getReviewsByWorkspaceIdAndUserId(workspaceId)
      .then((data) => setReviews(data))
      .finally(() => setLoading(false));
  }, [workspaceId]);

  return { reviews, loading };
}