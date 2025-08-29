import { useDecisionTree } from "../hooks/useDecisionTree";
import { useMetricViewConfig } from "../hooks/useMetricViewConfig";
import { getDecision } from "../utils/general.util";
import { Error, Loading, PanelLayout } from "da-apps-sdk";
import { DecisionTreeBreadcrumbs, MetricView } from "../components";
import { LuSparkles } from "react-icons/lu";
import { useMemo, useState } from "react";
import { TimeFilters } from "../pages/BoardPage";

export const MetricViewPage = ({ workspaceId, appId, decisionId, tenantId, onNavigate }) => {
  const { decisionTree, loading: loadingDecisionTree, error: errorDecisionTree } = useDecisionTree(workspaceId, appId);
  const decision = useMemo(() => getDecision(decisionTree, decisionId), [decisionTree, decisionId]);
  const [timeRange, setTimeRange] = useState(30);

  const {
    metricConfig,
    filters,
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
        <div className="flex items-center gap-x-3">
          <div className="p-3 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-xl border border-purple-300/30 shadow-lg shadow-purple-500/20">
            <LuSparkles className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-xs font-normal text-gray-400 mb-0.5">{decision?.name}</p>
            <p>Metric View</p>
          </div>
        </div>
      }
      breadcrumbs={
        <DecisionTreeBreadcrumbs
          decisionTree={decisionTree}
          currentDecisionId={decisionId}
          onNavigate={(path) => onNavigate?.(path)}
        />
      }
      customButton={<TimeFilters timeRange={timeRange} setTimeRange={setTimeRange} />}
      className={"max-w-4xl mx-auto !py-6 !px-4"}
    >
      <div className="border-t border-gray-200 pt-4 mt-1">
        <MetricView
          onNavigate={(path) => onNavigate?.(path)}
          metricViewConfig={metricConfig}
          filters={filters}
          workspaceId={workspaceId}
          tenantId={tenantId}
          className="mt-4"
          decisionId={decisionId}
          decisionName={decision?.name}
          timeRange={timeRange}
        />
      </div>
    </PanelLayout>
  );
};
