import { useState, useEffect, useCallback } from "react";
import { fetchExplanationInsights } from "../services/explanationInsights.svc";

/**
 * Custom hook to fetch explanation insights for a decision
 * @param {string} decisionId - Decision ID to fetch insights for
 * @param {string} workspaceId - Workspace ID
 * @param {string} tenantId - Tenant ID
 * @returns {Object} Object containing insights, loading, error, and refetch states
 */
export const useExplanationInsights = (decisionId, workspaceId, tenantId) => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInsights = useCallback(async () => {
    if (!decisionId || !workspaceId) {
      setInsights([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Import the config dynamically to avoid circular dependencies
      const { explanationInightsConfig } = await import("../constants/decision.constant");

      const config = explanationInightsConfig[decisionId];
      if (!config || !Array.isArray(config)) {
        console.warn(`No explanation insights config found for decision: ${decisionId}`);
        setInsights([]);
        return;
      }

      // Fetch insights for all config items
      const allInsights = [];

      for (const insightConfig of config) {
        try {
          const payload = {
            ...insightConfig.payload,
            insight_type: insightConfig.insight_type,
          };

          const insightData = await fetchExplanationInsights(payload, workspaceId, tenantId);

          if (insightData && Array.isArray(insightData)) {
            allInsights.push(...insightData);
          }
        } catch (error) {
          console.error(`Error fetching insight for config:`, insightConfig, error);
          // Continue with other insights even if one fails
        }
      }

      setInsights(allInsights);
    } catch (error) {
      console.error("Error fetching explanation insights:", error);
      setError(error?.message || "Failed to fetch insights");
      setInsights([]);
    } finally {
      setLoading(false);
    }
  }, [decisionId, workspaceId, tenantId]);

  // Fetch insights when dependencies change
  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);

  const refetch = useCallback(() => {
    fetchInsights();
  }, [fetchInsights]);

  return {
    insights,
    loading,
    error,
    refetch,
  };
};
