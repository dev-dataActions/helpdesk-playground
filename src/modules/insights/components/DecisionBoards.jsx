import { GoToCard } from "./GoToCard";
import { useDecisionBoards } from "../hooks/useDecisionBoards";
import { Error } from "../common/functional/Error";

/**
 * DecisionBoards component with comprehensive error handling and prop validation
 * @param {Object} props - Component props
 * @param {string} props.workspaceId - Workspace ID
 * @param {string} props.appId - App ID
 * @param {string} props.decisionId - Decision ID
 * @param {Function} props.onNavigate - Navigation handler function
 * @param {string} props.className - Additional CSS classes
 */
export const DecisionBoards = ({ workspaceId, appId, decisionId, onNavigate = null, className = "" }) => {
  const { boards, loading, error } = useDecisionBoards(workspaceId, appId, decisionId);

  const handleBoardClick = (board) => {
    try {
      if (onNavigate && typeof onNavigate === "function") {
        onNavigate(`/insights/${board.board_id}?decisionId=${decisionId}`);
      }
    } catch (error) {
      console.error("Board navigation error:", error);
    }
  };

  if (loading) {
    return (
      <div className={`${className}`}>
        <div className="flex items-start justify-between">
          <div>
            <p className="mb-0.5 text-sm">Decision Boards (loading...)</p>
            <p className="text-gray-500 font-light text-xs mb-3 w-72">
              Deepdive into your workflows and track progress
            </p>
          </div>
        </div>
        <div className="text-sm text-gray-600">Loading boards...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${className}`}>
        <div className="flex items-start justify-between">
          <div>
            <p className="mb-0.5 text-sm">Decision Boards</p>
            <p className="text-gray-500 font-light text-xs mb-3 w-72">
              Deepdive into your workflows and track progress
            </p>
          </div>
        </div>
        <Error errorText={error} fullScreen={false} />
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="mb-0.5 text-sm">{`Decision Boards (${boards?.length ?? 0})`}</p>
          <p className="text-gray-500 font-light text-xs mb-3 w-72">Deepdive into your workflows and track progress</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {(!boards || boards.length === 0) && <p className="text-sm text-gray-600">No boards added yet.</p>}
        {boards?.map((board) => (
          <div key={board.board_id || board.id} className="w-full">
            <GoToCard
              name={board.name}
              description={board.description}
              goToText="Go to board"
              onClick={() => handleBoardClick(board)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
