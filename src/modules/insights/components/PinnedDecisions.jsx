import { useCallback } from "react";
import { usePinnedDecisions } from "../hooks/usePinnedDecisions";
import { Loading, Error } from "da-apps-sdk";
import { GoLinkExternal, GoPin } from "react-icons/go";
import { HiOutlineArrowRight } from "react-icons/hi";

// Helper function to get badge based on decision name
const getDecisionBadge = (decisionName) => {
  const roleMatch = decisionName?.match(/^\(([^)]+)\)/)?.[1];
  if (roleMatch) {
    return {
      badge: roleMatch,
      badgeColor: "bg-purple-100 text-purple-700 border-purple-200",
    };
  }

  return {
    badge: "General",
    badgeColor: "bg-gray-100 text-gray-700 border-gray-200",
  };
};

const PinnedDecisionCard = ({ decision, handleClick, isPinned, onPinToggle }) => {
  const { decisionName, decisionId } = decision;
  const { badge, badgeColor } = getDecisionBadge(decisionName);

  // Remove parentheses text from the displayed name
  const cleanDecisionName = decisionName?.replace(/^\([^)]+\)\s*/, "") || decisionName;

  const handlePinClick = (e) => {
    e.stopPropagation();
    onPinToggle(decisionId, isPinned);
  };

  return (
    <div
      className="flex items-center gap-x-3 px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors relative bg-white rounded-lg border border-gray-200 shadow-sm"
      onClick={handleClick}
    >
      <div className="p-2 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center">
        <GoLinkExternal size={16} />
      </div>
      <div className="flex-1 flex items-center gap-3">
        <h3 className="text-sm text-gray-900">{cleanDecisionName}</h3>
        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${badgeColor}`}>{badge}</span>
      </div>
      <HiOutlineArrowRight size={16} className="text-gray-400" />
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
    (decisionId, currentlyPinned) => {
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
    <div>
      {!pinnedDecisions || pinnedDecisions.length === 0 ? (
        <div className="text-center py-8 border border-gray-200 rounded-lg bg-white">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <GoPin className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-sm font-medium text-gray-900 mb-1">No pinned decisions yet</p>
          <p className="text-xs text-gray-500">Pin your favorite decisions to see them here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {pinnedDecisions.map((decision) => {
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
          })}
        </div>
      )}
    </div>
  );
};
