import { useMemo } from "react";
import { getBreadcrumbs, getDecision } from "../utils/general.util";
import { useDecisionTree } from "../hooks/useDecisionTree";
import { DecisionTreeView } from "../components/DecisionTreeView";
import { DecisionSummary } from "../components/DecisionSummary";
import { DecisionBoards } from "../components/DecisionBoards";
import { Loading } from "../common/functional/Loading";
import { Error } from "../common/functional/Error";
import { PanelLayout } from "../common/layouts/PanelLayout";

/**
 * DecisionDetailPage component with comprehensive error handling and prop validation
 * @param {Object} props - Component props
 * @param {string} props.workspaceId - Workspace ID
 * @param {string} props.appId - App ID
 * @param {string} props.decisionId - Decision ID
 * @param {Function} props.onNavigate - Navigation handler function
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.tenantId - Tenant ID
 */
export const DecisionDetailPage = ({ workspaceId, appId, decisionId, tenantId, onNavigate = null, className = "" }) => {
  const { decisionTree, loading, error } = useDecisionTree(workspaceId, appId);

  const { breadcrumbs, decision } = useMemo(() => {
    try {
      const breadcrumbs = getBreadcrumbs(decisionTree, decisionId);
      const decision = getDecision(decisionTree, decisionId);
      return { breadcrumbs, decision };
    } catch (error) {
      console.error("Error processing decision data:", error);
      return { breadcrumbs: [], decision: null };
    }
  }, [decisionTree, decisionId]);

  if (loading) {
    return (
      <div className={className}>
        <Loading loaderText="Loading decision tree..." />
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

  if (!decision || !breadcrumbs) {
    return (
      <div className={className}>
        <Loading loaderText="Loading decision details..." />
      </div>
    );
  }

  const handleBreadcrumbNavigate = (href) => {
    try {
      if (onNavigate && typeof onNavigate === "function") {
        onNavigate(href);
      }
    } catch (error) {
      console.error("Breadcrumb navigation error:", error);
    }
  };

  return (
    <PanelLayout
      title={decision?.name}
      description={decision?.description}
      breadcrumbs={[{ name: "Decisions" }, ...breadcrumbs]}
      onNavigate={handleBreadcrumbNavigate}
      className={className}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 border-t border-gray-200 mt-2 py-5">
        <div className="flex flex-col gap-6">
          <DecisionSummary
            appId={appId}
            workspaceId={workspaceId}
            tenantId={tenantId}
            decisionId={decisionId ?? decisionTree?.data?.id}
            onNavigate={onNavigate}
          />
          <DecisionBoards
            appId={appId}
            workspaceId={workspaceId}
            decisionId={decisionId ?? decisionTree?.data?.id}
            onNavigate={onNavigate}
          />
        </div>
        <div>
          <div className="bg-blue-50 border border-blue-200 p-1.5 rounded-md">
            <DecisionTreeView decisionTree={decisionTree} selectedDecisionId={decisionId} onNavigate={onNavigate} />
          </div>
        </div>
      </div>
    </PanelLayout>
  );
};
