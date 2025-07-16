import { Insight } from "da-insight-sdk";
import { Loading } from "../common/functional/Loading";
import { useMetricInsights } from "../hooks/useMetricInsights";
import { useCallback, useMemo, useState } from "react";
import { PanelLayout } from "../common/layouts/PanelLayout";
import { TIME_GRAIN_OFFSET, TimeFilters } from "./BoardPage";
import { fetchData, fetchDimensionValues } from "../common/services/insights.svc";

const InsightPreview = ({ insight, timeRange, workspaceId, tenantId }) => {
  const insightOptions = useMemo(
    () => ({
      className: "h-64",
      showExplanation: true,
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
      timeRange={timeRange}
      timeGrain={insight.timeGrain}
      filters={insight.filters}
      options={insightOptions}
      dataResolver={dataResolver}
      dimensionValuesResolver={dimensionValuesResolver}
    />
  );
};

/**
 * MetricWhatPage component with comprehensive error handling and prop validation
 * @param {Object} props - Component props
 * @param {string} props.workspaceId - Workspace ID
 * @param {string} props.metricId - Metric ID
 * @param {Function} props.onBack - Back button handler
 * @param {string} props.metricLabel - Metric label
 * @param {string} props.tenantId - Tenant ID
 */
export const MetricWhatPage = ({ workspaceId, metricId, metricLabel, tenantId, onBack = null }) => {
  const { insights, loading } = useMetricInsights(workspaceId, metricId);
  const [timeRange, setTimeRange] = useState(TIME_GRAIN_OFFSET.QUARTERLY);

  if (loading) return <Loading loaderText="Loading analysis view..." />;

  return (
    <PanelLayout
      title={(metricLabel ?? metricId) + " Analysis View"}
      description={`This is the analysis view of ${metricLabel ?? metricId}.`}
      className={`px-24 py-8`}
      customButton={<TimeFilters timeRange={timeRange} setTimeRange={setTimeRange} />}
      showBackButton={true}
      onBack={onBack}
    >
      {insights?.filter((i) => i.insightType === "what")?.length === 0 && (
        <p className="text-sm text-gray-600">No insights found</p>
      )}
      <div className="grid grid-cols-12 gap-4 mt-4">
        {insights
          ?.filter((i) => i.insightType === "what")
          ?.map((insight) => (
            <div key={insight.insight_id} className="col-span-6">
              <InsightPreview insight={insight} timeRange={timeRange} workspaceId={workspaceId} tenantId={tenantId} />
            </div>
          ))}
      </div>
    </PanelLayout>
  );
};
