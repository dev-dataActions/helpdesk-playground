import { useCallback, useState } from "react";
import { useDecisionTree } from "../hooks/useDecisionTree";
import { DecisionTreeView } from "../components/DecisionTreeView";
import { DecisionCard } from "../components/DecisionCard";
import { Loading } from "../common/functional/Loading";
import { Error } from "../common/functional/Error";
import { PanelLayout } from "../common/layouts/PanelLayout";
import { Tabs } from "../common/functional/Tabs";
import { RecentBoards } from "../components/RecentBoards";
import { PinnedBoards } from "../components/PinnedBoards";
import { useTenantId } from "../hooks/useTenantId";
import { useRoleId } from "../hooks/useRoleId";
import { TimeFilters } from "./BoardPage";

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
  const [timeRange, setTimeRange] = useState(90);

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
      breadcrumbs={[{ name: "Home" }]}
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
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 mt-4">
        {/* Boards Tabs - Takes full width except 300px */}

        <Tabs
          tabs={[
            {
              id: "recent",
              label: "Recent Boards",
              value: "recent",
              component: <RecentBoards workspaceId={workspaceId} appId={appId} onNavigate={handleNavigate} />,
            },
            {
              id: "pinned",
              label: "Pinned Boards",
              value: "pinned",
              component: <PinnedBoards workspaceId={workspaceId} appId={appId} onNavigate={handleNavigate} />,
            },
          ]}
        />

        {/* Decision Tree - Fixed 300px width */}
        <div className="lg:w-[300px]">
          <div className="bg-blue-50 border border-blue-200 p-1.5 rounded-md">
            <DecisionTreeView decisionTree={decisionTree} selectedDecisionId="" onNavigate={handleNavigate} />
          </div>
        </div>
      </div>
    </PanelLayout>
  );
};
