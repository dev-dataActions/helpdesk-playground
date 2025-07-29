import { useMemo } from "react";
import { ChartTypes, Insight, TimeGrain } from "da-insight-sdk";
import { FiArrowRight } from "react-icons/fi";
import { fetchData, fetchDimensionValues } from "../common/services/insights.svc";
import { getDecisionIdByRoleId } from "../utils/role.util";
import { getDecision } from "../utils/general.util";
import { metricViewConfig } from "../constants/decision.constant";
import { useExplanationInsights } from "../hooks/useExplanationInsights";
import { ExplanationInsightsFeed } from "./ExplanationInsightsFeed";

/**
 * InsightPreview component for metric cards
 * @param {Object} props - Component props
 * @param {Object} props.insight - Insight configuration
 * @param {string} props.workspaceId - Workspace ID
 * @param {string} props.tenantId - Tenant ID
 * @param {Function} props.onNavigate - Navigation handler
 * @param {Object} props.timeRange - Time range configuration
 */
const InsightPreview = ({ insight, workspaceId, tenantId, onNavigate, timeRange }) => {
  const insightOptions = useMemo(
    () => ({
      className: "h-52",
      showExplanation: false,
      ...(insight?.options ?? {}),
    }),
    [insight?.options]
  );

  const dataResolver = useMemo(() => (payload) => fetchData(payload, workspaceId, tenantId), [workspaceId, tenantId]);

  const dimensionValuesResolver = useMemo(
    () => (dimension) => fetchDimensionValues(dimension, workspaceId, tenantId),
    [workspaceId, tenantId]
  );

  const actions = useMemo(
    () => [
      {
        name: "Analysis View",
        onClick: () => {
          try {
            if (onNavigate && typeof onNavigate === "function") {
              onNavigate(`/insights/metric/${insight?.metric_name}/what?metricLabel=${insight?.title}`);
            }
          } catch (error) {
            console.error("Navigation error:", error);
          }
        },
      },
      {
        name: "Insights View",
        onClick: () => {
          try {
            if (onNavigate && typeof onNavigate === "function") {
              onNavigate(`/insights/metric/${insight?.metric_name}/why?metricLabel=${insight?.title}`);
            }
          } catch (error) {
            console.error("Navigation error:", error);
          }
        },
      },
    ],
    [insight?.metric_name, onNavigate]
  );

  return (
    <Insight
      type={insight.type}
      title={insight.title}
      actions={actions}
      metrics={insight.metrics}
      timeRange={timeRange}
      timeGrain={TimeGrain.WEEKLY}
      options={insightOptions}
      dataResolver={dataResolver}
      dimensionValuesResolver={dimensionValuesResolver}
    />
  );
};

/**
 * MetricCard component for individual metrics
 * @param {Object} props - Component props
 * @param {Object} props.metric - Metric configuration
 * @param {string} props.workspaceId - Workspace ID
 * @param {string} props.tenantId - Tenant ID
 * @param {Function} props.onNavigate - Navigation handler
 * @param {Object} props.timeRange - Time range configuration
 */
const MetricCard = ({ metric, workspaceId, tenantId, onNavigate, timeRange }) => {
  const insight = useMemo(
    () => ({
      type: ChartTypes.BIGNUMBERWITHTREND,
      title: metric.metricLabel,
      metric_name: metric.metricKey,
      metrics: [
        {
          metricKey: metric.metricKey,
          metricLabel: metric.metricLabel,
        },
      ],
    }),
    [metric]
  );

  return (
    <InsightPreview
      insight={insight}
      workspaceId={workspaceId}
      tenantId={tenantId}
      onNavigate={onNavigate}
      timeRange={timeRange}
    />
  );
};

/**
 * DecisionCard component for displaying role-based decision metrics
 * @param {Object} props - Component props
 * @param {string} props.roleId - Selected role ID
 * @param {string} props.workspaceId - Workspace ID
 * @param {string} props.tenantId - Tenant ID
 * @param {Object} props.decisionTree - Decision tree data
 * @param {Function} props.onNavigate - Navigation handler
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.timeRange - Time range configuration
 */
export const DecisionCard = ({
  roleId,
  workspaceId,
  tenantId,
  decisionTree,
  onNavigate,
  className = "",
  timeRange,
}) => {
  const decisionId = useMemo(() => getDecisionIdByRoleId(roleId), [roleId]);

  const decision = useMemo(() => {
    if (!decisionId || !decisionTree) return null;
    return getDecision(decisionTree, decisionId);
  }, [decisionId, decisionTree]);

  const outputMetrics = useMemo(() => {
    if (!decisionId || !metricViewConfig[decisionId]?.OUTPUT) {
      return [];
    }
    return metricViewConfig[decisionId]?.OUTPUT || [];
  }, [decisionId]);

  const {
    insights,
    loading: insightsLoading,
    error: insightsError,
    refetch: refetchInsights,
  } = useExplanationInsights(decisionId, workspaceId, tenantId);

  const handleDecisionClick = () => {
    try {
      if (onNavigate && typeof onNavigate === "function" && decisionId) {
        onNavigate(`/insights?decisionId=${decisionId}`);
      }
    } catch (error) {
      console.error("Decision navigation error:", error);
    }
  };

  if (!roleId) {
    return (
      <div
        className={`bg-white border border-gray-200 rounded-lg p-5 min-h-72 ${className} flex flex-col justify-center`}
      >
        <div className="text-center text-gray-500">
          <p className="text-sm">Please select a role to view decision insights</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white border border-gray-300 rounded-lg shadow-sm p-4 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
        {/* Output Metrics Section - Takes 1fr */}
        <div>
          <div
            className="flex items-center gap-1 mb-4 border-b border-gray-300 pb-1 cursor-pointer group"
            onClick={handleDecisionClick}
          >
            <h2 className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-all duration-200">
              {decision?.name || "My Altitude"}
            </h2>
            <FiArrowRight
              className="text-gray-500 group-hover:text-gray-700 group-hover:translate-x-1 transition-all duration-200"
              size={16}
            />
          </div>
          <div className="space-y-4">
            {outputMetrics.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {outputMetrics.map((metric, index) => (
                  <div key={`output-${index}`}>
                    <MetricCard
                      metric={metric}
                      workspaceId={workspaceId}
                      tenantId={tenantId}
                      onNavigate={onNavigate}
                      timeRange={timeRange}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <p className="text-sm">No output metrics available for this role</p>
              </div>
            )}
          </div>
        </div>

        {/* Explanation Insights Section - Fixed 300px */}
        <div className="lg:w-[300px]">
          <div className="border border-blue-200 rounded-lg p-4 h-64 bg-blue-50">
            <ExplanationInsightsFeed
              insights={insights}
              loading={insightsLoading}
              error={insightsError}
              onRefetch={refetchInsights}
              className="h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
