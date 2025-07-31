import { useCallback, useMemo } from "react";
import { ChartTypes, Insight, TimeGrain } from "da-insight-sdk";
import { fetchData, fetchDimensionValues } from "../../container/services/insights.svc";

/**
 * InsightPreview component for metric view
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

  const dataResolver = useCallback((payload) => fetchData(payload, workspaceId, tenantId), [workspaceId, tenantId]);

  const dimensionValuesResolver = useCallback(
    (dimension) => fetchDimensionValues(dimension, workspaceId, tenantId),
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
      timeGrain={TimeGrain.DAILY}
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
 * MetricView component for rendering metrics by category
 * @param {Object} props - Component props
 * @param {Object} props.metricViewConfig - Metric configuration
 * @param {string} props.workspaceId - Workspace ID
 * @param {string} props.tenantId - Tenant ID
 * @param {string} props.className - Additional CSS classes
 * @param {Function} props.onNavigate - Navigation handler
 * @param {Object} props.timeRange - Time range configuration
 */
export const MetricView = ({ metricViewConfig, workspaceId, tenantId, className = "", onNavigate, timeRange }) => {
  const categories = ["OUTPUT", "DRIVER", "INPUT"];

  if (!metricViewConfig) {
    return (
      <div className={`text-sm text-center text-gray-500 py-8 ${className}`}>Metric view is not configured yet.</div>
    );
  }

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      {categories.map((category) => {
        const metrics = metricViewConfig[category] || [];
        if (metrics.length === 0) return null;

        return (
          <div key={category} className="space-y-1.5">
            <h3 className="text-sm text-gray-900 capitalize">{category.toLowerCase()} Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {metrics.map((metric, index) => (
                <div key={`${category}-${index}`}>
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
          </div>
        );
      })}
    </div>
  );
};
