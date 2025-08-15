import { useState, useEffect } from "react";
import { getAppInsightsByDecisionIdAndWorkspaceId } from "../services/decision.svc";

/**
 * Custom hook to fetch and transform metric view configuration from API
 * @param {string} workspaceId - Workspace ID
 * @param {string} appId - App ID
 * @param {string} decisionId - Decision ID
 * @returns {Object} Object containing metricConfig, loading, and error states
 */
export const useMetricViewConfig = (workspaceId, appId, decisionId) => {
  const [metricConfig, setMetricConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!workspaceId || !appId || !decisionId) {
      setMetricConfig(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    getAppInsightsByDecisionIdAndWorkspaceId(appId, decisionId, workspaceId)
      .then((data) => {
        if (!data || !Array.isArray(data)) {
          console.warn("No metric view config data received");
          setMetricConfig(null);
          return;
        }

        // Transform the API response to the expected format
        const transformedConfig = transformApiResponse(data);
        setMetricConfig(transformedConfig);
      })
      .catch((err) => {
        console.error("Error fetching metric view config:", err);
        setError(err?.message || "Failed to fetch metric configuration");
        setMetricConfig(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [workspaceId, appId, decisionId]);

  /**
   * Transform API response to the expected metricViewConfig format
   * @param {Array} apiData - Raw API response data
   * @returns {Object} Transformed configuration object
   */
  const transformApiResponse = (apiData) => {
    const config = {
      OUTPUT: [],
      DRIVER: [],
      INPUT: [],
    };

    apiData.forEach((item) => {
      const metricItem = {
        metricKey: item.metric_name,
        metricLabel: item.metric_label,
      };

      // Map category to the expected format (OUTPUT, DRIVER, INPUT)
      const category = item.category?.toUpperCase();
      if (config[category]) {
        config[category].push(metricItem);
      } else {
        // If category doesn't match expected ones, log warning and skip
        console.warn(`Unknown metric category: ${item.category} for metric: ${item.metric_name}`);
      }
    });

    return config;
  };

  return { metricConfig, loading, error };
};
