import { useState, useEffect, useCallback, useRef } from "react";
import { getAppBoard } from "../services/board.svc";

const RECENT_BOARDS_KEY = "recentBoards";

/**
 * Custom hook to manage recent boards with localStorage persistence
 * @param {string} workspaceId - Workspace ID
 * @param {string} appId - App ID
 * @returns {Object} Object containing recentBoards, loading, error, and addRecentBoard function
 */
export const useRecentBoards = (workspaceId, appId) => {
  const [recentBoards, setRecentBoards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isFetchingRef = useRef(false);

  // Load recent boards from localStorage
  const loadRecentBoards = useCallback(() => {
    try {
      const stored = localStorage.getItem(RECENT_BOARDS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch (error) {
      console.error("Error loading recent boards from localStorage:", error);
    }
    return [];
  }, []);

  // Save recent boards to localStorage
  const saveRecentBoards = useCallback((boards) => {
    try {
      localStorage.setItem(RECENT_BOARDS_KEY, JSON.stringify(boards));
    } catch (error) {
      console.error("Error saving recent boards to localStorage:", error);
    }
  }, []);

  // Add a board to recent boards
  const addRecentBoard = useCallback(
    (boardId, boardName, boardDescription, decisionId) => {
      try {
        if (!boardId || !decisionId) return;

        const now = Date.now();
        const newBoard = {
          boardId,
          decisionId,
          boardName: boardName || "Untitled Board",
          boardDescription: boardDescription || "",
          lastOpenedAt: now,
        };

        setRecentBoards((currentBoards) => {
          const filtered = currentBoards.filter((board) => board.boardId !== boardId);
          const updated = [newBoard, ...filtered].sort((a, b) => b.lastOpenedAt - a.lastOpenedAt).slice(0, 5);
          saveRecentBoards(updated);
          return updated;
        });
      } catch (error) {
        console.error("Error adding recent board:", error);
      }
    },
    [saveRecentBoards]
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
      const currentBoards = loadRecentBoards();
      const validBoards = [];

      // Check each recent board individually
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
          console.error(`Error checking board ${board.boardId}:`, error);
          // Skip this board if it fails to load (likely deleted)
        }
      }

      // Update localStorage and state
      saveRecentBoards(validBoards);
      setRecentBoards(validBoards);
    } catch (error) {
      console.error("Error fetching and filtering boards:", error);
      setError(error?.message || "Failed to fetch boards");
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [workspaceId, appId, loadRecentBoards, saveRecentBoards]);

  // Initialize on mount with proper dependency array
  useEffect(() => {
    const initialRecent = loadRecentBoards();
    setRecentBoards(initialRecent);

    // Only fetch and filter if we have the required parameters
    if (workspaceId && appId) {
      fetchAndFilterBoards();
    }
  }, [workspaceId, appId, loadRecentBoards, fetchAndFilterBoards]);

  return {
    recentBoards,
    loading,
    error,
    addRecentBoard,
    refetch: fetchAndFilterBoards,
  };
};
