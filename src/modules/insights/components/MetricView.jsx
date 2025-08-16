import { useCallback, useMemo, useState } from "react";
import { AiOutlineBarChart } from "react-icons/ai";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { ChartTypes, Insight, TimeGrain } from "da-insight-sdk";
import { fetchData, fetchDimensionValues } from "../../container/services/insights.svc";
import { BsCheck2Circle } from "react-icons/bs";
import { TimeFilters } from "../pages/BoardPage";
import { CiSettings } from "react-icons/ci";
import { GoZap } from "react-icons/go";

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
    [insight?.metric_name, insight?.title, onNavigate]
  );

  return (
    <Insight
      type={insight.type}
      title={
        <p className="flex items-center gap-x-2">
          <BsCheck2Circle className="w-4 h-4 text-green-500" />
          {insight.title}
        </p>
      }
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
    [metric, className]
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
export const MetricView = ({ metricViewConfig, workspaceId, tenantId, className = "", onNavigate }) => {
  const [timeRange, setTimeRange] = useState(30);
  const [isMetricsExpanded, setIsMetricsExpanded] = useState(true);

  if (!metricViewConfig) {
    return (
      <div className={`text-sm text-center text-gray-500 py-8 ${className}`}>Metric view is not configured yet.</div>
    );
  }

  const hasDriverOrInputMetrics =
    (metricViewConfig["DRIVER"] || []).length > 0 || (metricViewConfig["INPUT"] || []).length > 0;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-emerald-50 rounded-lg">
            <AiOutlineBarChart className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h2 className="font-medium text-foreground">Metric View</h2>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {hasDriverOrInputMetrics && (
            <button
              onClick={() => setIsMetricsExpanded(!isMetricsExpanded)}
              className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              <span className="text-sm">{isMetricsExpanded ? "Collapse" : "Expand"}</span>
              {isMetricsExpanded ? (
                <FiChevronUp className="w-4 h-4 transition-transform duration-300" />
              ) : (
                <FiChevronDown className="w-4 h-4 transition-transform duration-300" />
              )}
            </button>
          )}
          <TimeFilters timeRange={timeRange} setTimeRange={setTimeRange} />
        </div>
      </div>
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
                    className="h-40"
                  />
                </div>
              ))}
            </div>
          );
        })()}

        {/* Driver and Input Metrics - Collapsible with smooth animation */}
        {(() => {
          const driverMetrics = metricViewConfig["DRIVER"] || [];
          const inputMetrics = metricViewConfig["INPUT"] || [];

          if (driverMetrics.length === 0 && inputMetrics.length === 0) return null;

          return (
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 mt-2 overflow-hidden transition-all duration-500 ease-in-out ${
                isMetricsExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0 hidden"
              }`}
            >
              {/* Input Metrics - Right Column */}
              {inputMetrics.length > 0 && (
                <div className="space-y-1.5 pr-3">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1 bg-blue-100 rounded-lg">
                      <CiSettings className="w-4 h-4 text-blue-600" />
                    </div>
                    <h3 className="font-medium text-sm text-gray-900 capitalize">Input Metrics</h3>
                  </div>

                  <div className="flex flex-col gap-4">
                    {inputMetrics.map((metric, index) => (
                      <div key={`INPUT-${index}`}>
                        <MetricCard
                          metric={metric}
                          workspaceId={workspaceId}
                          tenantId={tenantId}
                          onNavigate={onNavigate}
                          timeRange={timeRange}
                          className="h-48"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Driver Metrics - Left Column */}
              {driverMetrics.length > 0 && (
                <div className="space-y-1.5 pl-3">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1 bg-purple-100 rounded-lg">
                      <GoZap className="w-4 h-4 text-purple-600" />
                    </div>
                    <h3 className="font-medium text-sm text-gray-900 capitalize">Driver Metrics</h3>
                  </div>
                  <div className="flex flex-col gap-4">
                    {driverMetrics.map((metric, index) => (
                      <div key={`DRIVER-${index}`}>
                        <MetricCard
                          metric={metric}
                          workspaceId={workspaceId}
                          tenantId={tenantId}
                          onNavigate={onNavigate}
                          timeRange={timeRange}
                          className="h-48"
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
    </div>
  );
};
