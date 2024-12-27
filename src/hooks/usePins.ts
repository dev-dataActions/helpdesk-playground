import { useEffect, useState } from "react";
import { getPinsByUserId, IPin } from "../services/pins.svc";

export function usePins(workspaceId: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [pins, setPins] = useState<IPin[]>([]);

  useEffect(() => {
    if (!workspaceId) return;
    setLoading(true);
    getPinsByUserId(workspaceId)
      .then((data) => setPins(data))
      .finally(() => setLoading(false));
  }, [workspaceId]);
  return { pins, isFetching: loading };
}
