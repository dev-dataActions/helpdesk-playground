import { Insight, TimeGrain } from "da-insight-sdk";
import { Loading } from "../common/functional/Loading";
import { useMetricInsights } from "../hooks/useMetricInsights";
import { useMemo, useState } from "react";
import { PanelLayout } from "../common/layouts/PanelLayout";
import { TimeFilters } from "./BoardPage";
import { fetchData, fetchDimensionValues } from "../common/services/insights.svc";

const InsightPreview = ({ insight, filters, workspaceId }) => {
  const insightFilters = useMemo(
    () => ({
      ...insight?.filters,
      ...filters,
    }),
    [insight?.filters, filters]
  );

  const insightOptions = useMemo(
    () => ({
      ...(insight?.options ?? {}),
      className: "h-64",
    }),
    [insight?.options]
  );

  return (
    <Insight
      key={insight.insight_id}
      title={insight.title}
      type={insight.type}
      metrics={insight.metrics}
      filters={insightFilters}
      options={insightOptions}
      workspaceId={workspaceId}
      dataResolver={(payload) => fetchData(payload, workspaceId)}
      dimensionValuesResolver={(dimension) => fetchDimensionValues(dimension, workspaceId)}
    />
  );
};

export const MetricWhyPage = ({ workspaceId, metricId }) => {
  const { insights, loading } = useMetricInsights(workspaceId, metricId);
  const [filters, setFilters] = useState({
    timeRange: 180,
    timeGrain: TimeGrain.WEEKLY,
  });

  if (loading) return <Loading loaderText="Loading analysis view..." />;

  return (
    <PanelLayout
      title={metricId + " Insights View"}
      description={"This is the insights view of the metric."}
      className={"!px-40 !py-8"}
      customButton={<TimeFilters filters={filters} setFilters={setFilters} />}
      showBackButton={true}
    >
      {insights?.filter((i) => i.insightType === "why")?.length === 0 && (
        <p className="text-sm text-gray-600">No insights found</p>
      )}
      <div className="grid grid-cols-12 gap-4">
        {insights
          ?.filter((i) => i.insightType === "why")
          ?.map((insight) => (
            <div key={insight.insight_id} className="col-span-12">
              <InsightPreview insight={insight} filters={filters} workspaceId={workspaceId} />
            </div>
          ))}
      </div>
    </PanelLayout>
  );
};
