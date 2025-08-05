import { useCallback } from "react";
import { usePinnedDecisions } from "../hooks/usePinnedDecisions";
import { Loading, Error } from "da-apps-sdk";
import { GoLinkExternal, GoPin } from "react-icons/go";

const PinnedDecisionCard = ({ decision, handleClick, isPinned, onPinToggle }) => {
  const { decisionName, decisionDescription, decisionId } = decision;

  const handlePinClick = (e) => {
    e.stopPropagation();
    onPinToggle(decisionId, decisionId, isPinned);
  };

  return (
    <div
      className="flex items-start gap-x-3 p-4 cursor-pointer hover:bg-gray-100 transition-colors relative"
      onClick={handleClick}
    >
      <div className="p-2.5 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center">
        <GoLinkExternal size={16} />
      </div>
      <div className="flex-1">
        <h3 className="text-sm">{decisionName}</h3>
        <p className="text-xs text-gray-500">{decisionDescription}</p>
      </div>
      <button
        className="p-1 rounded-full hover:bg-gray-200 transition-colors"
        onClick={handlePinClick}
        title={isPinned ? "Unpin decision" : "Pin decision"}
      >
        <GoPin size={16} className={isPinned ? "text-blue-500" : "text-gray-400 hover:text-blue-500"} />
      </button>
    </div>
  );
};

/**
 * PinnedDecisions component with comprehensive error handling and prop validation
 * @param {Object} props - Component props
 * @param {string} props.workspaceId - Workspace ID
 * @param {string} props.appId - App ID
 * @param {Function} props.onNavigate - Navigation handler function
 * @param {string} props.className - Additional CSS classes
 */
export const PinnedDecisions = ({ workspaceId, appId, onNavigate = null, className = "" }) => {
  const { pinnedDecisions, loading, error, isPinned, unpinDecision } = usePinnedDecisions(workspaceId, appId);

  const handleDecisionClick = useCallback(
    (decision) => {
      try {
        if (onNavigate && typeof onNavigate === "function") {
          onNavigate(`/insights?decisionId=${decision.decisionId}`);
        }
      } catch (error) {
        console.error("Decision navigation error:", error);
      }
    },
    [onNavigate]
  );

  const handlePinToggle = useCallback(
    (boardId, decisionId, currentlyPinned) => {
      try {
        if (currentlyPinned) {
          unpinDecision(decisionId);
        }
      } catch (error) {
        console.error("Pin toggle error:", error);
      }
    },
    [unpinDecision]
  );

  if (loading) {
    return (
      <div className={`${className} min-h-40`}>
        <Loading loaderText="Loading pinned decisions..." />
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
    <div className={`h-full min-h-64`}>
      <div className="flex flex-col h-full overflow-y-auto divide-y divide-gray-200">
        {!pinnedDecisions || pinnedDecisions.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-sm text-gray-600">No pins available yet</p>
            <p className="text-xs text-gray-500">Pin your favorite decisions to see them here</p>
          </div>
        ) : (
          pinnedDecisions.map((decision) => {
            const isDecisionPinned = isPinned(decision.decisionId);

            return (
              <PinnedDecisionCard
                key={decision.decisionId}
                decision={decision}
                handleClick={() => handleDecisionClick(decision)}
                isPinned={isDecisionPinned}
                onPinToggle={handlePinToggle}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
