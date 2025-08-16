import { useCallback, useMemo, useState } from "react";
import { usePinnedMetrics } from "../hooks/usePinnedMetrics";
import { Loading, Error } from "da-apps-sdk";
import { HiOutlineChartBar } from "react-icons/hi";
import { ChartTypes, Insight, TimeGrain } from "da-insight-sdk";
import { fetchData, fetchDimensionValues } from "../../container/services/insights.svc";
import { BsCheck2Circle } from "react-icons/bs";
import { TimeFilters } from "../pages/BoardPage";

const PinnedMetricCard = ({ metric, onNavigate, onUnpin, workspaceId, tenantId, timeRange }) => {
  const insight = useMemo(
    () => ({
      type: ChartTypes.BIGNUMBERWITHTREND,
      title: metric?.metricLabel,
      metric_name: metric?.metricKey,
      metrics: [{ metricKey: metric?.metricKey, metricLabel: metric?.metricLabel }],
      options: { className: "h-40", showExplanation: false },
    }),
    [metric]
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
        onClick: () =>
          onNavigate?.(
            `/insights/drilldown/${metric?.metricKey}?metricLabel=${encodeURIComponent(metric?.metricLabel)}`
          ),
      },
      {
        name: "Unpin",
        onClick: () => onUnpin?.(metric?.metricKey),
      },
    ],
    [metric?.metricKey, metric?.metricLabel, onNavigate, onUnpin]
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
      options={insight.options}
      dataResolver={dataResolver}
      dimensionValuesResolver={dimensionValuesResolver}
    />
  );
};

/**
 * PinnedMetrics component with comprehensive error handling and prop validation
 * @param {Object} props - Component props
 * @param {string} props.workspaceId - Workspace ID
 * @param {string} props.appId - App ID
 * @param {Function} props.onNavigate - Navigation handler function
 * @param {string} props.className - Additional CSS classes
 */
export const PinnedMetrics = ({ workspaceId, appId, onNavigate = null, className = "" }) => {
  const [timeRange, setTimeRange] = useState(30);
  const { pinnedMetrics, loading, error, unpinMetric } = usePinnedMetrics(workspaceId, appId);

  const handleUnpin = useCallback(
    (metricKey) => {
      try {
        unpinMetric(metricKey);
      } catch (error) {
        console.error("Error unpinning metric:", error);
      }
    },
    [unpinMetric]
  );

  if (loading) {
    return (
      <div className={`${className} min-h-40`}>
        <Loading loaderText="Loading pinned metrics..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${className} min-h-40`}>
        <Error errorText={error} fullScreen={false} />
      </div>
    );
  }

  return (
    <div>
      {!pinnedMetrics || pinnedMetrics.length === 0 ? (
        <div className="text-center py-8 border border-gray-200 rounded-lg bg-white">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <HiOutlineChartBar className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-sm font-medium text-gray-900 mb-1">No pinned metrics yet</p>
          <p className="text-xs text-gray-500">Pin your favorite metrics to see them here</p>
        </div>
      ) : (
        <>
          {/* Header with Time Range Controls */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
              <h2 className="text-lg font-semibold text-gray-900">Pinned Metrics</h2>
            </div>
            <TimeFilters timeRange={timeRange} setTimeRange={setTimeRange} />
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pinnedMetrics.map((metric) => (
              <PinnedMetricCard
                key={metric.metricKey}
                metric={metric}
                onNavigate={onNavigate}
                onUnpin={handleUnpin}
                workspaceId={workspaceId}
                tenantId={process.env.NEXT_PUBLIC_TENANT_ID}
                timeRange={timeRange}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
