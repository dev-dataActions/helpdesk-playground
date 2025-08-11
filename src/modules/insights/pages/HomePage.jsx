import { useCallback, useState } from "react";
import { useDecisionTree } from "../hooks/useDecisionTree";
import { DecisionCard } from "../components/DecisionCard";
import { RecentDecisions } from "../components/RecentDecisions";
import { PinnedDecisions } from "../components/PinnedDecisions";
import { PanelLayout, Loading, Error } from "da-apps-sdk";
import { useTenantId } from "../hooks/useTenantId";
import { useRoleId } from "../hooks/useRoleId";
import { RxSlash } from "react-icons/rx";

/**
 * HomePage component with comprehensive error handling and prop validation
 * @param {Object} props - Component props
 * @param {string} props.workspaceId - Workspace ID
 * @param {string} props.appId - App ID
 * @param {Function} props.onNavigate - Navigation handler function
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.tenantId - Tenant ID
 */
export const HomePage = ({
  workspaceId = process.env.NEXT_PUBLIC_WORKSPACE_ID,
  appId = process.env.NEXT_PUBLIC_CFA_APP_ID,
  onNavigate = null,
  className = "",
  tenantId: propTenantId,
}) => {
  const { tenantId } = useTenantId();
  const finalTenantId = propTenantId || tenantId;
  const { roleId } = useRoleId();
  const [timeRange, setTimeRange] = useState(30);

  const { decisionTree, loading, error } = useDecisionTree(workspaceId, appId);

  const handleNavigate = useCallback(
    (path) => {
      try {
        if (onNavigate && typeof onNavigate === "function") {
          onNavigate(path);
        }
      } catch (error) {
        console.error("Navigation error:", error);
      }
    },
    [onNavigate]
  );

  if (loading) {
    return (
      <div className={className}>
        <Loading loaderText="Loading insights dashboard..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={className}>
        <Error errorText={error} fullScreen={false} />
      </div>
    );
  }

  return (
    <PanelLayout
      title="Home"
      description="Welcome to insights portal, the place to explore your decisions and metrics"
      breadcrumbs={
        <div className="flex items-center space-x-1.5 text-sm">
          <button
            onClick={() => onNavigate && handleNavigate("/insights")}
            className="text-xxs focus:outline-none text-gray-900 hover:underline"
          >
            Home
          </button>
          <RxSlash className="w-4 h-4 text-gray-400" />
        </div>
      }
      className="max-w-5xl mx-auto"
    >
      <div className="mt-4">
        <h2 className="font-medium text-gray-700 capitalize mb-1.5">My Decision</h2>
        {/* <p className="text-sm text-gray-500 mb-2.5">Jump right into your decision scope and explore insights</p> */}
        <DecisionCard
          roleId={roleId}
          workspaceId={workspaceId}
          tenantId={finalTenantId}
          decisionTree={decisionTree}
          onNavigate={handleNavigate}
          className="mb-6"
          timeRange={timeRange}
          setTimeRange={setTimeRange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="font-medium text-gray-700 capitalize mb-1.5">Recent Decisions</h2>
          {/* <p className="text-sm text-gray-500 mb-2.5">View your most recent decisions and explore their insights</p> */}
          <div className="w-full h-72 border border-gray-200 rounded-lg overflow-hidden">
            <RecentDecisions workspaceId={workspaceId} appId={appId} onNavigate={handleNavigate} />
          </div>
        </div>
        <div>
          <h2 className="font-medium text-gray-700 capitalize mb-1.5">Pinned Decisions</h2>
          {/* <p className="text-sm text-gray-500 mb-2.5">View your pinned decisions and explore their insights</p> */}
          <div className="w-full h-72 border border-gray-200 rounded-lg overflow-hidden">
            <PinnedDecisions workspaceId={workspaceId} appId={appId} onNavigate={handleNavigate} />
          </div>
        </div>
      </div>
    </PanelLayout>
  );
};
