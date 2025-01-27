import { useEffect, useState } from "react";
import { getPinsByUserId } from "../services/pins.svc";

export function usePins(userId) {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState([]);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    getPinsByUserId(userId)
      .then((data) => setPins(data))
      .finally(() => setLoading(false));
  }, [userId]);

  return { pins, isFetching: loading };
}
