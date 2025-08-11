import { useState, useEffect, useCallback, useRef } from "react";
import { getAppDTree } from "../services/decision.svc";
import { getDecisionPath } from "../utils/decisionTree.util";

const RECENT_DECISIONS_KEY = "recentDecisions";

/**
 * Custom hook to manage recent decisions with localStorage persistence
 * @param {string} workspaceId - Workspace ID
 * @param {string} appId - App ID
 * @returns {Object} Object containing recentDecisions, loading, error, and addRecentDecision function
 */
export const useRecentDecisions = (workspaceId, appId) => {
  const [recentDecisions, setRecentDecisions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isFetchingRef = useRef(false);

  // Load recent decisions from localStorage
  const loadRecentDecisions = useCallback(() => {
    try {
      const stored = localStorage.getItem(RECENT_DECISIONS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch (error) {
      console.error("Error loading recent decisions from localStorage:", error);
    }
    return [];
  }, []);

  // Save recent decisions to localStorage
  const saveRecentDecisions = useCallback((decisions) => {
    try {
      localStorage.setItem(RECENT_DECISIONS_KEY, JSON.stringify(decisions));
    } catch (error) {
      console.error("Error saving recent decisions to localStorage:", error);
    }
  }, []);

  // Add a decision to recent decisions
  const addRecentDecision = useCallback(
    (decisionId, decisionName, decisionDescription) => {
      try {
        if (!decisionId) return;

        const now = Date.now();
        const newDecision = {
          decisionId,
          decisionName: decisionName || "Untitled Decision",
          decisionDescription: decisionDescription || "",
          lastOpenedAt: now,
        };

        setRecentDecisions((currentDecisions) => {
          const filtered = currentDecisions.filter((decision) => decision.decisionId !== decisionId);
          const updated = [newDecision, ...filtered].sort((a, b) => b.lastOpenedAt - a.lastOpenedAt).slice(0, 5);
          saveRecentDecisions(updated);
          return updated;
        });
      } catch (error) {
        console.error("Error adding recent decision:", error);
      }
    },
    [saveRecentDecisions]
  );

  // Fetch decision tree and filter out deleted decisions
  const fetchAndFilterDecisions = useCallback(async () => {
    // Prevent multiple simultaneous calls
    if (isFetchingRef.current) {
      return;
    }

    isFetchingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      // Validate required parameters
      if (!workspaceId || !appId) {
        console.warn("Missing required parameters for fetching decisions");
        setRecentDecisions([]);
        return;
      }

      // Always get the latest from localStorage to avoid race conditions
      const currentDecisions = loadRecentDecisions();
      if (currentDecisions.length === 0) {
        setRecentDecisions([]);
        return;
      }

      // Fetch current decision tree
      const decisionTreeData = await getAppDTree(workspaceId, appId);
      if (!decisionTreeData || !Array.isArray(decisionTreeData) || decisionTreeData.length === 0) {
        console.warn("No decision tree data available");
        setRecentDecisions([]);
        return;
      }

      const decisionTree = decisionTreeData[0];
      const validDecisions = [];

      // Check each recent decision individually
      for (const decision of currentDecisions) {
        try {
          if (decision.decisionId) {
            // Get the path to this decision to validate it exists
            const decisionPath = getDecisionPath(decisionTree, decision.decisionId);

            // If decision exists in the tree, keep it
            if (decisionPath && decisionPath.length > 0) {
              const decisionNode = decisionPath[decisionPath.length - 1];
              // Update with current data from tree
              validDecisions.push({
                ...decision,
                decisionName: decisionNode?.name,
                decisionDescription: decisionNode?.description,
              });
            }
          }
        } catch (error) {
          console.error(`Error checking decision ${decision.decisionId}:`, error);
          // Skip this decision if it fails to load (likely deleted)
        }
      }

      // Update localStorage and state
      saveRecentDecisions(validDecisions);
      setRecentDecisions(validDecisions);
    } catch (error) {
      console.error("Error fetching and filtering decisions:", error);
      setError(error?.message || "Failed to fetch decisions");
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [workspaceId, appId, loadRecentDecisions, saveRecentDecisions]);

  // Initialize on mount with proper dependency array
  useEffect(() => {
    const initialRecent = loadRecentDecisions();
    setRecentDecisions(initialRecent);

    // Only fetch and filter if we have the required parameters
    if (workspaceId && appId) {
      fetchAndFilterDecisions();
    }
  }, [workspaceId, appId, loadRecentDecisions, fetchAndFilterDecisions]);

  return {
    recentDecisions,
    loading,
    error,
    addRecentDecision,
    refetch: fetchAndFilterDecisions,
  };
};
