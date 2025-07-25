import { useCallback, useMemo } from "react";
import { ChartTypes, Insight } from "da-insight-sdk";
import { fetchData, fetchDimensionValues } from "../common/services/insights.svc";

/**
 * InsightPreview component for metric view
 * @param {Object} props - Component props
 * @param {Object} props.insight - Insight configuration
 * @param {string} props.workspaceId - Workspace ID
 * @param {string} props.tenantId - Tenant ID
 */
const InsightPreview = ({ insight, workspaceId, tenantId }) => {
  const insightOptions = useMemo(
    () => ({
      className: "h-48",
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

  return (
    <Insight
      type={insight.type}
      title={insight.title}
      metrics={insight.metrics}
      options={insightOptions}
      dataResolver={dataResolver}
      dimensionValuesResolver={dimensionValuesResolver}
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
 */
export const MetricView = ({ metricViewConfig, workspaceId, tenantId, className = "" }) => {
  const categories = ["OUTPUT", "DRIVER", "INPUT"];

  const createBignumberInsight = (metric) => ({
    type: ChartTypes.BIGNUMBERWITHTREND,
    title: metric.metricLabel,
    metrics: [
      {
        metricKey: metric.metricKey,
        metricLabel: metric.metricLabel,
      },
    ],
  });

  if (!metricViewConfig) {
    return <div className={`text-center text-gray-500 py-8 ${className}`}>Metric view is not configured yet.</div>;
  }

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      {categories.map((category) => {
        const metrics = metricViewConfig[category] || [];
        if (metrics.length === 0) return null;

        return (
          <div key={category} className="space-y-1.5">
            <h3 className="text-sm text-gray-600 capitalize">{category.toLowerCase()} Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {metrics.map((metric, index) => (
                <div key={`${category}-${index}`}>
                  <InsightPreview
                    insight={createBignumberInsight(metric)}
                    workspaceId={workspaceId}
                    tenantId={tenantId}
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
