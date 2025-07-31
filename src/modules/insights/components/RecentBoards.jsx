import { useCallback } from "react";
import { GoToCard } from "./GoToCard";
import { useRecentBoards } from "../hooks/useRecentBoards";
import { usePinnedBoards } from "../hooks/usePinnedBoards";
import { Loading, Error } from "da-apps-sdk";

/**
 * RecentBoards component with comprehensive error handling and prop validation
 * @param {Object} props - Component props
 * @param {string} props.workspaceId - Workspace ID
 * @param {string} props.appId - App ID
 * @param {Function} props.onNavigate - Navigation handler function
 * @param {string} props.className - Additional CSS classes
 */
export const RecentBoards = ({ workspaceId, appId, onNavigate = null, className = "" }) => {
  const { recentBoards, loading, error } = useRecentBoards(workspaceId, appId);
  const { isPinned, pinBoard, unpinBoard } = usePinnedBoards(workspaceId, appId);

  const handleBoardClick = useCallback(
    (board) => {
      try {
        if (onNavigate && typeof onNavigate === "function") {
          onNavigate(`/insights/${board.boardId}?decisionId=${board.decisionId}`);
        }
      } catch (error) {
        console.error("Board navigation error:", error);
      }
    },
    [onNavigate]
  );

  const handlePinToggle = useCallback(
    (boardId, decisionId, currentlyPinned) => {
      try {
        const board = recentBoards?.find((b) => b.boardId === boardId);
        if (!board) return;

        if (currentlyPinned) {
          unpinBoard(boardId, decisionId);
        } else {
          pinBoard(boardId, board.boardName, board.boardDescription, decisionId);
        }
      } catch (error) {
        console.error("Pin toggle error:", error);
      }
    },
    [recentBoards, pinBoard, unpinBoard]
  );

  if (loading) {
    return (
      <div className={`${className} min-h-40`}>
        <Loading loaderText="Loading recent boards..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${className} min-h-40`}>
        <Error errorText={error} fullScreen={false} />
      </div>
    );
  }

  return (
    <div className={`${className} min-h-40`}>
      <div className="flex flex-col gap-3 h-full py-3 px-1.5">
        {!recentBoards || recentBoards.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sm text-gray-600">{`You haven't visited any boards yet`}</p>
            <p className="text-xs text-gray-500">Start exploring decision boards to see them here</p>
          </div>
        ) : (
          recentBoards.map((board) => {
            const isBoardPinned = isPinned(board.boardId, board.decisionId);

            return (
              <div key={board.boardId} className="w-full">
                <GoToCard
                  name={board.boardName}
                  description={board.boardDescription}
                  goToText="Go to board"
                  onClick={() => handleBoardClick(board)}
                  isPinned={isBoardPinned}
                  onPinToggle={handlePinToggle}
                  boardId={board.boardId}
                  decisionId={board.decisionId}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
