import { useState, useEffect, useCallback } from "react";

const PINNED_METRICS_KEY = "pinnedMetrics";

/**
 * Custom hook to manage pinned metrics with localStorage persistence
 * @param {string} workspaceId - Workspace ID
 * @param {string} appId - App ID
 * @returns {Object} Object containing pinnedMetrics, loading, error, pinMetric, unpinMetric, and isPinned functions
 */
export const usePinnedMetrics = (workspaceId, appId) => {
  const [pinnedMetrics, setPinnedMetrics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load pinned metrics from localStorage
  const loadPinnedMetrics = useCallback(() => {
    try {
      const stored = localStorage.getItem(PINNED_METRICS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch (error) {
      console.error("Error loading pinned metrics from localStorage:", error);
    }
    return [];
  }, []);

  // Save pinned metrics to localStorage
  const savePinnedMetrics = useCallback((metrics) => {
    try {
      localStorage.setItem(PINNED_METRICS_KEY, JSON.stringify(metrics));
    } catch (error) {
      console.error("Error saving pinned metrics to localStorage:", error);
    }
  }, []);

  // Check if a metric is pinned
  const isPinned = useCallback(
    (metricKey) => {
      try {
        return pinnedMetrics.some((metric) => metric.metricKey === metricKey);
      } catch (error) {
        console.error("Error checking if metric is pinned:", error);
        return false;
      }
    },
    [pinnedMetrics]
  );

  // Pin a metric
  const pinMetric = useCallback(
    (metricKey, metricLabel, decisionId, decisionName) => {
      try {
        if (!metricKey) return;

        const now = Date.now();
        const newMetric = {
          metricKey,
          metricLabel: metricLabel || "Untitled Metric",
          decisionId: decisionId || null,
          decisionName: decisionName || null,
          pinnedAt: now,
        };

        setPinnedMetrics((currentMetrics) => {
          // Check if already pinned
          const alreadyPinned = currentMetrics.some((metric) => metric.metricKey === metricKey);
          if (alreadyPinned) return currentMetrics;

          const updated = [...currentMetrics, newMetric];
          savePinnedMetrics(updated);
          return updated;
        });
      } catch (error) {
        console.error("Error pinning metric:", error);
      }
    },
    [savePinnedMetrics]
  );

  // Unpin a metric
  const unpinMetric = useCallback(
    (metricKey) => {
      try {
        if (!metricKey) return;

        setPinnedMetrics((currentMetrics) => {
          const updated = currentMetrics.filter((metric) => metric.metricKey !== metricKey);
          savePinnedMetrics(updated);
          return updated;
        });
      } catch (error) {
        console.error("Error unpinning metric:", error);
      }
    },
    [savePinnedMetrics]
  );

  // Initialize on mount
  useEffect(() => {
    const initialPinned = loadPinnedMetrics();
    setPinnedMetrics(initialPinned);
  }, [loadPinnedMetrics]);

  return {
    pinnedMetrics,
    loading,
    error,
    pinMetric,
    unpinMetric,
    isPinned,
  };
};
