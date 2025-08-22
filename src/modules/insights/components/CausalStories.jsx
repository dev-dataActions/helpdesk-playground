import { useDecisionBoards } from "../hooks/useDecisionBoards";
import { HiOutlineViewBoards } from "react-icons/hi";
import { GoToCard } from "./GoToCard";

/**
 * MetricChangeAnalysis component that displays boards for metric change analysis
 * @param {Object} props - Component props
 * @param {string} props.workspaceId - Workspace ID
 * @param {string} props.appId - App ID
 * @param {string} props.decisionId - Decision ID
 */
export const CausalStories = ({ workspaceId, appId, decisionId }) => {
  const { boards, loading, error } = useDecisionBoards(workspaceId, appId, decisionId);

  // Don't render if no boards or loading/error
  if (loading || error || !boards || boards.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl bg-gradient-to-br from-purple-50/50 to-white border border-purple-100 shadow-sm transition-all duration-300 p-5 mt-4">
      <div className="flex items-start justify-between relative mb-4">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-purple-50 border border-purple-200">
            <HiOutlineViewBoards className="w-4 h-4 text-purple-600" />
          </div>
          <div className="flex items-center gap-1">
            <h3 className=" font-semibold text-gray-700 tracking-wide">Causal Stories</h3>
            <span className="text-xs text-gray-400 font-medium">({boards?.length ?? 0})</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {(!boards || boards.length === 0) && (
          <div className="text-center py-6">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-purple-50 flex items-center justify-center">
              <HiOutlineViewBoards className="w-6 h-6 text-purple-400" />
            </div>
            <p className="text-xs text-gray-500 font-medium mb-1">No boards created yet</p>
          </div>
        )}

        {boards?.map((board) => (
          <div key={board.board_id}>
            <GoToCard
              name={board.name}
              description={board.description}
              goToText="Go to board"
              href={`/insights/${board.board_id}?decisionId=${decisionId}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
