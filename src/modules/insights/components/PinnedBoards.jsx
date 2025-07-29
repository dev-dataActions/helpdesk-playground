import { useCallback } from "react";
import { GoToCard } from "./GoToCard";
import { usePinnedBoards } from "../hooks/usePinnedBoards";
import { Loading } from "../common/functional/Loading";
import { Error } from "../common/functional/Error";

/**
 * PinnedBoards component with comprehensive error handling and prop validation
 * @param {Object} props - Component props
 * @param {string} props.workspaceId - Workspace ID
 * @param {string} props.appId - App ID
 * @param {Function} props.onNavigate - Navigation handler function
 * @param {string} props.className - Additional CSS classes
 */
export const PinnedBoards = ({ workspaceId, appId, onNavigate = null, className = "" }) => {
  const { pinnedBoards, loading, error, isPinned, unpinBoard } = usePinnedBoards(workspaceId, appId);

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
        if (currentlyPinned) {
          unpinBoard(boardId, decisionId);
        }
      } catch (error) {
        console.error("Pin toggle error:", error);
      }
    },
    [unpinBoard]
  );

  if (loading) {
    return (
      <div className={`${className} min-h-40`}>
        <Loading loaderText="Loading pinned boards..." />
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
        {!pinnedBoards || pinnedBoards.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sm text-gray-600">No pins available yet</p>
            <p className="text-xs text-gray-500">Pin your favorite boards to see them here</p>
          </div>
        ) : (
          pinnedBoards.map((board) => {
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
