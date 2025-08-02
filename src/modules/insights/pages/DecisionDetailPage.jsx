import { useMemo, useCallback, useState } from "react";
import { getDecision, getSubDecisions } from "../utils/general.util";
import { useDecisionTree } from "../hooks/useDecisionTree";
import { useExplanationInsights } from "../hooks/useExplanationInsights";
import { MetricView } from "../components/MetricView";
import { SubDecisionCards } from "../components/SubDecisionCards";
import { ExplanationInsightsFeed } from "../components/ExplanationInsightsFeed";
import { Loading, Error, PanelLayout } from "da-apps-sdk";
import { DecisionTreeBreadcrumbs } from "../components/DecisionTreeBreadcrumbs";
import { TimeFilters } from "./BoardPage";
import { metricViewConfig } from "../constants/decision.constant";

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
  const [timeRange, setTimeRange] = useState(30); // Default to quarterly (90 days)
  const [selectedTab, setSelectedTab] = useState("monitoring");

  const { decision, metricConfig, subDecisions } = useMemo(() => {
    try {
      const decision = getDecision(decisionTree, decisionId);
      const metricConfig = metricViewConfig[decisionId] || null;
      const subDecisions = getSubDecisions(decisionTree, decisionId);
      return { decision, metricConfig, subDecisions };
    } catch (error) {
      console.error("Error processing decision data:", error);
      return { decision: null, metricConfig: null, subDecisions: [] };
    }
  }, [decisionTree, decisionId]);

  // Fetch explanation insights for the current decision
  const {
    insights,
    loading: insightsLoading,
    error: insightsError,
    refetch: refetchInsights,
  } = useExplanationInsights(decisionId, workspaceId, tenantId);

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

  if (!decision) {
    return (
      <div className={className}>
        <Loading loaderText="Loading decision details..." />
      </div>
    );
  }

  return (
    <PanelLayout
      title={decision?.name}
      description={decision?.description}
      breadcrumbs={
        <DecisionTreeBreadcrumbs
          decisionTree={decisionTree}
          currentDecisionId={decisionId}
          onNavigate={handleNavigate}
        />
      }
      className={className}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <div className="mt-4">
          <div className="flex items-start justify-between items-center gap-x-4 mb-3">
            <div className="flex-1">
              <h2 className="font-semibold text-gray-800">Overview</h2>
              <p className="text-sm text-gray-500">Explore the key metrics and insights for this decision</p>
            </div>
            <TimeFilters timeRange={timeRange} setTimeRange={setTimeRange} />
          </div>
          <MetricView
            onNavigate={onNavigate}
            metricViewConfig={metricConfig}
            workspaceId={workspaceId}
            tenantId={tenantId}
            timeRange={timeRange}
            className="mt-4"
          />
        </div>
        <div className="lg:w-[300px]">
          <div className="mt-5">
            <div className="border border-blue-200 rounded-lg p-4 h-72 bg-blue-50">
              <ExplanationInsightsFeed
                insights={insights}
                loading={insightsLoading}
                error={insightsError}
                onRefetch={refetchInsights}
                className="h-full"
              />
            </div>
          </div>

          <div className="mt-4">
            <SubDecisionCards
              subDecisions={subDecisions}
              metricViewConfig={metricViewConfig}
              workspaceId={workspaceId}
              tenantId={tenantId}
              onNavigate={onNavigate}
            />
          </div>
        </div>
      </div>
    </PanelLayout>
  );
};
