import { useState, useEffect } from "react";
import { getAppDecisionMetricView } from "../services/decision.svc";

/**
 * Custom hook to fetch metric configurations for multiple sub-decisions
 * @param {string} workspaceId - Workspace ID
 * @param {string} appId - App ID
 * @param {Array} subDecisions - Array of sub-decision objects with id property
 * @returns {Object} Object containing subDecisionsMetrics, loading, and error states
 */
export const useSubDecisionsMetrics = (workspaceId, appId, subDecisions) => {
  const [subDecisionsMetrics, setSubDecisionsMetrics] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!workspaceId || !appId || !Array.isArray(subDecisions) || subDecisions.length === 0) {
      setSubDecisionsMetrics({});
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Fetch metrics for all sub-decisions
    const fetchAllSubDecisionsMetrics = async () => {
      try {
        const metricsPromises = subDecisions.map(async (subDecision) => {
          if (!subDecision?.id) return null;

          try {
            const data = await getAppDecisionMetricView(workspaceId, appId, subDecision.id);
            if (!data || !data.data || !Array.isArray(data.data.metrics)) {
              return { decisionId: subDecision.id, metrics: null };
            }

            // Transform the API response to the expected format
            const transformedMetrics = transformMetricsResponse(data.data.metrics);
            return { decisionId: subDecision.id, metrics: transformedMetrics };
          } catch (err) {
            console.error(`Error fetching metrics for sub-decision ${subDecision.id}:`, err);
            return { decisionId: subDecision.id, metrics: null };
          }
        });

        const results = await Promise.all(metricsPromises);

        // Convert array of results to object with decisionId as key
        const metricsMap = {};
        results.forEach((result) => {
          if (result && result.decisionId) {
            metricsMap[result.decisionId] = result.metrics;
          }
        });

        setSubDecisionsMetrics(metricsMap);
      } catch (err) {
        console.error("Error fetching sub-decisions metrics:", err);
        setError(err?.message || "Failed to fetch sub-decisions metrics");
        setSubDecisionsMetrics({});
      } finally {
        setLoading(false);
      }
    };

    fetchAllSubDecisionsMetrics();
  }, [workspaceId, appId, subDecisions]);

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

  return { subDecisionsMetrics, loading, error };
};
