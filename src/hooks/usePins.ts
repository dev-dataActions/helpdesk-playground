import { useEffect, useState } from "react";
import { getPinsByWorkspaceIdAndUserId, IPin } from "../services/pins.svc";

export function usePins(workspaceId: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [pins, setPins] = useState<IPin[] | null>(null);

  useEffect(() => {
    if (!workspaceId) return;
    setLoading(true);
    getPinsByWorkspaceIdAndUserId(workspaceId)
      .then((data) => setPins(data))
      .finally(() => setLoading(false));
  }, [workspaceId]);
  return { pins, isFetching: loading };
}
