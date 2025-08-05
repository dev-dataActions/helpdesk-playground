import { useState, useEffect, useCallback, useRef } from "react";
import { getAppDTree } from "../services/decision.svc";
import { getDecisionPath } from "../utils/decisionTree.util";

const PINNED_DECISIONS_KEY = "pinnedDecisions";

/**
 * Custom hook to manage pinned decisions with localStorage persistence
 * @param {string} workspaceId - Workspace ID
 * @param {string} appId - App ID
 * @returns {Object} Object containing pinnedDecisions, loading, error, pinDecision, unpinDecision, and isPinned functions
 */
export const usePinnedDecisions = (workspaceId, appId) => {
  const [pinnedDecisions, setPinnedDecisions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isFetchingRef = useRef(false);

  // Load pinned decisions from localStorage
  const loadPinnedDecisions = useCallback(() => {
    try {
      const stored = localStorage.getItem(PINNED_DECISIONS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch (error) {
      console.error("Error loading pinned decisions from localStorage:", error);
    }
    return [];
  }, []);

  // Save pinned decisions to localStorage
  const savePinnedDecisions = useCallback((decisions) => {
    try {
      localStorage.setItem(PINNED_DECISIONS_KEY, JSON.stringify(decisions));
    } catch (error) {
      console.error("Error saving pinned decisions to localStorage:", error);
    }
  }, []);

  // Check if a decision is pinned
  const isPinned = useCallback(
    (decisionId) => {
      try {
        return pinnedDecisions.some((decision) => decision.decisionId === decisionId);
      } catch (error) {
        console.error("Error checking if decision is pinned:", error);
        return false;
      }
    },
    [pinnedDecisions]
  );

  // Pin a decision
  const pinDecision = useCallback(
    (decisionId, decisionName, decisionDescription) => {
      try {
        if (!decisionId) return;

        const now = Date.now();
        const newDecision = {
          decisionId,
          decisionName: decisionName || "Untitled Decision",
          decisionDescription: decisionDescription || "",
          pinnedAt: now,
        };

        setPinnedDecisions((currentDecisions) => {
          // Check if already pinned
          const alreadyPinned = currentDecisions.some((decision) => decision.decisionId === decisionId);
          if (alreadyPinned) return currentDecisions;

          const updated = [...currentDecisions, newDecision];
          savePinnedDecisions(updated);
          return updated;
        });
      } catch (error) {
        console.error("Error pinning decision:", error);
      }
    },
    [savePinnedDecisions]
  );

  // Unpin a decision
  const unpinDecision = useCallback(
    (decisionId) => {
      try {
        if (!decisionId) return;

        setPinnedDecisions((currentDecisions) => {
          const updated = currentDecisions.filter((decision) => decision.decisionId !== decisionId);
          savePinnedDecisions(updated);
          return updated;
        });
      } catch (error) {
        console.error("Error unpinning decision:", error);
      }
    },
    [savePinnedDecisions]
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
        setPinnedDecisions([]);
        return;
      }

      // Always get the latest from localStorage to avoid race conditions
      const currentDecisions = loadPinnedDecisions();
      if (currentDecisions.length === 0) {
        setPinnedDecisions([]);
        return;
      }

      // Fetch current decision tree
      const decisionTreeData = await getAppDTree(workspaceId, appId);
      if (!decisionTreeData || !Array.isArray(decisionTreeData) || decisionTreeData.length === 0) {
        console.warn("No decision tree data available");
        setPinnedDecisions([]);
        return;
      }

      const decisionTree = decisionTreeData[0];
      const validDecisions = [];

      // Check each pinned decision individually
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
                decisionName: decisionNode?.name || decisionNode?.title || decision.decisionName,
                decisionDescription: decisionNode?.description || decision.decisionDescription,
              });
            }
          }
        } catch (error) {
          console.error(`Error checking pinned decision ${decision.decisionId}:`, error);
          // Skip this decision if it fails to load (likely deleted)
        }
      }

      // Update localStorage and state
      savePinnedDecisions(validDecisions);
      setPinnedDecisions(validDecisions);
    } catch (error) {
      console.error("Error fetching and filtering pinned decisions:", error);
      setError(error?.message || "Failed to fetch pinned decisions");
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [workspaceId, appId, loadPinnedDecisions, savePinnedDecisions]);

  // Initialize on mount with proper dependency array
  useEffect(() => {
    const initialPinned = loadPinnedDecisions();
    setPinnedDecisions(initialPinned);

    // Only fetch and filter if we have the required parameters
    if (workspaceId && appId) {
      fetchAndFilterDecisions();
    }
  }, [workspaceId, appId, loadPinnedDecisions, fetchAndFilterDecisions]);

  return {
    pinnedDecisions,
    loading,
    error,
    pinDecision,
    unpinDecision,
    isPinned,
    refetch: fetchAndFilterDecisions,
  };
};
