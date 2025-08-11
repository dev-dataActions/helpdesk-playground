import { useMemo, useCallback, useState, useEffect } from "react";
import { getDecision, getSubDecisions } from "../utils/general.util";
import { useDecisionTree } from "../hooks/useDecisionTree";
import { useRecentDecisions } from "../hooks/useRecentDecisions";
import { usePinnedDecisions } from "../hooks/usePinnedDecisions";
import { useMetricViewConfig } from "../hooks/useMetricViewConfig";
import { useSubDecisionsMetrics } from "../hooks/useSubDecisionsMetrics";
import { MetricView } from "../components/MetricView";
import { SubDecisionCards } from "../components/SubDecisionCards";
import { Loading, Error, PanelLayout } from "da-apps-sdk";
import { DecisionTreeBreadcrumbs } from "../components/DecisionTreeBreadcrumbs";
import { TimeFilters } from "./BoardPage";
import { GoPin } from "react-icons/go";

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

  // Track recent decisions
  const { loading: recentDecisionsLoading, addRecentDecision } = useRecentDecisions(workspaceId, appId);

  // Track pinned decisions
  const { isPinned, pinDecision, unpinDecision } = usePinnedDecisions(workspaceId, appId);

  // Fetch metric view configuration from API
  const {
    metricConfig,
    loading: metricConfigLoading,
    error: metricConfigError,
  } = useMetricViewConfig(workspaceId, appId, decisionId);

  const { decision, subDecisions } = useMemo(() => {
    try {
      const decision = getDecision(decisionTree, decisionId);
      const subDecisions = getSubDecisions(decisionTree, decisionId);
      return { decision, subDecisions };
    } catch (error) {
      console.error("Error processing decision data:", error);
      return { decision: null, subDecisions: [] };
    }
  }, [decisionTree, decisionId]);

  // Fetch metric configurations for all sub-decisions
  const {
    subDecisionsMetrics,
    loading: subDecisionsMetricsLoading,
    error: subDecisionsMetricsError,
  } = useSubDecisionsMetrics(workspaceId, appId, subDecisions);

  // Add decision to recent decisions when it loads successfully
  useEffect(() => {
    if (decision && decision.name && decisionId && !recentDecisionsLoading) {
      addRecentDecision(decisionId, decision.name, decision.description);
    }
  }, [decision, decisionId, addRecentDecision, recentDecisionsLoading]);

  // Handle pin toggle
  const handlePinToggle = useCallback(() => {
    try {
      if (!decision) return;

      const currentlyPinned = isPinned(decisionId);
      if (currentlyPinned) {
        unpinDecision(decisionId);
      } else {
        pinDecision(decisionId, decision.name, decision.description);
      }
    } catch (error) {
      console.error("Pin toggle error:", error);
    }
  }, [decision, decisionId, isPinned, pinDecision, unpinDecision]);

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

  if (loading || metricConfigLoading || subDecisionsMetricsLoading) {
    return (
      <div className={className}>
        <Loading loaderText="Loading decision tree and metrics..." />
      </div>
    );
  }

  if (error || metricConfigError || subDecisionsMetricsError) {
    return (
      <div className={className}>
        <Error errorText={error || metricConfigError || subDecisionsMetricsError} fullScreen={false} />
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

  // Create pin button component
  const PinButton = () => {
    const currentlyPinned = isPinned(decisionId);

    return (
      <button
        onClick={handlePinToggle}
        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        title={currentlyPinned ? "Unpin decision" : "Pin decision"}
      >
        <GoPin size={16} className={currentlyPinned ? "text-blue-500" : "text-gray-400 hover:text-blue-500"} />
      </button>
    );
  };

  return (
    <PanelLayout
      title={decision?.name}
      customButton={
        <div className="flex items-center gap-x-2">
          <TimeFilters timeRange={timeRange} setTimeRange={setTimeRange} />
          <PinButton />
        </div>
      }
      breadcrumbs={
        <DecisionTreeBreadcrumbs
          decisionTree={decisionTree}
          currentDecisionId={decisionId}
          onNavigate={handleNavigate}
        />
      }
      className={"max-w-5xl mx-auto !py-6"}
    >
      <div className="grid grid-cols-1 gap-6">
        <MetricView
          onNavigate={onNavigate}
          metricViewConfig={metricConfig}
          workspaceId={workspaceId}
          tenantId={tenantId}
          timeRange={timeRange}
          className="mt-4"
        />
        <div className="mt-4 border-t border-gray-200 pt-4">
          <SubDecisionCards
            subDecisions={subDecisions}
            metricViewConfig={subDecisionsMetrics}
            workspaceId={workspaceId}
            tenantId={tenantId}
            onNavigate={onNavigate}
          />
        </div>
      </div>
    </PanelLayout>
  );
};
