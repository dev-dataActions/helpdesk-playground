import { memo, useMemo } from "react";
import { Insight } from "da-insight-sdk";
import { MarkupEditor } from "./MarkupEditor";
import { useRouter } from "next/router";
import { fetchData, fetchDimensionValues } from "../common/services/insights.svc";

const InsightPreview = memo(({ insight, filters, workspaceId }) => {
  const router = useRouter();
  const { query } = router;
  const { boardId } = query;

  const insightFilters = useMemo(
    () => ({
      ...insight?.filters,
      ...filters,
    }),
    [insight?.filters, filters]
  );

  const insightOptions = useMemo(
    () => ({
      className: "h-64",
      ...(insight?.options ?? {}),
    }),
    [insight?.options]
  );

  const actions = useMemo(
    () => [
      {
        name: "Analysis View",
        onClick: () => router.push(`/insights/${boardId}/${insight.metric_name}/what`),
      },
      {
        name: "Insights View",
        onClick: () => router.push(`/insights/${boardId}/${insight.metric_name}/why`),
      },
    ],
    []
  );

  return (
    <Insight
      title={insight.title}
      key={insight.insight_id}
      type={insight.type}
      metrics={insight.metrics}
      filters={insightFilters}
      options={insightOptions}
      actions={actions}
      workspaceId={workspaceId}
      dataResolver={(payload) => fetchData(payload, workspaceId)}
      dimensionValuesResolver={(dimension) => fetchDimensionValues(dimension, workspaceId)}
    />
  );
});
InsightPreview.displayName = "InsightPreview";

export const BoardEditor = ({ blocks, filters, workspaceId }) => {
  return (
    <div className={`grid grid-cols-12 gap-2 animate-fade-in`}>
      {blocks?.map((block) => (
        <div className="col-span-full" key={block.id}>
          <div data-id={block.id}>
            {block.type === "Markup" ? (
              <MarkupEditor text={block.config.text ?? "Text"} />
            ) : (
              <InsightPreview insight={block.config} filters={filters} workspaceId={workspaceId} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
