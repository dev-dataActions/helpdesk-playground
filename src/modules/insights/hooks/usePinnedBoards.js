import { useState, useEffect, useCallback, useRef } from "react";
import { getAppBoard } from "../services/board.svc";

const PINNED_BOARDS_KEY = "pinnedBoards";

/**
 * Custom hook to manage pinned boards with localStorage persistence
 * @param {string} workspaceId - Workspace ID
 * @param {string} appId - App ID
 * @returns {Object} Object containing pinnedBoards, loading, error, pinBoard, unpinBoard, and isPinned functions
 */
export const usePinnedBoards = (workspaceId, appId) => {
  const [pinnedBoards, setPinnedBoards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isFetchingRef = useRef(false);

  // Load pinned boards from localStorage
  const loadPinnedBoards = useCallback(() => {
    try {
      const stored = localStorage.getItem(PINNED_BOARDS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch (error) {
      console.error("Error loading pinned boards from localStorage:", error);
    }
    return [];
  }, []);

  // Save pinned boards to localStorage
  const savePinnedBoards = useCallback((boards) => {
    try {
      localStorage.setItem(PINNED_BOARDS_KEY, JSON.stringify(boards));
    } catch (error) {
      console.error("Error saving pinned boards to localStorage:", error);
    }
  }, []);

  // Check if a board is pinned
  const isPinned = useCallback(
    (boardId, decisionId) => {
      try {
        return pinnedBoards.some((board) => board.boardId === boardId && board.decisionId === decisionId);
      } catch (error) {
        console.error("Error checking if board is pinned:", error);
        return false;
      }
    },
    [pinnedBoards]
  );

  // Pin a board
  const pinBoard = useCallback(
    (boardId, boardName, boardDescription, decisionId) => {
      try {
        if (!boardId || !decisionId) return;

        const now = Date.now();
        const newBoard = {
          boardId,
          decisionId,
          boardName: boardName || "Untitled Board",
          boardDescription: boardDescription || "",
          pinnedAt: now,
        };

        setPinnedBoards((currentBoards) => {
          // Check if already pinned
          const alreadyPinned = currentBoards.some(
            (board) => board.boardId === boardId && board.decisionId === decisionId
          );
          if (alreadyPinned) return currentBoards;

          const updated = [...currentBoards, newBoard];
          savePinnedBoards(updated);
          return updated;
        });
      } catch (error) {
        console.error("Error pinning board:", error);
      }
    },
    [savePinnedBoards]
  );

  // Unpin a board
  const unpinBoard = useCallback(
    (boardId, decisionId) => {
      try {
        if (!boardId || !decisionId) return;

        setPinnedBoards((currentBoards) => {
          const updated = currentBoards.filter(
            (board) => !(board.boardId === boardId && board.decisionId === decisionId)
          );
          savePinnedBoards(updated);
          return updated;
        });
      } catch (error) {
        console.error("Error unpinning board:", error);
      }
    },
    [savePinnedBoards]
  );

  // Fetch all boards and filter out deleted ones
  const fetchAndFilterBoards = useCallback(async () => {
    // Prevent multiple simultaneous calls
    if (isFetchingRef.current) {
      return;
    }

    isFetchingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      // Always get the latest from localStorage to avoid race conditions
      const currentBoards = loadPinnedBoards();
      const validBoards = [];

      // Check each pinned board individually
      for (const board of currentBoards) {
        try {
          if (board.boardId && board.decisionId) {
            const boardData = await getAppBoard(workspaceId, appId, board.decisionId, board.boardId);

            // If board exists and has data, keep it
            if (boardData && Array.isArray(boardData) && boardData.length > 0) {
              validBoards.push(board);
            }
          }
        } catch (error) {
          console.error(`Error checking pinned board ${board.boardId}:`, error);
          // Skip this board if it fails to load (likely deleted)
        }
      }

      // Update localStorage and state
      savePinnedBoards(validBoards);
      setPinnedBoards(validBoards);
    } catch (error) {
      console.error("Error fetching and filtering pinned boards:", error);
      setError(error?.message || "Failed to fetch pinned boards");
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [workspaceId, appId, loadPinnedBoards, savePinnedBoards]);

  // Initialize on mount with proper dependency array
  useEffect(() => {
    const initialPinned = loadPinnedBoards();
    setPinnedBoards(initialPinned);

    // Only fetch and filter if we have the required parameters
    if (workspaceId && appId) {
      fetchAndFilterBoards();
    }
  }, [workspaceId, appId, loadPinnedBoards, fetchAndFilterBoards]);

  return {
    pinnedBoards,
    loading,
    error,
    pinBoard,
    unpinBoard,
    isPinned,
    refetch: fetchAndFilterBoards,
  };
};
