import { useDecisionBoards } from "../hooks/useDecisionBoards";
import { HiOutlineChartBar, HiChevronDown, HiChevronUp } from "react-icons/hi";
import { useState } from "react";

/**
 * MetricChangeAnalysis component that displays boards for metric change analysis
 * @param {Object} props - Component props
 * @param {string} props.workspaceId - Workspace ID
 * @param {string} props.appId - App ID
 * @param {string} props.decisionId - Decision ID
 * @param {Function} props.onNavigate - Navigation handler function
 */
export const MetricChangeAnalysis = ({ workspaceId, appId, decisionId, onNavigate }) => {
  const { boards, loading, error } = useDecisionBoards(workspaceId, appId, decisionId);
  const [isExpanded, setIsExpanded] = useState(false);

  // Don't render if no boards or loading/error
  if (loading || error || !boards || boards.length === 0) {
    return null;
  }

  const handleCardClick = (boardId) => {
    try {
      if (onNavigate && typeof onNavigate === "function" && boardId) {
        onNavigate(`/insights/${boardId}?decisionId=${decisionId}`);
      }
    } catch (error) {
      console.error("Board navigation error:", error);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const visibleBoards = isExpanded ? boards : boards.slice(0, 2);
  const hasMoreBoards = boards.length > 2;

  return (
    <div className="border-t border-gray-200 pt-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-orange-50 rounded-lg">
            <HiOutlineChartBar className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h2 className="text-base font-medium text-foreground">Why have the metrics changed?</h2>
          </div>
        </div>
        {hasMoreBoards && (
          <button
            onClick={toggleExpand}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            {isExpanded ? "Collapse" : "Expand"}
            {isExpanded ? <HiChevronUp size={16} /> : <HiChevronDown size={16} />}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visibleBoards.map((board, index) => (
          <div
            key={board?.board_id || index}
            className="bg-white border border-gray-200 p-4 rounded-md cursor-pointer hover:shadow-md transition-shadow duration-200 group"
            onClick={() => handleCardClick(board?.board_id)}
          >
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-md">
                <HiOutlineChartBar className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm text-gray-800 group-hover:text-blue-800 transition-colors duration-200 truncate max-w-[90%]">
                  {board?.name || "Unnamed Board"}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
