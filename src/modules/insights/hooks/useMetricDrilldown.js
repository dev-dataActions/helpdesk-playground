import { useEffect, useState, useCallback } from "react";
import { getMetricDrilldown } from "../services/metrics.svc";

/**
 * Hook for fetching metric drilldown data
 * @param {string} workspaceId - Workspace ID
 * @param {string} metricName - Metric name/key
 * @returns {Object} Object containing drilldown data, loading state, error state, and refresh function
 */
export const useMetricDrilldown = (workspaceId, metricName) => {
  const [drilldown, setDrilldown] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Transform drilldown data to match board structure
   * @param {Object} data - Raw drilldown data from API
   * @returns {Object} Transformed drilldown data
   */
  const transformData = useCallback((data) => {
    try {
      if (!data || !Array.isArray(data) || data.length === 0) {
        return null;
      }

      // Take the first drilldown entry (assuming single drilldown per metric)
      const entry = data[0];

      return {
        name: entry?.name || "Drilldown",
        description: entry?.description || "Metric drilldown view",
        blocks: entry?.data?.blocks || [],
        filters: entry?.data?.filters || [],
      };
    } catch (error) {
      console.error("Error transforming drilldown data:", error);
      return null;
    }
  }, []);

  /**
   * Fetch drilldown data
   */
  const fetchDrilldown = useCallback(async () => {
    if (!workspaceId || !metricName) {
      setError("Missing required parameters");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await getMetricDrilldown(workspaceId, metricName);

      if (!data) {
        setError("Failed to fetch drilldown data");
        setDrilldown(null);
        return;
      }

      const transformedData = transformData(data);
      setDrilldown(transformedData);

      if (!transformedData) {
        setError("Invalid drilldown data structure");
      }
    } catch (err) {
      console.error("Error in useMetricDrilldown:", err);
      setError("An error occurred while fetching drilldown data");
      setDrilldown(null);
    } finally {
      setLoading(false);
    }
  }, [workspaceId, metricName, transformData]);

  useEffect(() => {
    fetchDrilldown();
  }, [workspaceId, metricName, fetchDrilldown]);

  return {
    drilldown,
    loading,
    error,
    refresh: fetchDrilldown,
  };
};
