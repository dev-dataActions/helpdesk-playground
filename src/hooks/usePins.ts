import { useEffect, useState } from "react";
import { getPinsByUserId, IPin } from "../services/pins.svc";

export function usePins(userId?: string | undefined) {
  const [loading, setLoading] = useState<boolean>(false);
  const [pins, setPins] = useState<IPin[]>([]);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    getPinsByUserId(userId)
      .then((data) => setPins(data))
      .finally(() => setLoading(false));
  }, [userId]);

  return { pins, isFetching: loading };
}
