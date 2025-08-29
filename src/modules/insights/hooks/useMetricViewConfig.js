import { useState, useEffect } from "react";
import { getAppDecisionMetricView } from "../services/decision.svc";

/**
 * Custom hook to fetch and transform metric view configuration from API
 * @param {string} workspaceId - Workspace ID
 * @param {string} appId - App ID
 * @param {string} decisionId - Decision ID
 * @returns {Object} Object containing metricConfig, filters, loading, and error states
 */
export const useMetricViewConfig = (workspaceId, appId, decisionId) => {
  const [metricConfig, setMetricConfig] = useState(null);
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!workspaceId || !appId || !decisionId) {
      setMetricConfig(null);
      setFilters(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    getAppDecisionMetricView(workspaceId, appId, decisionId)
      .then(([data]) => {
        if (!data || !data.data) {
          console.warn("No metric view config data received");
          setMetricConfig(null);
          setFilters(null);
          return;
        }

        // Extract filters and metrics from the new API response
        const { filters: apiFilters, metrics: apiMetrics } = data.data;

        // Set filters
        if (apiFilters && Array.isArray(apiFilters)) {
          const filtersObj = {};
          apiFilters.forEach((filter) => {
            if (filter.dimension && filter.id) {
              filtersObj[filter.dimension] = filter.value || "";
            }
          });
          setFilters(filtersObj);
        } else {
          setFilters({});
        }

        // Transform the metrics to the expected format
        const transformedConfig = transformMetricsResponse(apiMetrics);
        setMetricConfig(transformedConfig);
      })
      .catch((err) => {
        console.error("Error fetching metric view config:", err);
        setError(err?.message || "Failed to fetch metric configuration");
        setMetricConfig(null);
        setFilters(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [workspaceId, appId, decisionId]);

  /**
   * Transform metrics array to the expected metricViewConfig format
   * @param {Array} metrics - Array of metric objects from API
   * @returns {Object} Transformed configuration object
   */
  const transformMetricsResponse = (metrics) => {
    if (!Array.isArray(metrics)) {
      console.warn("Metrics data is not an array:", metrics);
      return { OUTPUT: [], DRIVER: [], INPUT: [] };
    }

    const config = {
      OUTPUT: [],
      DRIVER: [],
      INPUT: [],
    };

    metrics.forEach((metric) => {
      if (!metric.metric_name || !metric.metric_label || !metric.category) {
        console.warn("Invalid metric data:", metric);
        return;
      }

      const metricItem = {
        metricKey: metric.metric_name,
        metricLabel: metric.metric_label,
      };

      // Map category to the expected format (OUTPUT, DRIVER, INPUT)
      const category = metric.category?.toUpperCase();
      if (config[category]) {
        config[category].push(metricItem);
      } else {
        // If category doesn't match expected ones, log warning and skip
        console.warn(`Unknown metric category: ${metric.category} for metric: ${metric.metric_name}`);
      }
    });

    return config;
  };

  return { metricConfig, filters, loading, error };
};
