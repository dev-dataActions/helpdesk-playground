import { useCallback, useMemo, useState, useEffect } from "react";
import { AiOutlineBarChart } from "react-icons/ai";
import { ChartTypes, Insight, TimeGrain } from "da-insight-sdk";
import { fetchData, fetchDimensionValues } from "../../container/services/insights.svc";
import { BsCheck2Circle } from "react-icons/bs";
import { TimeFilters } from "../pages/BoardPage";
import { CiSettings } from "react-icons/ci";
import { GoZap } from "react-icons/go";
import { usePinnedMetrics } from "../hooks/usePinnedMetrics";
import { DimensionFilters } from "./DimensionFilters";

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
}) => {
  const [timeRange, setTimeRange] = useState(30);
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
      <div className={`text-sm text-center text-gray-500 py-8 ${className}`}>Metric view is not configured yet.</div>
    );
  }

  const outputMetrics = metricViewConfig["OUTPUT"] || [];
  const driverMetrics = metricViewConfig["DRIVER"] || [];
  const inputMetrics = metricViewConfig["INPUT"] || [];

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-emerald-50 rounded-lg">
            <AiOutlineBarChart className="w-5 h-5 text-emerald-600" />
          </div>
          <h2 className="font-medium text-foreground">Metric View</h2>
        </div>
        <TimeFilters timeRange={timeRange} setTimeRange={setTimeRange} />
      </div>

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
