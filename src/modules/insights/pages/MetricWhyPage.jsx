import { Insight, TimeGrain, ValidSpanColumns } from "da-insight-sdk";
import { Loading } from "../common/functional/Loading";
import { useMetricInsights } from "../hooks/useMetricInsights";
import { useMemo, useState } from "react";
import { PanelLayout } from "../common/layout/PanelLayout";
import { TimeFilters } from "./BoardPage";

const InsightPreview = ({ insight, filters }) => {
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
      spanCols: ValidSpanColumns.FOUR,
    }),
    [insight?.options]
  );

  return (
    <Insight
      key={insight.insight_id}
      title={insight.title}
      type={insight.chartType}
      metrics={insight.metrics}
      filters={insightFilters}
      options={insightOptions}
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
      {insights?.filter((i) => i.type === "why")?.length === 0 && (
        <p className="text-sm text-gray-600">No insights found</p>
      )}
      <div className="grid grid-cols-12 gap-4">
        {insights
          ?.filter((i) => i.type === "why")
          ?.map((insight) => (
            <InsightPreview key={insight.insight_id} insight={insight} filters={filters} />
          ))}
      </div>
    </PanelLayout>
  );
};
