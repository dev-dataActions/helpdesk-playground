import { useCallback } from "react";
import { useRecentDecisions } from "../hooks/useRecentDecisions";
import { Loading, Error } from "da-apps-sdk";
import { GoLinkExternal } from "react-icons/go";

const RecentDecisionCard = ({ decision, handleClick }) => {
  const { decisionName, decisionDescription } = decision;
  return (
    <div
      className="flex items-start gap-x-3 p-4 cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={handleClick}
    >
      <div className="p-2.5 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center">
        <GoLinkExternal size={16} />
      </div>
      <div>
        <h3 className="text-sm">{decisionName}</h3>
        <p className="text-xs text-gray-500">{decisionDescription}</p>
      </div>
    </div>
  );
};

/**
 * RecentDecisions component with comprehensive error handling and prop validation
 * @param {Object} props - Component props
 * @param {string} props.workspaceId - Workspace ID
 * @param {string} props.appId - App ID
 * @param {Function} props.onNavigate - Navigation handler function
 * @param {string} props.className - Additional CSS classes
 */
export const RecentDecisions = ({ workspaceId, appId, onNavigate = null, className = "" }) => {
  const { recentDecisions, loading, error } = useRecentDecisions(workspaceId, appId);

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

  if (loading) {
    return (
      <div className={`${className} min-h-40`}>
        <Loading loaderText="Loading recent decisions..." />
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
        {!recentDecisions || recentDecisions.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-sm text-gray-600">No recent decisions</p>
            <p className="text-xs text-gray-500">Your recently opened decisions will appear here</p>
          </div>
        ) : (
          recentDecisions.map((decision) => (
            <RecentDecisionCard
              key={decision.decisionId}
              decision={decision}
              handleClick={() => handleDecisionClick(decision)}
            />
          ))
        )}
      </div>
    </div>
  );
};
