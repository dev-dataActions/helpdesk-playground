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
        name: "Drilldown",
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
      // {
      //   name: "Insights View",
      //   onClick: () => {
      //     try {
      //       if (onNavigate && typeof onNavigate === "function") {
      //         onNavigate(`/insights/metric/${insight?.metric_name}/why?metricLabel=${insight?.title}`);
      //       }
      //     } catch (error) {
      //       console.error("Navigation error:", error);
      //     }
      //   },
      // },
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
const MetricCard = ({ metric, workspaceId, tenantId, onNavigate, timeRange, className }) => {
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
      ...(className && { options: { className: className } }),
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
      {/* Output Metrics - Keep as is */}
      {(() => {
        const outputMetrics = metricViewConfig["OUTPUT"] || [];
        if (outputMetrics.length === 0) return null;

        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {outputMetrics.map((metric, index) => (
              <div key={`OUTPUT-${index}`}>
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
        );
      })()}

      {/* Driver and Input Metrics - 2-column vertical layout */}
      {(() => {
        const driverMetrics = metricViewConfig["DRIVER"] || [];
        const inputMetrics = metricViewConfig["INPUT"] || [];

        if (driverMetrics.length === 0 && inputMetrics.length === 0) return null;

        return (
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 ${
              driverMetrics.length > 0 && inputMetrics.length > 0 ? "lg:divide-x lg:divide-gray-200" : ""
            } mt-2`}
          >

            {/* Input Metrics - Right Column */}
            {inputMetrics.length > 0 && (
              <div className="space-y-1.5 pr-3">
                <h3 className="font-semibold text-sm text-gray-900 capitalize">input Metrics</h3>
                <div className="flex flex-col gap-4">
                  {inputMetrics.map((metric, index) => (
                    <div key={`INPUT-${index}`}>
                      <MetricCard
                        metric={metric}
                        workspaceId={workspaceId}
                        tenantId={tenantId}
                        onNavigate={onNavigate}
                        timeRange={timeRange}
                        className="h-36"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

             {/* Driver Metrics - Left Column */}
             {driverMetrics.length > 0 && (
              <div className="space-y-1.5 pl-3">
                <h3 className="font-semibold text-sm text-gray-900 capitalize">driver Metrics</h3>
                <div className="flex flex-col gap-4">
                  {driverMetrics.map((metric, index) => (
                    <div key={`DRIVER-${index}`}>
                      <MetricCard
                        metric={metric}
                        workspaceId={workspaceId}
                        tenantId={tenantId}
                        onNavigate={onNavigate}
                        timeRange={timeRange}
                        className="h-36"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
};
