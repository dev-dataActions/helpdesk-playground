import { useState, useEffect, useCallback } from "react";
import { getTenants } from "../services/tenant.svc";

export const useTenants = (workspaceId) => {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTenants = useCallback(async () => {
    if (!workspaceId) {
      setTenants([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await getTenants(workspaceId);

      if (!response) {
        setTenants([]);
        return;
      }

      // Transform the data to match the expected format
      const transformedTenants = response
        .filter((x) => x)
        .map((item) => ({
          id: item.user_id,
          labels: item.labels,
          filters: item.filters,
          name: item.data?.tenant_name,
          createdOn: item.data?.createdOn,
          lastUpdated: item.data?.lastUpdated,
          data: item.data,
        }));

      setTenants(transformedTenants);
    } catch (err) {
      console.error("Error fetching tenants:", err);
      setError(err?.message || "Failed to fetch tenants");
      setTenants([]);
    } finally {
      setLoading(false);
    }
  }, [workspaceId]);

  const refetch = useCallback(() => {
    fetchTenants();
  }, [fetchTenants]);

  useEffect(() => {
    fetchTenants();
  }, [fetchTenants]);

  return {
    tenants,
    loading,
    error,
    refetch,
  };
};
