import { useCallback, useState } from "react";
import { useDecisionTree } from "../hooks/useDecisionTree";
import { DecisionCard } from "../components/DecisionCard";
import { PanelLayout, Loading, Error } from "da-apps-sdk";
import { useTenantId } from "../hooks/useTenantId";
import { useRoleId } from "../hooks/useRoleId";
import { TimeFilters } from "./BoardPage";
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
      title="My Altitude"
      description="Monitor your key metrics and explore decision insights"
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
      customButton={<TimeFilters timeRange={timeRange} setTimeRange={setTimeRange} />}
    >
      <div className="mt-2">
        <DecisionCard
          roleId={roleId}
          workspaceId={workspaceId}
          tenantId={finalTenantId}
          decisionTree={decisionTree}
          onNavigate={handleNavigate}
          className="mb-6"
          timeRange={timeRange}
        />
      </div>
    </PanelLayout>
  );
};
