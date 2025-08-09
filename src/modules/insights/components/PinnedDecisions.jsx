import { useCallback } from "react";
import { usePinnedDecisions } from "../hooks/usePinnedDecisions";
import { Loading, Error } from "da-apps-sdk";
import { GoLinkExternal, GoPin } from "react-icons/go";
import {
  HiOutlineGlobe,
  HiOutlineLocationMarker,
  HiOutlineDocumentText,
  HiOutlineArrowRight,
  HiOutlineBadgeCheck,
} from "react-icons/hi";

// Helper function to get icon and badge based on decision name
const getDecisionMeta = (decisionName) => {
  const name = decisionName?.toLowerCase() || "";

  if (name.includes("product") || name.includes("advanced")) {
    return {
      icon: HiOutlineGlobe,
      badge: "Overview",
      badgeColor: "bg-purple-100 text-purple-700 border-purple-200",
    };
  }
  if (name.includes("season") || name.includes("complete")) {
    return {
      icon: HiOutlineBadgeCheck,
      badge: "DGO",
      badgeColor: "bg-blue-100 text-blue-700 border-blue-200",
    };
  }
  if (name.includes("region") || name.includes("location")) {
    return {
      icon: HiOutlineLocationMarker,
      badge: "ROL",
      badgeColor: "bg-orange-100 text-orange-700 border-orange-200",
    };
  }
  if (name.includes("field") || name.includes("staff") || name.includes("book")) {
    return {
      icon: HiOutlineDocumentText,
      badge: "Field Staff",
      badgeColor: "bg-green-100 text-green-700 border-green-200",
    };
  }

  // Default
  return {
    icon: GoLinkExternal,
    badge: "General",
    badgeColor: "bg-gray-100 text-gray-700 border-gray-200",
  };
};

const PinnedDecisionCard = ({ decision, handleClick, isPinned, onPinToggle }) => {
  const { decisionName, decisionId } = decision;
  const { icon: IconComponent, badge, badgeColor } = getDecisionMeta(decisionName);

  const handlePinClick = (e) => {
    e.stopPropagation();
    onPinToggle(decisionId, isPinned);
  };

  return (
    <div
      className="group bg-white border border-gray-200 rounded-xl p-3 cursor-pointer hover:shadow-sm hover:border-gray-300 transition-all duration-200 relative"
      onClick={handleClick}
    >
      <div className="flex items-center gap-2">
        {/* Icon */}
        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <IconComponent className="w-4 h-4 text-gray-600" />
        </div>

        {/* Content with Badge */}
        <div className="flex-1 min-w-0 flex items-center gap-2">
          <h3 className="text-gray-900 text-sm truncate">{decisionName?.replace(/\([^)]*\)/g, "").trim()}</h3>
          <span
            className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[11px] font-medium border ${badgeColor} flex-shrink-0`}
          >
            {badge}
          </span>
        </div>

        {/* Pin button - appears on hover */}
        <button
          className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-100 transition-all duration-200 flex-shrink-0"
          onClick={handlePinClick}
          title={isPinned ? "Unpin decision" : "Pin decision"}
        >
          <GoPin size={14} className={isPinned ? "text-blue-500" : "text-gray-400 hover:text-blue-500"} />
        </button>

        {/* Arrow */}
        <HiOutlineArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0" />
      </div>
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
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <GoPin className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-sm font-medium text-gray-900 mb-1">No pinned decisions yet</p>
          <p className="text-xs text-gray-500">Pin your favorite decisions to see them here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
