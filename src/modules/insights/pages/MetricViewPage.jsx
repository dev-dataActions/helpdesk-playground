import { useDecisionTree } from "../hooks/useDecisionTree";
import { useMetricViewConfig } from "../hooks/useMetricViewConfig";
import { getDecision } from "../utils/general.util";
import { Error, Loading, PanelLayout } from "da-apps-sdk";
import { DecisionTreeBreadcrumbs, MetricView } from "../components";
import { LuSparkles } from "react-icons/lu";
import { useMemo } from "react";

export const MetricViewPage = ({ workspaceId, appId, decisionId, tenantId, onNavigate }) => {
  const { decisionTree, loading: loadingDecisionTree, error: errorDecisionTree } = useDecisionTree(workspaceId, appId);
  const decision = useMemo(() => getDecision(decisionTree, decisionId), [decisionTree, decisionId]);

  const {
    metricConfig,
    loading: loadingMetrics,
    error: metricsError,
  } = useMetricViewConfig(workspaceId, appId, decisionId);

  if (loadingDecisionTree || loadingMetrics) {
    return <Loading loaderText="Loading decision tree and metric view..." />;
  }

  if (errorDecisionTree || metricsError) {
    return <Error errorText={errorDecisionTree || metricsError} />;
  }

  return (
    <PanelLayout
      title={
        <p className="flex items-center gap-x-3">
          <span className="p-2 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-xl border border-purple-300/30 shadow-lg shadow-purple-500/20">
            <LuSparkles className="w-6 h-6 text-purple-600" />
          </span>
          {decision?.name}
        </p>
      }
      breadcrumbs={
        <DecisionTreeBreadcrumbs
          decisionTree={decisionTree}
          currentDecisionId={decisionId}
          onNavigate={(path) => onNavigate?.(path)}
        />
      }
      className={"max-w-4xl mx-auto !py-6 !px-4"}
    >
      <div className="border-t border-gray-200 pt-4 mt-2">
        <MetricView
          onNavigate={(path) => onNavigate?.(path)}
          metricViewConfig={metricConfig}
          workspaceId={workspaceId}
          tenantId={tenantId}
          className="mt-4"
          decisionId={decisionId}
          decisionName={decision?.name}
        />
      </div>
    </PanelLayout>
  );
};
