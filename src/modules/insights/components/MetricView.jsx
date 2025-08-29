import { useCallback, useMemo, useState, useEffect } from "react";
import { ChartTypes, Insight, TimeGrain } from "da-insight-sdk";
import { fetchData, fetchDimensionValues } from "../../container/services/insights.svc";
import { BsCheck2Circle } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { GoZap } from "react-icons/go";
import { usePinnedMetrics } from "../hooks/usePinnedMetrics";
import { DimensionFilters } from "./DimensionFilters";
import { AiOutlineBarChart } from "react-icons/ai";

const MetricCard = ({
  metric,
  workspaceId,
  tenantId,
  onNavigate,
  timeRange,
  className,
  decisionId,
  decisionName,
  activeFilters,
}) => {
  const { isPinned, pinMetric, unpinMetric } = usePinnedMetrics();

  const insight = useMemo(
    () => ({
      type: ChartTypes.BIGNUMBERWITHTREND,
      title: metric?.metricLabel,
      metric_name: metric?.metricKey,
      metrics: [{ metricKey: metric?.metricKey, metricLabel: metric?.metricLabel }],
      options: { className: className || "h-52", showExplanation: false },
    }),
    [metric, className]
  );

  const dataResolver = useCallback((payload) => fetchData(payload, workspaceId, tenantId), [workspaceId, tenantId]);
  const dimensionValuesResolver = useCallback(
    (dimension) => fetchDimensionValues(dimension, workspaceId, tenantId),
    [workspaceId, tenantId]
  );

  const handlePinToggle = useCallback(() => {
    try {
      if (isPinned(metric?.metricKey)) {
        unpinMetric(metric?.metricKey);
      } else {
        pinMetric(metric?.metricKey, metric?.metricLabel, decisionId, decisionName);
      }
    } catch (error) {
      console.error("Error toggling metric pin:", error);
    }
  }, [metric?.metricKey, metric?.metricLabel, decisionId, decisionName, isPinned, pinMetric, unpinMetric]);

  const actions = useMemo(
    () => [
      {
        name: "Drilldown",
        onClick: () => onNavigate?.(`/insights/drilldown/${metric?.metricKey}?metricLabel=${metric?.metricLabel}`),
      },
      {
        name: isPinned(metric?.metricKey) ? "Unpin from home" : "Pin to home",
        onClick: handlePinToggle,
      },
    ],
    [metric?.metricKey, metric?.metricLabel, onNavigate, handlePinToggle, isPinned]
  );

  return (
    <Insight
      type={insight.type}
      title={
        <p className="flex items-center gap-x-2">
          <BsCheck2Circle className="w-4 h-5 text-green-500" />
          {insight.title}
        </p>
      }
      actions={actions}
      metrics={insight.metrics}
      timeRange={timeRange}
      timeGrain={TimeGrain.WEEKLY}
      filters={activeFilters}
      options={insight.options}
      dataResolver={dataResolver}
      dimensionValuesResolver={dimensionValuesResolver}
    />
  );
};

export const MetricView = ({
  metricViewConfig,
  filters,
  workspaceId,
  tenantId,
  className = "",
  onNavigate,
  decisionId,
  decisionName,
  timeRange,
}) => {
  const [activeFilters, setActiveFilters] = useState(null);

  // Initialize active filters when filters prop changes
  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      setActiveFilters(filters);
    } else {
      setActiveFilters({});
    }
  }, [filters]);

  if (!metricViewConfig) {
    return (
      <div className={`${className}`}>
        <div className="rounded-xl bg-gradient-to-br from-emerald-50/50 to-white border border-emerald-100 shadow-sm transition-all duration-300 p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-200">
            <AiOutlineBarChart className="w-8 h-8 text-emerald-500" />
          </div>
          <h3 className="text-gray-700 mb-2">Metric View Not Configured</h3>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            No metrics have been configured for this decision yet. Configure metrics to start tracking your decision
            outcomes.
          </p>
        </div>
      </div>
    );
  }

  const outputMetrics = metricViewConfig["OUTPUT"] || [];
  const driverMetrics = metricViewConfig["DRIVER"] || [];
  const inputMetrics = metricViewConfig["INPUT"] || [];

  return (
    <div>
      {/* Dimension Filters */}
      {activeFilters && Object.keys(activeFilters).length > 0 && (
        <DimensionFilters
          tenantId={tenantId}
          workspaceId={workspaceId}
          filters={activeFilters}
          onFilterChange={setActiveFilters}
        />
      )}

      <div className={`flex flex-col gap-6 ${className}`}>
        {/* Output Metrics */}
        {outputMetrics.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {outputMetrics.map((metric, index) => (
              <MetricCard
                key={`OUTPUT-${index}`}
                metric={metric}
                workspaceId={workspaceId}
                tenantId={tenantId}
                onNavigate={onNavigate}
                timeRange={timeRange}
                className="h-40"
                decisionId={decisionId}
                decisionName={decisionName}
                activeFilters={activeFilters}
              />
            ))}
          </div>
        )}
        <div className={`grid grid-cols-1 lg:grid-cols-2 mt-2 overflow-hidden transition-all duration-500 ease-in-out`}>
          {/* Input Metrics */}
          {inputMetrics.length > 0 && (
            <div className="space-y-1.5 pr-3">
              <div className="flex items-center gap-1.5 mb-3">
                <CiSettings className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm text-gray-800 capitalize">Input Metrics</h3>
              </div>
              <div className="flex flex-col gap-4">
                {inputMetrics.map((metric, index) => (
                  <MetricCard
                    key={`INPUT-${index}`}
                    metric={metric}
                    workspaceId={workspaceId}
                    tenantId={tenantId}
                    onNavigate={onNavigate}
                    timeRange={timeRange}
                    className="h-48"
                    decisionId={decisionId}
                    decisionName={decisionName}
                    activeFilters={activeFilters}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Driver Metrics */}
          {driverMetrics.length > 0 && (
            <div className="space-y-1.5 pl-3">
              <div className="flex items-center gap-1.5 mb-3">
                <GoZap className="w-5 h-5 text-purple-600" />
                <h3 className="text-sm text-gray-800 capitalize">Driver Metrics</h3>
              </div>
              <div className="flex flex-col gap-4">
                {driverMetrics.map((metric, index) => (
                  <MetricCard
                    key={`DRIVER-${index}`}
                    metric={metric}
                    workspaceId={workspaceId}
                    tenantId={tenantId}
                    onNavigate={onNavigate}
                    timeRange={timeRange}
                    className="h-48"
                    decisionId={decisionId}
                    decisionName={decisionName}
                    activeFilters={activeFilters}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
